import fieldSize from '@/config/fieldSize.json'
import Xo from '@/config/Xo.json'

const Horisontal=({whiteOnTop})=>{
    const style={
        container:{
            display:'grid',
            gridAutoFlow:'column',
            width:`calc(8 * (${fieldSize} + 1px) - 1px)`,
            position:'absolute',
            bottom:'0%',
            transform:'translateY(100%)',
        },
        row:{
            display:'grid',
            width:fieldSize,
            height:fieldSize,
            justifyItems:'center',
        }
    }
    return(
        <div style={style.container}>
        {
            (whiteOnTop?Xo:Xo.slice().reverse())?.map(x=>
                <div key={x} style={style.row}>{x}</div>
            )
        }
        </div>
    )
}

export default Horisontal