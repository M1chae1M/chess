import React,{Component} from 'react'
import fieldSize from '@/config/fieldSize.json'
import {GameProvider} from '..'
import {ifBlackFunction} from '../classes/Functions'

export default class Field extends Component{
  render(){
    return(
      <GameProvider.Consumer>
      {value=>{
        const {boardGameState}=value??{}
        const {x,y,touch}=this.props??{};
        const click=()=>touch(`${x}${y}`)
        const base=boardGameState?.[x]?.[y]
        const Figure=()=>base?.getFigure?.()
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
          // fontSize:'35px',
          // fontSize:`min(5vw, 35px)`,
          fontSize:fieldSize,
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