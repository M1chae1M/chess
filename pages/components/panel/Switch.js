import React,{Component} from 'react';

export default class Switch extends Component{
  render(){
    const {whiteTure,size}=this.props;
    const color=whiteTure?'black':'white'
    const styles={
      switch:{
        background:'grey',
        height:`${size}px`,
        width:`${size/2}px`,
        display:'grid',
        justifyItems:'center',
        padding:`${size/16}px`,
      },
      slider:{
        background:whiteTure?'white':'black',
        border:`solid ${color} 1px`,
        boxShadow:`2px 2px ${color}`,
        height:`${size*7/16}px`,
        width:`${size*3/8}px`,
        transform:`translateY(${!whiteTure?size*7/16:0}px)`,
        transition:'all 0.4s ease-in-out',
      },
    }
    return(
      <div id='switch' style={styles.switch}>
        <div style={styles.slider}/>
      </div>
    )
  }
}