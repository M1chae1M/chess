import React,{Component} from "react";
import PointInHistory from "./PointInHistory";
import CloseBTN from "./CloseBTN";

export default class History extends Component{
  render(){
    const {gameHistory,showHistory,show_or_close_history}=this.props;
    const style={
      right:'0%',
      top:'0%',
      height:'100vh',
      background:'grey',
      width:'20vw',
    }
    return(
      showHistory &&
      <div style={style}>
        <CloseBTN onClick={show_or_close_history}/>
        History
        {gameHistory?.map(({lastMove,board},i)=><PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>)}
      </div>
    )
  }
}