import React,{Component} from "react";
import {boardStartState,Xo,Yo,boardStartStateCopy} from "../_document";
import _ from "lodash";
// import {Xo,Yo} from "../_document";
// import {Pawn} from "./figures/Pawn";
// import {Queen} from './figures/Queen';
// import {King} from './figures/King';
// import {Bishop} from './figures/Bishop';
// import {Knight} from './figures/Knight';
// import {Rook} from './figures/Rook';

export class Game{
  static fiftyMovesRule=0;
  static samePositions=0;
  static gameHistory=[];
  // static gameBoard=boardStartState??[]
  static gameBoard=[]
  // static gameBoard=boardStartState

  static save(){
    const data={
      gameHistory:_.cloneDeep(this.gameHistory),
      board:_.cloneDeep(boardStartState),
      fiftyMovesRule:_.cloneDeep(this.fiftyMovesRule),
      samePositions:_.cloneDeep(this.samePositions),
    }
    localStorage.setItem('chess_game_state',JSON.stringify(data))
  }
  static load(){
    // console.log(
    //   boardStartState
    // )


    const {gameHistory,board,fiftyMovesRule,samePositions}=JSON.parse(localStorage.getItem('chess_game_state'))

    this.gameHistory=gameHistory
    this.fiftyMovesRule=fiftyMovesRule
    this.samePositions=samePositions
    this.gameBoard=board
    // boardStartState=_.merge({},board)

    console.log(board)

    return {gameHistory,fiftyMovesRule,samePositions,board}
  }

  static returnGameBoard(){
    return this.gameBoard
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
  static test50moves(){
    if(this.fiftyMovesRule>=50){
      this.pat('wykonaliście 50 ruchów bez bicia,albo ruchu pionkiem,oznacza to remis,przykro mi')
    }
  }
  static test3sameMoves(){
    Game.clearBoardFromUndefined();
    const cleared=this.getHistory().map(x=>x.board).map(xyz=>
      Xo.map(k=>
        Yo.map(l=>{
          const obj=xyz?.[k]?.[l]
          obj?{name:obj?.getName?.(),color:obj?.getColor?.()}:''
          }
        )
      )
    )
    const compare=(id)=>{return JSON.stringify(cleared[id])}

    if(compare(0)===compare(4) && compare(8)===compare(4)){
      this.pat(',3-krotnie potwórzyłeś pozycję')
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
    this.test50moves();
    this.test3sameMoves();
    return this.fiftyMovesRule;
  }
  static resetMoves(){
    console.log('było:',this.fiftyMovesRule,'a będzie 0')
    this.fiftyMovesRule=0;
    return this.fiftyMovesRule;
  }
  static incrementMoves(){
    this.fiftyMovesRule += 1;
    return this.fiftyMovesRule;
  }
}

export default class T1000 extends Component{render(){return(<></>)}}