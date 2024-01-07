import Game from "@/classes/Game";
import Pawn from "@/classes/figures/Pawn";
import Bishop from '@/classes/figures/Bishop'
import Queen from '@/classes/figures/Queen'
import King from '@/classes/figures/King'
import Knight from '@/classes/figures/Knight'
import Rook from '@/classes/figures/Rook'

const figureList={Pawn,Bishop,Queen,King,Knight,Rook}

export function boardModifier(board){
    const {boardGameState}=this?.state??{};
    board && Game?.loop?.((x,y)=>{
        if(board?.[x]?.[y]===''){
            boardGameState[x][y]=board?.[x]?.[y];
        }else{
            const {actualField,color,moved,name}=board?.[x]?.[y]||{};
            const FigureClass=figureList[name];
            boardGameState[x][y]=FigureClass && new FigureClass(color,actualField,moved,name);
        }
    })
}