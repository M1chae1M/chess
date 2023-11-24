import React,{Component} from "react";
import {Game} from "./Game";
import {blackTimeRef,whiteTimeRef} from "..";
import Xo from '@/config/Xo.json'
import Yo from '@/config/Yo.json'
import {boardStartStateCopy,boardStartState} from "../_document";

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

export default class Functions extends Component{render(){return(<></>)}}