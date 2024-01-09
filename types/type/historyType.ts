import FigureUnionType from "./FigureUnionType"
import colorType from "./colorType"

type historyType={
    lastMove:{
        clicked:string[],
        color:colorType,
        figure:FigureUnionType,
        fromField:string,
        status:{
            kingAttacked:boolean,
            whiteTure:boolean,
        },
        stringifiedBoard:string
    }
}[]

export default historyType