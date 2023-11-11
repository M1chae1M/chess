import React,{Component} from "react";
import {Figure} from "../Figure";
import {Xo,Yo,boardStartState} from "@/pages/_document";
// import {Xo,Yo} from "@/pages/_document";
import {Game} from "../Game";

// const boardStartState=Game.returnGameBoard()

/* King */
export class King extends Figure{
  castling(destX,destY,whiteTure){
    const [acX,acY]=this.actualField

    const isG=destX==='G'
    const rookPosition=isG?'H':'A'
    const rook=boardStartState[rookPosition][destY]
    const destField=isG?'F':'D';

    const horisontalMoveCondition=Math.abs(acX.charCodeAt()-destX.charCodeAt())
    const verticalMoveCondition=Math.abs(Number(acY)-Number(destY))

    const attacked=Figure.allFieldsAttackedBy(whiteTure?'black':'white',whiteTure)
    const doesntAttacked=(f1,f2)=>{return !attacked.includes(`${f1}${acY}`) && !attacked.includes(`${f2}${acY}`)}
    const cond1=isG && doesntAttacked('F','G')
    const cond2=!isG && doesntAttacked('C','D')

    const canRookMove=rook?.returnDefMovesOnly?.();
    const canRookMoveTo=(destField)=>{return canRookMove?.includes(`${destField}${acY}`)}
    const fieldOccupancy=isG?canRookMoveTo('F'):canRookMoveTo('D')

    if(horisontalMoveCondition===2 && verticalMoveCondition===0 && (cond1||cond2) && fieldOccupancy){
      rook?.swap?.(destField,acY)
    }
  }
  move(destX,destY,whiteTure){
    const [acX,acY]=this.actualField
    const copyOfOldFileds={
      from:boardStartState[acX][acY]?.copyOfInstance?.(),
      to:boardStartState[destX][destY]?.copyOfInstance?.()
    }

    if(this.goodTure(whiteTure) && this.canMove(destX,destY,whiteTure) && this.canStand({destX,destY})){
      this.castling(destX,destY,whiteTure);
      
      const didIncrement=boardStartState?.[destX]?.[destY]===''
      this.swap(destX,destY)

      if(Figure.isKingChequered(whiteTure).value){
        boardStartState[destX][destY]=copyOfOldFileds.to
        boardStartState[acX][acY]=copyOfOldFileds.from
      }
      else{
        didIncrement?Game.incrementMoves():Game.resetMoves()
        Game?.addToHistory?.(acX,acY,copyOfOldFileds);
        return{
          shortMove: boardStartState,
          newWhiteTure: !whiteTure,
          chequered:Figure.isKingChequered(whiteTure).value,
        }
      }
    }
    return{
      shortMove: boardStartState,
      newWhiteTure: whiteTure,
      chequered:Figure.isKingChequered(whiteTure).value,
    }
  }
  canMove(destX,destY,whiteTure){
    const movesWorking=[];
    Game.clearBoardFromUndefined();
    const [acX,acY]=this.actualField
    const destination={destX,destY}

    const horisontalMoveCondition=Math.abs(acX.charCodeAt()-destX.charCodeAt())
    const verticalMoveCondition=Math.abs(Number(acY)-Number(destY))

    const isG=destX==='G'
    const rookPosition=isG?'H':'A'
    const rook=boardStartState[rookPosition][acY]
    const destField=isG?'F':'D';

    const attacked=Figure.allFieldsAttackedBy(whiteTure?'black':'white',whiteTure)
    const doesntAttacked=(f1,f2)=>{return !attacked.includes(`E${acY}`) && !attacked.includes(`${f1}${acY}`) && !attacked.includes(`${f2}${acY}`)}

    const cond1=isG && doesntAttacked('F','G');
    const cond2=!isG && doesntAttacked('C','D');

    const canRookMove=rook?.returnDefMovesOnly?.();
    const canRookMoveTo=(destField)=>{return canRookMove?.includes(`${destField}${acY}`)}
    const fieldOccupancy=isG?canRookMoveTo('F'):canRookMoveTo('D');
    const figuresMoved=!rook?.getMoved?.() && !boardStartState[acX][acY]?.getMoved?.();

    for(let i=-1;i<=1;i++){
      for(let j=-1;j<=1;j++){
        const newX=String.fromCharCode(acX.charCodeAt()+i);
        const newY=Number(acY)+j;
        const destField=`${newX}${newY}`;
        Xo.includes(newX) && Yo.includes(newY) &&
        this?.canStand?.({destX:newX,destY:newY}) &&
        !attacked.includes(destField) &&
        movesWorking.push(destField);
      }
    }
    if(horisontalMoveCondition===2 && verticalMoveCondition===0 && acX==='E'){
      if((cond1||cond2) && fieldOccupancy && figuresMoved){
        return {canMove:true,moves:movesWorking}
      }
    }
    else if(horisontalMoveCondition<=1 && verticalMoveCondition<=1){
      return {canMove:this.canStand(destination),moves:movesWorking}
    }
    else{
      return {canMove:false,moves:movesWorking}
    }
  }
  attacking(whiteTure,destX,destY){
    const [acX,acY]=this.actualField
    const movesWorking=[];
    const NumbY=Number(destY);
    const letterCode=destX.charCodeAt();

    for(let i=letterCode-1;i<=letterCode+1;i++){
      if(Xo.includes(String.fromCharCode(i))){
        for(let j=NumbY-1;j<=NumbY+1;j++){
          if(Yo.includes(j)){
            movesWorking.push(`${String.fromCharCode(i)}${j}`);
          }
        }
      }
    }

    return {isKingAttacked:this.findKing(movesWorking,whiteTure),legalMoves:movesWorking,startField:[acX,acY]}
  }
  returnDefMovesOnly(whiteTure){
    const movesWorking=[];
    Game.clearBoardFromUndefined();
    const [acX,acY]=this.actualField
    const acColor=this.getColor()

    for(let i=-1;i<=1;i++){
      for(let j=-1;j<=1;j++){
        const newX=String.fromCharCode(acX.charCodeAt()+i);
        const newY=Number(acY)+j;
        const destField=`${newX}${newY}`;
        const attacked=!Figure.allFieldsAttackedBy(whiteTure?'black':'white',whiteTure).includes(destField)

        Xo.includes(newX) && Yo.includes(newY) && this?.canStand?.({destX:newX,destY:newY}) && attacked && movesWorking.push(destField);
      }
    }
    return movesWorking
  }
}

export default class T2 extends Component{render(){return(<></>)}}