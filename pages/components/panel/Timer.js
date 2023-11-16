import React,{Component} from 'react';

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
        width:`${80/2}px`,
        height:'100%',
      },
    }
    const startStopTime=()=>this.setState({start:!this.state.start})
    return(
      <div style={styles.Timer}>
        {whiteTure?'białe':'czarne'}
        <BlackTimer start={this.state.start} whiteTure={whiteTure}/>
        <input type='button' onClick={startStopTime} value='Start'/>
        <WhiteTimer start={this.state.start} whiteTure={whiteTure}/>
      </div>
    )
  }
}

class WhiteTimer extends Component{
  state={
    white:50000, // ms
  }
  componentDidUpdate(next,prev){
      if(this.props.whiteTure && this.props.start){
        setTimeout(()=>this.setState({white:this.state.white-500>=0?
          this.state.white-500:
          0
        }),500)
      }
  }
  render(){
    return <div>{this.state.white}</div>
  }
}

class BlackTimer extends Component{
  state={
    black:50000, // ms
  }
  componentDidUpdate(next,prev){
    if(!this.props.whiteTure && this.props.start){
      setTimeout(()=>this.setState({black:this.state.black-500>=0?
        this.state.black-500:
        0
      }),500)
    }
  }
  render(){
    return <div>{this.state.black}</div>
  }
}