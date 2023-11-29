import React,{Component} from "react";
import {Game} from "./Game";
import Xo from '@/config/Xo.json'
import Yo from '@/config/Yo.json'
import {boardStartStateCopy,boardStartState} from "../_document";
import {Pawn} from "./figures/Pawn";
import {Bishop} from "./figures/Bishop";
import {Queen} from "./figures/Queen";
import {King} from "./figures/King";
import {Knight} from "./figures/Knight";
import {Rook} from "./figures/Rook";
import _ from "lodash";
import CONFIG from '@/config/config.json'
const {animationTime}=CONFIG??''

export function ifBlackFunction(x,y){
  const isEvenX=x?.charCodeAt?.()%2===0;
  const isEvenY=y % 2===0;
  return isEvenX!==isEvenY?'white':'grey'
}
export function calculateAnimation(fromField,clicked){
  const [destX,destY]=clicked??[]
  const [acX,acY]=fromField??[]
  this.setState({
    animateX:destX.charCodeAt()-acX.charCodeAt(),
    animateY:Number(destY)-Number(acY),
  })
}
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
const figureList={
  Pawn:Pawn,
  Bishop:Bishop,
  Queen:Queen,
  King:King,
  Knight:Knight,
  Rook:Rook,
}
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

  if(localStorage?.getItem?.('chess_game_status')){
    const loadStatus=JSON.parse(localStorage?.getItem?.('chess_game_status'))
    this?.setState?.(loadStatus)
  }

  this.boardModifier(JSON.parse(localStorage?.getItem?.('chess_game_board')));
  this.setState({boardGameState})
}
export function getBoardFromHistory(lastMove,id){
  const {stringifiedBoard,status}=lastMove??{}
  const {boardGameState}=this?.state??{}

  Game?.setUpToDate?.(this.state.gameHistory?.length-1===id);
  this.boardModifier(JSON.parse(stringifiedBoard));
  this.setState({...status,boardGameState,actualMove:id})
}
export function setBoardInLocalStory(){
  const {whiteTure,firstTouch,fromField,isModalOpened,promoteTo,kingAttacked,gameHistory,fiftyMovesRule,boardGameState}=this.state??{}
  localStorage.setItem('chess_game_board',JSON.stringify(boardGameState))
  localStorage.setItem('chess_game_status',JSON.stringify({whiteTure,firstTouch,fromField,isModalOpened,promoteTo,kingAttacked,gameHistory,fiftyMovesRule}))
}
export function checkIsClosed(end,baseFigure,clicked){
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
    setTimeout(()=>this.checkIsClosed(end,baseFigure,clicked),100);
  }
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
  const {whiteTure,firstTouch,isModalOpened,promoteTo,kingAttacked,gameHistory,fiftyMovesRule}=this.state
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

export default class Functions extends Component{render(){return(<></>)}}