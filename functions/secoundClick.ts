import Game from "@/classes/Game"
import CONFIG from '@/config/config.json';
const {animationTime}=CONFIG

export default function secoundClick(fromField:string,clicked:string){
    const {kingAttacked}=this.state
    const [destX,destY]=clicked
    const [acX,acY]=fromField
    const baseFigure=this.state.boardGameState?.[acX]?.[acY];
    const isPromotionField=(destY==='8' && this.state.whiteTure)||(destY==='1' && !this.state.whiteTure);
    const isPawn=baseFigure?.getName?.()==='Pawn';
    const canMoveThere=baseFigure?.canMove?.(destX,destY,this.state.whiteTure)?.canMove;
  
    if(isPromotionField && canMoveThere && isPawn){
        this.setState({isModalOpened:true},()=>new Promise((resolve)=>this.checkIsClosed(resolve,baseFigure,clicked)))
    }
    else{
        if(canMoveThere){
            Game.getMovesCount();
            this.setState({canAnimate:true},()=>setTimeout(()=>this.setState({canAnimate:false}),animationTime));
            this.calculateAnimation(fromField,clicked);
            this.setState({actualMove:this.state.actualMove+1})
        }
        setTimeout(()=>{
            const {shortMove,newWhiteTure}=baseFigure?.move?.(destX,destY,this.state.whiteTure)
            this.setState({firstTouch:!this.state.firstTouch,boardGameState:shortMove,whiteTure:newWhiteTure},this.setBoardInLocalStory)
            if(newWhiteTure!==this.state.whiteTure){
                this.isChequered();
                this.addToHistory(acX,acY,{from:baseFigure},destX,destY,{whiteTure:newWhiteTure,kingAttacked});
            }
        },animationTime)
    }
}