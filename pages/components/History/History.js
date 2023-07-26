import React,{Component} from "react";
import PointInHistory from "./PointInHistory";

export default class History extends Component{
  render(){
    const {gameHistory}=this.props;
    const styles={
      History:{
        right:'0%',
        top:'0%',
        height:'100vh',
        background:'grey',
        width:'20vw',
      },
    }
    return(
      <div style={styles.History}>
        History
        {/* {console.log(gameHistory)} */}
        {gameHistory?.map(({lastMove,board},i)=><PointInHistory key={lastMove.id} lastMove={lastMove} id={i} board={board}/>)}
      </div>
    )
  }
}