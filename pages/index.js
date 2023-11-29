import React,{Component} from 'react'
import {boardStartState,boardStartStateCopy} from './_document'
import Yo from '@/config/Yo.json'
import Xo from '@/config/Xo.json'
import ControlPanel from './components/panel/ControlPanel'
import {Figure} from './classes/Figure'
import _ from 'lodash'
import History from './components/History/History'
import {Game} from './classes/Game'
import AllFields from './components/AllFields'
import Modal from './components/Modal'
import {addToHistory,boardModifier,calculateAnimation,checkIsClosed,componentDidMount,getBoardFromHistory,getBoardFromLocalStory,resetGame,resetState,secoundClick,setBoardInLocalStory,touch} from './classes/Functions'
import CONFIG from '@/config/config.json'
import GameBoardContainer from './components/GameBoardContainer'
import AppContainer from './components/AppContainer'
const {animationTime}=CONFIG??''

export const GameProvider=React.createContext()
export const blackTimeRef=React.createRef();
export const whiteTimeRef=React.createRef();
export const GameRef=React.createRef();
export const SwitchRef=React.createRef()

export default class GameBoard extends Component{
  state={
    ...resetState,
    whiteOnTop:true,
    showHistory:false,
  }
  componentDidMount=componentDidMount
  resetGame=resetGame.bind(this)
  secoundClick=secoundClick
  touch=touch.bind(this)
  calculateAnimation=calculateAnimation
  addToHistory=addToHistory
  getBoardFromHistory=getBoardFromHistory.bind(this)
  isChequered=()=>this.setState({kingAttacked:Figure.isKingChequered?.(!this.state.whiteTure).value})
  boardModifier=boardModifier.bind(this)
  setBoardInLocalStory=setBoardInLocalStory
  getBoardFromLocalStory=getBoardFromLocalStory
  checkIsClosed=checkIsClosed
  render(){
    const {firstTouch,fromField,whiteTure,boardGameState,isModalOpened,kingAttacked,gameHistory,whiteOnTop,canAnimate,animateX,animateY,showHistory,fiftyMovesRule,actualMove}=this.state
    const turnBoard=()=>this.setState({whiteOnTop:!this.state.whiteOnTop})
    const closeModalF=(promoteTo)=>this.setState({isModalOpened:false,promoteTo})
    const show_or_close_history=()=>this.setState({showHistory:!this.state.showHistory})
    const resetGame=this.resetGame
    return(
      <AppContainer>
        <GameProvider.Provider value={{canAnimate,animateX,animateY,fromField,kingAttacked,whiteTure,boardGameState,whiteOnTop,turnBoard,gameHistory,show_or_close_history,whiteOnTop,blackTimeRef,whiteTimeRef,resetGame}}>
          <GameBoardContainer>
            <ControlPanel SwitchRef={SwitchRef}/>
            <AllFields touch={this.touch} whiteOnTop={whiteOnTop}/>
          </GameBoardContainer>
          <Modal isModalOpened={isModalOpened} closeModalF={closeModalF} whiteTure={whiteTure}/>
        </GameProvider.Provider>
        <History actualMove={actualMove} getBoardFromHistory={this.getBoardFromHistory} gameHistory={gameHistory} showHistory={showHistory} show_or_close_history={show_or_close_history}/>
      </AppContainer>
    )
  }
}