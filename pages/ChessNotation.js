import React, {Component} from "react";
import {figure} from "./_document";
import MoveNotation from "./MoveNotation";

export default class ChessNotation extends Component{
  render(){
    const {notation, showHistoricalMove}=this.props;
    const styles={
      ChessNotation:{
        maxHeight:'300px',
        width:'150px',
        overflowY:'scroll',
      }
    }
    return(
      <div id="ChessNotation" style={styles.ChessNotation}>
        {
          notation&&
          notation.map(({color, figureToDraw, text, moveID})=>
            <MoveNotation key={moveID} moveID={moveID} showHistoricalMove={showHistoricalMove}>
              {moveID}.
              {figure?.[color]?.[`${figureToDraw}`]?.()}
              {text}
            </MoveNotation>)
        }
      </div>
    )
  }
}