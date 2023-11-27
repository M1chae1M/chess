import CONFIG from '@/config/config.json'
const {fieldSize}=CONFIG??''
const style={
    position:'relative',
    display:'grid',
    gridGap:'1px',
    gridTemplateColumns:`repeat(8,${fieldSize})`,
}

const GameBoardContainer=({children})=>(
    <div style={style}>{children}</div>
)

export default GameBoardContainer