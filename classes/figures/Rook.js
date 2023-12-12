import Queen from "./Queen";

export default class Rook extends Queen{
  canMove(destX,destY,whiteTure){
    return this.linearMoves(destX,destY,whiteTure)
  }
  attacking(whiteTure,destX,destY){
    const movesWorking=[];
    const [acX,acY]=this.actualField;
    this.linearAttacks(movesWorking,acX,acY,whiteTure)
    return {isKingAttacked:this.findKing(movesWorking,whiteTure),startField:[acX,acY],legalMoves:movesWorking}
  }
  returnDefMovesOnly(){
    return this.returnLinearMovesOnly().flat()
  }
}