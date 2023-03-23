import {PositionsContext} from ".";
import React, {Component} from "react";

export default class PickPromotionFigure extends Component{
  render(){
    const {displayFigure, color}=this.props;
    const styles={
      PickPromotionFigure:{
        width:'40px',
        height:'40px',
        border:'solid black 3px',
      },
    }
    const pickFigure=(figureState, to, changeState)=>{
      const copyOf=figureState;
      copyOf[to.field][to.rowName-1].figure=displayFigure;
      changeState({showPromotionModal:false,figureState:copyOf});
    }
    return(
      <PositionsContext.Consumer>
      {(value)=>{
        const {figure, changeState, figureState, from, to, move}=value ?? {};
        return(
          <div style={styles.PickPromotionFigure} onClick={()=>{
            // let test=move()
            pickFigure(figureState, to, changeState)
          }}>
            {figure?.[color]?.[displayFigure]()}
          </div>
        )
      }}
      </PositionsContext.Consumer>
    )
  }
}