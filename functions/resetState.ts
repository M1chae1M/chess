import boardStartState from '../components/boardStartState'
import resetStateInterface from '@/types/interface/resetStateInterface'

const resetState:resetStateInterface={
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

export default resetState