import React,{Component} from "react";
import Surrender from "./Surrender";
import Remis from "./Remis";

export default class OnMove extends Component{
  render(){
    const {whiteOnMove, changeState, whiteOnBottom, pat}=this.props;
    const styles={
      onMove:{
        width:'fit-content',
        margin:'auto 0',
        alignItems:'center',
        alignContent:'center',
      },
      switch:{
        transform:whiteOnBottom?'none':'rotate(180deg)',
      },
    }
    return(
      <div id='onMove' style={styles.onMove}>
        <label className="switch" style={styles.switch}>
          <input type="checkbox" checked={!whiteOnMove} readOnly/>
          <span className="slider"></span>
        </label>
      </div>
    )
  }
}