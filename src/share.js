import LZString from 'lz-string';
import {validateCalendar} from './data.js';
const MAX_PAYLOAD=16000;
export function encodeCalendar(value){
 const calendar=validateCalendar(value);
 const payload=LZString.compressToEncodedURIComponent(JSON.stringify({v:1,calendar}));
 if(payload.length>MAX_PAYLOAD)throw new Error('Календарь слишком большой для ссылки. Сократите тексты или воспользуйтесь экспортом JSON.');
 return payload;
}
export function decodeCalendar(payload){
 if(typeof payload!=='string'||!payload||payload.length>MAX_PAYLOAD||!/^[A-Za-z0-9+\-$]+$/.test(payload))throw new Error('Некорректная ссылка на адвент.');
 try{
  const json=LZString.decompressFromEncodedURIComponent(payload);
  if(!json||json.length>200000)throw new Error();
  const data=JSON.parse(json);
  if(data.v!==1)throw new Error();
  return validateCalendar(data.calendar);
 }catch{throw new Error('Не удалось открыть адвент: ссылка повреждена или имеет неподдерживаемый формат.');}
}
export function calendarLink(value,base){const url=new URL(base);url.hash=`advent=${encodeCalendar(value)}`;return url.href;}
export function progressId(value){
 // Stable content identifier: separate progress for different received calendars.
 const payload=JSON.stringify(validateCalendar(value));let a=2166136261,b=5381;
 for(let i=0;i<payload.length;i++){a=Math.imul(a^payload.charCodeAt(i),16777619);b=Math.imul(b,33)^payload.charCodeAt(i);}
 return `shared-${(a>>>0).toString(36)}-${(b>>>0).toString(36)}`;
}
