import Game from "./Game";
import Xo from '@/config/Xo.json'
import Yo from '@/config/Yo.json'
import {boardStartState} from "../components/boardStartState";
import Pawn from "./figures/Pawn";
import Bishop from "./figures/Bishop";
import Queen from "./figures/Queen";
import King from "./figures/King";
import Knight from "./figures/Knight";
import Rook from "./figures/Rook";
import _ from "lodash";
import CONFIG from '@/config/config.json'
const {animationTime}=CONFIG??''

export function addToHistory(acX,acY,copyOfOldFileds,destX,destY,status){
  this.setState({gameHistory:
    [...this.state.gameHistory,{
      lastMove:{
      fromField:`${acX}${acY}`,
      figure:copyOfOldFileds?.from?.getName?.(),
      color:copyOfOldFileds?.from?.getColor?.(),
      clicked:[destX,destY],
      stringifiedBoard:JSON.stringify(_.cloneDeep(boardStartState)),
      status
    }}]
  })
}
export const resetState={
  whiteTure:true,
  boardGameState:{...boardStartState},
  firstTouch:true,
  fromField:'',
  isModalOpened:false,
  promoteTo:'Queen',
  kingAttacked:false,
  gameHistory:[],
  fiftyMovesRule:0,
  canAnimate:false,
  animateX:0,
  animateY:0,
  actualMove:0,
}
const figureList={Pawn,Bishop,Queen,King,Knight,Rook}
export function boardModifier(board){
  const {boardGameState}=this?.state??{}
  if(board){
    Xo?.map(x=>
      Yo?.map(y=>{
        if(board?.[x]?.[y]===''){
          boardGameState[x][y]=board?.[x]?.[y];
        }else{
          const {actualField,color,moved,name}=board?.[x]?.[y]||{};
          const FigureClass=figureList[name];
          boardGameState[x][y]=FigureClass && new FigureClass(color,actualField,moved,name);
        }
      })
    )
  }
}
export function getBoardFromLocalStory(){
  const {boardGameState}=this?.state??{}
  const getGameStatus=localStorage?.getItem?.('chess_game_status')

  if(getGameStatus){
    Game?.setHistory?.(JSON.parse(getGameStatus)?.gameHistory)
    const loadStatus=JSON.parse(getGameStatus)
    this?.setState?.(loadStatus)
  }

  this.boardModifier(JSON.parse(localStorage?.getItem?.('chess_game_board')));
  this.setState({boardGameState})
}
export function touch(clicked){
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
export function secoundClick(fromField,clicked){
  const {kingAttacked}=this.state
  const [destX,destY]=clicked??[]
  const [acX,acY]=fromField??[]
  const baseFigure=this.state.boardGameState?.[acX]?.[acY];
  const isPromotionField=(destY==='8' && this.state.whiteTure)||(destY==='1' && !this.state.whiteTure);
  const isPawn=baseFigure?.getName?.()==='Pawn';
  const canMoveThere=baseFigure?.canMove?.(destX,destY,this.state.whiteTure)?.canMove;

  if(isPromotionField && canMoveThere && isPawn){
    this.setState({isModalOpened:true},()=>new Promise((resolve)=>this.checkIsClosed(resolve,baseFigure,clicked)))
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