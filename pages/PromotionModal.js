import React, {Component} from "react";
import PickPromotionFigure from "./PickPromotionFigure";

export default class PromotionModal extends Component{
  render(){
    const {color}=this.props;
    const styles={
      background:{
        backgroundColor:'transparent',
        width:'100vw',
        position:'fixed',
        top:'0%',
        left:'0%',
        height:'100vh',
        zIndex:'25',
      },
      PromotionModal:{
        position:'absolute',
        border:'solid black 3px',
        margin:'auto',
        left:'0',
        right:'0',
        top:'0',
        bottom:'0',
        width:'fit-content',
        width:'200px',
        backgroundColor:'red',
        display:'grid',
        height:'fit-content',
        height:'150px',
        alignContent:'center',
        justifyContent:'center',
        zIndex:'27',
      },
      container:{
        display:'grid',
        gridTemplateColumns:'repeat(4, 40px)',
      },
    }
    return(
      <div style={styles.background}>
        <div style={styles.PromotionModal}>
          <div style={styles.container}>
            <PickPromotionFigure color={color} displayFigure="Knight"/>
            <PickPromotionFigure color={color} displayFigure="Bishop"/>
            <PickPromotionFigure color={color} displayFigure="Rook"/>
            <PickPromotionFigure color={color} displayFigure="Queen"/>
          </div>
        </div>
      </div>
    )
  }
}