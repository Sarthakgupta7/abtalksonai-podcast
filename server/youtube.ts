import type {AutoEpisode} from '../src/live-types.ts';

export const CHANNEL_ID='UCX-iRWp3bgD_lBAwhNGM3gw';
export const CHANNEL_URL='https://www.youtube.com/@ABTalksOnAI/videos';
export const FEED_URL=`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
export const MIN_EPISODE_SECONDS=600;
const omittedTitles=/\b(trailer|teaser|preview|highlights?|shorts?)\b/i;
const clean=(value:string)=>value.replace(/—/g,', ').replace(/\s+/g,' ').trim();
const text=(value:any):string=>typeof value==='string'?value:value?.simpleText||value?.content||value?.runs?.map((r:any)=>r.text||'').join('')||'';
export function secondsFromLabel(label:string):number{
 if(!/^\d{1,3}:\d{2}(?::\d{2})?$/.test(label))return 0;
 return label.split(':').reduce((seconds,part)=>seconds*60+Number(part),0);
}
export function embeddedJson(html:string,name:string):any{
 const match=new RegExp(`(?:var\\s+${name}|window\\["${name}"\\]|${name})\\s*=\\s*`).exec(html);
 if(!match)throw new Error('Channel metadata is unavailable');
 const start=html.indexOf('{',match.index+match[0].length);let depth=0,quoted=false,escaped=false;
 for(let i=start;i<html.length;i++){
  const char=html[i];
  if(quoted){if(escaped)escaped=false;else if(char==='\\')escaped=true;else if(char==='"')quoted=false;continue}
  if(char==='"')quoted=true;else if(char==='{')depth++;else if(char==='}'&&--depth===0)return JSON.parse(html.slice(start,i+1));
 }
 throw new Error('Incomplete channel metadata');
}
function collect(value:any,key:string,result:any[]=[]):any[]{
 if(Array.isArray(value))for(const entry of value)collect(entry,key,result);
 else if(value&&typeof value==='object')for(const [name,entry] of Object.entries(value)){if(name===key)result.push(entry);else collect(entry,key,result)}
 return result;
}
export function parseChannelPage(html:string):AutoEpisode[]{
 const data=embeddedJson(html,'ytInitialData');
 if(data.metadata?.channelMetadataRenderer?.externalId!==CHANNEL_ID)throw new Error('Unexpected YouTube channel');
 const tabs=data.contents?.twoColumnBrowseResultsRenderer?.tabs;
 const content=tabs?.find((tab:any)=>tab.tabRenderer?.selected)?.tabRenderer?.content;
 if(!content)throw new Error('Channel videos are unavailable');
 const candidates=[...collect(content,'lockupViewModel').map(r=>{
  const badges=collect(r.contentImage,'thumbnailBadgeViewModel');
  return {id:r.contentId,title:text(r.metadata?.lockupMetadataViewModel?.title),duration:badges.map(b=>b.text).find(t=>secondsFromLabel(t)>0)||'',blocked:r.contentType!=='LOCKUP_CONTENT_TYPE_VIDEO'||badges.some(b=>/LIVE|UPCOMING|PREMIERE/.test(b.badgeStyle||'')),url:r.rendererContext?.commandContext?.onTap?.innertubeCommand?.commandMetadata?.webCommandMetadata?.url||''};
 }),...collect(content,'videoRenderer').map(r=>({id:r.videoId,title:text(r.title),duration:text(r.lengthText),blocked:Boolean(r.upcomingEventData)||collect(r,'thumbnailOverlayTimeStatusRenderer').some(o=>/LIVE|UPCOMING/.test(o.style||'')),url:r.navigationEndpoint?.commandMetadata?.webCommandMetadata?.url||''}))];
 const seen=new Set<string>();const episodes:AutoEpisode[]=[];
 for(const candidate of candidates){
  const seconds=secondsFromLabel(candidate.duration);
  if(!/^[\w-]{11}$/.test(candidate.id||'')||seen.has(candidate.id)||candidate.blocked||candidate.url.startsWith('/shorts/')||seconds<MIN_EPISODE_SECONDS||!candidate.title||omittedTitles.test(candidate.title))continue;
  seen.add(candidate.id);
  episodes.push({id:candidate.id,guest:'',title:clean(candidate.title).slice(0,300),topic:'New releases',duration:`${Math.round(seconds/60)} min`,summary:'A full conversation hosted by Anil Bajpai on ABTalksOnAI.',terms:clean(candidate.title),seconds,thumbnailUrl:`https://i.ytimg.com/vi/${candidate.id}/hq720.jpg`,sourceUrl:`https://www.youtube.com/watch?v=${candidate.id}`});
 }
 if(!episodes.length)throw new Error('No released full episodes found');
 return episodes;
}
const decodeXml=(s:string)=>s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'");
export function parseFeedDates(xml:string):Map<string,string>{
 const dates=new Map<string,string>();
 for(const entry of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)){
  const id=/<yt:videoId>([^<]+)<\/yt:videoId>/.exec(entry[1])?.[1];const date=/<published>([^<]+)<\/published>/.exec(entry[1])?.[1];
  if(id&&date&&Number.isFinite(Date.parse(date)))dates.set(id,decodeXml(date));
 }
 return dates;
}
async function sourceText(url:string):Promise<string>{
 const response=await fetch(url,{headers:{'Accept-Language':'en-US,en;q=0.9','User-Agent':'Mozilla/5.0 (compatible; ABTalksOnAI-EpisodeSync/1.0)'},signal:AbortSignal.timeout(9000)});
 if(!response.ok)throw new Error(`Official channel returned ${response.status}`);
 const body=await response.text();if(body.length>5_000_000)throw new Error('Unexpected channel response size');return body;
}
export function enrichFromWatch(episode:AutoEpisode,html:string):AutoEpisode|null{
 const player=embeddedJson(html,'ytInitialPlayerResponse');const details=player.videoDetails;const metadata=player.microformat?.playerMicroformatRenderer;
 if(details?.videoId!==episode.id||details?.channelId!==CHANNEL_ID)return null;
 if(player.playabilityStatus?.status!=='OK'||details.isLive||details.isUpcoming||metadata?.liveBroadcastDetails?.isLiveNow)return null;
 const seconds=Number(details.lengthSeconds);const publishedAt=metadata?.publishDate||metadata?.uploadDate;
 if(!Number.isFinite(seconds)||seconds<MIN_EPISODE_SECONDS||(publishedAt&&Date.parse(publishedAt)>Date.now()))return null;
 const paragraph=String(details.shortDescription||'').split(/\n\s*\n/).map(s=>s.trim()).find(s=>s.length>45&&!/^https?:|^#/.test(s));
 return {...episode,seconds,duration:`${Math.round(seconds/60)} min`,...(publishedAt?{publishedAt}:{}),...(paragraph?{summary:clean(paragraph.replace(/https?:\/\/\S+/g,'')).slice(0,450)}:{})};
}
export async function loadChannelEpisodes():Promise<AutoEpisode[]>{
 const [page,feed]=await Promise.allSettled([sourceText(CHANNEL_URL+'?hl=en'),sourceText(FEED_URL)]);
 if(page.status!=='fulfilled')throw new Error('Official channel unavailable');
 const episodes=parseChannelPage(page.value);const dates=feed.status==='fulfilled'?parseFeedDates(feed.value):new Map<string,string>();
 const enriched=await Promise.all(episodes.map(async(episode,index)=>{
  if(dates.has(episode.id))return {...episode,publishedAt:dates.get(episode.id)};
  // Only the newest entries need additional watch-page requests. Older dates remain unknown.
  if(index>=3)return episode;
  try{return enrichFromWatch(episode,await sourceText(episode.sourceUrl+'&hl=en'))}catch{return episode}
 }));
 const released=enriched.filter((episode):episode is AutoEpisode=>Boolean(episode)).filter(e=>!e.publishedAt||Date.parse(e.publishedAt)<=Date.now());
 if(!released.length)throw new Error('No released episodes could be verified');
 return released;
}
