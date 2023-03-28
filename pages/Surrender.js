import React, {Component} from "react";
import {FiFlag} from 'react-icons/fi';
import {positions, homePositions} from "./_document";

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
        // const newPosition=Object.assign({}, {...homePositions});
        // const newPosition=Object.assign({}, {...positions});
        // changeState({
          // figureState:{},
          // figureState:positions,
          // notation:null,
        // })
        changeState({
          // figureState:{...positions},
          // figureState:newPosition,
          notation:[],
          figureState:homePositions,
          // figureState:[],
          whiteOnMove:true,
          checkAttacksState:false,
        });
        changeState({moveID:1, movesWithoutBeat:0})
      }
    }
    return <FiFlag style={styles.Flag} id="Surrender" onClick={surrender}/>
  }
}