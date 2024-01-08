import Figure from "@/classes/Figure"
import colorType from "./colorType"
import FigureUnionType from "./FigureUnionType"
import acXType from "./acXType";

interface FigureTest{
    name:FigureUnionType;
    color:colorType;
    actualField:string;
    moved:boolean;
  
    canMove(destX:acXType,destY:string,whiteTure:boolean):{canMove:boolean,moves:string[]};
    attacking(whiteTure:boolean,destX:acXType,destY:number):{isKingAttacked:boolean,legalMoves:string[]};
    returnDefMovesOnly(whiteTure:boolean):string[];


    getName():FigureUnionType
    getColor():colorType
}

// type FigureClassType = new (color:colorType,actualField:string,moved:boolean|null|undefined,name:FigureUnionType) => Figure
type FigureClassType = new (color:colorType,actualField:string,moved:boolean|null|undefined,name:FigureUnionType) => FigureTest

export default FigureClassType