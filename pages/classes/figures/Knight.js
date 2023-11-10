import React,{Component} from "react";
import {Figure} from "../Figure";
import {Xo,Yo,boardStartState} from "@/pages/_document";
// import {Xo,Yo} from "@/pages/_document";
import {Game} from "../Game";
// const boardStartState=Game?.returnGameBoard?.()
const horisontalMove=(acX,chng)=>String.fromCharCode(acX.charCodeAt()+chng);
/* Knight */
export class Knight extends Figure{
  canMove(destX,destY,whiteTure){
    const movesWorking=[]
    const [acX,acY]=this.actualField;
    const actual={acX,acY}
    const destination={destX,destY}

    if(legalKnightMove(actual,destination).can){
      this.tryField(1,2,movesWorking)
      this.tryField(1,-2,movesWorking)

      this.tryField(-1,2,movesWorking)
      this.tryField(-1,-2,movesWorking)

      this.tryField(-2,1,movesWorking)
      this.tryField(-2,-1,movesWorking)

      this.tryField(2,1,movesWorking)
      this.tryField(2,-1,movesWorking)

      return {canMove:this.canStand(destination),moves:movesWorking}
    }
    else{
      return {canMove:false,moves:movesWorking}
    }
  }
  attacking(whiteTure,destX,destY) {
    const movesWorking=[]

    const params=[whiteTure,destX,destY,movesWorking]
    attackingField([+1,+2,...params]);
    attackingField([+1,-2,...params]);

    attackingField([-1,+2,...params]);
    attackingField([-1,-2,...params]);

    attackingField([-2,+1,...params]);
    attackingField([-2,-1,...params]);

    attackingField([+2,+1,...params]);
    attackingField([+2,-1,...params]);

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
  const YoLimit=Yo.includes(Number(destY)+chngY)

  colorCondition && XoLimit && YoLimit && movesWorking.push(`${horisontalMove(destX,chngX)}${Number(destY)+chngY}`)
}