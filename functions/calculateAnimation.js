export function calculateAnimation(fromField,clicked){
  const [destX,destY]=clicked??[]
  const [acX,acY]=fromField??[]
  this.setState({
    animateX:destX.charCodeAt()-acX.charCodeAt(),
    animateY:Number(destY)-Number(acY),
  })
}