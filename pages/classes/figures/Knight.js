import React,{Component} from "react";
import {Figure} from "../Figure";
import {Xo,Yo,boardStartState} from "@/pages/_document";

export class Knight extends Figure{
  canMove(destX,destY,whiteTure){
    const moves=[]
    const [acX,acY]=this.actualField;
    const actual={acX,acY}
    const destination={destX,destY}

    if(legalKnightMove(actual,destination).can){
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
    // Xo?.includes?.(newX(1)) &&  Yo?.includes?.(newY(2)) && movesWorking.push(`${newX(1)}${newY(2)}`);
    // Xo?.includes?.(newX(1)) &&  Yo?.includes?.(newY(-2)) && movesWorking.push(`${newX(1)}${newY(-2)}`);
    // Xo?.includes?.(newX(-1)) &&  Yo?.includes?.(newY(2)) && movesWorking.push(`${newX(-1)}${newY(2)}`);
    // Xo?.includes?.(newX(-1)) &&  Yo?.includes?.(newY(-2)) && movesWorking.push(`${newX(-1)}${newY(-2)}`);
    // Xo?.includes?.(newX(-2)) &&  Yo?.includes?.(newY(1)) && movesWorking.push(`${newX(-2)}${newY(1)}`);
    // Xo?.includes?.(newX(-2)) &&  Yo?.includes?.(newY(-1)) && movesWorking.push(`${newX(-2)}${newY(-1)}`);
    // Xo?.includes?.(newX(2)) &&  Yo?.includes?.(newY(1)) && movesWorking.push(`${newX(2)}${newY(1)}`);
    // Xo?.includes?.(newX(2)) &&  Yo?.includes?.(newY(-1)) && movesWorking.push(`${newX(2)}${newY(-1)}`);

    const knightMoves=[[1,2],[1,-2],[-1,2],[-1,-2],[-2,1],[-2,-1],[2,1],[2,-1]];
    knightMoves?.map(([x,y])=>Xo?.includes?.(newX(x)) && Yo?.includes?.(newY(y)) && movesWorking.push(`${newX(x)}${newY(y)}`))

    return {isKingAttacked:this.findKing(movesWorking,whiteTure),legalMoves:movesWorking}
  }
  tryField(x,y,movesWorking){
    const [acX,acY]=this.actualField;

    const newX=(change)=>String.fromCharCode(acX.charCodeAt()+change)
    const newY=(change)=>Number(acY)+change

    const Xxx=newX(x), Yyy=newY(y);
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

function legalKnightMove(actual,destination){
  const {acX,acY}=actual
  const {destX,destY}=destination
  const horisontalMoveCondition=Math.abs(acX.charCodeAt()-destX.charCodeAt());
  const condition=(h,w)=>{return horisontalMoveCondition===h && Math.abs(destY-acY)===w}
  const moreVerticalMove=condition(1,2)
  const moreHorisontalMove=condition(2,1)

  return {can:moreVerticalMove||moreHorisontalMove}
}

function attackingField(params){
  const [chngX,chngY,whiteTure,destX,destY,movesWorking]=params
  const colorCondition=boardStartState[destX][destY]?.goodTure?.(whiteTure)
  const XoLimit=Xo.includes(horisontalMove(destX,chngX))
  const YoLimit=Yo.includes(Number(destY)+chngY);

  colorCondition && XoLimit && YoLimit && movesWorking.push(`${horisontalMove(destX,chngX)}${Number(destY)+chngY}`);
}

function horisontalMove(acX,chng){
  String.fromCharCode(acX.charCodeAt()+chng)
}