import Yo from '@/config/Yo.json'
import boardStartState from '../components/boardStartState'
import Xo from '@/config/Xo.json'
import _ from "lodash"
import acXType from '@/types/type/acXType';
import copyOfOldFileds_interface from '@/types/interface/copyOfOldFileds_interface';
import historyType from '@/types/type/historyType';
import FigureUnionType from '@/types/type/FigureUnionType';
import allFiguresInterface from '@/types/interface/allFiguresInterface';
import boardWithFigureInstanceInterface from '@/types/interface/boardWithFigureInstanceInterface';

export default class Game{
  static fiftyMovesRule:number=0;
  static samePositions:number=0;
  static gameHistory=[];
  static gameBoard=[];
  static upToDate:boolean=true;

  static isUpToDate=():boolean=>this.upToDate
  static setUpToDate=(newState)=>this.upToDate=newState
  static getHistory=():historyType=>[...this.gameHistory]
  static lastMove=()=>this.getHistory?.()?.pop?.()?.lastMove
  static setHistory=(newHistory:historyType)=>this.gameHistory=newHistory
  static onlyKnightOrBishop=(flatedFigures:FigureUnionType[]):boolean=>flatedFigures?.length===1 && (flatedFigures[0]==='Bishop' || flatedFigures[0]==='Knight')
  static withoutMovedFields():boardWithFigureInstanceInterface{
    const copy_of_boardStartState=_.cloneDeep(boardStartState)
    this.loop((col,row)=>delete copy_of_boardStartState?.[col]?.[row]?.moved)
    return copy_of_boardStartState
  }
  static addToHistory(acX:acXType,acY:string, copyOfOldFileds:copyOfOldFileds_interface,destX:acXType,destY:string):void{
    this.gameHistory.push({
      lastMove:{
        fromField:`${acX}${acY}`,
        figure:copyOfOldFileds?.from?.getName?.(),
        color:copyOfOldFileds?.from?.getColor?.(),
        clicked:[destX,destY],
        stringifiedBoard:JSON.stringify(this.withoutMovedFields())
      }
    })
  }
  static pat=(txt:string):void=>alert(`pat ${txt}`)
  static surrender=(whiteTure:boolean):void=>alert(`Win player with ${whiteTure?'black':'white'} figures.`)
  static setGameBoard50moves():void{
    if(this.fiftyMovesRule>=50){
      this.pat('You made 50 without a drum, or a pawn move, it means a draw, sorry!')
    }
  }
  static compare=(id:number):string=>this.getHistory()?.[id]?.lastMove?.stringifiedBoard
  static setGameBoard3sameMoves():void{
    this.clearBoardFromUndefined();

    if(this.getHistory()?.length>=8 && this.compare(0)===this.compare(4) && this.compare(8)===this.compare(4)){
      this.pat('You repeated your fast three times!')
    }
  }
  static clearBoardFromUndefined():void{
    Object.keys(boardStartState)?.map(x=>Object.keys(boardStartState[x])?.map(y=>{
      if(boardStartState[x][y]===undefined){
        boardStartState[x][y]=''
      }
    }))
  }
  static getMovesCount():number{
    this.setGameBoard50moves();
    this.setGameBoard3sameMoves();
    return this.fiftyMovesRule;
  }
  static resetMoves():number{
    this.fiftyMovesRule=0;
    return this.fiftyMovesRule;
  }
  static incrementMoves():number{
    this.fiftyMovesRule+=1;
    return this.fiftyMovesRule;
  }
  static figureOtherThenKing(x:acXType,y:number,allFigures:allFiguresInterface):void{
    const base=boardStartState?.[x]?.[y];
    base !=='' &&
    !base?.isKing?.() &&
    allFigures?.[base?.getColor()]?.push?.(base?.getName?.())
  }
  static allFigures():FigureUnionType[]{
    const allFigures={
      white:[],
      black:[]
    }

    this.loop((x,y)=>this.figureOtherThenKing(x,y,allFigures))
    return [...allFigures.black,...allFigures.white];
  }
  static can_NOT_win():boolean{
    const flatedFigures=this.allFigures()
    const onlyKorB=this.onlyKnightOrBishop(flatedFigures)
    const countFigures=flatedFigures?.length===0

    countFigures && this.pat(' - total lack of figures');
    onlyKorB && this.pat('- winning with a knight or a bishop alone is impossible');

    return countFigures || onlyKorB
  }
  static loop=(callback)=>Xo?.map(x=>Yo?.map(y=>callback(x,y)))
}