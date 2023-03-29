import React, {Component} from "react";
import Fields from "./Fields";

export default class Row extends Component{
  render(){
    const {evenRow, rowName, whiteOnBottom}=this.props;
    const styles={
      Row:{
        display:'grid',
        // gridTemplateColumns:'repeat(8, 40px)',
        // height:'40px',
        gridTemplateColumns:'repeat(8, 5vw)',
        height:'5vw',
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