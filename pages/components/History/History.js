import React,{Component} from "react";
import PointInHistory from "./PointInHistory";

export default class History extends Component{
  render(){
    const {gameHistory}=this.props;
    const style={
      right:'0%',
      top:'0%',
      height:'100vh',
      background:'grey',
      width:'20vw',
    }
    return(
      <div style={style}>
        History
        {gameHistory?.map(({lastMove,board},i)=><PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>)}
      </div>
    )
  }
}