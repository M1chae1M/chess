import {useInView} from 'react-intersection-observer';
import CONFIG from '@/config/config.json'
const {fieldSize}=CONFIG??{}

export default function OnloadPromotionModal({children}){
    const [ref, inView]=useInView({});
    const styles={
        border:'solid black 1px',
        height:'fit-content',
        padding:'20px',
        width:`calc(${fieldSize} * 9)`,
        boxShadow:'2px 2px black',
        display:'grid',
        alignContent:'center',
        backgroundColor: 'rgba(128, 128, 128, 0.96)',
        borderRadius:'3px',
        position:'absolute',
        top:'50%',
        left:'50%',
        opacity:'0',
        transform:'translate(-50%,0%)',
    }
    const animation={
        opacity:'1',
        transform:'translate(-50%,-50%)',
        transition:'all 0.6s ease-in-out',
    }
    const style={...styles, ...(inView?animation:{})}
    return(
        <div ref={ref} style={style}>
            {children}
        </div>
    )
}