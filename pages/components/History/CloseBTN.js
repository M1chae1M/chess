import {IoClose} from "react-icons/io5";

import styled from "styled-components";

const DV=styled.div`
  width:fit-content;
  transform-origin: center;
  transition:all 0.5s ease-in-out;
  &:hover{
    scale:1.2;
    rotate:90deg;
    transition:all 0.5s ease-in-out;
  }
`
const BTN={
  color:'red',
  fontSize:'65px',
}
const style={
  display:'grid',
  justifyContent:'end'
}
const CloseBTN=(props)=>(
  <div style={style}>
    <DV {...props}>
      <IoClose style={BTN}/>
    </DV>
  </div>
)

export default CloseBTN