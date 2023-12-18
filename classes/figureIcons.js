import {TbChessBishopFilled,TbChessFilled,TbChessKingFilled,TbChessKnightFilled,TbChessQueenFilled,TbChessRookFilled,TbChessBishop,TbChessKing,TbChessKnight,TbChessQueen,TbChessRook,TbChess} from 'react-icons/tb'

export const figureIcons={
    black:{
        Pawn:<TbChessFilled/>,
        Queen:<TbChessQueenFilled/>,
        Bishop:<TbChessBishopFilled/>,
        Knight:<TbChessKnightFilled/>,
        King:<TbChessKingFilled/>,
        Rook:<TbChessRookFilled/>,
    },
    white:{
        Pawn:<TbChess/>,
        Queen:<TbChessQueen/>,
        Bishop:<TbChessBishop/>,
        Knight:<TbChessKnight/>,
        King:<TbChessKing/>,
        Rook:<TbChessRook/>,
    }
}