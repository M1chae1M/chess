const style={
    display:'grid',
    justifyItems:'center',
    alignItems:'center',
    width:'100vw',
    height:'100vh',
    alignContent:'center',
    userSelect:'none',
}

const AppContainer=({children})=>(
    <div style={style}>{children}</div>
)

export default AppContainer