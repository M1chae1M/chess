export function ifBlackFunction(x,y){
    const isEvenX=x?.charCodeAt?.()%2===0;
    const isEvenY=y % 2===0;
    return isEvenX!==isEvenY?'white':'grey'
}