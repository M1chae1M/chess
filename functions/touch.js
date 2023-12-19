import Game from "@/classes/Game";

export function touch(clicked){
    const {fromField,boardGameState,whiteTure,firstTouch,kingAttacked}=this.state;
    const [destX,destY]=clicked??[]
  
    const clickedField=boardGameState?.[destX]?.[destY];
    const colorCondition=clickedField?.goodTure?.(whiteTure)
    if(firstTouch && clickedField!=='' && colorCondition){
        this.setState({fromField:clicked,firstTouch:!firstTouch})
    }
    else if(!firstTouch){
        this.secoundClick(fromField,clicked);
        Game?.can_NOT_win?.() && this.resetGame();
    }
}