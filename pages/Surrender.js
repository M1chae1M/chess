// FiFlag
import React, { Component } from "react";
import {FiFlag} from 'react-icons/fi';

export default class Surrender extends Component{
  render(){
    const styles={
      Flag:{
        display:'inline-block',
        height:'30px',
        width:'30px',
      }
    }
    return(
      <FiFlag style={styles.Flag} id="Surrender"/>
    )
  }
}