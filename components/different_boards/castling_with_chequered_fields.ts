import Pawn from '@/classes/figures/Pawn'
import Queen from '@/classes/figures/Queen'
import King from '@/classes/figures/King'
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
    1:'',
    2:new Pawn('white','B2',false,'Pawn'),
    3:'',
    4:'',
    5:'',
    6:'',
    7:new Pawn('black','B7',false,'Pawn'),
    8:''
  },
  C:{
    1:'',
    2:new Pawn('white','C2',false,'Pawn'),
    3:'',
    4:'',
    5:'',
    6:'',
    7:new Pawn('black','C7',false,'Pawn'),
    8:''
  },
  D:{
    1:new Queen('white','D1',false,'Queen'),
    2:new Pawn('white','D2',false,'Pawn'),
    3:'',
    4:new Queen('black','D4',true,'Queen'),
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
    1:'',
    2:'',
    3:'',
    4:'',
    5:'',
    6:'',
    7:new Pawn('black','F7',false,'Pawn'),
    8:'',
  },
  G:{
    1:'',
    2:'',
    3:'',
    4:'',
    5:'',
    6:'',
    7:new Pawn('black','G7',false,'Pawn'),
    8:'',
  },
  H:{
    1:new Rook('white','H1',false,'Rook'),
    2:'',
    3:'',
    4:'',
    5:'',
    6:'',
    7:new Pawn('black','H7',false,'Pawn'),
    8:new Rook('black','H8',false,'Rook'),
  },
}

export default boardStartState