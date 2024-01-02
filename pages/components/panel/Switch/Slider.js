import CONFIG from '@/config/config.json'
const {size}=CONFIG??''
  
const Slider=({whiteTure})=>{
    const color=whiteTure?'black':'white'
    const style={
        position:'absolute',
        background:whiteTure?'white':'black',
        border:`solid ${color} 1px`,
        boxShadow:`2px 2px ${color}`,
        height:`calc(${size} * 7 / 16)`,
        width:`calc(${size} * 3 / 4)`,
        top:'5px',
        transform:`translateY(${whiteTure?`calc(${size} * 7 / 16)`:0}px)`,
        transition:'all 0.4s ease-in-out',
    }
    
    return <div style={style}/>
}

export default Slider