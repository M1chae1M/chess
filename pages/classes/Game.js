import React,{Component} from "react";
import Yo from '@/config/Yo.json'
import {boardStartState,boardStartStateCopy} from "../_document";
// import {boardStartStateCopy} from "../_document";
import Xo from '@/config/Xo.json'
import _ from "lodash";

export class Game{
  static fiftyMovesRule=0;
  static samePositions=0;
  static gameHistory=[];
  static gameBoard=[]

  static returnGameBoard(){
    return this.gameBoard
  }

  static setGameBoard(board){
    this.gameBoard=_.cloneDeep(board)
  }

  static save(board){
    const data={
      gameHistory:_.cloneDeep(this.gameHistory),
      // board:_.cloneDeep(this.gameBoard),
      board:_.cloneDeep(board),
      fiftyMovesRule:_.cloneDeep(this.fiftyMovesRule),
      samePositions:_.cloneDeep(this.samePositions),
    }
    localStorage.setItem('chess_game_state',JSON.stringify(data))
  }
  static load(){
    // const {gameHistory,board,fiftyMovesRule,samePositions}=JSON.parse(localStorage.getItem('chess_game_state'))

    // this.gameHistory=gameHistory
    // this.fiftyMovesRule=fiftyMovesRule
    // this.samePositions=samePositions
    // this.gameBoard=board

    // Xo.map(x=>Yo.map(y=>boardStartState[x][y]=_.cloneDeep(board[x][y])))
    // return {gameHistory,fiftyMovesRule,samePositions,board,boardStartState}
  }
  static getHistory(){
    return this.gameHistory
  }
  static addToHistory(acX,acY,copyOfOldFileds){
    this.gameHistory.push({
      lastMove:{
        fromField:`${acX}${acY}`,
        figure:copyOfOldFileds?.from?.getName?.(),
        color:copyOfOldFileds?.from?.getColor?.(),
        clicked:[acX,acY],
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
    console.log('teraz board jest taki  jak,',this.gameBoard)
    const {fiftyMovesRule,samePositions,gameHistory,gameBoard}=this
    return {fiftyMovesRule,samePositions,gameHistory,gameBoard}
  }
  static pat(txt){
    // alert('pat',txt)
    return this.reset()
  }
  static surrender(whiteTure){
    alert(`Win player with ${whiteTure?'black':'white'} figures.`)
    return this.reset()
  }
  static setGameBoard50moves(){
    if(this.fiftyMovesRule>=50){
      this.pat('wykonaliście 50 ruchów bez bicia,albo ruchu pionkiem,oznacza to remis,przykro mi')
    }
  }
  static cleared(){
    return this.getHistory().map(x=>x.board).map(xyz=>
      Xo.map(k=>
        Yo.map(l=>{
          const obj=xyz?.[k]?.[l]
          obj?{name:obj?.getName?.(),color:obj?.getColor?.()}:''
          }
        )
      )
    )
  }
  static compare(id){
    return JSON.stringify(this.cleared()[id])
  }
  static setGameBoard3sameMoves(){
    Game.clearBoardFromUndefined();

    if(this.compare(0)===this.compare(4) && this.compare(8)===this.compare(4)){
      this.pat('3-krotnie potwórzyłeś pozycję')
    }
  }
  static clearBoardFromUndefined(){
    // const copy=_.cloneDeep(this.gameBoard)

    // Object.keys(this.gameBoard)?.map(x=>Object.keys(this.gameBoard[x])?.map(y=>{
    //   if(this.gameBoard[x][y]===undefined){
    //     this.gameBoard[x][y]=''
    //   }
    // }))

    Object.keys(boardStartState)?.map(x=>Object.keys(boardStartState[x])?.map(y=>{
      if(boardStartState[x][y]===undefined){
        boardStartState[x][y]=''
      }
    }))

    // this.gameBoard=_.cloneDeep(copy)
  }
  static getMovesCount(){
    this.setGameBoard50moves();
    this.setGameBoard3sameMoves();
    return this.fiftyMovesRule;
  }
  static resetMoves(){
    console.log('było:',this.fiftyMovesRule,'a będzie 0')
    this.fiftyMovesRule=0;
    return this.fiftyMovesRule;
  }
  static incrementMoves(){
    this.fiftyMovesRule+=1;
    return this.fiftyMovesRule;
  }
  static makeEmpty(){
    return ''
  }
  static makeFigureInstance(board,figureList){
    const [color,actualField,moved,name]=board??''
    return new figureList[name](color, actualField,moved,name)
  }
  static parseJSONboard(board,figureList){
    const newBoard={}
    Xo?.map(x=>{
      newBoard[x]={}
      Yo?.map(y=>
        board[x][y]?.length===1?
        newBoard[x][y]=this.makeEmpty():
        newBoard[x][y]=this.makeFigureInstance(board[x][y],figureList)
      )
    })
    // console.log(newBoard)
    this.setGameBoard(newBoard)
    return newBoard
  }
}

export default class T1000 extends Component{render(){return(<></>)}}