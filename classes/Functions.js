import Game from './Game'
import Xo from '@/config/Xo.json'
import Yo from '@/config/Yo.json'
import {boardStartState} from '../components/boardStartState'
import Pawn from './figures/Pawn'
import Bishop from './figures/Bishop'
import Queen from './figures/Queen'
import King from './figures/King'
import Knight from './figures/Knight'
import Rook from './figures/Rook'
import _ from 'lodash'

export const resetState={
  whiteTure:true,
  boardGameState:{...boardStartState},
  firstTouch:true,
  fromField:'',
  isModalOpened:false,
  promoteTo:'Queen',
  kingAttacked:false,
  gameHistory:[],
  fiftyMovesRule:0,
  canAnimate:false,
  animateX:0,
  animateY:0,
  actualMove:0,
}
const figureList={Pawn,Bishop,Queen,King,Knight,Rook}
export function boardModifier(board){
  const {boardGameState}=this?.state??{}
  if(board){
    Xo?.map(x=>
      Yo?.map(y=>{
        if(board?.[x]?.[y]===''){
          boardGameState[x][y]=board?.[x]?.[y];
        }else{
          const {actualField,color,moved,name}=board?.[x]?.[y]||{};
          const FigureClass=figureList[name];
          boardGameState[x][y]=FigureClass && new FigureClass(color,actualField,moved,name);
        }
      })
    )
  }
}