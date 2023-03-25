import React, {Component} from "react";
import {figure, positions} from "./_document";

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
          // notification.map(x=><Movenotification>{figure} {text}</Movenotification>)
          notification.map(({color, figureToDraw, text, moveID})=><MoveNotification key={moveID}>
            {/* {figure?.[color]?.[figure]()} */}
            {/* {figure[color][figureToDraw]()} */}
            {/* {figure[color]['Pawn']?.()} */}
            {moveID}.
            {figure?.[color]?.[`${figureToDraw}`]?.()}
      
            {/* {figure?.[color]?.[figure]()} */}
            {/* {figureToDraw} */}
            {text}</MoveNotification>)
        }
      </div>
    )
  }
}