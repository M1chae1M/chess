import React,{Component} from 'react';
import SingleTimer from './TemplateTimer';
import {GameProvider} from '@/pages';

export default class Timer extends Component{
  state={
    start:false,
  }
  render(){
    const style={
      display:'grid',
      alignItems:'center',
      justifyItems:'center',
      width:`${80}px`,
      height:'100%',
    }
    const startStopTime=()=>this.setState({start:!this.state.start})
    return(
      <GameProvider.Consumer>
      {value=>{
        const {whiteTure}=value??{}
        return(
          <div style={style}>
            <SingleTimer startStopTime={startStopTime} condition={!whiteTure} start={this.state.start}/>
            <input type='button' onClick={startStopTime} value={!this.state.start?'Start':'Stop'}/>
            <SingleTimer startStopTime={startStopTime} condition={whiteTure} start={this.state.start}/>
          </div>
        )
      }}
      </GameProvider.Consumer>
    )
  }
}