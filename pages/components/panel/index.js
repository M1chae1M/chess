import React,{useEffect,useState} from 'react';
import Switch from './Switch';
import {GameProvider} from '@/pages';
import VisibleControlPanel from './VisibleControlPanel';
import ControlBTNs from './ControlBTNs';
import ControlBTNsShowed from './ControlBTNsShowed';

export default function ControlPanel({SwitchRef}){
  const [isClient,setIsClient]=useState(false);
  useEffect(()=>{setIsClient(true)},[])
  if(!isClient)return null
  return(
    <GameProvider.Consumer>
    {value=>{
      const {whiteTure,whiteOnTop}=value??{}
      return(
        <VisibleControlPanel>
          <Switch whiteTure={whiteTure} whiteOnTop={whiteOnTop} ref={SwitchRef}/>
          <ControlBTNsShowed>
            <ControlBTNs/>
          </ControlBTNsShowed>
        </VisibleControlPanel>
      )
    }}
    </GameProvider.Consumer>
  )
}