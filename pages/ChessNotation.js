import React, {Component} from "react";
import {figure} from "./_document";
import MoveNotation from "./MoveNotation";

export default class ChessNotation extends Component{
  render(){
    const {notation, showHistoricalMove}=this.props;
    const styles={
      ChessNotation:{
        padding:'0 5px',
        // maxHeight:'300px',
        maxHeight:'250px',
        // maxHeight:'100%',
        width:'150px',
        // overflow:'overlay',
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