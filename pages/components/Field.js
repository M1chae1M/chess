import React,{Component} from 'react';
import {fieldSize,boardStartState} from '../_document';
import {GameProvider} from '..';
import {ifBlackFunction} from '../classes/Functions';

export default class Field extends Component{
  render(){
    const {x,y,touch}=this.props??{};
    const click=()=>{
      touch(`${x}${y}`)
    }
    return(
      <GameProvider.Consumer>
      {value=>{
        const {kingAttacked,whiteTure}=value??{}
        const base=boardStartState?.[x]?.[y]
        const figure=base?.returnFigure?.()
        const isKing=base?.getName?.()==='King'
        const isColor=base?.goodTure?.(whiteTure)
        const color=ifBlackFunction(x,y)

        const styles={
          Field:{
            width:fieldSize,
            height:fieldSize,
            border:'solid black 1px',
            display:'grid',
            justifyItems:'center',
            alignItems:'center',
            background:kingAttacked && isKing && isColor?'red':color,
            fontSize:'35px',
            transition:'all 0.2s ease-in-out',
          },
        }
        return(
          <div style={styles.Field} onClick={click} className='Field'>
            {figure}
          </div>
        )
      }}
      </GameProvider.Consumer>
    )
  }
}