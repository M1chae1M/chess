import React, {Component} from "react";

export default class StartStopButton extends Component{
  render(){
    const {started, StartStop}=this.props;
    const styles={
      button:{
        margin:'2.5px 0',
        border:'transparent 3px solid',
      },
    }
    return(
      <input style={styles.button} id="TimeStartButton" type="button" value={!started?"Start":"Stop"} onClick={StartStop}/>
    )
  }
}