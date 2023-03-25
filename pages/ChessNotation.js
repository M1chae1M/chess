import React, {Component} from "react";
import {figure, positions} from "./_document";

class MoveNotation extends Component{
  render(){
    const styles={
      MoveNotation:{
        display:'grid',
        gridAutoFlow:'column',
        alignItems:'center',
      },
    }
    return(
      <div style={styles.MoveNotation}>
        {this.props.children}
      </div>
    )
  }
}

export default class ChessNotation extends Component{
  render(){
    const {notation}=this.props;
    return(
      <div>
        {
          notation&&
          // notation.map(x=><MoveNotation>{figure} {text}</MoveNotation>)
          notation.map(({color, figureToDraw, text, moveID})=><MoveNotation key={moveID}>
            {/* {figure?.[color]?.[figure]()} */}
            {/* {figure[color][figureToDraw]()} */}
            {/* {figure[color]['Pawn']?.()} */}
            {moveID}.
            {figure?.[color]?.[`${figureToDraw}`]?.()}
      
            {/* {figure?.[color]?.[figure]()} */}
            {/* {figureToDraw} */}
            {text}</MoveNotation>)
        }
      </div>
    )
  }
}