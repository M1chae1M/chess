import React,{Component} from "react";

export default class Background extends Component{
  render(){
    const {children}=this.props;
    const styles={
      Background:{
        position:'absolute',
        top:'0%',
        left:'0%',
        width:'100vw',
        height:'100vh',
        background:'transparent',
        backdropFilter:'blur(1px)',
      }
    }
    return(
      <div style={styles.Background}>
        {children}
      </div>
    )
  }
}