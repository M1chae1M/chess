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
export const Xo=['A','B','C','D','E','F','G','H'];
export const Yo=[1,2,3,4,5,6,7,8];
export const fieldSize='60px';

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

export const allFieldsOnBoard=['A1','B1','C1','D1','E1','F1','G1','H1','A2','B2','C2','D2','E2','F2','G2','H2','A3','B3','C3','D3','E3','F3','G3','H3','A4','B4','C4','D4','E4','F4','G4','H4','A5','B5','C5','D5','E5','F5','G5','H5','A6','B6','C6','D6','E6','F6','G6','H6','A7','B7','C7','D7','E7','F7','G7','H7','A8','B8','C8','D8','E8','F8','G8','H8']

export const boardStartState={
  A:{
    1:new Rook('white','A1',false,'Rook'),
    2:new Pawn('white','A2',false,'Pawn'),
    3:'',
    4:'',
    5:'',
    6:'',
    7:new Pawn('black','A7',false,'Pawn'),
    8:new Rook('black','A8',false,'Rook'),
  },
  B:{
    1:new Knight('white','B1',false,'Knight'),
    2:new Pawn('white','B2',false,'Pawn'),
    3:'',
    4:'',
    5:'',
    6:'',
    7:new Pawn('black','B7',false,'Pawn'),
    8:new Knight('black','B8',false,'Knight'),
  },
  C:{
    1:new Bishop('white','C1',false,'Bishop'),
    2:new Pawn('white','C2',false,'Pawn'),
    3:'',
    4:'',
    5:'',
    6:'',
    7:new Pawn('black','C7',false,'Pawn'),
    8:new Bishop('black','C8',false,'Bishop'),
  },
  D:{
    1:new Queen('white','D1',false,'Queen'),
    2:new Pawn('white','D2',false,'Pawn'),
    3:'',
    4:'',
    5:'',
    6:'',
    7:new Pawn('black','D7',false,'Pawn'),
    8:new Queen('black','D8',false,'Queen'),
  },
  E:{
    1:new King('white','E1',false,'King'),
    2:new Pawn('white','E2',false,'Pawn'),
    3:'',
    4:'',
    5:'',
    6:'',
    7:new Pawn('black','E7',false,'Pawn'),
    8:new King('black','E8',false,'King'),
  },
  F:{
    1:new Bishop('white','F1',false,'Bishop'),
    2:new Pawn('white','F2',false,'Pawn'),
    3:'',
    4:'',
    5:'',
    6:'',
    7:new Pawn('black','F7',false,'Pawn'),
    8:new Bishop('black','F8',false,'Bishop'),
  },
  G:{
    1:new Knight('white','G1',false,'Knight'),
    2:new Pawn('white','G2',false,'Pawn'),
    3:'',
    4:'',
    5:'',
    6:'',
    7:new Pawn('black','G7',false,'Pawn'),
    8:new Knight('black','G8',false,'Knight'),
  },
  H:{
    1:new Rook('white','H1',false,'Rook'),
    2:new Pawn('white','H2',false,'Pawn'),
    3:'',
    4:'',
    5:'',
    6:'',
    7:new Pawn('black','H7',false,'Pawn'),
    8:new Rook('black','H8',false,'Rook'),
  },
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
//     7:new Pawn('white','H7',true,'Pawn'),
//     // 7:new Pawn('black','H7',false,'Pawn'),
//     // 7:'',
//     8:new Rook('black','H8',false,'Rook'),
//   },
// }

export const boardStartStateCopy=_.cloneDeep(boardStartState);