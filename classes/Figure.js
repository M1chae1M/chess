import {boardStartState} from "../components/boardStartState";
import figureIcons from "../components/figureIcons";
import _ from 'lodash';
import Game from "./Game";
import abstractFunctions from '@/config/abstractFunctions.json'

export default class Figure{
  constructor(color,actualField,moved,name){
    this.color=color
    this.actualField=actualField
    this.moved=moved||false
    this.name=name

    abstractFunctions?.map(x=>{
      if(typeof this[x] !== 'function'){
        throw new Error(`Abstract method "${x}" must be implemented!`)
      }
    })
  }
  isKing=()=>this.name==='King'
  static allAttacked=(whiteTure)=>this.allFieldsAttackedBy(whiteTure?'black':'white',whiteTure)
  static defStrategies(whiteTure){
    const allDefStrategies=[]
    const attackedColor=whiteTure?'white':'black';

    Game?.loop?.((x,y)=>{
      const base=boardStartState[x][y];
      base?.getColor?.()===attackedColor &&
      base?.returnDefMovesOnly?.()?.map(def=>{
        const [destX,destY]=def;
        const copy={
          from:boardStartState[x][y]?.getInstance?.(),
          to:boardStartState[destX][destY]?.getInstance?.()
        }
        boardStartState[x][y]?.swap?.(destX,destY)

        const allAttacked=this.allAttacked(whiteTure);
        const heIsChequered=!Figure.isThereKingColor?.(attackedColor,allAttacked);

        heIsChequered && allDefStrategies.push({from:`${x}${y}`,to:def});

        boardStartState[x][y]=copy.from
        boardStartState[destX][destY]=copy.to
      })
    })

    return allDefStrategies
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
        didIncrement?Game.incrementMoves():Game.resetMoves();
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
    const attackedColor=whiteTure?'white':'black';
    const allAttacked=this.allAttacked(whiteTure);
    const value=Figure.isThereKingColor?.(attackedColor,allAttacked);
    const allDefStrategies=Figure.defStrategies?.(whiteTure).filter(x=>x.to.length>0);
    const isGameOver=allDefStrategies.length<=0;

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
  withoutJump=(destX,destY)=>boardStartState[destX][destY]===''
  getFigure=()=>figureIcons?.[this?.color]?.[this?.name]
  getName=()=>this.name
  getColor=()=>this.color
  getMoved=()=>this.moved
  getInstance(){
    return _.cloneDeep(this);
  }
}