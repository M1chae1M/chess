import React,{Component} from "react";
import {Figure} from "../Figure";
import Yo from '@/config/Yo.json'
import Xo from '@/config/Xo.json'

export class Knight extends Figure{
  legalKnightMove(actual,destination){
    const {acX,acY}=actual
    const {destX,destY}=destination
    const horisontalMoveCondition=Math.abs(acX.charCodeAt()-destX.charCodeAt());
    const condition=(h,w)=>horisontalMoveCondition===h && Math.abs(destY-acY)===w
    const moreVerticalMove=condition(1,2)
    const moreHorisontalMove=condition(2,1)
  
    return {can:moreVerticalMove||moreHorisontalMove}
  }
  canMove(destX,destY,whiteTure){
    const moves=[]
    const [acX,acY]=this.actualField;
    const actual={acX,acY}
    const destination={destX,destY}

    // if(legalKnightMove(actual,destination).can){
    if(this.legalKnightMove(actual,destination).can){
      const tryFields=[[1,2],[1,-2],[-1,2],[-1,-2],[-2,1],[-2,-1],[2,1],[2,-1]];
      tryFields?.map(([x1,x2])=>this.tryField(x1,x2,moves))

      return {canMove:this.canStand(destination),moves}
    }
    else{
      return {canMove:false,moves}
    }
  }
  attacking(whiteTure,destX,destY){
    const movesWorking=[]
    const [acX,acY]=this.actualField
    const newX=(change)=>String.fromCharCode(acX.charCodeAt()+change)
    const newY=(change)=>Number(acY)+change
    const knightMoves=[[1,2],[1,-2],[-1,2],[-1,-2],[-2,1],[-2,-1],[2,1],[2,-1]];
    knightMoves?.map(([x,y])=>Xo?.includes?.(newX(x)) && Yo?.includes?.(newY(y)) && movesWorking.push(`${newX(x)}${newY(y)}`))

    return {isKingAttacked:this.findKing(movesWorking,whiteTure),legalMoves:movesWorking}
  }
  tryField(x,y,movesWorking){
    const [acX,acY]=this.actualField;

    const newX=(change)=>String.fromCharCode(acX.charCodeAt()+change)
    const newY=(change)=>Number(acY)+change

    const Xxx=newX(x),Yyy=newY(y);
    Xo.includes(Xxx) && Yo.includes(Yyy) && movesWorking.push(`${Xxx}${Yyy}`);
  }
  returnDefMovesOnly(){
    const movesWorking=[]
    this.tryField(1,2,movesWorking)
    this.tryField(1,-2,movesWorking)

    this.tryField(-1,2,movesWorking)
    this.tryField(-1,-2,movesWorking)

    this.tryField(-2,1,movesWorking)
    this.tryField(-2,-1,movesWorking)

    this.tryField(2,1,movesWorking)
    this.tryField(2,-1,movesWorking)

    return movesWorking
  }
}

export default class T2 extends Component{render(){return(<></>)}}

// function legalKnightMove(actual,destination){
//   const {acX,acY}=actual
//   const {destX,destY}=destination
//   const horisontalMoveCondition=Math.abs(acX.charCodeAt()-destX.charCodeAt());
//   const condition=(h,w)=>horisontalMoveCondition===h && Math.abs(destY-acY)===w
//   const moreVerticalMove=condition(1,2)
//   const moreHorisontalMove=condition(2,1)

//   return {can:moreVerticalMove||moreHorisontalMove}
// }