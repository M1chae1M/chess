import React, {Component} from "react";
import {FaRegHandshake} from 'react-icons/fa';

export default class Remis extends Component{
  render(){
    const {pat}=this.props;
    const styles={
      haveShake:{
        height:'30px',
        width:'30px',
      },
    }
    return(
      <FaRegHandshake id="Remis" style={styles.haveShake} onClick={pat}/>
    )
  }
}