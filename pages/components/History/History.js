import React,{Component} from "react";
import PointInHistory from "./PointInHistory";
import CloseBTN from "./CloseBTN";
import HistoryAnimation from "./HistoryAnimation";
import ScrollableHistory from "./ScrollableHistory";

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
    return(
      <HistoryAnimation showHistory={showHistory}>
        <div style={style}>
          <CloseBTN onClick={show_or_close_history}/>
          History
          <ScrollableHistory>
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
          </ScrollableHistory>
        </div>
      </HistoryAnimation>
    )
  }
}