import _ from "lodash"
import {boardStartState} from "@/components/boardStartState"
import status_interface from "@/types/interface/status_interface"
import copyOfOldFileds_interface from "@/types/interface/copyOfOldFileds_interface"

export default function addToHistory(acX:string, acY:string, copyOfOldFileds:copyOfOldFileds_interface, destX:string,destY:string, status:status_interface){
    console.log(copyOfOldFileds)


    
    this.setState({gameHistory:
        [...this.state.gameHistory,{
            lastMove:{
                fromField:`${acX}${acY}`,
                figure:copyOfOldFileds?.from?.getName?.(),
                color:copyOfOldFileds?.from?.getColor?.(),
                clicked:[destX,destY],
                stringifiedBoard:JSON.stringify(_.cloneDeep(boardStartState)),
                status
            }
        }]
    })
}