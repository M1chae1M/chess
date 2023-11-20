import React,{Component} from 'react';
import SingleTimer from '../Timer/TemplateTimer';
import StartButton from '../Timer/StartButton';
import size from '@/config/size.json'
import Slider from './Slider';

export default class Switch extends Component{
  state={
    start:false,
  }
  render(){
    const {start}=this.state
    const {whiteTure,whiteOnTop}=this.props;
    const style={
      rotate:!whiteOnTop?'180deg':'0deg',
      background:'grey',
      height:`${size}px`,
      width:`${size}px`,
      display:'grid',
      justifyItems:'center',
      position:'relative',
      padding:'5px',
    }
    const startStopTime=()=>this.setState({start:!this.state.start})
    return(
      <div id='switch' style={style} onClick={startStopTime}>
        <StartButton start={start}/>
        <SingleTimer startStopTime={startStopTime} start={start} color='black' condition={!whiteTure}/>
        <SingleTimer startStopTime={startStopTime} start={start} color='white' condition={whiteTure}/>
        <Slider whiteTure={whiteTure}/>
      </div>
    )
  }
}