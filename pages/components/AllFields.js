import Yo from '@/config/Yo.json'
import Xo from '@/config/Xo.json'
import dynamic from 'next/dynamic';
import Vertical from './GameBoardContainer/Vertical';
import Horisontal from './GameBoardContainer/Horisontal';
import {GameProvider} from '..';

const DynamicField=dynamic(()=>import('./Field'),{ssr:false});

const AllFields=()=>(
    <GameProvider.Consumer>
    {value=>{
        const {whiteOnTop,touch}=value??{}
        return(
            <>
                <Vertical whiteOnTop={whiteOnTop}/>
                {
                    (whiteOnTop?Yo?.slice().reverse():Yo)?.map(y=>
                        (whiteOnTop?Xo:Xo?.slice().reverse())?.map(x=>
                            <DynamicField key={`${x}${y}`} x={x} y={y} touch={touch}/>
                        )
                    )
                }
                <Horisontal whiteOnTop={whiteOnTop}/>
            </>
        )
    }}
    </GameProvider.Consumer>
)

export default AllFields