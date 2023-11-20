import React,{Component} from 'react';
import SingleTimer from './Timer/TemplateTimer';

export default class Switch extends Component{
  state={
    start:false,
  }
  render(){
    const {whiteTure,size}=this.props;
    const color=whiteTure?'black':'white'
    const styles={
      switch:{
        background:'grey',
        height:`${size}px`,
        // height:`${size*2}px`,
        // width:`${size/2}px`,
        width:`${size}px`,
        display:'grid',
        justifyItems:'center',
        padding:`${size/16}px`,
        position:'relative',
        
        
        // alignContent:'space-between',
        alignContent:'space-around',
      },
      slider:{
        position:'absolute',



        background:whiteTure?'white':'black',
        border:`solid ${color} 1px`,
        boxShadow:`2px 2px ${color}`,
        height:`${size*7/16}px`,
        // width:`${size*3/8}px`,
        width:`${size*6/8}px`,
        transform:`translateY(${whiteTure?size*7/16:0}px)`,
        transition:'all 0.4s ease-in-out',
      },
    }
    const startStopTime=()=>this.setState({start:!this.state.start})
    return(
      <div id='switch' style={styles.switch} onClick={startStopTime}>
        <SingleTimer startStopTime={startStopTime} condition={!whiteTure} start={this.state.start}
        
        whiteTure={whiteTure}
        />
        <SingleTimer startStopTime={startStopTime} condition={whiteTure} start={this.state.start}
        
        whiteTure={whiteTure}
        />
        <div style={styles.slider}/>
      </div>
    )
  }
}