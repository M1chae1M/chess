import {Xo,Yo} from '../_document';
import dynamic from 'next/dynamic';
import {fieldSize} from '../_document';

const DynamicField=dynamic(()=>import('./Field'), {ssr:false});

const AllFields=({touch,whiteOnTop})=>(
    <>
        {
            (whiteOnTop?Yo?.slice().reverse():Yo)?.map(y=>
                (whiteOnTop?Xo?.slice().reverse():Xo)?.map(x=>
                    <DynamicField key={`${x}${y}`} x={x} y={y} touch={touch}/>
                )
            )
        }
        {/* <div style={{
            display:'grid',
            gridAutoFlow:'column',
            width:`calc(8 * ${fieldSize}px + 7px)`,
        }}>
            {
              (whiteOnTop?Xo.slice().reverse():Xo)?.map(x=><div key={x} style={{
                display:'grid',
                width:fieldSize,
                height:fieldSize,
                justifyItems:'center',
              }}>{x}</div>)
            }
          </div> */}
    </>

)

export default AllFields