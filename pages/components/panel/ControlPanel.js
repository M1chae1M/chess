import React,{Component,useEffect,useState} from 'react';
import {FaRegHandshake} from 'react-icons/fa';
import {FiFlag} from 'react-icons/fi';
import Timer from './Timer';
import {Game} from '@/pages/classes/Game';
import Switch from './Switch';
import styled,{css} from 'styled-components';
import {GameProvider} from '@/pages';
import {TbRotate} from 'react-icons/tb';

const size=80;
const buttonStyles=css`
font-size:${size/2}px;
display:grid;
transition:all 0.15s ease-in-out;
&:hover {
scale:120%;
}`;

const Button1=styled(FaRegHandshake)`${buttonStyles}`
const Button2=styled(FiFlag)`${buttonStyles}`
const Button3=styled(TbRotate)`${buttonStyles}`

export default function ControlPanel({whiteTure}){
  const [isClient,setIsClient]=useState(false);
  useEffect(()=>{setIsClient(true)},[])
  if(!isClient)return null

  const styles={
    ControlPanel:{
      position:'absolute',
      top:'50%',
      right:'0%',
      transform:'translate(calc(100% + 8px),-50%)',
      display:'grid',
      gridAutoFlow:'column',
    },
  }
  return(
    <GameProvider.Consumer>
    {value=>{
      const {resetGame}=value??{}
      const pat=()=>{
        // console.log(
          // const {fiftyMovesRule,samePositions,gameHistory,gameBoard}=
          Game.pat()
          resetGame()
        // )
      }
      const surrender=()=>{
        // const {fiftyMovesRule,samePositions,gameHistory,gameBoard}=
        Game.surrender(whiteTure)
        resetGame() 
      }
      // const turn=()=>{
      //   console.log('rotate board')
      // }
      return(
        <div style={styles.ControlPanel}>
          <Switch whiteTure={whiteTure} size={size}/>
          <Timer/>
          <div>
            <Button1 onClick={pat}/>
            <Button2 onClick={surrender}/>
            {/* <Button3 onClick={turn}/> */}
          </div>
        </div>
      )
    }}
    </GameProvider.Consumer>
  )
}