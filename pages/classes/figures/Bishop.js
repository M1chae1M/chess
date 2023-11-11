import React,{Component} from "react";
import {Queen} from "./Queen";

export class Bishop extends Queen{
  canMove(destX,destY,whiteTure){
    const [acX,acY]=this.actualField
    const moves=[];
    this.crossMoves(moves,acX,acY)
    const canMove=moves.includes(`${destX}${destY}`) && this.canStand({destX,destY})
    return {canMove,moves}
  }
  attacking(whiteTure,destX,destY){
    const [acX,acY]=this.actualField
    const movesWorking=[];
    this.crossAttacks(movesWorking,destX,destY)
    return {isKingAttacked:this.findKing(movesWorking,whiteTure),legalMoves:movesWorking,startField:[acX,acY]}
  }
  returnDefMovesOnly(){
    return this.returnCrossMovesOnly()
  }
}

export default class T2 extends Component{render(){return(<></>)}}