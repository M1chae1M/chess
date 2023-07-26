import React,{Component} from "react";
import {figureIcons,boardStartState,Xo,Yo} from "../_document";
// import {figureIcons,Xo,Yo} from "../_document";
import _, {conforms} from 'lodash';
import {Game} from "./Game";

// const boardStartState=Game.returnGameBoard()

export class Figure{
  constructor(color,actualField,moved){
    this.color=color
    this.actualField=actualField
    this.moved=moved||false

    Array.from(['move','canMove','returnFigure','attacking','returnDefMovesOnly']).map(x=>{
      if(typeof this[x] !== 'function'){
        throw new Error(`Abstract method "${x}" must be implemented!`)
      }
    })
  }
  static defStategies(attackedColor,whiteTure){
    const allDefStategies=[]
    Xo.map(x=>{
      Yo.map(y=>{
        if(boardStartState[x][y]?.getColor?.()==='black'){
          boardStartState[x][y]?.returnDefMovesOnly?.().map(def=>{
            const [destX,destY]=def;
            const attackedColor=whiteTure?'white':'black';
            const attackingColor=whiteTure?'black':'white';

            const copy={
              from:boardStartState[x][y]?.copyOfInstance?.(),
              to:boardStartState[destX][destY]?.copyOfInstance?.()
            }
            boardStartState[x][y]?.swap?.(destX,destY)

            const allAttacked=Figure.allFieldsAttackedBy?.(attackingColor,whiteTure);
            const heIsChequered=!Figure.isThereKingColor?.(attackedColor,allAttacked);

            heIsChequered && allDefStategies.push({from:`${x}${y}`, to:def});

            boardStartState[x][y]=copy.from
            boardStartState[destX][destY]=copy.to
          })
        }
      })
    })

    return allDefStategies
  }
  static isThereKingColor(attackedColor,allAttacked){
    const KingIsThere=allAttacked?.map(m=>{
      const [x,y]=m
      if(boardStartState[x][y]?.getColor?.()===attackedColor &&
      boardStartState[x][y]?.getName?.()==='King'){
        return true
      }
    }).includes(true)
    return KingIsThere
  }
  static allFieldsAttackedBy(attackingColor,whiteTure){
    const allFieldsAttacked=[]
    Xo.map(x=>{
      Yo.map(y=>{
        boardStartState[x][y]?.getColor?.()===attackingColor && 
        allFieldsAttacked.push([...boardStartState[x][y]?.attacking?.(!whiteTure,x,y).legalMoves])
      })
    })
    return allFieldsAttacked.flat()
  }
  setMoved(newState){
    this.moved=newState
  }
  setActualField(newField){
    this.actualField=newField
  }
  copyOfInstance(){
    return _.cloneDeep(this);
  }
  returnFigure(){
    return figureIcons?.[this.color]?.[this.constructor.name]
  }
  getName(){
    return this.constructor.name
  }
  getColor(){
    return this.color
  }
  getMoved(){
    return this.moved
  }
  goodTure(whiteTure){
    if(whiteTure && this.getColor()==='white'){
      return true
    }
    else if(!whiteTure && this.getColor()==='black'){
      return true
    }
  }
  swap(destX,destY){
    const [acX,acY]=this.actualField

    this.actualField=`${destX}${destY}`
    this.moved=true
    boardStartState[destX][destY]=boardStartState[acX][acY]
    boardStartState[acX][acY]=''
  }
  move(destX,destY,whiteTure){
    Game.clearBoardFromUndefined()
    const [acX,acY]=this.actualField
    const copyOfOldFileds={
      from:boardStartState[acX][acY]?.copyOfInstance?.(),
      to:boardStartState[destX][destY]?.copyOfInstance?.()
    }

    if(this.goodTure(whiteTure) && this.canMove(destX,destY,whiteTure)?.canMove){
      const didIncrement=boardStartState?.[destX]?.[destY]===''
      this.swap(destX,destY)

      if(Figure.isKingChequered(whiteTure).value){
        boardStartState[destX][destY]=copyOfOldFileds.to
        boardStartState[acX][acY]=copyOfOldFileds.from
      }
      else{
        didIncrement?Game.incrementMoves():Game.resetMoves()
        return{
          shortMove:boardStartState,
          newWhiteTure:!whiteTure,
          chequered:Figure.isKingChequered(whiteTure).value,
        }
      }
    }
    return{
      shortMove:boardStartState,
      newWhiteTure:whiteTure,
      chequered:Figure.isKingChequered(whiteTure).value,
    }
  }
  canStand(destination){
    const {destX,destY}=destination
    return boardStartState[destX][destY]===''||boardStartState[destX][destY]?.getColor?.()!==this.color
  }
  withoutJump(destX,destY){
    return boardStartState[destX][destY]===''
  }
  // canMove(){

  // }
  // attacking(){
    
  // }
  static isKingChequered(whiteTure){
    const attackedColor=whiteTure?'white':'black'
    const attackingColor=whiteTure?'black':'white'
    const allAttacked=Figure.allFieldsAttackedBy?.(attackingColor,whiteTure)
    const heIsChequered=Figure.isThereKingColor?.(attackedColor,allAttacked)
    const allDefStategies=Figure.defStategies?.(attackedColor,whiteTure).filter(x=>x.to.length>0)

    allDefStategies.length<=0 && alert('Game over!');
    return {value:heIsChequered,isGameOver:allDefStategies.length>0?false:true}
  }
  findKing(fields,whiteTure){
    const results=fields?.map(z=>{
      const [x,y]=z
      const acColor=whiteTure?'black':'white'
      const baseFigure=boardStartState?.[x]?.[y]
      if(baseFigure?.getColor?.()===acColor && baseFigure?.getName?.()==='King') return true;
      else return false
    })
    return results.includes(true)
  }
}

export default class T3 extends Component{render(){return(<></>)}}