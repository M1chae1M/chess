import React, {Component} from "react";
import {figure} from "./_document";

class MoveNotification extends Component{
  render(){
    const styles={
      MoveNotification:{
        display:'grid',
        gridAutoFlow:'column',
        alignItems:'center',
      },
    }
    return(
      <div style={styles.MoveNotification}>
        {this.props.children}
      </div>
    )
  }
}

export default class ChessNotification extends Component{
  render(){
    const {notification}=this.props;
    return(
      <div>
        {
          notification&&
          notification.map(({color, figureToDraw, text, moveID})=>
            <MoveNotification key={moveID}>
              {moveID}.
              {figure?.[color]?.[`${figureToDraw}`]?.()}
              {text}
            </MoveNotification>)
        }
      </div>
    )
  }
}