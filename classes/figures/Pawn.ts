import Figure from "../Figure";
import boardStartState from "../../components/boardStartState";
import Yo from '@/config/Yo.json'
import Xo from '@/config/Xo.json'
import Queen from "./Queen";
import Knight from "./Knight";
import Bishop from "./Bishop";
import Rook from "./Rook";
import Game from "../Game";
import _ from "lodash";
import acXType from "@/types/type/acXType";
import FigureUnionType from "@/types/type/FigureUnionType";
import destinationInterface from "@/types/interface/destinationInterface";
import boardWithFigureInstanceInterface from "@/types/interface/boardWithFigureInstanceInterface";
import move_function_results_interface from "@/types/interface/figure/move_function_results_interface";

export default class Pawn extends Figure{
  attacking(whiteTure:boolean,destX:acXType,destY:number):{isKingAttacked:boolean,legalMoves:string[]}{
    const legalMoves=[];
    const isWhite=whiteTure && this.getColor()==='white'

    if(this.goodTure(whiteTure)){
      const numY=isWhite?Number(destY)+1:Number(destY)-1
      Array.from([-1,1])?.map(x=>{
        const letter=String.fromCharCode(destX.charCodeAt(0)+x)
        const isIncluded=Xo.includes(letter) && Yo.includes(numY)
  
        isIncluded && legalMoves.push(`${letter}${numY}`)
      })
    }
    return {isKingAttacked:this.findKing(legalMoves,whiteTure),legalMoves}
  }
  closeModal(destX:acXType,destY:string,newFigure:FigureUnionType):Figure{
    const FigureClass={
      Knight:Knight,
      Bishop:Bishop,
      Rook:Rook,
      Queen:Queen,
    }[newFigure];

    return new FigureClass(this?.getColor?.(),`${destX}${destY}`,true,newFigure)
  }
  canYouBeatEnPassant(destination:destinationInterface,whiteTure:boolean,movesWorking:string[]):boolean{
    const [acX,acY]=this.actualField
    const [fromX,fromY]=Game?.lastMove?.()?.fromField??''

    const {destX,destY}=destination??{}
    const newY=Number(acY)+(whiteTure?1:-1)
    const newX=(change)=>String.fromCharCode(acX.charCodeAt(0)+change)
    const [enemyX,enemyY]=Game?.lastMove?.()?.clicked??''

    const EnPassantCondition=(change)=>enemyX===newX(change) && Xo?.includes(newX(change)) && movesWorking.push(`${newX(change)}${newY}`)

    if(Yo?.includes(newY) && fromX===enemyX && Math.abs((Number(enemyY)-Number(fromY)))===2 && (!whiteTure?Number(acY)-Number(fromY)===2:Number(acY)-Number(fromY)===-2)){
      EnPassantCondition(+1);
      EnPassantCondition(-1);
    }
    return movesWorking?.includes(`${destX}${destY}`) && Game?.lastMove?.()?.figure==='Pawn'
  }
  move(destX:acXType,destY:string,whiteTure:boolean):move_function_results_interface{
    Game.clearBoardFromUndefined();
    const [acX,acY]=this.actualField
    const destination={destX,destY}

    const copyOfOldFileds={
      from:boardStartState[acX][acY]?.getInstance?.(),
      to:boardStartState[destX][destY]?.getInstance?.(),
      oldPawnField:null,
    }

    if(this.goodTure(whiteTure) && this.canMove(destX,destY,whiteTure)?.canMove && Game?.isUpToDate?.()){
      const movesWorking=[]
      const ifCanYouBeatEnPassant=this.canYouBeatEnPassant(destination,whiteTure,movesWorking)
      const didIncrement=boardStartState?.[destX]?.[destY]==='';
      this.swap(destX,destY);

      if(ifCanYouBeatEnPassant){
        const {clicked}=Game?.lastMove?.()
        const [lastX,lastY]=clicked

        copyOfOldFileds.oldPawnField=boardStartState[lastX][lastY]?.getInstance?.();
        boardStartState[lastX][lastY]=''
        boardStartState[lastX][!whiteTure?Number(lastY)+2:Number(lastY)-2]=''
      }

      if(Figure.isKingChequered(whiteTure).value){
        boardStartState[destX][destY]=copyOfOldFileds.to
        boardStartState[acX][acY]=copyOfOldFileds.from
        if(ifCanYouBeatEnPassant){
          const {clicked}=Game?.lastMove?.()
          const [lastX,lastY]=clicked
          boardStartState[lastX][lastY]=copyOfOldFileds.oldPawnField
        }
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
  canMove(destX:acXType,destY:string,whiteTure:boolean):{canMove:boolean,moves:string[]}{
    Game.clearBoardFromUndefined();
    const [acX,acY]=this.actualField;
    const baseFigure=boardStartState?.[destX]?.[destY];
    const XchangeCond=Math.abs(acX.charCodeAt(0)-destX.charCodeAt(0))===1;
    const Ychange=Number(destY)-Number(acY);
    const avrg=(Number(acY)+Number(destY))/2;
    const sameX=acX===destX && baseFigure===''
    const shortYchange=sameX && (whiteTure?Ychange===1:Ychange===-1);
    const canLongMove=sameX && boardStartState[destX][avrg]==='' && (whiteTure?Ychange<=2 && Ychange>0 && acY==='2':Ychange>=-2 && Ychange<0 && acY==='7');
    const canNormalBeat=XchangeCond && baseFigure?.getColor?.()!==this.color && baseFigure!=='' && Ychange===(whiteTure?1:-1)
    const movesWorking=[]
    const ifCanYouBeatEnPassant=this.canYouBeatEnPassant({destX,destY},whiteTure,movesWorking)

    if(this.goodTure(whiteTure) && (ifCanYouBeatEnPassant || canNormalBeat || (shortYchange || canLongMove))){
      return {canMove:true,moves:movesWorking}
    }
    return {canMove:false,moves:movesWorking}
  }
  returnDefMovesOnly(whiteTure:boolean):string[]{
    Game.clearBoardFromUndefined();
    const movesWorking=[]
    const [acX,acY]=this.actualField;
    const acColor=this.getColor();
    const canBeatColor=acColor==='white'?'black':'white'

    const changeVector=acColor==='black'?-1:1
    const base=boardStartState[acX][acY]
    const newY=Number(acY)+changeVector
    const isEmpty=(chng)=>{
      const newY=Number(acY)+(changeVector*chng)
      return boardStartState[acX][newY]==='' && Yo.includes(newY)
    }

    if(isEmpty(1) && Xo.includes(acX)){
      movesWorking.push(`${acX}${newY}`)
      if(isEmpty(2) && !base?.getMoved?.()){
        movesWorking.push(`${acX}${newY+changeVector}`)
      }
    }
    if(Yo.includes(Number(acY)+changeVector)){
      const newY=Number(acY)+changeVector
      const beat=(vector)=>{
        const change=vector==='left'?-1:1;
        const newX=String.fromCharCode(acX.charCodeAt(0)+change);

        if(Xo.includes(newX) && base?.canStand?.({destX:newX,destY:newY})){
          boardStartState[newX][newY]?.getColor?.()===canBeatColor && movesWorking.push(`${newX}${newY}`);

          if(Game?.lastMove?.()?.clicked){
            const {clicked,fromField,figure}=Game?.lastMove?.()
            const [lastX,lastY]=clicked
            const [lastFromX,lastFromY]=fromField

            !boardStartState?.[newX]?.[newY]?.isKing?.() &&
            lastFromX===lastX && figure==='Pawn' && Math.abs(+lastY-+lastFromY)===2 && movesWorking.push(`${lastX}${(+lastY+(+lastFromY))/2}`);
          }
        }
      }
      beat('left')
      beat('right')
    }
    return movesWorking
  }
}