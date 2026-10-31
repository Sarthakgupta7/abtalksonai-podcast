// India has a fixed UTC+05:30 offset, with no daylight-saving transition.
const DAY_MS=24*60*60*1000;
const INDIA_OFFSET_MS=330*60*1000;
const cycle=(timestamp)=>Math.floor((timestamp+INDIA_OFFSET_MS)/DAY_MS);
export function checkedThisIndiaDay(checkedAt,now=Date.now()){
 const checked=Date.parse(checkedAt);return Number.isFinite(checked)&&checked<=now&&cycle(checked)===cycle(now);
}
export function millisecondsUntilNightlyRefresh(now=Date.now(),delayAfterMidnight=0){
 let target=cycle(now)*DAY_MS-INDIA_OFFSET_MS+delayAfterMidnight;
 if(target<=now)target+=DAY_MS;
 return target-now;
}
