export function setBoardInLocalStory(){
    const {whiteTure,firstTouch,fromField,isModalOpened,promoteTo,kingAttacked,gameHistory,fiftyMovesRule,boardGameState,actualMove}=this.state??{}
    localStorage.setItem('chess_game_board',JSON.stringify(boardGameState))
    localStorage.setItem('chess_game_status',JSON.stringify({
        whiteTure,
        firstTouch,
        fromField,
        isModalOpened,
        promoteTo,
        kingAttacked,
        gameHistory,
        fiftyMovesRule,
        actualMove
    }))
}