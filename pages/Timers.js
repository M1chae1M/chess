import React, {Component, PureComponent} from "react";
import {homePositions} from "./_document";
import StartStopButton from "./StartStopButton";

export default class Timers extends PureComponent{
  state={
    started:false,
    blackTimer:60000,
    whiteTimer:60000,
  }
  componentDidMount(){
      this.downloadLastTimeFromStorage(this);
  }
  componentDidUpdate(prev, next){
    if(this.props.resetTimers !== prev.resetTimers){
      this.setState({whiteTimer:60000, started:false, blackTimer:60000, });
    }
  }
  downloadLastTimeFromStorage=(component)=>{
    const downloadedData=localStorage.getItem('data');
    const parsed=downloadedData && JSON.parse(downloadedData);
    parsed && component.setState({
      blackTimer:parseInt(parsed?.time?.black),
      whiteTimer:parseInt(parsed?.time?.white),
    })
  }
  render(){
    const {started, whiteTimer, blackTimer}=this.state;
    const {whiteOnMove, changeState, whiteOnBottom, whiteActualTimerRef, blackActualTimerRef}=this.props;
    const styles={
      Timers:{
        display:'grid',
        alignItems:'center',
        gridTemplateRows:'auto auto auto',
        gridTemplateRows:'1fr auto 1fr',
        padding:'0 5px',
        overflow:'hidden',
        width:'fit-content',
        height:'fit-content',
      },
      time:{
        margin:'2.5px 0',
        width:'auto',
        height:'auto',
      },
    }
    const StartStop=()=>{
      this.setState({started:!this.state.started})
    }
    const countDownTime=()=>{
      const cutTime=(actTime)=>{
        let actualTime=actTime;
        if(actualTime===0 && this.state.started){
          this.setState({started:false});
          localStorage.removeItem('data');
          changeState({
            notation:[],
            figureState:homePositions,
            whiteOnMove:true,
            checkAttacksState:false,
          });
          changeState({moveID:1, movesWithoutBeat:0});
          alert(`${whiteOnMove?'Black':'White'} win this game!`);
        }
        else if(actualTime-1>=0){
          setTimeout(()=>{
            actualTime-=1;
            this.setState(whiteOnMove?{whiteTimer:actualTime}:{blackTimer:actualTime});
          },10);
        }
      }
      if(whiteOnMove) cutTime(this.state.whiteTimer)
      else if(!whiteOnMove) cutTime(this.state.blackTimer)
    }
    const showTime=(actualTimer)=>{
      const timerSecounds=((actualTimer-Math.floor(actualTimer/60/100)*100*60)/100).toFixed(0);
      return `${Math.floor(actualTimer/60/100)}:${timerSecounds<10?"0"+timerSecounds:timerSecounds}`
    }


    this.state.started===true && countDownTime();
    return(
      <div id='Timers' style={styles.Timers}>
        {
          whiteOnBottom?
            <>
              <div time={blackTimer} ref={blackActualTimerRef} style={styles.time} id="blackTimer">{showTime(blackTimer)}</div>
              <StartStopButton started={started} StartStop={StartStop}/>
              <div time={whiteTimer} ref={whiteActualTimerRef} style={styles.time} id="whiteTimer">{showTime(whiteTimer)}</div>
            </>
            :
            <>
              <div time={whiteTimer} ref={whiteActualTimerRef} style={styles.time} id="whiteTimer">{showTime(whiteTimer)}</div>
              <StartStopButton started={started} StartStop={StartStop}/>
              <div time={blackTimer} ref={blackActualTimerRef} style={styles.time} id="blackTimer">{showTime(blackTimer)}</div>
            </>
        }
      </div>
    )
  }
}