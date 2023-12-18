import Game from "@/classes/Game";

export function getBoardFromHistory(lastMove,id){
    const {stringifiedBoard,status}=lastMove??{}
    const {boardGameState}=this?.state??{}
  
    Game?.setUpToDate?.(this.state.gameHistory?.length-1===id);
    this.boardModifier(JSON.parse(stringifiedBoard));
    this.setState({...status,boardGameState,actualMove:id+1})
}