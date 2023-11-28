import React,{Component} from "react"
import {figureIcons} from "@/pages/_document"
import {AiOutlineArrowRight} from 'react-icons/ai'
import _ from 'lodash'

export default class PointInHistory extends Component{
  render(){
    const {lastMove,id,getBoardFromHistory}=this.props
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
    const onClick=()=>{
      getBoardFromHistory?.(lastMove,id)
      // console.log(lastMove?.figure)
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
  }
}