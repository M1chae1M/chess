import {Html,Head,Main,NextScript} from 'next/document'
import {TbChessBishopFilled,TbChessFilled,TbChessKingFilled,TbChessKnightFilled,TbChessQueenFilled,TbChessRookFilled,TbChessBishop,TbChessKing,TbChessKnight,TbChessQueen,TbChessRook,TbChess} from 'react-icons/tb';
import {Pawn} from './classes/figures/Pawn';
import {Queen} from './classes/figures/Queen';
import {King} from './classes/figures/King';
import {Bishop} from './classes/figures/Bishop';
import {Knight} from './classes/figures/Knight';
import {Rook} from './classes/figures/Rook';
import _ from 'lodash';

export default function Document(){
  return (
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

// export const boardStartState={
//   A:{
//     1:new Rook('white','A1',false,'Rook'),
//     2:new Pawn('white','A2',false,'Pawn'),
//     3:'',
//     4:'',
//     5:'',
//     6:'',
//     7:new Pawn('black','A7',false,'Pawn'),
//     8:new Rook('black','A8',false,'Rook'),
//   },
//   B:{
//     1:new Knight('white','B1',false,'Knight'),
//     2:new Pawn('white','B2',false,'Pawn'),
//     3:'',
//     4:'',
//     5:'',
//     6:'',
//     7:new Pawn('black','B7',false,'Pawn'),
//     8:new Knight('black','B8',false,'Knight'),
//   },
//   C:{
//     1:new Bishop('white','C1',false,'Bishop'),
//     2:new Pawn('white','C2',false,'Pawn'),
//     3:'',
//     4:'',
//     5:'',
//     6:'',
//     7:new Pawn('black','C7',false,'Pawn'),
//     8:new Bishop('black','C8',false,'Bishop'),
//   },
//   D:{
//     1:new Queen('white','D1',false,'Queen'),
//     2:new Pawn('white','D2',false,'Pawn'),
//     3:'',
//     4:'',
//     5:'',
//     6:'',
//     7:new Pawn('black','D7',false,'Pawn'),
//     8:new Queen('black','D8',false,'Queen'),
//   },
//   E:{
//     1:new King('white','E1',false,'King'),
//     2:new Pawn('white','E2',false,'Pawn'),
//     3:'',
//     4:'',
//     5:'',
//     6:'',
//     7:new Pawn('black','E7',false,'Pawn'),
//     8:new King('black','E8',false,'King'),
//   },
//   F:{
//     1:new Bishop('white','F1',false,'Bishop'),
//     2:new Pawn('white','F2',false,'Pawn'),
//     3:'',
//     4:'',
//     5:'',
//     6:'',
//     7:new Pawn('black','F7',false,'Pawn'),
//     8:new Bishop('black','F8',false,'Bishop'),
//   },
//   G:{
//     1:new Knight('white','G1',false,'Knight'),
//     2:new Pawn('white','G2',false,'Pawn'),
//     3:'',
//     4:'',
//     5:'',
//     6:'',
//     7:new Pawn('black','G7',false,'Pawn'),
//     8:new Knight('black','G8',false,'Knight'),
//   },
//   H:{
//     1:new Rook('white','H1',false,'Rook'),
//     2:new Pawn('white','H2',false,'Pawn'),
//     3:'',
//     4:'',
//     5:'',
//     6:'',
//     7:new Pawn('black','H7',false,'Pawn'),
//     8:new Rook('black','H8',false,'Rook'),
//   },
// }

export const boardStartState={
  A:{
    1:'',
    2:'',
    3:'',
    4:'',
    5:'',
    6:'',
    7:'',
    8:'',
  },
  B:{
    1:'',
    2:'',
    3:'',
    4:'',
    5:'',
    6:'',
    7:'',
    8:'',
  },
  C:{
    1:'',
    2:'',
    3:'',
    4:'',
    5:'',
    6:'',
    7:new Pawn('white','C7',true,'Pawn'),
    // 7:'',
    8:'',
  },
  D:{
    1:'',
    2:'',
    3:'',
    4:'',
    5:'',
    6:'',
    7:'',
    8:'',
  },
  E:{
    1:new King('white','E1',false,'King'),
    2:'',
    3:'',
    4:'',
    5:'',
    6:new Pawn('white','E6',true,'Pawn'),
    7:'',
    8:new King('black','E8',false,'King'),
  },
  F:{
    1:'',
    2:'',
    3:'',
    4:'',
    5:'',
    6:'',
    7:'',
    8:'',
  },
  G:{
    1:'',
    2:'',
    3:'',
    4:'',
    5:'',
    6:'',
    7:'',
    8:'',
  },
  H:{
    1:'',
    2:'',
    3:'',
    4:'',
    5:'',
    6:'',
    7:'',
    8:'',
  },
}

export const boardStartStateCopy=_.cloneDeep(boardStartState);