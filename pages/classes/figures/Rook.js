import React,{Component} from "react";
import {Queen} from "./Queen";

/* Rook */
export class Rook extends Queen{
  canMove(destX,destY,whiteTure){
    const {canMove,moves}=this.linearMoves(destX,destY,whiteTure)
    return {canMove,moves}
  }
  attacking(whiteTure,destX,destY){
    const movesWorking=[];
    const [acX,acY]=this.actualField;
    this.linearAttacks(movesWorking,acX,acY,whiteTure)
    return {isKingAttacked:this.findKing(movesWorking,whiteTure),startField:[acX,acY],legalMoves:movesWorking}
  }
  returnDefMovesOnly(){
    const movesWorking=[]
    movesWorking.push(this.returnLinearMovesOnly())
    
    return movesWorking.flat()
  }
}

export default class T2 extends Component{render(){return(<></>)}}