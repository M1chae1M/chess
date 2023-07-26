import React,{Component} from "react";
import {Figure} from "../Figure";
import {Xo,Yo,boardStartState} from "@/pages/_document";

export class Queen extends Figure{
  crossMoves(movesWorking,acX,acY){
    const crossMove=(leftOrRight,topOrBot)=>{
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

    crossMove('left','top')
    crossMove('left','bot')
    crossMove('right','top')
    crossMove('right','bot')
  }
  canMove(destX,destY,whiteTure){
    const [acX,acY]=this.actualField
    const movesWorking=[];
    this.crossMoves(movesWorking,acX,acY)
    movesWorking.push(this.linearMoves(movesWorking,acX,acY).moves)
    
    return {canMove:movesWorking.flat().includes(`${destX}${destY}`) && this.canStand({destX,destY}), moves:movesWorking}
  }
  crossAttacks(movesWorking,destX,destY){
    const crossAttack=(destX,destY,vectorY,vectorX)=>{
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

    crossAttack(destX,destY,'top','right')
    crossAttack(destX,destY,'top','left')
    crossAttack(destX,destY,'bot','right')
    crossAttack(destX,destY,'bot','left')

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
  linearMoves(destX,destY,whiteTure){
    const [acX,acY]=this.actualField
    const destination={destX,destY}
    const movesWorking=[]

    const horisontal=(vector)=>{
      const isLeft=vector==='left'
      const Xcode=acX.charCodeAt()
  
      const start=isLeft?Xcode-1:Xcode+1
      const increment=isLeft?-1:1;
  
      const limit=isLeft?'@'.charCodeAt():'I'.charCodeAt()
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
    const vertical=(vector)=>{
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
    horisontal('left')
    horisontal('right')
    vertical('bot')
    vertical('top')

    if(movesWorking.includes(`${destX}${destY}`) && boardStartState[acX][acY]?.canStand?.({destX,destY})){
      return {canMove:true,moves:movesWorking}
    }
    return {canMove:false,moves:movesWorking}
  }
  linearAttacks(movesWorking,acX,acY,whiteTure){
  const horisontal=(vector)=>{
    const isLeft=vector==='left'
    const Xcode=acX.charCodeAt()

    const start=isLeft?Xcode-1:Xcode+1
    const increment=isLeft?-1:1;

    const limit=isLeft?'@'.charCodeAt():'I'.charCodeAt()
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
  const vertical=(vector)=>{
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
  horisontal('left')
  horisontal('right')
  vertical('bot')
  vertical('top')
  }
  returnDefMovesOnly(){
    const movesWorking=[]
    movesWorking.push(this.returnLinearMovesOnly())
    movesWorking.push(this.returnCrossMovesOnly())
    
    return movesWorking.flat()
  }
  returnLinearMovesOnly(){
    const [acX,acY]=this.actualField
    const acColor=this.getColor()
    const movesWorking=[]

    const horisontal=(vector)=>{
      const isLeft=vector==='left'
      const Xcode=acX.charCodeAt()
  
      const start=isLeft?Xcode-1:Xcode+1
      const increment=isLeft?-1:1;
  
      const limit=isLeft?'@'.charCodeAt():'I'.charCodeAt()
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
    const vertical=(vector)=>{
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
    horisontal('left')
    horisontal('right')
    vertical('bot')
    vertical('top')

    return movesWorking
  }
  returnCrossMovesOnly(){
    const movesWorking=[]
    const [acX,acY]=this.actualField
    const acColor=this.getColor()

    const crossMove=(leftOrRight,topOrBot)=>{
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

    crossMove('left','top')
    crossMove('left','bot')
    crossMove('right','top')
    crossMove('right','bot')

    return movesWorking
  }
}

export default class T2 extends Component{render(){return(<></>)}}