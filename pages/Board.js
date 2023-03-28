import React, {Component} from "react";

export default class Board extends Component{
  render(){
    const {children, whiteOnBottom}=this.props;
    const styles={
      Board:{
        display:'grid',
        width:'fit-content',
        height:'fit-content',
        border:'solid black 1px',
        position:'relative',
      },
    }
    return(
      <div id="Board" style={styles.Board}>
        {children}
      </div>
    )
  }
}