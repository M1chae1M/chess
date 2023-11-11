import {fieldSize,Xo} from "./_document"

const Horisontal=({whiteOnTop})=>{
    const style={
        container:{
            display:'grid',
            gridAutoFlow:'column',
            width:`calc(8 * ${fieldSize}px + 7px)`,
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
            (whiteOnTop?Xo.slice().reverse():Xo)?.map(x=>
                <div key={x} style={style.row}>{x}</div>
            )
        }
        </div>
    )
}

export default Horisontal