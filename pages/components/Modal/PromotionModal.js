import React,{Component} from "react";
import figureIcons from "@/components/figureIcons";
import Chose from "./Chose";
import Background from "./Background";
import {GameProvider} from "../..";
import CONFIG from '@/config/config.json'
const {fieldSize}=CONFIG??{}

export default class PromotionModal extends Component{
  render(){
    const styles={
      PromotionModal:{
        top:'50%',
        left:'50%',
        position:'absolute',
        border:'solid black 1px',
        transform:'translate(-50%,-50%)',
        height:'fit-content',
        padding:'20px',
        width:`calc(${fieldSize} * 9)`,
        boxShadow:'2px 2px black',
        display:'grid',
        alignContent:'center',
        backgroundColor: 'rgba(128, 128, 128, 0.96)',
        borderRadius:'3px',
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
    return(
      <GameProvider.Consumer>
      {value=>{
        const {whiteTure}=value??{}
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
      }}
      </GameProvider.Consumer>
    )
  }
}