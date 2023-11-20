import React,{Component} from 'react';
import SingleTimer from './Timer/TemplateTimer';
import StartButton from './Timer/StartButton';
import size from '@/config/size.json'

export default class Switch extends Component{
  state={
    start:false,
  }
  render(){
    const {start}=this.state
    const {whiteTure,whiteOnTop}=this.props;
    const color=whiteTure?'black':'white'
    const styles={
      switch:{
        rotate:!whiteOnTop?'180deg':'0deg',
        background:'grey',
        height:`${size}px`,
        width:`${size}px`,
        display:'grid',
        justifyItems:'center',
        position:'relative',
        padding:'5px',
      },
      slider:{
        position:'absolute',
        background:whiteTure?'white':'black',
        border:`solid ${color} 1px`,
        boxShadow:`2px 2px ${color}`,
        height:`${size*7/16}px`,
        width:`${size*6/8}px`,
        top:'5px',
        transform:`translateY(${whiteTure?size*7/16:0}px)`,
        transition:'all 0.4s ease-in-out',
      },
    }
    const startStopTime=()=>this.setState({start:!this.state.start})
    return(
      <div id='switch' style={styles.switch} onClick={startStopTime}>
        <StartButton start={start}/>
        <SingleTimer startStopTime={startStopTime} start={start} color='black' condition={!whiteTure}/>
        <SingleTimer startStopTime={startStopTime} start={start} color='white' condition={whiteTure}/>
        <div style={styles.slider}/>
      </div>
    )
  }
}