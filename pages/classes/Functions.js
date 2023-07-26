import React,{Component} from "react";
import {Xo,Yo} from "../_document";

export function ifBlackFunction(x,y){
  // if (typeof x==='string' && typeof y === 'number') {
    const isEvenX=x?.charCodeAt?.()%2===0;
    const isEvenY=y % 2===0;
    return isEvenX!==isEvenY?'white':'grey'
  // } else {
    // return 'white';
  // }
}

export default class Functions extends Component{render(){return(<></>)}}