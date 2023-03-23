import React, {Component} from "react";

export default class Board extends Component{
  render(){
    const {children}=this.props;
    const styles={
      Board:{
        display:'grid',
        width:'fit-content',
        height:'fit-content',
        border:'solid black 1px',
      },
    }
    return(
      <div id="Board" style={styles.Board}>
        {children}
      </div>
    )
  }
}