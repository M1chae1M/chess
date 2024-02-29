import acXType from "@/types/type/acXType";
import Queen from "./Queen";
import canMove_function_results_interface from "@/types/interface/figure/canMove_function_results_interface";

export default class Rook extends Queen{
  canMove(destX:acXType,destY:string,whiteTure:boolean):canMove_function_results_interface{
    return this.linearMoves(destX,destY,whiteTure)
  }
  attacking(whiteTure:boolean,destX:string,destY:number):{isKingAttacked:boolean,startField:string[],legalMoves:string[]}{
    const legalMoves=[];
    const [acX,acY]=this.actualField;
    this.linearAttacks(legalMoves,acX as acXType,acY,whiteTure)

    return {isKingAttacked:this.findKing(legalMoves,whiteTure),startField:[acX,acY],legalMoves}
  }
  returnDefMovesOnly=()=>this.returnLinearMovesOnly()
}