import FigureUnionType from '@/types/type/FigureUnionType'
import fieldUnionType from '@/types/type/fieldUnionType'
import boardInterface from '@/types/interface/boardInterface'
import historyType from '@/types/type/historyType'

export default interface resetStateInterface{
    whiteTure:boolean,
    boardGameState:boardInterface,
    firstTouch:boolean,
    fromField:fieldUnionType,
    isModalOpened:boolean,
    promoteTo:FigureUnionType,
    kingAttacked:boolean,
    gameHistory:historyType,
    fiftyMovesRule:number,
    canAnimate:boolean,
    animateX:number,
    animateY:number,
    actualMove:number,
}