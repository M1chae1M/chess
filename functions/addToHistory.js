import _ from "lodash"
import {boardStartState} from "@/components/boardStartState"

export function addToHistory(acX,acY,copyOfOldFileds,destX,destY,status){
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