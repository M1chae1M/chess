import React, {Component, PureComponent} from "react";
import {homePositions} from "./_document";

export default class Timers extends PureComponent{
  state={
    started:false,
    blackTimer:60000,
    whiteTimer:60000,
    // blackTimer:200,
    // whiteTimer:200,
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.started !== prevState.started) {
  //     // this.setState({ blackTimer: 300, whiteTimer: 300 });
  //     this.countDownTime(this);
  //   }
  // }
  // countDownTime(component){
  //   const cutTime=(actTime)=>{
  //     let actualTime=actTime;
  //     if(actualTime===0
  //       // && this.state.started===true
  //       ){
  //       this.setState({started:false});
  //       localStorage.removeItem('data');
  //       changeState({
  //         notation:[],
  //         figureState:homePositions,
  //         whiteOnMove:true,
  //         checkAttacksState:false,
  //       });
  //       changeState({moveID:1, movesWithoutBeat:0});


  //       // changeState({
  //       //   notation:[],
  //       //   figureState:homePositions,
  //       //   whiteOnMove:true,
  //       //   checkAttacksState:false,
  //       //   moveID:1,
  //       //   movesWithoutBeat:0
  //       // });
  //       alert(`${this.props.whiteOnMove?'Black':'White'} win this game!`);
  //     }
  //     else if(actualTime-1>=0){
  //       setTimeout(()=>{
  //         actualTime-=1;
  //         this.setState(this.props.whiteOnMove?{whiteTimer:actualTime}:{blackTimer:actualTime});
  //       },10);
  //     }
  //   }
  //   if(this.props.whiteOnMove){
  //     // cutTime(this.state.whiteTimer)
  //     cutTime(component.state.whiteTimer)
  //   }
  //   else if(!this.props.whiteOnMove){
  //     // cutTime(this.state.blackTimer)
  //     cutTime(component.state.blackTimer)
  //   }
  // }
  render(){
    const {started, whiteTimer, blackTimer}=this.state;
    const {whiteOnMove, changeState, whiteOnBottom}=this.props;
    const styles={
      Timers:{
        // padding:'5px',
        width:'fit-content',
        height:'fit-content',
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
              <div id="blackTimer">{showTime(blackTimer)}</div>
              <input id="TimeStartButton" type="button" value={!started?"Start":"Stop"} onClick={StartStop}/>
              <div id="whiteTimer">{showTime(whiteTimer)}</div>
            </>
            :
            <>
              <div id="whiteTimer">{showTime(whiteTimer)}</div>
              <input id="TimeStartButton" type="button" value={!started?"Start":"Stop"} onClick={StartStop}/>
              <div id="blackTimer">{showTime(blackTimer)}</div>
            </>
        }
      </div>
    )
  }
}