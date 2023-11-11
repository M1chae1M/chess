import {fieldSize,Yo} from "./_document"

const Vertical=({whiteOnTop})=>{
    const style={
        container:{
            transform:'translateX(-100%)',
            position:'absolute',
            display:'grid',
            gridAutoFlow:'row',
            height:`calc(8 * ${fieldSize}px + 7px)`,
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