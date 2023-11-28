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
  showHistory:false,
  showHistory:true,
  canAnimate:false,
  animateX:0,
  animateY:0,
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


  // Game?.setUpToDate?.(false);
  // console.log('ruch numer: ', id)
  // console.log(
  //   this.state.gameHistory?.length-1===id
  // )

  Game?.setUpToDate?.(this.state.gameHistory?.length-1===id);


  this.boardModifier(JSON.parse(stringifiedBoard));
  this.setState({...status,boardGameState})
}
export function setBoardInLocalStory(){
  const {whiteTure,firstTouch,fromField,isModalOpened,promoteTo,kingAttacked,gameHistory,fiftyMovesRule,boardGameState}=this.state??{}
  localStorage.setItem('chess_game_board',JSON.stringify(boardGameState))
  localStorage.setItem('chess_game_status',JSON.stringify({whiteTure,firstTouch,fromField,isModalOpened,promoteTo,kingAttacked,gameHistory,fiftyMovesRule}))
}

export default class Functions extends Component{render(){return(<></>)}}