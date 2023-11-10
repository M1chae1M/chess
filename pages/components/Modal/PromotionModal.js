import React,{Component} from "react";
import {figureIcons} from "../../_document";
import Chose from "./Chose";
import Background from "./Background";

export default class PromotionModal extends Component{
  render(){
    const {whiteTure}=this.props;
    const styles={
      PromotionModal:{
        top:'50%',
        left:'50%',
        position:'absolute',
        border:'solid black 1px',
        transform:'translate(-50%,-50%)',
        width:'60%',
        height:'45%',
        background:'grey',
        boxShadow:'2px 2px black',
        display:'grid',
        alignContent:'center',
      },
      menu:{
        display:'grid',
        gridAutoFlow:'column',
        justifyContent:'space-evenly',
        padding:'5px',
      },
      label:{
        padding:'5px',
        textAlign:'center',
      },
    }
    const color=whiteTure?'white':'black'
    const figureCLR=figureIcons[color]
    const figuresNames=['Knight','Bishop','Rook','Queen']
    return(
      <Background>
        <div style={styles.PromotionModal}>
          <div style={styles.label}>Change pawn in:</div>
          <div style={styles.menu}>
            {figuresNames?.map(x=><Chose key={x} figure={figureCLR[x]} name={x}/>)}
          </div>
        </div>
      </Background>
    )
  }
}