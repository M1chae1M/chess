import {IoClose} from "react-icons/io5";
import styled from "styled-components";

const BTN=styled(IoClose)`
  width:fit-content;
  transform-origin: center;
  transition:all 0.5s ease-in-out;
  color:red;
  font-size:65px;
  &:hover{
    scale:1.2;
    rotate:90deg;
    transition:all 0.5s ease-in-out;
  }
`

const style={
  display:'grid',
  justifyContent:'end'
}

const CloseBTN=(props)=>(
  <div style={style}>
    <BTN {...props}/>
  </div>
)

export default CloseBTN