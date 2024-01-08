import _ from "lodash";
import Game from "@/classes/Game";

// export default function checkIsClosed(end,baseFigure,clicked){
export default function checkIsClosed(
    end,            // funkcja callback
    baseFigure,     // figura
    clicked:string
    ){
    const [destX,destY]=clicked??[]
    const {isModalOpened,promoteTo,whiteTure,firstTouch}=this.state;

    if(isModalOpened===false && baseFigure?.canMove?.(destX,destY,whiteTure)?.canMove){
        const {shortMove,newWhiteTure}=baseFigure?.move?.(destX,destY,whiteTure);
        shortMove[destX][destY]=_.cloneDeep(baseFigure?.closeModal?.(destX,destY,promoteTo));
        this.isChequered();
        this.setState({firstTouch:!firstTouch,boardGameState:shortMove,whiteTure:newWhiteTure});
        Game.getMovesCount();
        end();
    }else{
        setTimeout(()=>this.checkIsClosed(end,baseFigure,clicked),100);
    }
}