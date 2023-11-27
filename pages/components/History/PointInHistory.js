import React,{Component} from "react"
import {figureIcons} from "@/pages/_document"
import {AiOutlineArrowRight} from 'react-icons/ai'
import {GameProvider} from "@/pages"
import _ from 'lodash'

export default class PointInHistory extends Component{
  render(){
    const {lastMove,id,board,getBoardFromHistory}=this.props
    // const {lastMove,id,board}=this.props
    const {fromField,clicked,color,figure}=lastMove||''
    const style={
      display:'grid',
      gridTemplateColumns:'repeat(5, 1fr)',
      // gridTemplateColumns:'10% 20% 20% 20% 20%',
      gridAutoFlow:'column',
      justifyItems:'center',
      alignItems:'center',
      justifyContent:'space-evenly',
    }
    const figureIcon=figureIcons?.[color]?.[figure]
    const ID=id % 2 === 0?`${Math.floor(id/2)+1}.`:''
    return(
      <GameProvider.Consumer>
      {value=>{
        // const {gameHistory,getBoardFromHistory}=value??{}
        const onClick=()=>{
          getBoardFromHistory?.(
            lastMove?.stringifiedBoard
          )
        }
        return(
          <div style={style} onClick={onClick}>
            <div>{ID}</div>
            <div>{fromField}</div>
            <div><AiOutlineArrowRight/></div>
            <div>{clicked}</div>
            <div>{figureIcon}</div>
          </div>
        )
      }}
      </GameProvider.Consumer>
    )
  }
}