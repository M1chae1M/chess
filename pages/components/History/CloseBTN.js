import {IoClose} from "react-icons/io5";

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
    <IoClose style={BTN} {...props}/>
  </div>
)

export default CloseBTN