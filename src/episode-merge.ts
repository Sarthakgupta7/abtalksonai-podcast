import type {Episode} from './episodes';
import type {AutoEpisode} from './live-types';
export function validAutoEpisode(value:unknown):value is AutoEpisode{
 const e=value as AutoEpisode;
 return Boolean(e&&typeof e==='object'&&/^[\w-]{11}$/.test(e.id)&&typeof e.title==='string'&&e.title.length>0&&e.title.length<=300&&e.guest===''&&typeof e.summary==='string'&&typeof e.duration==='string'&&typeof e.terms==='string'&&e.topic==='New releases'&&e.thumbnailUrl===`https://i.ytimg.com/vi/${e.id}/hq720.jpg`&&e.sourceUrl===`https://www.youtube.com/watch?v=${e.id}`&&Number.isFinite(e.seconds)&&e.seconds>=600&&(!e.publishedAt||(Number.isFinite(Date.parse(e.publishedAt))&&Date.parse(e.publishedAt)<=Date.now())));
}
export function mergeEpisodes(base:Episode[],incoming:AutoEpisode[]):Episode[]{
 const indexed=new Map(base.map(e=>[e.id,e]));const seen=new Set<string>();const merged:Episode[]=[];
 for(const fresh of incoming){if(!validAutoEpisode(fresh)||seen.has(fresh.id))continue;seen.add(fresh.id);const known=indexed.get(fresh.id);merged.push(known?{...fresh,...known,publishedAt:fresh.publishedAt||known.publishedAt}:fresh)}
 return [...merged,...base.filter(e=>!seen.has(e.id))];
}
