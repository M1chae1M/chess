import canMove_function_results_interface from "@/types/interface/figure/canMove_function_results_interface";
import Queen from "./Queen";
import acXType from "@/types/type/acXType";

export default class Bishop extends Queen{
  canMove(destX:acXType,destY:string,whiteTure:boolean):canMove_function_results_interface{
    const [acX,acY]=this.actualField
    const moves=[];
    this.crossMoves(moves,acX as acXType,acY)
    const canMove=moves.includes(`${destX}${destY}`) && this.canStand({destX,destY})
    return {canMove,moves}
  }
  attacking(whiteTure:boolean,destX:string,destY:number):({isKingAttacked:boolean,legalMoves:string[],startField:string[]}){
    const [acX,acY]=this.actualField
    const legalMoves=[];
    this.crossAttacks(legalMoves,destX,destY)
    return {isKingAttacked:this.findKing(legalMoves,whiteTure),legalMoves,startField:[acX,acY]}
  }
  returnDefMovesOnly=this.returnCrossMovesOnly
}