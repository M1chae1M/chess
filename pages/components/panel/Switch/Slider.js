import size from '@/config/size.json'
  
const Slider=({whiteTure})=>{
    const color=whiteTure?'black':'white'
    const style={
        position:'absolute',
        background:whiteTure?'white':'black',
        border:`solid ${color} 1px`,
        boxShadow:`2px 2px ${color}`,
        height:`${size*7/16}px`,
        width:`${size*6/8}px`,
        top:'5px',
        transform:`translateY(${whiteTure?size*7/16:0}px)`,
        transition:'all 0.4s ease-in-out',
    }
    
    return <div style={style}/>
}

export default Slider