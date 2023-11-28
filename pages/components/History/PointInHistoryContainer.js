import styled from "styled-components"

const PointInHistoryContainer=styled.div`
    display:grid;
    grid-template-columns:repeat(5, 1fr);
    grid-auto-flow:column;
    justify-items:center;
    align-items:center;
    justify-content:space-evenly;

    &:hover{
    color:red;
    box-shadow: 2px 2px grey;
    }
`

export default PointInHistoryContainer