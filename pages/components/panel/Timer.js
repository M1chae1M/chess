import React,{Component} from 'react';

export default class Timer extends Component{
  state={
    white:5000, // ms
    // black:5000, // ms
    start:false,
  }
  componentDidUpdate(){
    this.state.white>0 &&
    setTimeout(()=>this.setState({white:this.state.white-1000}),1000);
  }
  shouldComponentUpdate(next,prev){
    if(
      prev.white!==this.state.white ||
      prev.start!==this.state.start
      ){
      return true
    }
    return false
  }
  render(){
    const styles={
      Timer:{
        display:'grid',
        alignItems:'center',
        justifyItems:'center',
        width:`${80/2}px`,
        height:'100%',
      },
    }


    const startTime=()=>{
      this.setState({start:true})
    }
    return(
      <div style={styles.Timer}>
        {/* <div>0:00</div> */}
        <button onClick={startTime}>start time</button>
        {/* <div>{this.state.black}</div> */}
        <input type='button' value='Start'/>
        {/* <div>0:00</div> */}
        <div>{this.state.white}</div>
      </div>
    )
  }
}