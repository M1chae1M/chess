import FigureUnionType from "../type/FigureUnionType";
import colorType from "../type/colorType";
import status_interface from "./status_interface";

export default interface lastMove_interface{
    clicked:string[];
    color:colorType;
    figure:FigureUnionType;
    fromField:string;
    status:status_interface;
    stringifiedBoard:string;
}