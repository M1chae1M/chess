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
export function addToHistory(acX,acY,copyOfOldFileds,destX,destY){
  this.setState({gameHistory:
    [...this.state.gameHistory,{
    lastMove:{
      fromField:`${acX}${acY}`,
      figure:copyOfOldFileds?.from?.getName?.(),
      color:copyOfOldFileds?.from?.getColor?.(),
      clicked:[destX,destY],
      stringifiedBoard:JSON.stringify(Game?.withoutMovedFields?.())
    }}]
  })
}
export const resetState=()=>({
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
})
const figureList={
  Pawn:Pawn,
  Bishop:Bishop,
  Queen:Queen,
  King:King,
  Knight:Knight,
  Rook:Rook,
}
export function getBoardFromLocalStory(){
  const {boardGameState}=this?.state??{}
  if(localStorage?.getItem?.('game_board')){
    const loadBoard=JSON.parse(localStorage?.getItem?.('game_board'))
    Xo?.map(x=>
      Yo?.map(y=>{
        if(loadBoard?.[x]?.[y]===''){
          boardGameState[x][y]=loadBoard?.[x]?.[y];
        }else{
          const {actualField,color,moved,name}=loadBoard?.[x]?.[y]||{};
          const FigureClass=figureList[name];
          boardGameState[x][y]=FigureClass && new FigureClass(color,actualField,moved,name);
        }
      })
    )
  }
  this.setState({boardGameState:boardGameState})
}

export default class Functions extends Component{render(){return(<></>)}}