import React,{Component} from 'react';
import fieldSize from '@/config/fieldSize.json'
import {boardStartState,boardStartStateCopy} from './_document';
import Yo from '@/config/Yo.json'
import Xo from '@/config/Xo.json'
import ControlPanel from './components/panel/ControlPanel';
import {Figure} from './classes/Figure';
import _ from 'lodash';
import History from './components/History/History';
import {Game} from './classes/Game';
import AllFields from './components/AllFields';
import Modal from './components/Modal';
import Vertical from './Vertical';
import Horisontal from './Horisontal';

export const GameProvider=React.createContext()

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
  }
  componentDidMount(){
    window.addEventListener('error',(event)=>console.error('Wystąpił nieobsłużony błąd:',event.error))
  }
  render(){
    const {firstTouch,fromField,whiteTure,boardGameState,isModalOpened,kingAttacked,gameHistory,whiteOnTop}=this.state
    const isChequered=()=>this.setState({kingAttacked:Figure.isKingChequered?.(!this.state.whiteTure).value})
    const addToHistory=()=>this.setState({gameHistory:_.cloneDeep(Game?.getHistory?.())})
    const turnBoard=()=>this.setState({whiteOnTop:!this.state.whiteOnTop})
    const checkIsClosed=(end,baseFigure,clicked)=>{
      const [destX,destY]=clicked??[]
      const {isModalOpened,promoteTo}=this.state;
    
      if(isModalOpened===false && baseFigure?.canMove?.(destX,destY,whiteTure).canMove){
        const {shortMove,newWhiteTure,chequered}={...baseFigure?.move?.(destX,destY,whiteTure)};
        shortMove[destX][destY]=_.cloneDeep(baseFigure?.closeModal?.(destX,destY,promoteTo));
        isChequered();
        this.setState({firstTouch:!firstTouch,boardGameState:shortMove,whiteTure:newWhiteTure},addToHistory);
        end();
      }else{
        setTimeout(()=>checkIsClosed(end,baseFigure,clicked),100);
      }
    }
    const resetGame=()=>{
      
      Xo.map(x=>Yo.map(y=>boardStartState[x][y]=boardStartStateCopy[x][y]))

      this.setState({whiteTure:true, boardGameState:boardStartStateCopy, firstTouch:true, fromField:'', kingAttacked:false, gameHistory:[], fiftyMovesRule:0})
      // this.setState({whiteTure:true, boardGameState:_.cloneDeep(boardStartStateCopy), firstTouch:true, fromField:'', kingAttacked:false, gameHistory:[], fiftyMovesRule:0})
    }
    const secoundClick=(fromField,clicked)=>{
      const [destX,destY]=clicked??[]
      const [acX,acY]=fromField
      const baseFigure=boardGameState?.[acX]?.[acY];
      const isPromotionField=(destY==='8' && whiteTure)||(destY==='1' && !whiteTure);
      const isPawn=baseFigure?.getName?.()==='Pawn';
      const canMoveThere=baseFigure?.canMove?.(destX,destY,whiteTure);

      if(isPromotionField && canMoveThere && isPawn && baseFigure?.canMove?.(destX,destY,whiteTure).canMove){
        this.setState({isModalOpened:true},()=>{
          return new Promise((resolve)=>{
            checkIsClosed(resolve,baseFigure,clicked);
          })
        })
      }
      else{
        const {shortMove,newWhiteTure}={...baseFigure?.move?.(destX,destY,whiteTure)}
        this.setState({firstTouch:!firstTouch,boardGameState:shortMove,whiteTure:newWhiteTure})
        if(newWhiteTure!==this.state.whiteTure){
          isChequered()
        }
      }
      addToHistory();
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
        gridAutoFlow:'column',
        gridTemplateColumns:'1fr auto',
      },
      GameBoard:{
        position:'relative',
        display:'grid',
        gridGap:'1px',
        gridTemplateColumns:`repeat(8,${fieldSize})`,
      },
    }
    return(
      <div style={styles.App}>
        {/* <button onClick={()=>Game?.save?.(this.state.boardGameState)}>save</button>
        <button onClick={()=>{
          const {gameHistory,fiftyMovesRule,samePositions,board,boardStartState}=Game?.load?.()
          this.setState({whiteTure:true, boardGameState:_.cloneDeep(board), firstTouch:true, fromField:'', kingAttacked:false, gameHistory:[], fiftyMovesRule:0})
          // this.setState({whiteTure:true, boardGameState:boardStartStateCopy, firstTouch:true, fromField:'', kingAttacked:false, gameHistory:[], fiftyMovesRule:0})
          // this.setState({
            // boardGameState:_.cloneDeep(board),
            // boardGameState:_.cloneDeep(boardStartStateCopy),
            // gameHistory:_.cloneDeep(gameHistory),
            // fiftyMovesRule:fiftyMovesRule,
          // })
          }}>load</button>
        <button onClick={()=>Game?.setGameBoard?.(this.state.boardGameState)}>setGameBoard</button> */}
        <GameProvider.Provider value={{kingAttacked,backToHistory,whiteTure,resetGame,boardGameState,whiteOnTop,turnBoard,gameHistory}}>
          <div style={styles.GameBoard} id='gameboard'>
            <Vertical whiteOnTop={whiteOnTop}/>
            <ControlPanel/>
            <AllFields touch={touch} whiteOnTop={whiteOnTop}/>
            <Horisontal whiteOnTop={whiteOnTop}/>
          </div>
          <Modal isModalOpened={isModalOpened} closeModalF={closeModalF} whiteTure={whiteTure}/>
          <History gameHistory={gameHistory}/>
        </GameProvider.Provider>
      </div>
    )
  }
}