import React,{Component, PureComponent, useMemo} from 'react';
import {fieldSize,boardStartState,boardStartStateCopy, Xo, Yo} from './_document';
import ControlPanel from './components/panel/ControlPanel';
import PromotionModal from './components/Modal/PromotionModal';
import {Figure} from './classes/Figure';
import _ from 'lodash';
import History from './components/History/History';
import {Game} from './classes/Game';
import dynamic from 'next/dynamic';
const DynamicField=dynamic(()=>import('./components/Field'), {ssr:false});

export const ModalContext=React.createContext()
export const GameProvider=React.createContext()

export default class GameBoard extends Component{
  // shouldComponentUpdate(nextProps, nextState) {
  //   const cond4=(this.state.firstTouch !== nextState.firstTouch)
  //   const cond5=(this.state.fromField !== nextState.fromField)

  //   console.log(cond4, cond5)

  //   if(cond4 && cond5){
  //     return true;
  //   }
  //   return false;
  // }
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
  }
  componentDidMount(){
    window.addEventListener('error',(event) => {
      console.error('Wystąpił nieobsłużony błąd:',event.error);
    });
  }
  render(){
    const {firstTouch,fromField,whiteTure,boardGameState,isModalOpened,kingAttacked,gameHistory}=this.state
    const isChequered=()=>{
      this.setState(Figure.isKingChequered?.(!this.state.whiteTure).value?{kingAttacked:true}:{kingAttacked:false})
    }
    const addToHistory=(data)=>{
      const gameHistoryCopy=_.cloneDeep(this.state.gameHistory);
      gameHistoryCopy.push({lastMove:{...data},board:_.cloneDeep(boardGameState)})
      Game.addToHistory({lastMove:{...data},board:_.cloneDeep(boardGameState)})
      this.setState({gameHistory:_.cloneDeep(gameHistoryCopy)})
    }
    const checkIsClosed=(resol,baseFigure,clicked)=>{
      const [destX,destY]=clicked??[]
      const {isModalOpened,promoteTo}=this.state;
    
      if(isModalOpened===false && baseFigure?.canMove?.(destX,destY,whiteTure).canMove){
        const {shortMove,newWhiteTure,chequered}={...baseFigure?.move?.(destX,destY,whiteTure)};
        shortMove[destX][destY]=baseFigure?.closeModal?.(destX,destY,promoteTo);
        this.setState({firstTouch:!firstTouch,boardGameState:shortMove,whiteTure:newWhiteTure});
        resol();
      }else{
        setTimeout(()=>checkIsClosed(resol,baseFigure,clicked),100);
      }
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
      addToHistory({color:baseFigure?.getColor?.(),figure:baseFigure?.getName?.(),fromField,clicked})
      Game.getMovesCount()
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
        secoundClick(fromField,clicked)
      }
    }
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
    const closeModalF=(name)=>{
      this.setState({isModalOpened:false,promoteTo:name})
    }
    const Modal=()=>{
      return <ModalContext.Provider value={{closeModalF}}>
        {this.state.isModalOpened?<PromotionModal whiteTure={whiteTure}/>:null}
      </ModalContext.Provider>
    }
    const backToHistory=(board)=>{
      this.setState({boardGameState:_.cloneDeep({...board})})
    }
    const resetGame=()=>{
      Xo.map(x=>Yo.map(y=>boardStartState[x][y]=boardStartStateCopy[x][y]))

      this.setState({whiteTure:true, boardGameState:boardStartStateCopy, firstTouch:true, fromField:'', kingAttacked:false, gameHistory:[], fiftyMovesRule:0})
    }
    const AllFields=()=>{
      return Yo?.reverse()?.map(y=>Xo?.map(x=>{
        return <DynamicField key={`${x}${y}`} x={x} y={y} touch={touch}/>
      }))
    }
    return(
      <div style={styles.App}>
        {Yo?.reverse()?.map(y=>Xo?.map(x=>console.log(`${x}${y}`)))}
        <GameProvider.Provider value={{kingAttacked,backToHistory,whiteTure,resetGame}}>
          <div style={styles.GameBoard} id='gameboard'>
            <ControlPanel whiteTure={whiteTure}/>
            <AllFields/>
          </div>
          <Modal/>
          <History gameHistory={gameHistory}/>
        </GameProvider.Provider>
      </div>
    )
  }
}