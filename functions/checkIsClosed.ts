import _ from "lodash";
import Game from "@/classes/Game";
import acXType from "@/types/type/acXType";
import Pawn from "@/classes/figures/Pawn";

export default function checkIsClosed(end:()=>void, baseFigure:Pawn, clicked:string){
    const [destX,destY]=clicked??[]
    const {isModalOpened,promoteTo,whiteTure,firstTouch}=this.state;

    if(isModalOpened===false && baseFigure?.canMove?.(destX as acXType,destY,whiteTure)?.canMove){
        const {shortMove,newWhiteTure}=baseFigure?.move?.(destX as acXType,destY,whiteTure);
        shortMove[destX][destY]=_.cloneDeep(baseFigure?.closeModal?.(destX as acXType,destY,promoteTo));
        this.isChequered();
        this.setState({firstTouch:!firstTouch,boardGameState:shortMove,whiteTure:newWhiteTure});
        Game.getMovesCount();
        end();
    }else{
        setTimeout(()=>this.checkIsClosed(end,baseFigure,clicked),100);
    }
}