import React,{Component} from 'react';
import SingleTimer from '../Timer/TemplateTimer';
import StartButton from '../Timer/StartButton';
import Slider from './Slider';
import {GameProvider} from '@/pages';
import CONFIG from '@/config/config.json'
const {size}=CONFIG??''


import Countdown from 'react-countdown';

export default class Switch extends Component{
  state={
    start:false,
  }
  startStopTime=()=>this.setState({start:!this.state.start})
  changeState=(newState)=>this.setState(newState) 
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
    return(
      <GameProvider.Consumer>
      {value=>{
        const {blackTimeRef,whiteTimeRef,resetGame}=value??{}


        const onComplete = () => {
          console.log('Odliczanie zakończone!');
        }
        const renderer=({minutes,seconds,milliseconds})=>(
          <span>{minutes}:{seconds}:{milliseconds}</span>
        )
        return(
          <div style={style} onClick={this.startStopTime}>


          <Countdown date={Date.now() + 10000} onComplete={onComplete} renderer={renderer}/>

            {/* <StartButton start={start}/>
            <SingleTimer ref={blackTimeRef} startStopTime={this.startStopTime} start={start} color='black' condition={!whiteTure} resetGame={resetGame}/>
            <SingleTimer ref={whiteTimeRef} startStopTime={this.startStopTime} start={start} color='white' condition={whiteTure} resetGame={resetGame}/>
            <Slider whiteTure={whiteTure}/> */}
          </div>
        )
      }}
      </GameProvider.Consumer>
    )
  }
}