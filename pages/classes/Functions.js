import React,{Component} from "react";
import {Xo,Yo} from "../_document";
import Field from "../components/Field";

export function ifBlackFunction(x,y){
  const isEvenX=x.charCodeAt()%2===0;
  const isEvenY=y % 2===0;
  if(isEvenX!==isEvenY) return 'white';
  else return 'grey';
}

export function RenderAllFields(RenderField,touch){
  return Yo.reverse().map(y=>Xo.map(x=>RenderField(x,y,touch)))
}

export function RenderField(x,y,touch){
  return <Field key={`${x}${y}`} x={x} y={y} color={ifBlackFunction(x,y)} touch={touch}/>
}

export default class Functions extends Component{render(){return(<></>)}}