import React,{Component} from "react";
import {figureIcons} from "@/pages/_document";
import {AiOutlineArrowRight} from 'react-icons/ai';
import {GameProvider} from "@/pages";
import _ from 'lodash';

export default class PointInHistory extends Component{
  render(){
    const {lastMove,id,board}=this.props
    const {fromField,clicked,color,figure}=lastMove||''
    const style={
      display:'grid',
      gridAutoFlow:'column',
      justifyItems:'center',
      alignItems:'center',
      justifyContent:'space-evenly',
    }
    const figureIcon=figureIcons?.[color]?.[figure]
    const description=`${id+1}. ${fromField}`
    return(
      <GameProvider.Consumer>
      {value=>{
        const {backToHistory}=value??{}
        // const onClick=()=>backToHistory?.(_.cloneDeep(board))
        const onClick=()=>{}
        return(
          <div style={style} onClick={onClick}>
            {description}<AiOutlineArrowRight/>{clicked}
            {figureIcon}
          </div>
        )
      }}
      </GameProvider.Consumer>
    )
  }
}