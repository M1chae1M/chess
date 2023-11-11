import React,{Component} from "react";
// import {boardStartState,Xo,Yo} from "../_document";
import {boardStartState,Xo,Yo} from "../_document";
import {figureIcons} from "../_document";
import _ from 'lodash';
import {Game} from "./Game";

export class Figure{
  constructor(color,actualField,moved, name){
    this.color=color
    this.actualField=actualField
    this.moved=moved||false
    this.name=name

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
          // const copy2=_.cloneDeep(Game?.returnGameBoard())

        // if(copy2[x][y]?.getColor?.()==='black'){
          // copy2[x][y]?.returnDefMovesOnly?.().map(def=>{

            const [destX,destY]=def;
            const attackedColor=whiteTure?'white':'black';
            const attackingColor=whiteTure?'black':'white';

            const copy={
              from:boardStartState[x][y]?.copyOfInstance?.(),
              to:boardStartState[destX][destY]?.copyOfInstance?.()
              // from:copy2[x][y]?.copyOfInstance?.(),
              // to:copy2[destX][destY]?.copyOfInstance?.()
            }
            boardStartState[x][y]?.swap?.(destX,destY)
            // copy2[x][y]?.swap?.(destX,destY)

            const allAttacked=Figure.allFieldsAttackedBy?.(attackingColor,whiteTure);
            const heIsChequered=!Figure.isThereKingColor?.(attackedColor,allAttacked);

            heIsChequered && allDefStategies.push({from:`${x}${y}`, to:def});

            boardStartState[x][y]=copy.from
            boardStartState[destX][destY]=copy.to
            // copy2[x][y]=copy2.from
            // copy2[destX][destY]=copy2.to
          })
        }
        // Game?.test?.(
        //   _.cloneDeep(copy2)
        // )
      })
    })

    return allDefStategies
  }
  static isThereKingColor(attackedColor,allAttacked){
    const KingIsThere=allAttacked?.map(m=>{
      const [x,y]=m
      const copy=_.cloneDeep(Game?.returnGameBoard())
      if(boardStartState[x][y]?.getColor?.()===attackedColor &&
      boardStartState[x][y]?.getName?.()==='King'){
      // if(copy[x][y]?.getColor?.()===attackedColor &&
      // copy[x][y]?.getName?.()==='King'){
        return true
      }

      // Game?.test?.(
      //   _.cloneDeep(copy)
      // )
    }).includes(true)
    return KingIsThere
  }
  static allFieldsAttackedBy(attackingColor,whiteTure){
    const allFieldsAttacked=[]
    const copy=_.cloneDeep(Game?.returnGameBoard())
    Xo.map(x=>{
      Yo.map(y=>{
        boardStartState[x][y]?.getColor?.()===attackingColor && 
        // copy[x][y]?.getColor?.()===attackingColor && 
        allFieldsAttacked.push([...boardStartState[x][y]?.attacking?.(!whiteTure,x,y).legalMoves])
        // allFieldsAttacked.push([...copy[x][y]?.attacking?.(!whiteTure,x,y).legalMoves])
      })
    })

    // Game?.test?.(
    //   _.cloneDeep(copy)
    // )
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
    return figureIcons?.[this?.color]?.[this?.name]
  }
  getName(){
    return this.name
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
    // const copy=_.cloneDeep(Game?.returnGameBoard())
    boardStartState[destX][destY]=boardStartState[acX][acY]
    // copy[destX][destY]=copy[acX][acY]
    boardStartState[acX][acY]=''
    // copy[acX][acY]=''

    // Game?.test?.(
    //   _.cloneDeep(copy)
    // )
  }
  move(destX,destY,whiteTure){
    Game.clearBoardFromUndefined()
    const [acX,acY]=this.actualField

    const copy=_.cloneDeep(Game?.returnGameBoard())

    const copyOfOldFileds={
      from:boardStartState[acX][acY]?.copyOfInstance?.(),
      to:boardStartState[destX][destY]?.copyOfInstance?.()
      // from:copy[acX][acY]?.copyOfInstance?.(),
      // to:copy[destX][destY]?.copyOfInstance?.()
    }

    if(this.goodTure(whiteTure) && this.canMove(destX,destY,whiteTure)?.canMove){
      const didIncrement=boardStartState?.[destX]?.[destY]===''
      // const didIncrement=copy?.[destX]?.[destY]===''
      this.swap(destX,destY)

      // console.log(
      //   copyOfOldFileds.from[acX][acY]
      // )

      if(Figure.isKingChequered(whiteTure).value){
        boardStartState[destX][destY]=copyOfOldFileds.to
        boardStartState[acX][acY]=copyOfOldFileds.from
        // copy[destX][destY]=copyOfOldFileds.to
        // copy[acX][acY]=copyOfOldFileds.from
      }
      else{
        didIncrement?Game.incrementMoves():Game.resetMoves()


        Game?.addToHistory?.(acX,acY,copyOfOldFileds);

        return{
          shortMove:boardStartState,
          // shortMove:copy,
          newWhiteTure:!whiteTure,
          chequered:Figure.isKingChequered(whiteTure).value,
        }
      }
    }
    // Game?.test?.(
    //   _.cloneDeep(copy)
    // )
    return{
      shortMove:boardStartState,
      // shortMove:copy,
      newWhiteTure:whiteTure,
      chequered:Figure.isKingChequered(whiteTure).value,
    }
  }
  canStand(destination){
    const copy=_.cloneDeep(Game?.returnGameBoard())
    const {destX,destY}=destination

    // Game?.test?.(
    //   _.cloneDeep(copy)
    // )
    return boardStartState[destX][destY]===''||boardStartState[destX][destY]?.getColor?.()!==this.color
    // return copy[destX][destY]===''||copy[destX][destY]?.getColor?.()!==this.color
  }
  withoutJump(destX,destY){
    // const copy=_.cloneDeep(Game?.returnGameBoard())
    // Game?.test?.(
    //   _.cloneDeep(copy)
    // )
    return boardStartState[destX][destY]===''
    // return copy[destX][destY]===''
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
    const copy=_.cloneDeep(Game?.returnGameBoard())
    const results=fields?.map(z=>{
      const [x,y]=z
      const acColor=whiteTure?'black':'white'
      const baseFigure=boardStartState?.[x]?.[y]
      // const baseFigure=copy?.[x]?.[y]
      if(baseFigure?.getColor?.()===acColor && baseFigure?.getName?.()==='King') return true;
      else return false
    })
    // Game?.test?.(
    //   _.cloneDeep(copy)
    // )
    return results.includes(true)
  }
}

export default class T3 extends Component{render(){return(<></>)}}