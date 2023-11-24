import React,{Component} from 'react'
import fieldSize from '@/config/fieldSize.json'
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
import animationTime from '@/config/animationTime.json'

export const GameProvider=React.createContext()
export const blackTimeRef=React.createRef();
export const whiteTimeRef=React.createRef();
export const GameRef=React.createRef();

export default class GameBoard extends Component{
  state={
    whiteTure:true,
    boardGameState:{...boardStartState},
    firstTouch:true,
    fromField:'',
    isModalOpened:false,
    promoteTo:'Queen',
    kingAttacked:false,
    gameHistory:[],
    fiftyMovesRule:0,
    whiteOnTop:true,
    showHistory:false,
    canAnimate:false,
    animateX:0,
    animateY:0
  }
  componentDidMount(){
    window.addEventListener('error',(event)=>console.error('Wystąpił nieobsłużony błąd:',event.error))
  }
  calculateAnimation(fromField,clicked){
    const [destX,destY]=clicked??[]
    const [acX,acY]=fromField??[]
    this.setState({
      animateX:destX.charCodeAt()-acX.charCodeAt(),
      animateY:Number(destY)-Number(acY),
    })
  }
  render(){
    const {firstTouch,fromField,whiteTure,boardGameState,isModalOpened,kingAttacked,gameHistory,whiteOnTop,canAnimate,animateX,animateY}=this.state
    const isChequered=()=>this.setState({kingAttacked:Figure.isKingChequered?.(!this.state.whiteTure).value})
    // const addToHistory=()=>this.setState({gameHistory:_.cloneDeep(Game?.getHistory?.())})
    const addToHistory=()=>{
      
      this.setState({
        gameHistory:this.state.gameHistory.push()
      })
    
    
    }
    const turnBoard=()=>this.setState({whiteOnTop:!this.state.whiteOnTop})
    const checkIsClosed=(end,baseFigure,clicked)=>{
      const [destX,destY]=clicked??[]
      const {isModalOpened,promoteTo}=this.state;
    
      if(isModalOpened===false && baseFigure?.canMove?.(destX,destY,whiteTure).canMove){
        const {shortMove,newWhiteTure,chequered}={...baseFigure?.move?.(destX,destY,whiteTure)};
        shortMove[destX][destY]=_.cloneDeep(baseFigure?.closeModal?.(destX,destY,promoteTo));
        isChequered();
        this.setState({firstTouch:!firstTouch,boardGameState:shortMove,whiteTure:newWhiteTure});
        end();
      }else{
        setTimeout(()=>checkIsClosed(end,baseFigure,clicked),100);
      }
    }
    const resetGame=()=>{
      blackTimeRef?.current?.reset?.();
      whiteTimeRef?.current?.reset?.();

      Xo.map(x=>Yo.map(y=>boardStartState[x][y]=boardStartStateCopy[x][y]));

      this.setState({
        whiteTure:true,
        boardGameState:{...boardStartStateCopy},
        firstTouch:true,
        fromField:'',
        kingAttacked:false,
        gameHistory:[],
        fiftyMovesRule:0,
        isModalOpened:false,
        promoteTo:'Queen',
      });
    }
    const secoundClick=(fromField,clicked)=>{
      const [destX,destY]=clicked??[]
      const [acX,acY]=fromField??[]
      const baseFigure=boardGameState?.[acX]?.[acY];
      const isPromotionField=(destY==='8' && whiteTure)||(destY==='1' && !whiteTure);
      const isPawn=baseFigure?.getName?.()==='Pawn';
      const canMoveThere=baseFigure?.canMove?.(destX,destY,whiteTure)?.canMove;
      const {moves}=baseFigure?.canMove?.(destX,destY,whiteTure)??{}

      if(isPromotionField && canMoveThere && isPawn){
        this.setState({isModalOpened:true},()=>new Promise((resolve)=>checkIsClosed(resolve,baseFigure,clicked)))
      }
      else{
        if(canMoveThere || baseFigure?.canYouBeatInPassing?.({destX,destY},whiteTure,moves)){
          this.setState({canAnimate:true},()=>setTimeout(()=>this.setState({canAnimate:false}),animationTime));
          this.calculateAnimation(fromField,clicked);
        }
        setTimeout(()=>{
          const {shortMove,newWhiteTure}={...baseFigure?.move?.(destX,destY,whiteTure)}
          this.setState({firstTouch:!firstTouch,boardGameState:shortMove,whiteTure:newWhiteTure})
          if(newWhiteTure!==this.state.whiteTure){
            isChequered()
          }
        },animationTime)
      }
      addToHistory(acX,acY,{from:baseFigure},destX,destY);
      Game.getMovesCount();
    }
    const touch=(clicked)=>{
      const {fromField}=this.state;
      const [destX,destY]=clicked??[]

      const clickedField=boardGameState?.[destX]?.[destY];
      const colorCondition=clickedField?.goodTure?.(whiteTure)
      if(firstTouch && clickedField!=='' && colorCondition){
        this.setState({fromField:clicked,firstTouch:!firstTouch})
      }
      else if(!firstTouch){
        secoundClick(fromField,clicked);
        Game?.can_NOT_win?.() && resetGame();
      }
    }
    const closeModalF=(name)=>this.setState({isModalOpened:false,promoteTo:name})
    const backToHistory=(board)=>this.setState({boardGameState:_.cloneDeep({...board})})
    const styles={
      App:{
        display:'grid',
        justifyItems:'center',
        alignItems:'center',
        width:'100vw',
        height:'100vh',
        alignContent:'center',
        userSelect:'none',
      },
      GameBoard:{
        position:'relative',
        display:'grid',
        gridGap:'1px',
        gridTemplateColumns:`repeat(8,${fieldSize})`,
      },
    }
    const show_or_close_history=()=>this.setState({showHistory:!this.state.showHistory})
    return(
      <div style={styles.App}>
        <GameProvider.Provider value={{canAnimate,animateX,animateY,fromField,
kingAttacked,backToHistory,whiteTure,resetGame,boardGameState,whiteOnTop,turnBoard,gameHistory,show_or_close_history,whiteOnTop,blackTimeRef,whiteTimeRef}}>
          <div style={styles.GameBoard}>
            <ControlPanel/>
            <AllFields touch={touch} whiteOnTop={whiteOnTop}/>
          </div>
          <Modal isModalOpened={isModalOpened} closeModalF={closeModalF} whiteTure={whiteTure}/>
        </GameProvider.Provider>
        <History gameHistory={gameHistory} showHistory={this.state.showHistory} show_or_close_history={show_or_close_history}/>
      </div>
    )
  }
}