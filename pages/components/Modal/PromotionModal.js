import React,{Component} from "react";
import figureIcons from "@/components/figureIcons";
import Chose from "./Chose";
import Background from "./Background";
import {GameProvider} from "../..";
import OnloadPromotionModal from "./OnloadPromotionModal";

export default class PromotionModal extends Component{
  render(){
    const styles={
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
            <OnloadPromotionModal>
              <div style={styles.label}>Change pawn in:</div>
              <div style={styles.menu}>
                {figuresNames?.map(x=><Chose key={x} figure={figureCLR[x]} name={x}/>)}
              </div>
            </OnloadPromotionModal>
          </Background>
        )
      }}
      </GameProvider.Consumer>
    )
  }
}