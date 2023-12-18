export function timeDisplayFormat(time_in_ms){
    function roundTo00(liczba){
        const stringed=liczba.toString().slice(0,2);
        return liczba<10?`0${stringed}`:stringed
    }
    const time=new Date(time_in_ms);
    const min=roundTo00(time.getUTCMinutes())
    const sec=roundTo00(time.getUTCSeconds())
    const ms=roundTo00(time.getUTCMilliseconds())
  
    return `${min}:${sec}:${ms}`;
}