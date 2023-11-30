import React,{Component} from "react";
import {Figure} from "../Figure";
import Yo from '@/config/Yo.json'
import {boardStartState} from "@/pages/_document";
import Xo from '@/config/Xo.json'

export class Queen extends Figure{
  crossMove=(leftOrRight,topOrBot,movesWorking,acX,acY)=>{
    const isLeft=leftOrRight==='left'
    const isTop=topOrBot==='top'
    let i=acX.charCodeAt()+(isLeft?-1:1);
    while((isLeft&&i>='A'.charCodeAt())||(!isLeft&&i<='H'.charCodeAt())){
      const againLetter=String.fromCharCode(i);
      const numY=Number(acY);
      const acXcode=i-acX.charCodeAt();
      const numPlus=numY+acXcode;
      const numMinus=numY-acXcode;
      const changedY=isLeft?(isTop?numMinus:numPlus):(isTop?numPlus:numMinus)
  
      if(Xo.includes(againLetter)&&Yo.includes(changedY)){
        movesWorking.push(`${againLetter}${changedY}`);
        if(boardStartState[againLetter][changedY]?.getName?.()){
          return false
        }
      }
      i+=leftOrRight==='left'?-1:1;
    }
  }
  crossMoves(movesWorking,acX,acY){
    this.crossMove('left','top',movesWorking,acX,acY)
    this.crossMove('left','bot',movesWorking,acX,acY)
    this.crossMove('right','top',movesWorking,acX,acY)
    this.crossMove('right','bot',movesWorking,acX,acY)
  }
  canMove(destX,destY,whiteTure){
    const [acX,acY]=this.actualField
    const movesWorking=[];
    this.crossMoves(movesWorking,acX,acY)
    movesWorking.push(this.linearMoves(movesWorking,acX,acY).moves)
    
    return {canMove:movesWorking.flat().includes(`${destX}${destY}`) && this.canStand({destX,destY}), moves:movesWorking}
  }
  crossAttack=(destX,destY,vectorY,vectorX,movesWorking)=>{
    let i=vectorY==='top'?destY+1:destY-1;
    const limit=vectorY==='top'?9:0;
    const increment=vectorY==='top'?1:-1;
    const letter=destX.charCodeAt();
    const vectorXcond=vectorX==='right';
    const vectorYcond=vectorY==='top';

    while(i!==limit){
      const newX=String.fromCharCode(letter+((-i+destY)*(vectorYcond?(vectorXcond?1:-1):(vectorXcond?-1:1))));

      if(Xo.includes(newX) && Yo.includes(i)){
        movesWorking.push(`${newX}${i}`)
        if(boardStartState[newX][i]?.getName?.()){
          break;
        }
      }
      i+=increment;
    }
  }
  crossAttacks(movesWorking,destX,destY){
    this.crossAttack(destX,destY,'top','right',movesWorking)
    this.crossAttack(destX,destY,'top','left',movesWorking)
    this.crossAttack(destX,destY,'bot','right',movesWorking)
    this.crossAttack(destX,destY,'bot','left',movesWorking)

    if(movesWorking.includes(`${destX}${destY}`)){
      return {canMove:true,moves:movesWorking}
    }
    return {canMove:false,moves:movesWorking}
  }
  attacking(whiteTure,destX,destY){
    const [acX,acY]=this.actualField
    const movesWorking=[];
    this.crossAttacks(movesWorking,destX,destY)
    this.linearAttacks(movesWorking,destX,destY,whiteTure)
    return {isKingAttacked:this.findKing(movesWorking,whiteTure),legalMoves:movesWorking,startField:[acX,acY]}
  }
  verticalMoves=(vector,movesWorking,acX,acY)=>{
    const isTop=vector==='top';
    const Ynum=Number(acY);
    const start=isTop?(Ynum+1):(Ynum-1)
    const increment=isTop?1:-1;

    const limit=isTop?9:0;
    let i=start;
    while(i!==limit){
      const base=boardStartState[acX]
      movesWorking.push(`${acX}${i}`)
      if(base[i]?.getName?.()){
        break;
      }
      i+=increment;
    }
  }





  horisontalConsts(vector,acX){
    const isLeft=vector==='left'
    const Xcode=acX.charCodeAt()

    const start=isLeft?Xcode-1:Xcode+1
    const increment=isLeft?-1:1;

    const limit=isLeft?'@'.charCodeAt():'I'.charCodeAt()
    return {start,increment,limit}
  }

  horisontalMoves=(vector,movesWorking,acX,acY)=>{
    const {start,increment,limit}=this.horisontalConsts(vector,acX)
    let i=start;
        while(i!==limit){
          const fromCode=String.fromCharCode(i)
          movesWorking.push(`${fromCode}${acY}`)
          if(boardStartState[fromCode][acY]?.getName?.()){
            break;
          }
          i+=increment;
        }
  }
  horisontalLinearMovesOnly=(vector,acX,acY,acColor,movesWorking)=>{
    const {start,increment,limit}=this.horisontalConsts(vector,acX)
    let i=start;
      while(i!==limit){
        const fromCode=String.fromCharCode(i)
        const base=boardStartState[fromCode][acY]

        base?.getColor?.()!==acColor && movesWorking.push(`${fromCode}${acY}`);
        
        if(base?.getName?.()){
          break;
        }
        i+=increment;
      }
  }
  horisontalAttacks=(vector,movesWorking,acX,acY,whiteTure)=>{
    const {start,increment,limit}=this.horisontalConsts(vector,acX)
    let i=start;
    const colorCondition=boardStartState[acX][acY]?.goodTure?.(whiteTure)
    while(i!==limit){
      if(colorCondition){
        const fromCode=String.fromCharCode(i)
        movesWorking.push(`${fromCode}${acY}`)
        const base=boardStartState[fromCode][acY]
        if(base?.getName?.() && !(base?.getName?.()==='King' && base?.goodTure(!whiteTure))){
          break;
        }
      }
      i+=increment;
    }
  }


