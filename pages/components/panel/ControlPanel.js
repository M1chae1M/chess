import React,{useEffect,useState} from 'react';
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
  }
`

const Button1=styled(FaRegHandshake)`${buttonStyles}`
const Button2=styled(FiFlag)`${buttonStyles}`
const Button3=styled(TbRotate)`${buttonStyles}`

export default function ControlPanel(){
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
    ControlContainer:{
      display:'grid',
      gridTemplateRows:'repeat(2, 1fr)',
      gridTemplateColumns:'repeat(2, 1fr)',
    }
  }
  return(
    <GameProvider.Consumer>
    {value=>{
      const {resetGame,turnBoard,whiteTure}=value??{}
      const pat=()=>{
        Game.pat(``)
        resetGame()
      }
      const surrender=()=>{
        Game.surrender(whiteTure)
        resetGame()
      }
      return(
        <div style={styles.ControlPanel}>
          <Switch whiteTure={whiteTure} size={size}/>
          <Timer/>
          <div style={styles.ControlContainer}>
            <Button1 onClick={pat}/>
            <Button3 onClick={turnBoard}/>
            <Button2 onClick={surrender}/>
          </div>
        </div>
      )
    }}
    </GameProvider.Consumer>
  )
}