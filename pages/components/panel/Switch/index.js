import React,{Component} from 'react';
import SingleTimer from '../Timer/TemplateTimer';
import StartButton from '../Timer/StartButton';
import Slider from './Slider';
import {GameProvider} from '@/pages';
import CONFIG from '@/config/config.json'
const {size}=CONFIG??''

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
      <GameProvider.Consumer>
      {value=>{
        const {blackTimeRef,whiteTimeRef,resetGame}=value??{}
        return(
          <div style={style} onClick={startStopTime}>
            <StartButton start={start}/>
            <SingleTimer ref={blackTimeRef} startStopTime={startStopTime} start={start} color='black' condition={!whiteTure} resetGame={resetGame}/>
            <SingleTimer ref={whiteTimeRef} startStopTime={startStopTime} start={start} color='white' condition={whiteTure} resetGame={resetGame}/>
            <Slider whiteTure={whiteTure}/>
          </div>
        )
      }}
      </GameProvider.Consumer>
    )
  }
}