  verticalLinearMovesOnly=(vector,acX,acY,acColor,movesWorking)=>{
    const isTop=vector==='top';
    const Ynum=Number(acY);
    const start=isTop?(Ynum+1):(Ynum-1)
    const increment=isTop?1:-1;

    const limit=isTop?9:0;
    let i=start;
    while(i!==limit){
      const base=boardStartState[acX][i]
      base?.getColor?.()!==acColor && movesWorking.push(`${acX}${i}`);
      if(base?.getName?.()){
        break;
      }
      i+=increment;
    }
  }
  returnLinearMovesOnly(){
    const [acX,acY]=this.actualField
    const acColor=this.getColor()
    const movesWorking=[]

    this.horisontalLinearMovesOnly('left',acX,acY,acColor,movesWorking)
    this.horisontalLinearMovesOnly('right',acX,acY,acColor,movesWorking)
    this.verticalLinearMovesOnly('bot',acX,acY,acColor,movesWorking)
    this.verticalLinearMovesOnly('top',acX,acY,acColor,movesWorking)

    return movesWorking
  }
  linearMoves(destX,destY,whiteTure){
    const [acX,acY]=this.actualField
    const movesWorking=[]

    this.horisontalMoves('left',movesWorking,acX,acY)
    this.horisontalMoves('right',movesWorking,acX,acY)
    this.verticalMoves('bot',movesWorking,acX,acY)
    this.verticalMoves('top',movesWorking,acX,acY)

    if(movesWorking.includes(`${destX}${destY}`) && boardStartState[acX][acY]?.canStand?.({destX,destY})){
      return {canMove:true,moves:movesWorking}
    }
    return {canMove:false,moves:movesWorking}
  }
  verticalAtacks=(vector,movesWorking,acX,acY,whiteTure)=>{
    const isTop=vector==='top';
    const Ynum=Number(acY);
    const start=isTop?(Ynum+1):(Ynum-1)
    const increment=isTop?1:-1;

    const limit=isTop?9:0;
    let i=start;
    const base=boardStartState?.[acX]
    const colorCondition=base?.[acY]?.goodTure?.(whiteTure)
    while(i!==limit){
      if(colorCondition){
        movesWorking.push(`${acX}${i}`)
        if(base[i]?.getName?.() &&
        !(base[i]?.getName?.()==='King' &&
        base[i]?.goodTure?.(!whiteTure))){
          break;
        }
      }
      i+=increment;
    }
  }
  linearAttacks(movesWorking,acX,acY,whiteTure){
    this.horisontalAttacks('left',movesWorking,acX,acY,whiteTure)
    this.horisontalAttacks('right',movesWorking,acX,acY,whiteTure)
    this.verticalAtacks('bot',movesWorking,acX,acY,whiteTure)
    this.verticalAtacks('top',movesWorking,acX,acY,whiteTure)
  }
  returnDefMovesOnly(){
    const movesWorking=[]
    movesWorking.push(this.returnLinearMovesOnly())
    movesWorking.push(this.returnCrossMovesOnly())
    
    return movesWorking.flat()
  }
  crossMoveForCrossMovesOnly=(leftOrRight,topOrBot,movesWorking,acColor,acX,acY)=>{
    const isLeft=leftOrRight==='left'
    const isTop=topOrBot==='top'
    let i=acX.charCodeAt()+(isLeft?-1:1);
    while((isLeft&&i>='A'.charCodeAt())||(!isLeft&&i<='H'.charCodeAt())){
      const againLetter=String.fromCharCode(i);
      const numY=Number(acY);
      const acXcode=i-acX.charCodeAt();
      const numPlus=numY+acXcode;
      const numMinus=numY-acXcode;
      const changedY=isLeft?(isTop?numMinus:numPlus):(isTop?numPlus:numMinus)
  
      if(Xo.includes(againLetter)&&Yo.includes(changedY)){
        const base=boardStartState[againLetter][changedY]
        base?.getColor?.()!==acColor && movesWorking.push(`${againLetter}${changedY}`);

        if(base?.getName?.()){
          return false
        }
      }
      i+=leftOrRight==='left'?-1:1;
    }
  }
  returnCrossMovesOnly(){
    const movesWorking=[]
    const [acX,acY]=this.actualField
    const acColor=this.getColor()

    this.crossMoveForCrossMovesOnly('left','top',movesWorking,acColor,acX,acY)
    this.crossMoveForCrossMovesOnly('left','bot',movesWorking,acColor,acX,acY)
    this.crossMoveForCrossMovesOnly('right','top',movesWorking,acColor,acX,acY)
    this.crossMoveForCrossMovesOnly('right','bot',movesWorking,acColor,acX,acY)
    
    return movesWorking
  }
}

export default class T2 extends Component{render(){return(<></>)}}