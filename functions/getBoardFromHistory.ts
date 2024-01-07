import Game from "@/classes/Game";
import lastMove_interface from "@/types/interface/lastMoveInterface";

export default function getBoardFromHistory(lastMove:lastMove_interface, id:number){
    const {stringifiedBoard,status}=lastMove??{}
    const {boardGameState}=this.state??{}
  
    Game?.setUpToDate?.(this.state.gameHistory?.length-1===id);
    this.boardModifier(JSON.parse(stringifiedBoard));
    this.setState({...status,boardGameState,actualMove:id+1})
}