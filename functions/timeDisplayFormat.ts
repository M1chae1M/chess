function roundTo00(liczba:number):string{
    const stringed=liczba.toString().slice(0,2);
    return liczba<10?`0${stringed}`:stringed
}

export default function timeDisplayFormat(time_in_ms:number):string{
    const time=new Date(time_in_ms);
    const min=roundTo00(time.getUTCMinutes())
    const sec=roundTo00(time.getUTCSeconds())
    const ms=roundTo00(time.getUTCMilliseconds())
  
    return `${min}:${sec}:${ms}`;
}