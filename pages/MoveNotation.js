import React, {Component} from "react";

export default class MoveNotation extends Component{
  render(){
    const {showHistoricalMove, moveID}=this.props;
    const styles={
      MoveNotation:{
        display:'grid',
        gridAutoFlow:'column',
        alignItems:'center',
      },
    }
    return(
      <div style={styles.MoveNotation} onClick={()=>{showHistoricalMove(moveID-1)}}>
        {this.props.children}
      </div>
    )
  }
}