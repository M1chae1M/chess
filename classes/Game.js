import Yo from '@/config/Yo.json'
import {boardStartState,boardStartStateCopy} from '../components/boardStartState'
import Xo from '@/config/Xo.json'
import _ from "lodash"

export default class Game{
  static fiftyMovesRule=0;
  static samePositions=0;
  static gameHistory=[];
  static gameBoard=[];
  static upToDate=true;

  static isUpToDate=()=>this.upToDate
  static setUpToDate=(newState)=>this.upToDate=newState
  static getHistory=()=>[...this.gameHistory]
  static lastMove=()=>this.getHistory?.()?.pop?.()?.lastMove
  static setHistory=(newHistory)=>this.gameHistory=newHistory
  static onlyKnightOrBishop=(flatedFigures)=>flatedFigures?.length===1 && (flatedFigures[0]==='Bishop' || flatedFigures[0]==='Knight')

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
  static pat=(txt)=>alert(`pat ${txt}`)
  static surrender=(whiteTure)=>alert(`Win player with ${whiteTure?'black':'white'} figures.`)
  static setGameBoard50moves(){
    if(this.fiftyMovesRule>=50){
      this.pat('You made 50 without a drum, or a pawn move, it means a draw, sorry!')
    }
  }
  static compare=(id)=>this.getHistory()?.[id]?.lastMove?.stringifiedBoard
  static setGameBoard3sameMoves(){
    this.clearBoardFromUndefined();

    if(this.getHistory()?.length>=8 && this.compare(0)===this.compare(4) && this.compare(8)===this.compare(4)){
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
    const onlyKorB=this.onlyKnightOrBishop(flatedFigures)
    const countFigures=flatedFigures?.length===0

    countFigures && this.pat(' - total lack of figures');
    onlyKorB && this.pat('- winning with a knight or a bishop alone is impossible');

    return countFigures || onlyKorB
  }
  static loop(callback){
    Xo?.map(x=>
      Yo?.map(y=>
        callback(x,y)
      )  
    )
  }
}