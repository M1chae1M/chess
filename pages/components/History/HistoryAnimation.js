const baseStyles={
    position:'absolute',
    right:'0%',
    top:'0%',
    transition:'transform 1s ease-in-out',
}

const animation={
    ...baseStyles,
    transform:'translateX(0)',
}

const fadeOutAnimation={
    ...baseStyles,
    transform:'translateX(100%)',
}

const HistoryAnimation=({children,showHistory})=>(
    <div style={showHistory?animation:fadeOutAnimation}>{children}</div>
)

export default HistoryAnimation