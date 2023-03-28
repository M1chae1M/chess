import {PositionsContext} from ".";
import React, {Component} from "react";

export default class Fields extends Component{
  render(){
    const {blackField, field, rowName}=this.props;
    const styles={
      Fields:{
        backgroundColor:blackField?'grey':'white',
        display:'grid',
        justifyItems:'center',
        alignItems:'center',
      },
    }
    return(
      <PositionsContext.Consumer>
      {(value)=>{
        const {figureState, figure, changeState, move, whiteOnMove
        
        , firstClick
        

        , onFirstClick
        , onSecoundClick






        }=value?? {};
        const actualField=figureState?.[field]?.[rowName-1];
        const actualFigure=actualField?.figure;
        const actualColor=actualField?.color;

        let chequered='';
        if(actualFigure==='King'){
          if(whiteOnMove && actualColor==='white' && actualField.attackedField===true) chequered='chequered'
          else if(!whiteOnMove && actualColor==='black' && actualField.attackedField===true) chequered='chequered'
        }
        return(
          <div
            className={`Fields ${actualField?.attackedField && 'attackedField'} ${chequered}`}
            style={styles.Fields}
            onClick={()=>{
              if((actualColor==='white' && whiteOnMove)||(actualColor==='black' && !whiteOnMove)){
                changeState({from:{field, rowName}});
              }
              else if(((actualColor==='black' && whiteOnMove) || (actualFigure===''))||((actualColor==='white' && !whiteOnMove) || (actualFigure===''))){
                changeState({to:{field, rowName}});
                onSecoundClick({field, rowName})
              }
            }}
          >
            {figure?.[actualColor]?.[actualFigure]?.({className:`Figure`})}
          </div>
        )
      }}
      </PositionsContext.Consumer>
    )
  }
}