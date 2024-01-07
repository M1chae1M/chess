export default function ifBlackFunction(x:string,y:number):string{
    const isEvenX=x?.charCodeAt?.(0)%2===0;
    const isEvenY=y % 2===0;
    return isEvenX!==isEvenY?'white':'grey'
}