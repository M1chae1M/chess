import styled from 'styled-components'
import CONFIG from '@/config/config.json'
const {fieldSize,size}=CONFIG??{}

const VisibleControlPanel=styled.div`
top:100%;
right:50%;
transform:translate(calc(50% + 8px),25%);
grid-auto-flow:row;

display:grid;
position:absolute;

@media screen and (min-width: calc(${fieldSize} * 8 + 36px + ${size} * 4)){
    top:50%;
    right:0%;
    transform:translate(calc(100% + 8px),-50%);
    grid-auto-flow:column;
}
`

export default VisibleControlPanel