import React,{Component} from 'react'
import {GameProvider} from '..'
import {ifBlackFunction} from '../classes/Functions'
import styled,{css,keyframes} from 'styled-components'
import CONFIG from '@/config/config.json'
const {fieldSize,animationTime}=CONFIG??''

export default class Field extends Component{
  render(){
    return(
      <GameProvider.Consumer>
      {value=>{
        const {boardGameState,canAnimate,kingAttacked,whiteTure,fromField,animateX,animateY,whiteOnTop}=value??{}
        const {x,y,touch}=this.props??{};
        const click=()=>touch(`${x}${y}`)
        const base=boardGameState?.[x]?.[y]
        const Figure=()=>base?.getFigure?.()
        const isKing=base?.isKing?.()
        const isColor=base?.goodTure?.(whiteTure)
        const color=ifBlackFunction(x,y)
        const slideInLeft=keyframes`
          from{
            transform: translate(0,0);
          }
          to{
            transform:translate(calc(${fieldSize} * ${whiteOnTop?animateX:animateX*(-1)}), calc(${fieldSize} * ${whiteOnTop?animateY*(-1):animateY}));
          }`;

          const StyledField=styled.div`
          width:${fieldSize};
          height:${fieldSize};
          border:solid black 1px;
          display:grid;
          justify-items:center;
          align-items:center;
          background:${kingAttacked && isKing && isColor?'red':color};
          font-size:${fieldSize};
          transition:all ${animationTime}ms ease-in-out;

          & svg{
            color:${`${x}${y}`===fromField && `red !important`};
            animation: ${`${x}${y}`===fromField && canAnimate ?css`${slideInLeft} ${animationTime}ms ease-in-out both`:'none'};
          }

          &:hover{
            border:solid orangered 5px !important;
            transform:scale(95%);
            font-size:max(3vw, 20px) !important;
            opacity:0.75;
          }
        `;
        return(
          <StyledField onClick={click} className='Field'>
            <Figure style={{
              color:'blue',
              fontSize:'30px',
            }}/>
          </StyledField>
        )
      }}
      </GameProvider.Consumer>
    )
  }
}