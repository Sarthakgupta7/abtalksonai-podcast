import type {IncomingMessage,ServerResponse} from 'node:http';
import {getCache} from '@vercel/functions';
import {checkedThisIndiaDay,millisecondsUntilNightlyRefresh} from '../src/episode-schedule.js';
import {CHANNEL_URL,loadChannelEpisodes} from '../server/youtube.js';
import type {EpisodeFeed} from '../src/live-types.ts';
import seed from '../src/auto-episodes.json' with {type:'json'};

const CACHE_KEY='abtalksonai-podcast:youtube-full-episodes:v1';
export default async function handler(req:IncomingMessage,res:ServerResponse){
 res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('X-Content-Type-Options','nosniff');
 if(req.method!=='GET'&&req.method!=='HEAD'){res.setHeader('Allow','GET, HEAD');res.statusCode=405;res.end(JSON.stringify({error:'Method not allowed'}));return}
 const cache=getCache();let stored:EpisodeFeed|null=null;
 try{stored=await cache.get(CACHE_KEY) as EpisodeFeed|null}catch{ /* The bundled catalogue also works without the platform cache. */ }
 let payload:EpisodeFeed;
 if(stored&&checkedThisIndiaDay(stored.checkedAt))payload=stored;
 else try{
  const recent=await loadChannelEpisodes();const seen=new Set(recent.map(e=>e.id));
  const episodes=[...recent,...(stored?.episodes||seed).filter(e=>!seen.has(e.id))].slice(0,500);
  payload={version:1,source:CHANNEL_URL,status:'fresh',checkedAt:new Date().toISOString(),episodes};
  try{await cache.set(CACHE_KEY,payload,{ttl:30*24*60*60,tags:['abtalksonai-episodes'],name:'ABTalksOnAI full podcast episodes'})}catch{ /* A cache-write failure must not hide a valid channel response. */ }
 }catch{
  payload=stored?{...stored,status:'stale'}:{version:1,source:CHANNEL_URL,status:'fallback',checkedAt:'',episodes:seed};
 }
 const remaining=Math.max(1,Math.ceil(millisecondsUntilNightlyRefresh()/1000));
 res.setHeader('Cache-Control',`public, max-age=${Math.min(60,remaining)}`);
 res.setHeader('Vercel-CDN-Cache-Control',payload.status==='fresh'?`public, max-age=${remaining}`:'public, max-age=60');
 res.setHeader('X-Episode-Refresh','nightly-midnight-Asia-Kolkata');
 res.setHeader('X-Episode-Sync',payload.status);
 if(req.method==='HEAD'){res.end();return}res.end(JSON.stringify(payload));
}
