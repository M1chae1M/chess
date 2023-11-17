const animation={
    transform:'translateX(0)',
    transition:'transform 1s ease-in-out',
}
const fadeOutAnimation={
    transition:'transform 1s ease-in-out',
    transform:'translateX(-100%)',
}

const HistoryAnimation=({children,showHistory})=>(
    <div style={showHistory?animation:fadeOutAnimation}>{children}</div>
)

export default HistoryAnimation