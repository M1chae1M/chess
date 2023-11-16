import React,{Component} from 'react';

export class TemplateTimer extends Component{
  state={
    time:50000,
    timeStep:250,
  }
  componentDidUpdate(){
    const {timeStep,time}=this.state
    const {condition,start,startStopTime}=this.props
    if(condition && start){
      const newTime=time-timeStep
      if(newTime<=0){
        startStopTime?.();
        alert(`skończył Ci się czas!`);
      }
      
      setTimeout(()=>this.setState({time:newTime>=0?newTime:0}),timeStep);
    }
  }
  render(){
    const {time}=this.state
    return <div>{timeDisplayFormat(time)}</div>
  }
}

function timeDisplayFormat(time_in_ms){
  function roundTo00(liczba){
    const stringed=liczba.toString().slice(0, 2);
    return liczba<10?`0${stringed}`:stringed
  }
  const time=new Date(time_in_ms);
  const min=roundTo00(time.getUTCMinutes())
  const sec=roundTo00(time.getUTCSeconds())
  const ms=roundTo00(time.getUTCMilliseconds())

  return `${min}:${sec}:${ms}`;
}

export default TemplateTimer