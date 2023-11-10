import React,{Component} from "react";
import {Queen} from "./Queen";

/* Bishop */
export class Bishop extends Queen{
  canMove(destX,destY,whiteTure){
    const [acX,acY]=this.actualField
    const movesWorking=[];
    this.crossMoves(movesWorking,acX,acY)
    return {canMove:movesWorking.includes(`${destX}${destY}`) && this.canStand({destX,destY}),moves:movesWorking}
  }
  attacking(whiteTure,destX,destY){
    const [acX,acY]=this.actualField
    const movesWorking=[];
    this.crossAttacks(movesWorking,destX,destY)
    return {isKingAttacked:this.findKing(movesWorking,whiteTure),legalMoves:movesWorking,startField:[acX,acY]}
  }
  returnDefMovesOnly(){
    const movesWorking=[]
    movesWorking.push(this.returnCrossMovesOnly())
    
    return movesWorking.flat()
  }
}

export default class T2 extends Component{render(){return(<></>)}}