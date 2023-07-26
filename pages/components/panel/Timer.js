import React,{Component} from 'react';

export default class Timer extends Component{
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
    return(
      <div style={styles.Timer}>
        <div>0:00</div>
        <input type='button' value='Start'/>
        <div>0:00</div>
      </div>
    )
  }
}