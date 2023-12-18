import React,{Component} from 'react'
import figureIcons from '@/components/figureIcons'
import {AiOutlineArrowRight} from 'react-icons/ai'
import _ from 'lodash'
import PointInHistoryContainer from './PointInHistoryContainer'

export default class PointInHistory extends Component{
  render(){
    const {lastMove,id,getBoardFromHistory,actualMove}=this.props
    const {fromField,clicked,color,figure}=lastMove||''
    const figureIcon=figureIcons?.[color]?.[figure]
    const ID=id % 2 === 0?`${Math.floor(id/2)+1}.`:''
    const onClick=()=>getBoardFromHistory?.(lastMove,id)
    const style={
      background:id===actualMove-1 && '#dcd4d4',
    }
    return(
      <PointInHistoryContainer style={style} onClick={onClick}>
        <div>{ID}</div>
        <div>{fromField}</div>
        <div><AiOutlineArrowRight/></div>
        <div>{clicked}</div>
        <div>{figureIcon}</div>
      </PointInHistoryContainer>
    )
  }
}