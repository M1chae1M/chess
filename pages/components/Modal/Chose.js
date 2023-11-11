import React,{Component} from "react";
import {ModalContext} from ".";

export default class Chose extends Component{
  render(){
    const {name,figure}=this.props;
    const style={
      border:'solid black 1px',
      borderRadius:'7.5px',
      width:'50px',
      height:'50px',
      fontSize:'35px',
      display:'grid',
      justifyContent:'center',
      alignContent:'center',
      transition:'all 0.2s ease-in-out',
    }
    return(
      <ModalContext.Consumer>
      {value=>{
        const {closeModalF}=value??{}
        const onClick=()=>closeModalF?.(name)
        return <div style={style} onClick={onClick} className="chose">{figure}</div>
      }}
      </ModalContext.Consumer>
    )
  }
}