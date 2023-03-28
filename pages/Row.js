import React, {Component} from "react";
import Fields from "./Fields";

export default class Row extends Component{
  render(){
    const {evenRow, rowName, whiteOnBottom}=this.props;
    const styles={
      Row:{
        display:'grid',
        height:'40px',
        gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridTemplateColumns:'40px 40px 40px 40px 40px 40px 40px 40px',
      }
    }
    const abc=['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const xAxis=whiteOnBottom?abc:abc.reverse();
    return(
      <div id="Row" style={styles.Row}>
        {xAxis.map((x, i)=>
        <Fields
          key={i}
          field={x}
          filedID={`${x}${rowName}`}
          rowName={rowName}
          blackField={(i+1)%2!==0?evenRow:!evenRow}
        />)}
      </div>
    )
  }
}