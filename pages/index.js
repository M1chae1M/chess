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
import {addToHistory,boardModifier,calculateAnimation,getBoardFromHistory,getBoardFromLocalStory,resetState,setBoardInLocalStory} from './classes/Functions'
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
  componentDidMount(){
    this.getBoardFromLocalStory();
    window.addEventListener('error',(event)=>console.error('Wystąpił nieobsłużony błąd:',event.error))
  }
  calculateAnimation=calculateAnimation
  addToHistory=addToHistory
  getBoardFromHistory=getBoardFromHistory.bind(this)
  resetGame=()=>{
    setTimeout(()=>{
      blackTimeRef?.current?.reset?.();
      whiteTimeRef?.current?.reset?.();
    },animationTime)

    Xo.map(x=>Yo.map(y=>boardStartState[x][y]=boardStartStateCopy[x][y]));
    localStorage.removeItem('chess_game_board');
    localStorage.removeItem('chess_game_status');
    this.setState(resetState)
    SwitchRef?.current?.changeState?.({start:false});
  }
  isChequered=()=>this.setState({kingAttacked:Figure.isKingChequered?.(!this.state.whiteTure).value})
  secoundClick=(fromField,clicked)=>{
    const {whiteTure,firstTouch,isModalOpened,promoteTo,kingAttacked,gameHistory,fiftyMovesRule}=this.state
    const [destX,destY]=clicked??[]
    const [acX,acY]=fromField??[]
    const baseFigure=this.state.boardGameState?.[acX]?.[acY];
    const isPromotionField=(destY==='8' && this.state.whiteTure)||(destY==='1' && !this.state.whiteTure);
    const isPawn=baseFigure?.getName?.()==='Pawn';
    const canMoveThere=baseFigure?.canMove?.(destX,destY,this.state.whiteTure)?.canMove;

    if(isPromotionField && canMoveThere && isPawn){
      this.setState({isModalOpened:true},()=>new Promise((resolve)=>checkIsClosed(resolve,baseFigure,clicked)))
    }
    else{
      if(canMoveThere){
        Game.getMovesCount();
        this.setState({canAnimate:true},()=>setTimeout(()=>this.setState({canAnimate:false}),animationTime));
        this.calculateAnimation(fromField,clicked);
        this.setState({actualMove:this.state.actualMove+1})
      }
      setTimeout(()=>{
        const {shortMove,newWhiteTure}={...baseFigure?.move?.(destX,destY,this.state.whiteTure)}
        this.setState({firstTouch:!this.state.firstTouch,boardGameState:shortMove,whiteTure:newWhiteTure},this.setBoardInLocalStory)
        if(newWhiteTure!==this.state.whiteTure){
          this.isChequered();
          this.addToHistory(acX,acY,{from:baseFigure},destX,destY,{whiteTure:newWhiteTure,kingAttacked});
        }
      },animationTime)
    }
  }
  boardModifier=boardModifier.bind(this)
  touch=(clicked)=>{
    const {fromField,boardGameState,whiteTure,firstTouch,kingAttacked}=this.state;
    const [destX,destY]=clicked??[]

    const clickedField=boardGameState?.[destX]?.[destY];
    const colorCondition=clickedField?.goodTure?.(whiteTure)
    if(firstTouch && clickedField!=='' && colorCondition){
      this.setState({fromField:clicked,firstTouch:!firstTouch})
    }
    else if(!firstTouch){
      this.secoundClick(fromField,clicked);
      Game?.can_NOT_win?.() && this.resetGame();
    }
  }
  setBoardInLocalStory=setBoardInLocalStory
  getBoardFromLocalStory=getBoardFromLocalStory
  render(){
    const {firstTouch,fromField,whiteTure,boardGameState,isModalOpened,kingAttacked,gameHistory,whiteOnTop,canAnimate,animateX,animateY,showHistory,fiftyMovesRule,actualMove}=this.state
    const turnBoard=()=>this.setState({whiteOnTop:!this.state.whiteOnTop})
    const checkIsClosed=(end,baseFigure,clicked)=>{
      const [destX,destY]=clicked??[]
      const {isModalOpened,promoteTo}=this.state;
    
      if(isModalOpened===false && baseFigure?.canMove?.(destX,destY,whiteTure).canMove){
        const {shortMove,newWhiteTure,chequered}={...baseFigure?.move?.(destX,destY,whiteTure)};
        shortMove[destX][destY]=_.cloneDeep(baseFigure?.closeModal?.(destX,destY,promoteTo));
        this.isChequered();
        this.setState({firstTouch:!firstTouch,boardGameState:shortMove,whiteTure:newWhiteTure});
        Game.getMovesCount();
        end();
      }else{
        setTimeout(()=>checkIsClosed(end,baseFigure,clicked),100);
      }
    }
    const closeModalF=(promoteTo)=>this.setState({isModalOpened:false,promoteTo})
    const show_or_close_history=()=>this.setState({showHistory:!this.state.showHistory})
    const resetGame=this.resetGame
    const touch=this.touch
    return(
      <AppContainer>
        <GameProvider.Provider value={{canAnimate,animateX,animateY,fromField,kingAttacked,whiteTure,boardGameState,whiteOnTop,turnBoard,gameHistory,show_or_close_history,whiteOnTop,blackTimeRef,whiteTimeRef,resetGame}}>
          <GameBoardContainer>
            <ControlPanel SwitchRef={SwitchRef}/>
            <AllFields touch={touch} whiteOnTop={whiteOnTop}/>
          </GameBoardContainer>
          <Modal isModalOpened={isModalOpened} closeModalF={closeModalF} whiteTure={whiteTure}/>
        </GameProvider.Provider>
        <History
        actualMove={actualMove}
        getBoardFromHistory={this.getBoardFromHistory} gameHistory={gameHistory} showHistory={showHistory} show_or_close_history={show_or_close_history}/>
      </AppContainer>
    )
  }
}