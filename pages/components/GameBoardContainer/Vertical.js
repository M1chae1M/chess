import Yo from '@/config/Yo.json'
import CONFIG from '@/config/config.json'
const {fieldSize}=CONFIG??''

const Vertical=({whiteOnTop})=>{
    const style={
        container:{
            transform:'translateX(calc(-100% - 5px))',
            position:'absolute',
            display:'grid',
            gridAutoFlow:'row',
            height:`calc(8 * (${fieldSize} + 1px) - 1px)`,
            top:'0%',
            left:'0%',
            width:fieldSize,
        },
        row:{
            height:fieldSize,
            width:fieldSize,
            display:'grid',
            justifyItems:'right',
            alignItems:'center',
            fontSize:`calc(${fieldSize} * 0.5)`,
        }
    }
    return(
        <div style={style.container}>
        {
            (!whiteOnTop?Yo:Yo?.slice?.()?.reverse?.())?.map(x=>
                <div key={x} style={style.row}>{x}</div>
            )
        }
        </div>
    )
}

export default Vertical