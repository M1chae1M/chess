import React,{Component} from "react";

export function ifBlackFunction(x,y){
  const isEvenX=x?.charCodeAt?.()%2===0;
  const isEvenY=y % 2===0;
  return isEvenX!==isEvenY?'white':'grey'
}
export function calculateAnimation(fromField,clicked){
  const [destX,destY]=clicked??[]
  const [acX,acY]=fromField??[]
  this.setState({
    animateX:destX.charCodeAt()-acX.charCodeAt(),
    animateY:Number(destY)-Number(acY),
  })
}
export default class Functions extends Component{render(){return(<></>)}}