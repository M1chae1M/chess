import acXType from "@/types/type/acXType";
import Queen from "./Queen";

export default class Rook extends Queen{
  // canMove(destX,destY,whiteTure){
  canMove(destX:acXType,destY:string,whiteTure:boolean){
    return this.linearMoves(destX,destY,whiteTure)
  }
  // attacking(whiteTure,destX,destY){
  attacking(whiteTure:boolean,destX:string,destY:number):{isKingAttacked:boolean,startField:string[],legalMoves:string[]}{
    const legalMoves=[];
    const [acX,acY]=this.actualField;
    this.linearAttacks(legalMoves,acX as acXType,acY,whiteTure)

    return {isKingAttacked:this.findKing(legalMoves,whiteTure),startField:[acX,acY],legalMoves}
  }
  returnDefMovesOnly=()=>this.returnLinearMovesOnly()
}