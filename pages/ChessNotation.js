import React, {Component} from "react";

class MoveNotation extends Component{
  render(){
    return(
      <div>
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
          notation.map(x=><MoveNotation>{x}</MoveNotation>)
        }
      </div>
    )
  }
}