import {GameProvider} from "@/pages"
import {FaPlay} from "react-icons/fa";

const StartButton=({start})=>(
    !start &&
    <GameProvider.Consumer>
    {value=>{
        const {whiteOnTop}=value??{}
        const style={
            background:{
                position:'absolute',
                width:'100%',
                height:'100%',
                top:'0%',
                left:'0%',
                backdropFilter:'blur(2.5px)',
                zIndex:2001,
                display:'grid',
                justifyItems:'center',
                alignItems:'center',
                rotate:whiteOnTop?'0deg':'180deg',
            },
            button:{
                padding:'3px 5px',
                background:'grey',
                fontSize:'1.2rem',
                borderRadius:'5px',
                color:'white',
                boxShadow:'1.5px 1px black',
            }
        }
        return(
            <div style={style.background}>
                <button style={style.button}><FaPlay/></button>
            </div>
        )
    }}
    </GameProvider.Consumer>
)

export default StartButton