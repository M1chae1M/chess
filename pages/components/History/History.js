import React,{Component} from "react"
import PointInHistory from "./PointInHistory"
import CloseBTN from "./CloseBTN"
import HistoryAnimation from "./HistoryAnimation"
import ScrollableHistory from "./ScrollableHistory"
import {GameProvider} from "@/pages"
import CONFIG from '@/config/config.json'
const {size}=CONFIG??{}

export default class History extends Component{
  render(){
    const style={
      height:'100vh',
      borderLeft:'solid grey 3px',
      width:'max(20vw, 300px)',
      textAlign:'center',
      backdropFilter:'blur(5px)',
      fontSize:`calc(${size} / 2.5)`,
    }
    return(
      <GameProvider.Consumer>
      {value=>{
        const {showHistory,show_or_close_history,gameHistory,actualMove,getBoardFromHistory}=value??{};
        return(
          <HistoryAnimation showHistory={showHistory}>
            <div style={style}>
              <CloseBTN onClick={show_or_close_history}/>
              History
              <ScrollableHistory>
                {gameHistory?.map(({lastMove},i)=>
                  <PointInHistory key={i} lastMove={lastMove} id={i} getBoardFromHistory={getBoardFromHistory} actualMove={actualMove}/>
                )}
              </ScrollableHistory>
            </div>
          </HistoryAnimation>
        )
      }}
      </GameProvider.Consumer>
    )
  }
}