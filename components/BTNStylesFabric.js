import styled,{css} from 'styled-components';
import CONFIG from '@/config/config.json'
const {size}=CONFIG??''

const buttonStyles=css`
font-size:calc(${size} / 2);
display:grid;
  transition:all 0.15s ease-in-out;
  &:hover{
    scale:120%;
  }
`

const BTNStylesFabric=(icon)=>styled(icon)`${buttonStyles}`

export default BTNStylesFabric