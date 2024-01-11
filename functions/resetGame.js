import {blackTimeRef,whiteTimeRef,SwitchRef} from "@/pages";
import boardStartState from "../components/boardStartState";
import {boardStartStateCopy} from "../components/boardStartState";
import resetState from "@/functions/resetState.ts";
import CONFIG from '@/config/config.json'
import Game from "@/classes/Game";
const {animationTime}=CONFIG??''

export async function resetGame(){
    setTimeout(()=>{
        blackTimeRef?.current?.reset?.();
        whiteTimeRef?.current?.reset?.();
    },animationTime)
  
    Game?.loop?.((x,y)=>boardStartState[x][y]=boardStartStateCopy[x][y]);
    await localStorage.removeItem('chess_game_board');
    await localStorage.removeItem('chess_game_status');
  
    this.setState(resetState,async()=>{
        await SwitchRef?.current?.changeState?.({start:false});
        await this.setBoardInLocalStory();
        await this.getBoardFromLocalStory();
    })
}