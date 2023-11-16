import React,{Component} from 'react';

const timeStep=250;

export default class Timer extends Component{
  state={
    start:false,
  }
  render(){
    const {whiteTure}=this.props
    const styles={
      Timer:{
        display:'grid',
        alignItems:'center',
        justifyItems:'center',
        // width:`${80/2}px`,
        width:`${80}px`,
        height:'100%',
      },
    }
    const startStopTime=()=>this.setState({start:!this.state.start})
    return(
      <div style={styles.Timer}>
        <BlackTimer start={this.state.start} whiteTure={whiteTure}/>
        <input type='button' onClick={startStopTime} value={!this.state.start?'Start':'Stop'}/>
        <WhiteTimer start={this.state.start} whiteTure={whiteTure}/>
      </div>
    )
  }
}

class WhiteTimer extends Component{
  state={
    whiteTime:50000
  }
  componentDidUpdate(){
    if(this.props.whiteTure && this.props.start){
      setTimeout(()=>this.setState({whiteTime:this.state.whiteTime-timeStep>=0?
        this.state.whiteTime-timeStep:
        0
      }),timeStep)
    }
  }
  render(){
    return <div>{timeDisplayFormat(this.state.whiteTime)}</div>
  }
}

class BlackTimer extends Component{
  state={
    blackTime:50000
  }
  componentDidUpdate(){
    if(!this.props.whiteTure && this.props.start){
      setTimeout(()=>this.setState({blackTime:this.state.blackTime-timeStep>=0?
        this.state.blackTime-timeStep:
        0
      }),timeStep)
    }
  }
  render(){
    return <div>{timeDisplayFormat(this.state.blackTime)}</div>
  }
}

function roundTo00(liczba){
  const stringed=liczba.toString().slice(0, 2);
  return liczba<10?`0${stringed}`:stringed
}

function timeDisplayFormat(time_in_ms) {
  const time=new Date(time_in_ms);
  const min=roundTo00(time.getUTCMinutes())
  const sec=roundTo00(time.getUTCSeconds())
  const ms=roundTo00(time.getUTCMilliseconds())

  return `${min}:${sec}:${ms}`;
}