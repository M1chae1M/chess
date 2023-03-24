// FiFlag
import React, { Component } from "react";
import {FiFlag} from 'react-icons/fi';

export default class Surrender extends Component{
  render(){
    const {whiteOnMove}=this.props;
    const styles={
      Flag:{
        display:'inline-block',
        height:'30px',
        width:'30px',
      }
    }
    const surrender=()=>{
      console.log(whiteOnMove)
      // let areYouSure=
      if(confirm('czy na pewno?')){
        console.log('podał się')
      }else{
        console.log('gram dalej')
      }

      // console.log(areYouSure)
    }
    return(
      <FiFlag style={styles.Flag} id="Surrender" onClick={surrender}/>
    )
  }
}