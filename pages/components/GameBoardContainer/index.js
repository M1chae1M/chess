import CONFIG from '@/config/config.json'
import styled from 'styled-components'
const {fieldSize}=CONFIG??''

const GameBoardContainer=styled.div`
    position:relative;
    display:grid;
    gridGap:1px;
    grid-template-columns:repeat(8,${fieldSize});
`

export default GameBoardContainer