import {GameProvider} from '@/pages';
import React,{Component} from 'react';
import CONFIG from '@/config/config.json'
import {timeDisplayFormat} from '@/functions/timeDisplayFormat';
const {size,timePerPlayer}=CONFIG??''

export class TemplateTimer extends Component{
  state={
    time:timePerPlayer,
    timeStep:250,
  }
  componentDidUpdate(){
    const {timeStep,time}=this.state
    const {condition,start,startStopTime,resetGame}=this.props

    if(condition && start){
      const newTime=this.state.time-timeStep
      if(newTime<=0){
        startStopTime?.();
        resetGame();

        setTimeout(()=>{
          alert(`You're out of time!`);
        },timeStep)
      }else{
        setTimeout(()=>this.setState({time:newTime>0?newTime:timePerPlayer}),timeStep);
      }
    }
  }
  reset=()=>this.setState({time:timePerPlayer})
  render(){
    return <GameProvider.Consumer>
    {value=>{
      const {whiteTure}=value??{}
      const {time}=this.state
      const {color}=this.props
      const style={
        rotate:color==='white'?'0deg':'180deg',
        rotate:whiteTure?'0deg':'180deg',
        color:whiteTure?'black':'white',
        zIndex:2000,
        display:'grid',
        alignItems:'center',
        justifyContent:'center',
        justifyItems:'center',
        height:`${size*7/16}px`,
        width:`${size*6/8}px`,
      }
      return <div style={style}>{timeDisplayFormat(time)}</div>
    }}
    </GameProvider.Consumer>
  }
}

export default TemplateTimer