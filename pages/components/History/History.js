import React,{Component} from "react";
import PointInHistory from "./PointInHistory";
import CloseBTN from "./CloseBTN";
import HistoryAnimation from "./HistoryAnimation";

export default class History extends Component{
  render(){
    const {gameHistory,showHistory,show_or_close_history}=this.props;
    const style={
      right:'0%',
      top:'0%',
      height:'100vh',
      borderLeft:'solid grey 3px',
      width:'20vw',
      textAlign:'center',
    }
    const scollableHistory={
      overflow:'auto',
      maxHeight:'80%',
      height:'80%',
    }
    return(
      <HistoryAnimation showHistory={showHistory}>
        <div style={style}>
          <CloseBTN onClick={show_or_close_history}/>
          History
          <div style={scollableHistory}>
            {gameHistory?.map(({lastMove,board},i)=>
              <PointInHistory key={i} lastMove={lastMove} id={i} board={board}/>
            )}
            {/* <>
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
              {gameHistory?.map(({lastMove,board},i)=>
                <PointInHistory key={i} lastMove={lastMove} id={Math.floor(i/2)} board={board}/>
              )}
            </> */}
          </div>
        </div>
      </HistoryAnimation>
    )
  }
}