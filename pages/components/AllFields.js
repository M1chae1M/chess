import {Xo,Yo} from '../_document';
import dynamic from 'next/dynamic';

const DynamicField=dynamic(()=>import('./Field'), {ssr:false});

const AllFields=({touch})=>(
    Yo?.reverse()?.map(y=>
        Xo?.map(x=>
            <DynamicField key={`${x}${y}`} x={x} y={y} touch={touch}/>
        )
   )
)

export default AllFields