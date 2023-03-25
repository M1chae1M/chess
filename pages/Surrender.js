import React, {Component} from "react";
import {FiFlag} from 'react-icons/fi';
import {positions} from "./_document";

export default class Surrender extends Component{
  render(){
    const {whiteOnMove, changeState}=this.props;
    const styles={
      Flag:{
        display:'inline-block',
        height:'30px',
        width:'30px',
      }
    }
    const surrender=()=>{
      if(confirm('czy na pewno?')){
        alert(`${whiteOnMove?'Black':'White'} win this game!`);
        localStorage.removeItem('data');
        const newPosition=Object.assign({}, {...positions});
        // const newNotification=Object.assign({}, []);
        const newTable=[];
        changeState({
        //   // figureState:{},
        //   // figureState:positions,
          // notification:'',
        })
        changeState({
          // figureState:positions,
          figureState:newPosition,
          whiteOnMove:true,
          notification:newTable,
        })
      }
    }
    return <FiFlag style={styles.Flag} id="Surrender" onClick={surrender}/>
  }
}