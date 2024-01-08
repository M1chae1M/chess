import Figure from "../Figure";
import Yo from '@/config/Yo.json'
import Xo from '@/config/Xo.json'
import boardStartState from "../../components/boardStartState";
import acXType from "@/types/type/acXType";
import destinationInterface from "@/types/interface/destinationInterface";

export default class Knight extends Figure{
  // canMove(destX,destY,whiteTure){
  canMove(destX:acXType,destY:string,whiteTure:boolean):{canMove:boolean, moves:string[]}{
    const moves=[]
    const destination={destX,destY}

    if(this.legalKnightMove(destination).can){
      const tryFields=[[1,2],[1,-2],[-1,2],[-1,-2],[-2,1],[-2,-1],[2,1],[2,-1]];
      tryFields?.map(([x1,x2])=>this.tryField(x1,x2,moves))

      return {canMove:this.canStand(destination),moves}
    }
    else{
      return {canMove:false,moves}
    }
  }
  attacking(whiteTure:boolean,destX:acXType,destY:number):{isKingAttacked:boolean,legalMoves:string[]}{
    const legalMoves=[]
    const [acX,acY]=this.actualField
    const newX=(change)=>String.fromCharCode(acX.charCodeAt(0)+change)
    const newY=(change)=>Number(acY)+change
    const knightMoves=[[1,2],[1,-2],[-1,2],[-1,-2],[-2,1],[-2,-1],[2,1],[2,-1]];
    knightMoves?.map(([x,y])=>Xo?.includes?.(newX(x)) && Yo?.includes?.(newY(y)) && legalMoves.push(`${newX(x)}${newY(y)}`))

    return {isKingAttacked:this.findKing(legalMoves,whiteTure),legalMoves}
  }
  tryField(x:number,y:number,movesWorking:string[]):void{
    const [acX,acY]=this.actualField;

    const newX=(change)=>String.fromCharCode(acX.charCodeAt(0)+change)
    const newY=(change)=>Number(acY)+change

    const Xxx=newX(x),Yyy=newY(y);

    Xo.includes(Xxx) && Yo.includes(Yyy) && boardStartState?.[acX]?.[acY]?.canStand?.({destX:Xxx,destY:Yyy}) && movesWorking.push(`${Xxx}${Yyy}`);
  }
  returnDefMovesOnly():string[]{
    const movesWorking=[]
    this.tryField(1,2,movesWorking)
    this.tryField(1,-2,movesWorking)

    this.tryField(-1,2,movesWorking)
    this.tryField(-1,-2,movesWorking)

    this.tryField(-2,1,movesWorking)
    this.tryField(-2,-1,movesWorking)

    this.tryField(2,1,movesWorking)
    this.tryField(2,-1,movesWorking)

    return movesWorking
  }
  legalKnightMove(destination:destinationInterface):{can:boolean}{
    const [acX,acY]=this.actualField;
    const {destX,destY}=destination
    const horisontalMoveCondition=Math.abs(acX.charCodeAt(0)-destX.charCodeAt(0));
    const condition=(h,w)=>horisontalMoveCondition===h && Math.abs(Number(destY)-Number(acY))===w
    const moreVerticalMove=condition(1,2)
    const moreHorisontalMove=condition(2,1)
  
    return {can:moreVerticalMove||moreHorisontalMove}
  }
}