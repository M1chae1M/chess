import {GameProvider} from '@/pages';
import {FaRegHandshake} from 'react-icons/fa';
import {FiFlag} from 'react-icons/fi';
import {TbRotate} from 'react-icons/tb';
import {MdHistory} from "react-icons/md";
import BTNStylesFabric from '@/components/BTNStylesFabric';
import Game from '@/classes/Game';

const Button1=BTNStylesFabric(FaRegHandshake)
const Button2=BTNStylesFabric(FiFlag)
const Button3=BTNStylesFabric(TbRotate)
const Button4=BTNStylesFabric(MdHistory)

const ControlBTNs=()=>(
    <GameProvider.Consumer>
    {value=>{
        const {resetGame,turnBoard,whiteTure,show_or_close_history,whiteOnTop}=value??{}
        const pat=()=>{
            Game.pat(``);
            resetGame();
        }
        const surrender=()=>{
            Game.surrender(whiteTure);
            resetGame();
        }
        return(
            <>
                <Button1 onClick={pat}/>
                <Button3 onClick={turnBoard}/>
                <Button2 onClick={surrender}/>
                <Button4 onClick={show_or_close_history}/>
            </>
        )
    }}
    </GameProvider.Consumer>
)

export default ControlBTNs