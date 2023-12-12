import {boardStartState} from "../pages/_document";
import Yo from '@/config/Yo.json'
import Xo from '@/config/Xo.json'
import {figureIcons} from "../pages/_document";
import _ from 'lodash';
import Game from "./Game";

export default class Figure{
  constructor(color,actualField,moved,name){
    this.color=color
    this.actualField=actualField
    this.moved=moved||false
    this.name=name

    Array.from(['move','canMove','getFigure','attacking','returnDefMovesOnly']).map(x=>{
      if(typeof this[x] !== 'function'){
        throw new Error(`Abstract method "${x}" must be implemented!`)
      }
    })
  }
  isKing=()=>this.name==='King'
  static allAttacked=(whiteTure)=>this.allFieldsAttackedBy(whiteTure?'black':'white',whiteTure)
  static defStategies(whiteTure){
    const allDefStategies=[]

    Game?.loop?.((x,y)=>{
      if(boardStartState[x][y]?.getColor?.()==='black'){
        boardStartState[x][y]?.returnDefMovesOnly?.().map(def=>{
          const [destX,destY]=def;
          const attackedColor=whiteTure?'white':'black';

          const copy={
            from:boardStartState[x][y]?.getInstance?.(),
            to:boardStartState[destX][destY]?.getInstance?.()
          }
          boardStartState[x][y]?.swap?.(destX,destY)

          const allAttacked=this.allAttacked(whiteTure);
          const heIsChequered=!Figure.isThereKingColor?.(attackedColor,allAttacked);

          heIsChequered && allDefStategies.push({from:`${x}${y}`,to:def});

          boardStartState[x][y]=copy.from
          boardStartState[destX][destY]=copy.to
        })
      }
    })

    return allDefStategies
  }
  static isThereKingColor(attackedColor,allAttacked){
    const KingIsThere=allAttacked?.map(m=>{
      const [x,y]=m
      if(boardStartState[x][y]?.getColor?.()===attackedColor && boardStartState[x][y]?.getName?.()==='King'){
        return true
      }
    }).includes(true)
    return KingIsThere
  }
  static allFieldsAttackedBy(attackingColor,whiteTure){
    const allFieldsAttacked=[]
    Game?.loop?.((x,y)=>{
      boardStartState[x][y]?.getColor?.()===attackingColor && 
      allFieldsAttacked.push([...boardStartState[x][y]?.attacking?.(!whiteTure,x,y).legalMoves])
    })

    return allFieldsAttacked.flat()
  }
  goodTure(whiteTure){
    if((whiteTure && this.getColor()==='white') || (!whiteTure && this.getColor()==='black')){
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
      from:boardStartState[acX][acY]?.getInstance?.(),
      to:boardStartState[destX][destY]?.getInstance?.()
    }

    if(this.goodTure(whiteTure) && this.canMove(destX,destY,whiteTure)?.canMove && Game?.isUpToDate?.()){
      const didIncrement=boardStartState?.[destX]?.[destY]===''
      this.swap(destX,destY)
      if(Figure.isKingChequered(whiteTure).value){
        boardStartState[destX][destY]=copyOfOldFileds.to
        boardStartState[acX][acY]=copyOfOldFileds.from
      }
      else{
        didIncrement?Game.incrementMoves():Game.resetMoves()
        Game?.addToHistory?.(acX,acY,copyOfOldFileds,destX,destY);

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
  static isKingChequered(whiteTure){
    const attackedColor=whiteTure?'white':'black'
    const allAttacked=this.allAttacked(whiteTure)
    const value=Figure.isThereKingColor?.(attackedColor,allAttacked)
    const allDefStategies=Figure.defStategies?.(whiteTure).filter(x=>x.to.length>0)
    const isGameOver=allDefStategies.length<=0
    isGameOver && alert('Game over!');
    return {value,isGameOver}
  }
  findKing(fields,whiteTure){
    const results=fields?.map(z=>{
      const [x,y]=z
      const acColor=whiteTure?'black':'white'
      const baseFigure=boardStartState?.[x]?.[y]
      return baseFigure?.getColor?.()===acColor && baseFigure?.getName?.()==='King'
    })
    return results.includes(true)
  }
  canStand(destination){
    const {destX,destY}=destination
    return boardStartState[destX][destY]===''||boardStartState[destX][destY]?.getColor?.()!==this.color
  }
  setMoved(newState){
    this.moved=newState
  }
  setActualField(newField){
    this.actualField=newField
  }
  getInstance(){
    return _.cloneDeep(this);
  }
  // getMoved(){
  //   return this.moved
  // }
  withoutJump=(destX,destY)=>boardStartState[destX][destY]===''
  // getInstance=()=>_.cloneDeep(this);
  getFigure=()=>figureIcons?.[this?.color]?.[this?.name]
  getName=()=>this.name
  getColor=()=>this.color
  getMoved=()=>this.moved
}