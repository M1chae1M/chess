import Figure from "@/classes/Figure"

export default interface boardWithFigureInstanceInterface{
    [key:string]:{
        [key:string]:Figure | string
    }
}