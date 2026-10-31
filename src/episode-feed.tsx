import {createContext,useContext,useEffect,useMemo,useState,type ReactNode} from 'react';
import {archiveEpisodes,episodes,latestEpisode} from './episodes';
import seed from './auto-episodes.json';
import type {AutoEpisode,EpisodeFeed} from './live-types';
import {millisecondsUntilNightlyRefresh} from './episode-schedule.js';
import {mergeEpisodes,validAutoEpisode} from './episode-merge';
const fallback={episodes,archiveEpisodes,latestEpisode};
const CatalogueContext=createContext(fallback);
export const useEpisodeCatalogue=()=>useContext(CatalogueContext);
export function EpisodeFeedProvider({children}:{children:ReactNode}){
 const[live,setLive]=useState<AutoEpisode[]>(()=>seed.filter(validAutoEpisode));
 useEffect(()=>{
  let stopped=false;let active:AbortController|null=null;
  async function refresh(){
   if(document.hidden||active)return;active=new AbortController();const timeout=setTimeout(()=>active?.abort(),25000);
   try{const response=await fetch('/api/episodes',{signal:active.signal});if(!response.ok)return;const feed=await response.json() as EpisodeFeed;if(!stopped&&feed.version===1&&Array.isArray(feed.episodes)){const verified=feed.episodes.filter(validAutoEpisode);if(verified.length)setLive(verified)}}catch{/* Keep the last successful catalogue, including the bundled offline fallback. */}finally{clearTimeout(timeout);active=null}
  }
  // The server refreshes at midnight IST; an open tab picks it up shortly afterwards.
  let timer:ReturnType<typeof setTimeout>;const schedule=()=>{timer=setTimeout(()=>{void refresh();schedule()},millisecondsUntilNightlyRefresh(Date.now(),5*60*1000))};
  void refresh();schedule();const visible=()=>{if(!document.hidden)void refresh()};document.addEventListener('visibilitychange',visible);
  return()=>{stopped=true;clearTimeout(timer);document.removeEventListener('visibilitychange',visible);active?.abort()};
 },[]);
 const value=useMemo(()=>{const merged=mergeEpisodes(episodes,live);return {episodes:merged,archiveEpisodes:mergeEpisodes(archiveEpisodes,live),latestEpisode:merged[0]||latestEpisode}},[live]);
 return <CatalogueContext.Provider value={value}>{children}</CatalogueContext.Provider>;
}
