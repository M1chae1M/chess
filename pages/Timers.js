import React, {Component} from "react";
import {homePositions} from "./_document";

export default class Timers extends Component{
  state={
    started:false,
    // blackTimer:60000,
    // whiteTimer:60000,
    blackTimer:200,
    whiteTimer:200,
  }
  render(){
    const {started, whiteTimer, blackTimer}=this.state;
    const {whiteOnMove, changeState}=this.props;
    const StartStop=()=>{
      this.setState({started:!this.state.started})
    }
    const countDownTime=()=>{
      const cutTime=(actTime)=>{
        let actualTime=actTime;
        if(actualTime===0 && this.state.started===true){
          this.setState({started:false});
          localStorage.removeItem('data');
          changeState({
            notation:[],
            figureState:homePositions,
            whiteOnMove:true,
            checkAttacksState:false,
          });
          changeState({moveID:1, movesWithoutBeat:0});


          // changeState({
          //   notation:[],
          //   figureState:homePositions,
          //   whiteOnMove:true,
          //   checkAttacksState:false,
          //   moveID:1,
          //   movesWithoutBeat:0
          // });
          alert(`${whiteOnMove?'Black':'White'} win this game!`);
        }
        else if(actualTime-1>=0){
          setTimeout(()=>{
            actualTime-=1;
            this.setState(whiteOnMove?{whiteTimer:actualTime}:{blackTimer:actualTime});
          },10);
        }
      }
      if(whiteOnMove){
        cutTime(this.state.whiteTimer)
      }
      else if(!whiteOnMove){
        cutTime(this.state.blackTimer)
      }
    }
    const showTime=(actualTimer)=>{
      const timerSecounds=((actualTimer-Math.floor(actualTimer/60/100)*100*60)/100).toFixed(0);
      return `${Math.floor(actualTimer/60/100)}:${timerSecounds<10?"0"+timerSecounds:timerSecounds}`
    }
    return(
      <div id='Timers'>
        {this.state.started===true && countDownTime()}
        <input type="button" value={!started?"Start":"Stop"} onClick={StartStop}/>
        <div id="blackTimer">{showTime(blackTimer)}</div>
        <div id="whiteTimer">{showTime(whiteTimer)}</div>
      </div>
    )
  }
}