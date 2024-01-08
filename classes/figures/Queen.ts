import Figure from "../Figure";
import Yo from '@/config/Yo.json'
import boardStartState from "../../components/boardStartState";
import Xo from '@/config/Xo.json'
import colorType from "@/types/type/colorType";
import acXType from "@/types/type/acXType";
import horisontalType from "@/types/type/horisontalType";
import verticalType from "@/types/type/verticalType";

export default class Queen extends Figure{
  crossMove=(leftOrRight:horisontalType,topOrBot:verticalType,movesWorking:string[],acX:acXType,acY:string)=>{
    const isLeft=leftOrRight==='left'
    const isTop=topOrBot==='top'
    let i=acX.charCodeAt(0)+(isLeft?-1:1);
    while((isLeft&&i>='A'.charCodeAt(0))||(!isLeft&&i<='H'.charCodeAt(0))){
      const againLetter=String.fromCharCode(i);
      const numY=Number(acY);
      const acXcode=i-acX.charCodeAt(0);
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
  crossMoves(movesWorking:string[],acX:acXType,acY:string):void{
    this.crossMove('left','top',movesWorking,acX,acY)
    this.crossMove('left','bot',movesWorking,acX,acY)
    this.crossMove('right','top',movesWorking,acX,acY)
    this.crossMove('right','bot',movesWorking,acX,acY)
  }
  // canMove(destX,destY,whiteTure){
    canMove(destX:acXType,destY:string,whiteTure:boolean):({canMove:boolean,moves:string[]}){
    const [acX,acY]=this.actualField
    const movesWorking=[];
    this.crossMoves(movesWorking,acX as acXType,acY)
    // movesWorking.push(this.linearMoves(movesWorking,acX,acY).moves)
    movesWorking.push(this.linearMoves(acX as acXType,acY,whiteTure).moves)
    
    return {canMove:movesWorking.flat().includes(`${destX}${destY}`) && this.canStand({destX,destY}), moves:movesWorking}
  }
  // crossAttack=(destX,destY,vectorY,vectorX,movesWorking)=>{
  crossAttack=(destX:string,destY:number,vectorY:verticalType,vectorX:horisontalType,movesWorking:string[]):void=>{
    let i=vectorY==='top'?destY+1:destY-1;
    const limit=vectorY==='top'?9:0;
    const increment=vectorY==='top'?1:-1;
    const letter=destX.charCodeAt(0);
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
  crossAttacks(
    movesWorking   // tablica, ale czy ona jest niepusta czasem?
    ,destX:string,destY:number){
    this.crossAttack(destX,destY,'top','right',movesWorking)
    this.crossAttack(destX,destY,'top','left',movesWorking)
    this.crossAttack(destX,destY,'bot','right',movesWorking)
    this.crossAttack(destX,destY,'bot','left',movesWorking)

    if(movesWorking.includes(`${destX}${destY}`)){
      return {canMove:true,moves:movesWorking}
    }
    return {canMove:false,moves:movesWorking}
  }
  attacking(whiteTure:boolean,destX:acXType,destY:number):{isKingAttacked:boolean, legalMoves:string[], startField:string[]}{
    const [acX,acY]=this.actualField
    const movesWorking=[];
    this.crossAttacks(movesWorking,destX,destY)
    this.linearAttacks(movesWorking,destX,destY,whiteTure)
    return {isKingAttacked:this.findKing(movesWorking,whiteTure),legalMoves:movesWorking,startField:[acX,acY]}
  }
  horisontalConsts(vector:horisontalType,acX:acXType):{start:number,increment:number,limit:number}{
    const isLeft=vector==='left'
    const Xcode=acX?.charCodeAt?.(0)

    const start=isLeft?Xcode-1:Xcode+1
    const increment=isLeft?-1:1;

    const limit=isLeft?'@'.charCodeAt(0):'I'.charCodeAt(0)
    return {start,increment,limit}
  }
  horisontalHelper(vector:horisontalType,movesWorking,actualField,compareColors,acColor?:colorType){
    const [acX,acY]=actualField
    const {start,increment,limit}=this.horisontalConsts(vector,acX)
    let i=start;
    while(i!==limit){
      const fromCode=String.fromCharCode(i)
      const base=boardStartState?.[fromCode]?.[acY];
      compareColors?
      base?.getColor?.()!==acColor && movesWorking.push(`${fromCode}${acY}`):
      movesWorking.push(`${fromCode}${acY}`);

      if(base?.getName?.()){
        break;
      }
      i+=increment;
    }
  }
  horisontalAttacks=(vector:horisontalType,movesWorking,acX,acY,whiteTure)=>{
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
  verticalConsts(vector:verticalType,acY){
    const isTop=vector==='top';
    const Ynum=Number(acY);
    const start=isTop?(Ynum+1):(Ynum-1)
    const increment=isTop?1:-1;

    const limit=isTop?9:0;
    return{isTop,Ynum,start,increment,limit}
  }
  verticalHelper(vector:verticalType,movesWorking,actualField,compareColors,acColor?:colorType){
    const [acX,acY]=actualField
    const {start,increment,limit}=this.verticalConsts(vector,acY)
    let i=start;
    while(i!==limit){
      const base=boardStartState[acX][i];

      compareColors?
      base?.getColor?.()!==acColor && movesWorking.push(`${acX}${i}`):
      movesWorking.push(`${acX}${i}`);
      if(base?.getName?.()){
        break;
      }
      i+=increment;
    }
  }
  returnLinearMovesOnly():string[]{
    const acColor=this.getColor()
    const movesWorking=[]

    this.horisontalHelper('left',movesWorking,this.actualField,true,acColor)
    this.horisontalHelper('right',movesWorking,this.actualField,true,acColor)

    this.verticalHelper('bot',movesWorking,this.actualField,true,acColor)
    this.verticalHelper('top',movesWorking,this.actualField,true,acColor)

    return movesWorking
  }
  verticalAtacks=(vector,movesWorking,acX,acY,whiteTure)=>{
    const {start,increment,limit}=this.verticalConsts(vector,acY)
    let i=start;
    const base=boardStartState?.[acX]
    const colorCondition=base?.[acY]?.goodTure?.(whiteTure)
    while(i!==limit){
      if(colorCondition){
        movesWorking.push(`${acX}${i}`)
        if(base[i]?.getName?.() && !(base[i]?.getName?.()==='King' && base[i]?.goodTure?.(!whiteTure))){
          break;
        }
      }
      i+=increment;
    }
  }
  // linearMoves(destX,destY,whiteTure){
  linearMoves(destX:acXType,destY:string,whiteTure:boolean):{canMove:boolean,moves:string[]}{
    const [acX,acY]=this.actualField
    const moves=[]

    this.horisontalHelper('left',moves,this.actualField,false)
    this.horisontalHelper('right',moves,this.actualField,false)

    this.verticalHelper('bot',moves,this.actualField,false)
    this.verticalHelper('top',moves,this.actualField,false)

    if(moves.includes(`${destX}${destY}`) && boardStartState[acX][acY]?.canStand?.({destX,destY})){
      return {canMove:true,moves}
    }
    return {canMove:false,moves}
  }
  // linearAttacks(movesWorking,destX,destY,whiteTure){
  linearAttacks(movesWorking:string[],destX:acXType,destY:string|number,whiteTure:boolean):void{
    this.horisontalAttacks('left',movesWorking,destX,destY,whiteTure)
    this.horisontalAttacks('right',movesWorking,destX,destY,whiteTure)
    this.verticalAtacks('bot',movesWorking,destX,destY,whiteTure)
    this.verticalAtacks('top',movesWorking,destX,destY,whiteTure)
  }
  returnDefMovesOnly(){
    const movesWorking=[]
    movesWorking.push([...this.returnLinearMovesOnly(),...this.returnCrossMovesOnly()])

    return movesWorking.flat()
  }
  crossMoveForCrossMovesOnly=(leftOrRight:horisontalType,topOrBot:verticalType,movesWorking,actualField)=>{
    const acColor=this.getColor()
    const [acX,acY]=actualField
    const isLeft=leftOrRight==='left'
    const isTop=topOrBot==='top'
    let i=acX?.charCodeAt?.()+(isLeft?-1:1);

    while((isLeft&&i>='A'.charCodeAt(0))||(!isLeft&&i<='H'.charCodeAt(0))){
      const againLetter=String.fromCharCode(i);
      const numY=Number(acY);
      const acXcode=i-acX.charCodeAt();
      const numPlus=numY+acXcode;
      const numMinus=numY-acXcode;
      const changedY=isLeft?(isTop?numMinus:numPlus):(isTop?numPlus:numMinus)

      if(Xo.includes(againLetter) && Yo.includes(changedY)){
        const base=boardStartState[againLetter][changedY]
        base?.getColor?.()!==acColor && movesWorking.push(`${againLetter}${changedY}`);

        if(base?.getName?.()){
          return false
        }
      }
      i+=leftOrRight==='left'?-1:1;
    }
  }
  returnCrossMovesOnly():string[]{
    const movesWorking=[]

    this.crossMoveForCrossMovesOnly('left','top',movesWorking,this.actualField)
    this.crossMoveForCrossMovesOnly('left','bot',movesWorking,this.actualField)
    this.crossMoveForCrossMovesOnly('right','top',movesWorking,this.actualField)
    this.crossMoveForCrossMovesOnly('right','bot',movesWorking,this.actualField)
    
    return movesWorking
  }
}