import Queen from "./Queen";

export default class Rook extends Queen{
  canMove(destX,destY,whiteTure){
    const {canMove,moves}=this.linearMoves(destX,destY,whiteTure)
    return {canMove,moves}
  }
  attacking(whiteTure,destX,destY){
    const movesWorking=[];
    const [acX,acY]=this.actualField;
    this.linearAttacks(movesWorking,acX,acY,whiteTure)
    return {isKingAttacked:this.findKing(movesWorking,whiteTure),startField:[acX,acY],legalMoves:movesWorking}
  }
  returnDefMovesOnly(){
    const movesWorking=[]
    movesWorking.push(this.returnLinearMovesOnly())
    
    return movesWorking.flat()
  }
}