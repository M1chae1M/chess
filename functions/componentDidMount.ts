export default function componentDidMount():void{
    this.getBoardFromLocalStory();
    window.addEventListener('error',(event)=>console.error('Wystąpił nieobsłużony błąd:',event.error))
}