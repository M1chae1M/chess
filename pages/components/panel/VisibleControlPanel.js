import styled from 'styled-components'
import CONFIG from '@/config/config.json'
const {fieldSize,size}=CONFIG??{}

const VisibleControlPanel=styled.div`
    display:grid;
    position:absolute;
    top:100%;
    right:50%;
    transform:translate(50%,45%);
    grid-auto-flow:row;

    @media screen and (min-width: calc(${fieldSize} * 8 + 36px + ${size} * 4)){
        top:50%;
        right:0%;
        transform:translate(calc(100% + 8px),-50%);
        grid-auto-flow:column;
    }
`

export default VisibleControlPanel