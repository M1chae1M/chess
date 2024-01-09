import Pawn from '@/classes/figures/Pawn'
import Queen from '@/classes/figures/Queen'
import King from '@/classes/figures/King'
import Bishop from '@/classes/figures/Bishop'
import Knight from '@/classes/figures/Knight'
import Rook from '@/classes/figures/Rook'

const boardStartState={
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
    2:new Pawn('black','G2',true,'Pawn'),
    3:'',
    4:'',
    5:'',
    6:'',
    7:new Pawn('white','G7',true,'Pawn'),
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

export default boardStartState