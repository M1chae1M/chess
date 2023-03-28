import React, {Component} from "react";
import {FaRegHandshake} from 'react-icons/fa';
import {homePositions} from "./_document";

export default class Remis extends Component{
  render(){
    const {changeState, pat}=this.props;
    const styles={
      haveShake:{
        height:'30px',
        width:'30px',
      },
    }
    // const pat=()=>{
    //   alert('Remis');
    //   localStorage.removeItem('data');
    //   changeState({
    //     notation:[],
    //     figureState:homePositions,
    //     whiteOnMove:true,
    //     checkAttacksState:false,
    //   });
    //   changeState({moveID:1, movesWithoutBeat:0})
    // }
    return(
      <FaRegHandshake id="Remis" style={styles.haveShake} onClick={pat}/>
    )
  }
}