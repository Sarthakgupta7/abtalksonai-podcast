import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,ChevronDown,Clock,Mic,Play,Search,X} from 'lucide-react';
import {coverSrc} from '../episodes';
import {useEpisodeCatalogue} from '../episode-feed';
import {HeroMedia,Kicker,usePlayer} from '../components/site';

const filters=[{value:'',label:'All'},{value:'Human stories',label:'Human stories'},{value:'AI & work',label:'AI & work'},{value:'Startups',label:'Startups & investing'},{value:'From the archive',label:'Audio & archive'},{value:'New releases',label:'New releases'}];
const sorts={latest:'Latest first',shortest:'Shortest first',longest:'Longest first'};
const minutes=(duration:string)=>parseInt(duration,10)||0;
export function ConversationsPage(){
 const {archiveEpisodes}=useEpisodeCatalogue();const {play}=usePlayer();const results=useRef<HTMLDivElement>(null);
 const params=new URLSearchParams(location.search);
 const[topic,setTopic]=useState(params.get('topic')||'');const[query,setQuery]=useState(params.get('q')||'');const[sort,setSort]=useState<keyof typeof sorts>(Object.hasOwn(sorts,params.get('sort')||'')?params.get('sort') as keyof typeof sorts:'latest');
 useEffect(()=>{const sync=()=>{const p=new URLSearchParams(location.search);setTopic(p.get('topic')||'');setQuery(p.get('q')||'');setSort(Object.hasOwn(sorts,p.get('sort')||'')?p.get('sort') as keyof typeof sorts:'latest')};addEventListener('popstate',sync);return()=>removeEventListener('popstate',sync)},[]);
 function update(key:string,value:string){const url=new URL(location.href);if(value)url.searchParams.set(key,value);else url.searchParams.delete(key);history.replaceState(null,'',url)}
 const q=query.trim().toLowerCase();
 const list=archiveEpisodes.filter(e=>(!topic||e.topic===topic)&&`${e.title} ${e.guest} ${e.terms} ${e.topic}`.toLowerCase().includes(q));
 if(sort!=='latest')list.sort((a,b)=>{if(!a.duration)return 1;if(!b.duration)return -1;return sort==='shortest'?minutes(a.duration)-minutes(b.duration):minutes(b.duration)-minutes(a.duration)});
 const reset=()=>{setTopic('');setQuery('');update('topic','');update('q','')};
 return <>
  <section className="page-hero library-hero"><HeroMedia className="hero-mosaic episode-mosaic">{archiveEpisodes.filter(e=>!e.audioUrl).slice(0,6).map(e=><img key={e.id} src={coverSrc(e)} alt=""/>)}</HeroMedia><div className="page-wrap hero-inner"><div className="hero-copy">
   <Kicker>The conversations</Kicker><h1>Find your next conversation.</h1><div className="hero-body"><p>Explore the video and audio archive by guest, topic or question.</p></div>
   <form className="search-field" role="search" onSubmit={e=>{e.preventDefault();results.current?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'})}}><Search size={18}/><input type="search" value={query} onChange={e=>{setQuery(e.target.value);update('q',e.target.value)}} placeholder="Search guests, topics or keywords" aria-label="Search conversations"/>{query&&<button type="button" className="field-clear" onClick={()=>{setQuery('');update('q','')}} aria-label="Clear search"><X size={15}/></button>}<button type="submit" className="field-submit" aria-label="Show results"><ArrowUpRight size={17}/></button></form>
  </div></div></section>
  <section className="library page-wrap" aria-label="Episode library">
   <div className="filter-chips" role="group" aria-label="Filter by topic">{filters.map(f=><button key={f.label} aria-pressed={topic===f.value} onClick={()=>{setTopic(f.value);update('topic',f.value)}}>{f.label}</button>)}</div>
   <div className="library-status" ref={results}><span aria-live="polite">{list.length} {list.length===1?'conversation':'conversations'}</span><label className="sort-select"><span className="sr-only">Sort conversations</span><select value={sort} onChange={e=>{setSort(e.target.value as keyof typeof sorts);update('sort',e.target.value)}}>{Object.entries(sorts).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select><ChevronDown size={15}/></label></div>
   <div className="episode-grid">{list.map(e=><article key={e.id} className="episode-card">
    <div className="episode-thumb"><img src={coverSrc(e)} alt="" loading="lazy" width="1280" height="720"/><span className="play-disc" aria-hidden="true"><Play size={14} fill="currentColor"/></span></div>
    <div className="episode-body"><span className="episode-topic">{e.audioUrl?'Audio':e.topic}</span><h3><button onClick={()=>play(e)}>{e.title}</button></h3>{e.duration&&<span className="episode-length"><Clock size={13}/> {e.duration}</span>}<span className="episode-guest"><Mic size={13}/> {e.guest||'With Anil Bajpai'}</span></div>
    <ArrowUpRight className="episode-arrow" size={18} aria-hidden="true"/>
   </article>)}</div>
   {!list.length&&<div className="empty-state"><Search size={24}/><h3>No conversations found</h3><p>Try another guest, topic or idea.</p><button className="btn btn-outline" onClick={reset}>Reset search</button></div>}
  </section>
 </>;
}
