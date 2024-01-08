export default function calculateAnimation(fromField:string,clicked:string):void{
  const [destX,destY]=clicked
  const [acX,acY]=fromField
  this.setState({
    animateX:destX.charCodeAt(0)-acX.charCodeAt(0),
    animateY:Number(destY)-Number(acY),
  })
}