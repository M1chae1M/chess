import React,{Component} from 'react';
import {fieldSize,boardStartState} from '../_document';
// import {fieldSize} from '../_document';
import {GameProvider} from '..';
import {ifBlackFunction} from '../classes/Functions';

export default class Field extends Component{
  render(){
    return(
      <GameProvider.Consumer>
      {value=>{
        const {boardGameState,whiteOnTop}=value??{}
        const {x,y,touch}=this.props??{};
        const click=()=>{
          touch(`${x}${y}`)
        }
        // const base=boardStartState?.[x]?.[y]
        const base=boardGameState?.[x]?.[y]
        const Figure=()=>base?.returnFigure?.()


        const {kingAttacked,whiteTure}=value??{}
        const isKing=base?.getName?.()==='King'
        const isColor=base?.goodTure?.(whiteTure)
        const color=ifBlackFunction(x,y)
        const style={
          width:fieldSize,
          height:fieldSize,
          border:'solid black 1px',
          display:'grid',
          justifyItems:'center',
          alignItems:'center',
          background:kingAttacked && isKing && isColor?'red':color,
          fontSize:'35px',
          transition:'all 0.2s ease-in-out',
        }
        return(
          <div style={style} onClick={click} className='Field'>
            <Figure/>
          </div>
        )
      }}
      </GameProvider.Consumer>
    )
  }
}