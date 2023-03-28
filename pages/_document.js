import {Html,Head,Main,NextScript} from 'next/document'
import {TbChessBishopFilled, TbChessRookFilled, TbChessRook, TbChess, TbChessBishop, TbChessFilled, TbChessKingFilled, TbChessKing, TbChessKnightFilled, TbChessKnight, TbChessQueenFilled, TbChessQueen} from 'react-icons/tb';

// export const homePositions={
//   A:[
//     {figure:'Rook',color:'white', moved:false}, 
//     {figure:'Pawn',color:'white', moved:false},
//     {figure:''},
//     {figure:''},
//     {figure:''},
//     {figure:''}, 
//     {figure:'Pawn',color:'black', moved:false}, 
//     {figure:'Rook',color:'black', moved:false}
//   ],
//   B:[
//     {figure:'Knight',color:'white'}, 
//     {figure:'Pawn',color:'white', moved:false},
//     {figure:''},
//     {figure:''},
//     {figure:''},
//     {figure:''}, 
//     {figure:'Pawn',color:'black', moved:false}, 
//     {figure:'Knight',color:'black'}
//   ],
//   C:[
//     {figure:'Bishop',color:'white'}, 
//     {figure:'Pawn',color:'white', moved:false},
//     {figure:''},
//     {figure:''},
//     {figure:''},
//     {figure:''}, 
//     {figure:'Pawn',color:'black', moved:false}, 
//     {figure:'Bishop',color:'black'}
//   ],
//   D:[
//     {figure:'Queen',color:'white'}, 
//     {figure:'Pawn',color:'white', moved:false},
//     {figure:''},
//     {figure:''},
//     {figure:''},
//     {figure:''}, 
//     {figure:'Pawn',color:'black', moved:false}, 
//     {figure:'Queen',color:'black'}
//   ],
//   E:[
//     {figure:'King', attackedField:false, chequered:false, color:'white', moved:false}, 
//     {figure:'Pawn',color:'white', moved:false},
//     // {figure:''},
//     {figure:'Bishop',color:'black'},
//     {figure:''},
//     {figure:''},
//     {figure:''}, 
//     {figure:'Pawn',color:'black', moved:false}, 
//     {figure:'King', attackedField:false, chequered:false, color:'black', moved:false}
//   ],
//   F:[
//     {figure:'Bishop',color:'white'}, 
//     {figure:'Pawn',color:'white', moved:false},
//     {figure:''},
//     {figure:''},
//     {figure:''},
//     {figure:''}, 
//     {figure:'Pawn',color:'black', moved:false}, 
//     {figure:'Bishop',color:'black'}
//   ],
//   G:[
//     {figure:'Knight',color:'white'}, 
//     {figure:'Pawn',color:'white', moved:false},
//     // {figure:''},
//     {figure:'Queen',color:'black'},
//     {figure:''},
//     {figure:''},
//     {figure:''}, 
//     {figure:'Pawn',color:'black', moved:false}, 
//     {figure:'Knight',color:'black'}
//   ],
//   H:[
//     {figure:'Rook',color:'white', moved:false}, 
//     {figure:'Pawn',color:'white', moved:false},
//     // {figure:''},
//     {figure:'Knight', color:'white'},
//     {figure:''},
//     {figure:''},
//     {figure:''}, 
//     {figure:'Pawn',color:'black', moved:false}, 
//     {figure:'Rook',color:'black', moved:false},
//   ],
// }

export const figure={
  white:{
    Bishop:TbChessBishop,
    Rook:TbChessRook,
    Pawn:TbChess,
    King:TbChessKing,
    Knight:TbChessKnight,
    Queen:TbChessQueen,
  },
  black:{
    Bishop:TbChessBishopFilled,
    Rook:TbChessRookFilled,
    Pawn:TbChessFilled,
    King:TbChessKingFilled,
    Knight:TbChessKnightFilled,
    Queen:TbChessQueenFilled,
  }
}

export const homePositions={
  A:[
    {figure:'Rook',color:'white', moved:false}, 
    {figure:'Pawn',color:'white', moved:false},
    {figure:''},
    {figure:''},
    {figure:''},
    {figure:''}, 
    {figure:'Pawn',color:'black', moved:false}, 
    {figure:'Rook',color:'black', moved:false}
  ],
  B:[
    {figure:'Knight',color:'white'}, 
    {figure:'Pawn',color:'white', moved:false},
    {figure:''},
    {figure:''},
    {figure:''},
    {figure:''}, 
    {figure:'Pawn',color:'black', moved:false}, 
    {figure:'Knight',color:'black'}
  ],
  C:[
    {figure:'Bishop',color:'white'}, 
    {figure:'Pawn',color:'white', moved:false},
    {figure:''},
    {figure:''},
    {figure:''},
    {figure:''}, 
    {figure:'Pawn',color:'black', moved:false}, 
    {figure:'Bishop',color:'black'}
  ],
  D:[
    {figure:'Queen',color:'white'}, 
    {figure:'Pawn',color:'white', moved:false},
    {figure:''},
    {figure:''},
    {figure:''},
    {figure:''}, 
    {figure:'Pawn',color:'black', moved:false}, 
    {figure:'Queen',color:'black'}
  ],
  E:[
    {figure:'King', attackedField:false, chequered:false, color:'white', moved:false}, 
    {figure:'Pawn',color:'white', moved:false},
    {figure:''},
    {figure:''},
    {figure:''},
    {figure:''}, 
    {figure:'Pawn',color:'black', moved:false}, 
    {figure:'King', attackedField:false, chequered:false, color:'black', moved:false}
  ],
  F:[
    {figure:'Bishop',color:'white'}, 
    {figure:'Pawn',color:'white', moved:false},
    {figure:''},
    {figure:''},
    {figure:''},
    {figure:''}, 
    {figure:'Pawn',color:'black', moved:false}, 
    {figure:'Bishop',color:'black'}
  ],
  G:[
    {figure:'Knight',color:'white'}, 
    {figure:'Pawn',color:'white', moved:false},
    {figure:''},
    {figure:''},
    {figure:''},
    {figure:''}, 
    {figure:'Pawn',color:'black', moved:false}, 
    {figure:'Knight',color:'black'}
  ],
  H:[
    {figure:'Rook',color:'white', moved:false}, 
    {figure:'Pawn',color:'white', moved:false},
    {figure:''},
    {figure:''},
    {figure:''},
    {figure:''}, 
    {figure:'Pawn',color:'black', moved:false}, 
    {figure:'Rook',color:'black', moved:false},
  ],
}

export default function Document(){
  return(
    <Html lang="pl">
      <Head/>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )
}