import React,{Component} from "react";
import Surrender from "./Surrender";

export default class OnMove extends Component{
  render(){
    const {whiteOnMove}=this.props;
    const styles={
      onMove:{
        // display:'inline-block',
        display:'grid',
        gridTemplateColumns:'auto auto',
        width:'fit-content',
        margin:'auto 0',
        alignItems:'center',
        alignContent:'center',
      },
    }
    return(
      <div id='onMove' style={styles.onMove}>
        <label className="switch">
          <input type="checkbox" checked={!whiteOnMove} readOnly/>
          <span className="slider"></span>
        </label>
        <Surrender whiteOnMove={whiteOnMove}/>
      </div>
    )
  }
}