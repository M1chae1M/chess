import Yo from '@/config/Yo.json'
import {boardStartState,boardStartStateCopy} from "../pages/_document";
import Xo from '@/config/Xo.json'
import _ from "lodash";

export default class Game{
  static fiftyMovesRule=0;
  static samePositions=0;
  static gameHistory=[];
  static gameBoard=[];
  static upToDate=true;

  static isUpToDate=()=>this.upToDate
  static setUpToDate=(newState)=>this.upToDate=newState
  static getHistory=()=>this.gameHistory
  
  static withoutMovedFields(){
    const copy_of_boardStartState=_.cloneDeep(boardStartState)

    this.loop((col,row)=>delete copy_of_boardStartState?.[col]?.[row]?.moved)

    return copy_of_boardStartState
  }
  static addToHistory(acX,acY,copyOfOldFileds,destX,destY){
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
  static lastMove(){
    return this.getHistory?.()[this.getHistory?.()?.length-1]?.lastMove
  }
  static reset(){
    this.fiftyMovesRule=0
    this.samePositions=0
    this.gameHistory=[]
    this.gameBoard=_.cloneDeep(boardStartStateCopy)
    this.upToDate=true
    const {fiftyMovesRule,samePositions,gameHistory,gameBoard}=this
    return {fiftyMovesRule,samePositions,gameHistory,gameBoard}
  }
  static pat(txt){
    alert(`pat ${txt}`)
    return this.reset()
  }
  static surrender(whiteTure){
    alert(`Win player with ${whiteTure?'black':'white'} figures.`)
    return this.reset()
  }
  static setGameBoard50moves(){
    if(this.fiftyMovesRule>=50){
      this.pat('You made 50 without a drum, or a pawn move, it means a draw, sorry!')
    }
  }
  static compare(id){
    return this.gameHistory?.[id]?.lastMove?.stringifiedBoard
  }
  static setGameBoard3sameMoves(){
    Game.clearBoardFromUndefined();

    if(this.gameHistory?.length>=8 && this.compare(0)===this.compare(4) && this.compare(8)===this.compare(4)){
      this.pat('You repeated your fast three times!')
    }
  }
  static clearBoardFromUndefined(){
    Object.keys(boardStartState)?.map(x=>Object.keys(boardStartState[x])?.map(y=>{
      if(boardStartState[x][y]===undefined){
        boardStartState[x][y]=''
      }
    }))
  }
  static getMovesCount(){
    this.setGameBoard50moves();
    this.setGameBoard3sameMoves();
    return this.fiftyMovesRule;
  }
  static resetMoves(){
    this.fiftyMovesRule=0;
    return this.fiftyMovesRule;
  }
  static incrementMoves(){
    this.fiftyMovesRule+=1;
    return this.fiftyMovesRule;
  }
  static figureOtherThenKing(x,y,allFigures){
    const field=boardStartState?.[x]?.[y];
    field !=='' &&
    field?.getName?.()!=='King' &&
    allFigures?.[field?.getColor()]?.push?.(field?.getName?.())
  }
  static allFigures(){
    const allFigures={
      white:[],
      black:[]
    }

    this.loop((x,y)=>this.figureOtherThenKing(x,y,allFigures))
    return [...allFigures.black,...allFigures.white];
  }
  static can_NOT_win(){
    const flatedFigures=this.allFigures()
    const onlyKorB=flatedFigures?.length===1 && (flatedFigures[0]==='Bishop' || flatedFigures[0]==='Knight');

    flatedFigures?.length===0 && this.pat('brak figur totalny');
    onlyKorB && this.pat('zamatowanie samym skoczkiem, lub gońcem jest niemożliwe');

    return flatedFigures?.length===0 || onlyKorB
  }
  static loop(callback){
    Xo?.map(x=>
      Yo?.map(y=>
        callback(x,y)
      )  
    )
  }
}