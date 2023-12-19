import React,{Component} from 'react'
import ControlPanel from './components/panel/ControlPanel'
import Figure from '../classes/Figure'
import _ from 'lodash'
import History from './components/History/History'
import AllFields from './components/AllFields'
import Modal from './components/Modal'
import {addToHistory,boardModifier,getBoardFromLocalStory,resetGame,resetState,secoundClick,touch} from '../classes/Functions'
import {getBoardFromHistory} from '@/functions/getBoardFromHistory'
import {setBoardInLocalStory} from '@/functions/setBoardInLocalStory'
import {checkIsClosed} from '@/functions/checkIsClosed'
import {componentDidMount} from '@/functions/componentDidMount'
import {calculateAnimation} from '@/functions/calculateAnimation'
import GameBoardContainer from './components/GameBoardContainer'
import AppContainer from './components/AppContainer'

export const GameProvider=React.createContext()
export const blackTimeRef=React.createRef()
export const whiteTimeRef=React.createRef()
export const GameRef=React.createRef()
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
  boardModifier=boardModifier.bind(this)
  setBoardInLocalStory=setBoardInLocalStory
  getBoardFromLocalStory=getBoardFromLocalStory
  checkIsClosed=checkIsClosed
  isChequered=()=>this.setState({kingAttacked:Figure.isKingChequered?.(!this.state.whiteTure).value})
  render(){
    const {fromField,whiteTure,boardGameState,isModalOpened,kingAttacked,gameHistory,whiteOnTop,canAnimate,animateX,animateY,showHistory,actualMove}=this.state
    const turnBoard=()=>this.setState({whiteOnTop:!this.state.whiteOnTop})
    const closeModalF=(promoteTo)=>this.setState({isModalOpened:false,promoteTo})
    const show_or_close_history=()=>this.setState({showHistory:!this.state.showHistory})
    const {resetGame,getBoardFromHistory,touch}=this
    return(
      <AppContainer>
        <GameProvider.Provider value={{canAnimate,animateX,animateY,fromField,kingAttacked,whiteTure,boardGameState,whiteOnTop,turnBoard,gameHistory,show_or_close_history,whiteOnTop,blackTimeRef,whiteTimeRef,resetGame,actualMove,showHistory,getBoardFromHistory,isModalOpened,closeModalF,touch}}>
          <GameBoardContainer>
            <ControlPanel SwitchRef={SwitchRef}/>
            <AllFields/>
          </GameBoardContainer>
          <Modal/>
          <History/>
        </GameProvider.Provider>
      </AppContainer>
    )
  }
}