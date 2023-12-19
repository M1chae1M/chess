import Game from "@/classes/Game"

export function getBoardFromLocalStory(){
    const {boardGameState}=this?.state??{}
    const getGameStatus=localStorage?.getItem?.('chess_game_status')
  
    if(getGameStatus){
        Game?.setHistory?.(JSON.parse(getGameStatus)?.gameHistory)
        const loadStatus=JSON.parse(getGameStatus)
        this?.setState?.(loadStatus)
    }
  
    this.boardModifier(JSON.parse(localStorage?.getItem?.('chess_game_board')));
    this.setState({boardGameState})
}