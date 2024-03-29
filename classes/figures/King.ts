import Figure from '../Figure'
import Yo from '@/config/Yo.json'
import boardStartState from '../../components/boardStartState'
import Xo from '@/config/Xo.json'
import Game from '../Game'
import acXType from '@/types/type/acXType'
import fieldUnionType from '@/types/type/fieldUnionType'
import move_function_results_interface from '@/types/interface/figure/move_function_results_interface'
import canMove_function_results_interface from '@/types/interface/figure/canMove_function_results_interface'

export default class King extends Figure{
  doesntAttacked=(f1:acXType,f2:acXType,whiteTure:boolean):boolean=>{
    const acY=this.actualField[1]
    const attacked=Figure.allAttacked(whiteTure)
    return !attacked.includes(`${f1}${acY}` as fieldUnionType) && !attacked.includes(`${f2}${acY}` as fieldUnionType)
  }
  castling(destX:acXType,destY:string,whiteTure:boolean):void{
    const [acX,acY]=this.actualField

    const isG=destX==='G'
    const rookPosition=isG?'H':'A'
    const rook=boardStartState[rookPosition][destY]
    const destField=isG?'F':'D';

    const horisontalMoveCondition=Math.abs(acX.charCodeAt(0)-destX.charCodeAt(0))
    const verticalMoveCondition=Math.abs(Number(acY)-Number(destY))
    const cond1=isG && this.doesntAttacked('F','G',whiteTure)
    const cond2=!isG && this.doesntAttacked('C','D',whiteTure)

    const canRookMove=rook?.returnDefMovesOnly?.();
    const canRookMoveTo=(destField)=>canRookMove?.includes(`${destField}${acY}`)
    const fieldOccupancy=isG?canRookMoveTo('F'):canRookMoveTo('D');

    horisontalMoveCondition===2 && verticalMoveCondition===0 && (cond1||cond2) && fieldOccupancy && rook?.swap?.(destField,acY);
  }
  move(destX:acXType,destY:string,whiteTure:boolean):move_function_results_interface{
    const [acX,acY]=this.actualField
    const copyOfOldFileds={
      from:boardStartState[acX][acY]?.getInstance?.(),
      to:boardStartState[destX][destY]?.getInstance?.()
    }

    if(this.goodTure(whiteTure) && this.canMove(destX,destY,whiteTure)?.canMove && this.canStand({destX,destY}) && Game?.isUpToDate?.()){
      this.castling(destX,destY,whiteTure);
      
      const didIncrement=boardStartState?.[destX]?.[destY]===''
      this.swap(destX,destY)

      if(Figure.isKingChequered(whiteTure).value){
        boardStartState[destX][destY]=copyOfOldFileds.to
        boardStartState[acX][acY]=copyOfOldFileds.from
      }
      else{
        didIncrement?Game.incrementMoves():Game.resetMoves()
        Game?.addToHistory?.(acX as acXType,acY,copyOfOldFileds,destX,destY);
        return{
          shortMove:boardStartState,
          newWhiteTure:!whiteTure,
          chequered:Figure.isKingChequered(whiteTure).value,
        }
      }
    }
    return{
      shortMove:boardStartState,
      newWhiteTure:whiteTure,
      chequered:Figure.isKingChequered(whiteTure).value,
    }
  }
  canMove(destX:acXType,destY:string,whiteTure:boolean):canMove_function_results_interface{
    const moves=[];
    Game.clearBoardFromUndefined();
    const [acX,acY]=this.actualField
    const destination={destX,destY}

    const horisontalMoveCondition=Math.abs(acX.charCodeAt(0)-destX.charCodeAt(0))
    const verticalMoveCondition=Math.abs(Number(acY)-Number(destY))

    const isG=destX==='G'
    const rookPosition=isG?'H':'A'
    const rook=boardStartState[rookPosition][acY]
    const attacked=Figure.allAttacked(whiteTure)
    
    const doesntAttacked=(f1,f2)=>!attacked.includes(`E${acY}` as fieldUnionType) && !attacked.includes(`${f1}${acY}` as fieldUnionType) && !attacked.includes(`${f2}${acY}` as fieldUnionType)

    const cond1=isG && doesntAttacked('F','G');
    const cond2=!isG && doesntAttacked('C','D');

    const canRookMove=rook?.returnDefMovesOnly?.();
    const canRookMoveTo=(destField)=>canRookMove?.includes(`${destField}${acY}`)
    const fieldOccupancy=isG?canRookMoveTo('F'):canRookMoveTo('D');
    const figuresMoved=!rook.moved && !boardStartState[acX][acY]?.moved

    for(let i=-1;i<=1;i++){
      for(let j=-1;j<=1;j++){
        const newX=String.fromCharCode(acX.charCodeAt(0)+i) as acXType;
        const newY=Number(acY)+j;
        const destField=`${newX}${newY}`;
        Xo.includes(newX) && Yo.includes(newY) &&
        this?.canStand?.({destX:newX,destY:`${newY}`}) &&
        !attacked.includes(destField as fieldUnionType) &&
        moves.push(destField);
      }
    }
    if(horisontalMoveCondition===2 && verticalMoveCondition===0 && acX==='E' && figuresMoved){
      if((cond1||cond2) && fieldOccupancy){
        return {canMove:true,moves}
      }
    }
    else if(horisontalMoveCondition<=1 && verticalMoveCondition<=1){
      return {canMove:this.canStand(destination),moves}
    }
    else{
      return {canMove:false,moves}
    }
  }
  attacking(whiteTure:boolean,destX:acXType,destY:number):{isKingAttacked:boolean,legalMoves:string[],startField:string[]}{
    const [acX,acY]=this.actualField
    const legalMoves=[];
    const NumbY=Number(destY);
    const letterCode=destX.charCodeAt(0);

    for(let i=letterCode-1;i<=letterCode+1;i++){
      if(Xo.includes(String.fromCharCode(i))){
        for(let j=NumbY-1;j<=NumbY+1;j++){
          if(Yo.includes(j)){
            legalMoves.push(`${String.fromCharCode(i)}${j}`);
          }
        }
      }
    }

    return {isKingAttacked:this.findKing(legalMoves,whiteTure),legalMoves,startField:[acX,acY]}
  }
  returnDefMovesOnly(whiteTure:boolean):string[]{
    const movesWorking=[];
    Game.clearBoardFromUndefined();
    const [acX,acY]=this.actualField

    for(let i=-1;i<=1;i++){
      for(let j=-1;j<=1;j++){
        const newX=String.fromCharCode(acX.charCodeAt(0)+i);
        const newY=Number(acY)+j;
        const destField=`${newX}${newY}`;
        const attacked=!Figure.allAttacked(whiteTure).includes(destField as fieldUnionType);

        !boardStartState?.[newX]?.[newY]?.isKing?.() &&
        Xo.includes(newX) && Yo.includes(newY) && this?.canStand?.({destX:newX as acXType,destY:`${newY}`}) && attacked && movesWorking.push(destField);
      }
    }
    return movesWorking
  }
}