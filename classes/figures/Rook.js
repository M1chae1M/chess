import Queen from "./Queen";

export default class Rook extends Queen{
  canMove(destX,destY,whiteTure){
    return this.linearMoves(destX,destY,whiteTure)
  }
  attacking(whiteTure,destX,destY){
    const legalMoves=[];
    const [acX,acY]=this.actualField;
    this.linearAttacks(legalMoves,acX,acY,whiteTure)
    return {isKingAttacked:this.findKing(legalMoves,whiteTure),startField:[acX,acY],legalMoves}
  }
  returnDefMovesOnly=()=>this.returnLinearMovesOnly().flat()
}