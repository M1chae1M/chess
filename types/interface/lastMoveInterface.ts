import status_interface from "./status_interface";

export default interface lastMove_interface{
    clicked:string[];
    color:string;
    figure:string;
    fromField:string;
    // status:{
    //     whiteTure:boolean;
    //     kingAttacked:boolean;
    // };
    status:status_interface;
    stringifiedBoard:string;
}