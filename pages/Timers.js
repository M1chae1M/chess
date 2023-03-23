import React, {Component} from "react";

export default class Timers extends Component{
  state={
    started:false,
    blackTimer:600,
    whiteTimer:600,
  }
  render(){
    const {started, whiteTimer, blackTimer}=this.state;
    const {whiteOnMove}=this.props;
    const StartStop=()=>{
      this.setState({started:!this.state.started})
    }

    const countDownTime=()=>{
    
      

    

      


    }
    const showTime=(actualTimer)=>{
      const timerSecounds=(actualTimer-Math.floor(actualTimer/60)*60)
      return `${Math.floor(actualTimer/60)}:${timerSecounds<10?"0"+timerSecounds:timerSecounds}`
    }
    return(
      <div id='Timers'>
        {this.state.started===true && countDownTime()}
        <input type="button" value={!started?"Start":"Stop"} onClick={StartStop}/>
        {/* <div id="blackTimer">{showTime(blackTimer)}</div> */}
        {/* <div id="whiteTimer">{showTime(whiteTimer)}</div> */}
        <div id="blackTimer">{blackTimer}</div>
        <div id="whiteTimer">{whiteTimer}</div>
        </div>
    )
  }
}