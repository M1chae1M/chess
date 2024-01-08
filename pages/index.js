import React,{Component} from 'react'
import ControlPanel from './components/panel/index'
import _ from 'lodash'
import History from './components/History/History'
import AllFields from './components/AllFields'
import Modal from './components/Modal'
import {resetState} from '../functions/resetState'
import {getBoardFromLocalStory} from '@/functions/getBoardFromLocalStory'
import secoundClick from '@/functions/secoundClick.ts'
import addToHistory from '@/functions/addToHistory.ts'
import {touch} from '@/functions/touch.ts'
import boardModifier from '@/functions/boardModifier.ts'
import {resetGame} from '@/functions/resetGame'
import getBoardFromHistory from '@/functions/getBoardFromHistory.ts'
import {setBoardInLocalStory} from '@/functions/setBoardInLocalStory'
import {checkIsClosed} from '@/functions/checkIsClosed'
import {componentDidMount} from '@/functions/componentDidMount'
import calculateAnimation from '@/functions/calculateAnimation.ts'
import GameBoardContainer from './components/GameBoardContainer'
import AppContainer from './components/AppContainer'
import isChequered from '@/functions/isChequered'
import Menu from './components/Menu'

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
  secoundClick=secoundClick
  calculateAnimation=calculateAnimation
  addToHistory=addToHistory
  setBoardInLocalStory=setBoardInLocalStory
  getBoardFromLocalStory=getBoardFromLocalStory
  checkIsClosed=checkIsClosed
  isChequered=isChequered.bind(this)
  resetGame=resetGame.bind(this)
  touch=touch.bind(this)
  getBoardFromHistory=getBoardFromHistory.bind(this)
  boardModifier=boardModifier.bind(this)
  render(){
    const {fromField,whiteTure,boardGameState,isModalOpened,kingAttacked,gameHistory,whiteOnTop,canAnimate,animateX,animateY,showHistory,actualMove}=this.state
    const turnBoard=()=>this.setState({whiteOnTop:!this.state.whiteOnTop})
    const closeModalF=(promoteTo)=>this.setState({isModalOpened:false,promoteTo})
    const show_or_close_history=()=>this.setState({showHistory:!this.state.showHistory})
    const {resetGame,getBoardFromHistory,touch}=this
    return(
      <AppContainer>
        <GameProvider.Provider value={{canAnimate,animateX,animateY,fromField,kingAttacked,whiteTure,boardGameState,whiteOnTop,turnBoard,gameHistory,show_or_close_history,whiteOnTop,blackTimeRef,whiteTimeRef,resetGame,actualMove,showHistory,getBoardFromHistory,isModalOpened,closeModalF,touch}}>
          <Menu/>
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