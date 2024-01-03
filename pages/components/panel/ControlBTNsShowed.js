import styled from 'styled-components';
import CONFIG from '@/config/config.json'
const {fieldSize,size}=CONFIG??{}

const ControlBTNsShowed=styled.div`
  display:grid;
  grid-template-rows:repeat(2, 1fr);
  grid-template-columns:repeat(2, 1fr);

  @media screen and (max-width: calc(${fieldSize} * 8 + 36px + ${size} * 4)){
    display:none;
  }
`

export default ControlBTNsShowed