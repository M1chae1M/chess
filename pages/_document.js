import {Html,Head,Main,NextScript} from 'next/document'
import {TbChessBishopFilled,TbChessFilled,TbChessKingFilled,TbChessKnightFilled,TbChessQueenFilled,TbChessRookFilled,TbChessBishop,TbChessKing,TbChessKnight,TbChessQueen,TbChessRook,TbChess} from 'react-icons/tb'
import {boardStartState} from '@/classes/boardStartState'
import _ from 'lodash'

export default function Document(){
  return(
    <Html lang='pl'>
      <Head/>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )
}

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

export const boardStartStateCopy=_.cloneDeep(boardStartState);