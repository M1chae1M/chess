import Queen from "./Queen";

export default class Bishop extends Queen{
  canMove(destX,destY,whiteTure){
    const [acX,acY]=this.actualField
    const moves=[];
    this.crossMoves(moves,acX,acY)
    const canMove=moves.includes(`${destX}${destY}`) && this.canStand({destX,destY})
    return {canMove,moves}
  }
  attacking(whiteTure,destX,destY){
    const [acX,acY]=this.actualField
    const legalMoves=[];
    this.crossAttacks(legalMoves,destX,destY)
    return {isKingAttacked:this.findKing(legalMoves,whiteTure),legalMoves,startField:[acX,acY]}
  }
  returnDefMovesOnly(){
    return this.returnCrossMovesOnly()
  }
}