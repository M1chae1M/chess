import boardStartState from "../components/boardStartState";
import figureIcons from "../components/figureIcons";
import _ from 'lodash';
import Game from "./Game";
import colorType from "@/types/type/colorType";
import acXType from "@/types/type/acXType";
import FigureUnionType from "@/types/type/FigureUnionType";
import destinationInterface from "@/types/interface/destinationInterface";
import boardWithFigureInstanceInterface from "@/types/interface/boardWithFigureInstanceInterface";
import fieldUnionType from "@/types/type/fieldUnionType";

export default abstract class Figure{
  name:FigureUnionType;
  color:colorType;
  actualField:fieldUnionType;
  moved:boolean;

  abstract canMove(destX:acXType,destY:string,whiteTure:boolean):{canMove:boolean,moves:string[]};
  abstract attacking(whiteTure:boolean,destX:acXType,destY:number):{isKingAttacked:boolean,legalMoves:string[]};
  abstract returnDefMovesOnly(whiteTure:boolean):string[];

  constructor(color:colorType,actualField:fieldUnionType,moved:boolean|null|undefined,name:FigureUnionType){
    this.color=color
    this.actualField=actualField
    this.moved=moved||false
    this.name=name
  }
  isKing=():boolean=>this.name==='King'
  static allAttacked=(whiteTure:boolean):fieldUnionType[]=>this.allFieldsAttackedBy(whiteTure?'black':'white',whiteTure)
  static defStrategies(whiteTure:boolean):{from:fieldUnionType,to:fieldUnionType}[]{
    const allDefStrategies=[]
    const attackedColor=whiteTure?'white':'black';

    Game?.loop?.((x,y)=>{
      const base=boardStartState[x][y];
      base?.getColor?.()===attackedColor &&
      base?.returnDefMovesOnly?.()?.map(def=>{
        const [destX,destY]=def;
        const copy={
          from:boardStartState[x][y]?.getInstance?.(),
          to:boardStartState[destX][destY]?.getInstance?.()
        }
        boardStartState[x][y]?.swap?.(destX,destY)

        const allAttacked=this.allAttacked(whiteTure);
        const heIsChequered=!Figure.isThereKingColor?.(attackedColor,allAttacked);

        heIsChequered && allDefStrategies.push({from:`${x}${y}`,to:def});

        boardStartState[x][y]=copy.from
        boardStartState[destX][destY]=copy.to
      })
    })

    return allDefStrategies
  }
  static isThereKingColor=(attackedColor:colorType,allAttacked:fieldUnionType[]):boolean=>(
    allAttacked?.map(m=>{
      const [x,y]=m
      const base=boardStartState[x][y]
      if(base?.getColor?.()===attackedColor && base?.isKing?.()){
        return true
      }
    }).includes(true)
  )
  static allFieldsAttackedBy(attackingColor:colorType,whiteTure:boolean):fieldUnionType[]{
    const allFieldsAttacked=[]
    Game?.loop?.((x,y)=>{
      boardStartState[x][y]?.getColor?.()===attackingColor && 
      allFieldsAttacked.push([...boardStartState[x][y]?.attacking?.(!whiteTure,x,y).legalMoves])
    })

    return allFieldsAttacked.flat()
  }
  goodTure(whiteTure:boolean):boolean{
    if((whiteTure && this.getColor()==='white') || (!whiteTure && this.getColor()==='black')){
      return true
    }
  }
  swap(destX:acXType,destY:string):void{
    const [acX,acY]=this.actualField

    this.actualField=`${destX}${destY}` as fieldUnionType
    
    this.moved=true
    boardStartState[destX][destY]=boardStartState[acX][acY]
    boardStartState[acX][acY]=''
  }
  move(destX:acXType,destY:string,whiteTure:boolean):{shortMove:boardWithFigureInstanceInterface, newWhiteTure:boolean, chequered:boolean}{
    Game.clearBoardFromUndefined()
    const [acX,acY]=this.actualField
    const copyOfOldFileds={
      from:boardStartState[acX][acY]?.getInstance?.(),
      to:boardStartState[destX][destY]?.getInstance?.()
    }

    if(this.goodTure(whiteTure) && this.canMove(destX,destY,whiteTure)?.canMove && Game?.isUpToDate?.()){
      const didIncrement=boardStartState?.[destX]?.[destY]===''
      this.swap(destX,destY)
      if(Figure.isKingChequered(whiteTure).value){
        boardStartState[destX][destY]=copyOfOldFileds.to
        boardStartState[acX][acY]=copyOfOldFileds.from
      }
      else{
        didIncrement?Game.incrementMoves():Game.resetMoves();
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
  static isKingChequered(whiteTure:boolean):{value:boolean,isGameOver:boolean}{
    const attackedColor=whiteTure?'white':'black';
    const allAttacked=this.allAttacked(whiteTure);
    const value=Figure.isThereKingColor?.(attackedColor,allAttacked);
    const allDefStrategies=Figure.defStrategies?.(whiteTure).filter(x=>x.to.length>0);
    const isGameOver=allDefStrategies.length<=0;

    isGameOver && alert('Game over!');
    return {value,isGameOver}
  }
  findKing=(fields:string[],whiteTure:boolean):boolean=>fields?.map(z=>{
    const [x,y]=z
    const acColor=whiteTure?'black':'white'
    const base=boardStartState?.[x]?.[y]
    return base?.getColor?.()===acColor && base?.isKing?.()
  }).includes(true)
  canStand(destination:destinationInterface):boolean{
    const {destX,destY}=destination
    return boardStartState[destX][destY]===''||boardStartState[destX][destY]?.getColor?.()!==this.color
  }
  withoutJump=(destX,destY):boolean=>boardStartState[destX][destY]===''
  getFigure=()=>figureIcons?.[this?.color]?.[this?.name]
  getName=():FigureUnionType=>this.name
  getColor=():colorType=>this.color
  getMoved=():boolean=>this.moved
  getInstance(){
    return _.cloneDeep(this);
  }
}