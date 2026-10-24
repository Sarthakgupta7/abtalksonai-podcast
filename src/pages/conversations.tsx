import {useRef,useState} from 'react';
import {ArrowUpRight,ChevronDown,Clock,Mic,Play,Search,X} from 'lucide-react';
import {coverSrc,episodes} from '../episodes';
import {HeroMedia,Kicker,usePlayer} from '../components/site';

const filters=[{value:'',label:'All'},{value:'Human stories',label:'Human stories'},{value:'AI & work',label:'AI & work'},{value:'Startups',label:'Startups & investing'}];
const sorts={latest:'Latest first',shortest:'Shortest first',longest:'Longest first'};
const minutes=(duration:string)=>parseInt(duration,10)||0;

export function ConversationsPage(){
 const {play}=usePlayer();const results=useRef<HTMLDivElement>(null);
 const[topic,setTopic]=useState('');const[query,setQuery]=useState('');const[sort,setSort]=useState<keyof typeof sorts>('latest');
 const q=query.trim().toLowerCase();
 const list=episodes.filter(e=>(!topic||e.topic===topic)&&`${e.title} ${e.guest} ${e.terms} ${e.topic}`.toLowerCase().includes(q));
 if(sort!=='latest')list.sort((a,b)=>sort==='shortest'?minutes(a.duration)-minutes(b.duration):minutes(b.duration)-minutes(a.duration));
 const reset=()=>{setTopic('');setQuery('')};
 return <>
  <section className="page-hero library-hero"><HeroMedia className="hero-mosaic episode-mosaic">{episodes.filter(e=>!e.audioUrl).slice(0,6).map(e=><img key={e.id} src={coverSrc(e)} alt=""/>)}</HeroMedia><div className="page-wrap hero-inner"><div className="hero-copy">
   <Kicker>The conversations</Kicker><h1>Explore all episodes</h1><p className="hero-subtitle">Ideas. People. Perspectives.</p><div className="hero-body"><p>Dive into our growing library of conversations with visionaries, industry leaders and change-makers.</p></div>
   <form className="search-field" role="search" onSubmit={e=>{e.preventDefault();results.current?.scrollIntoView({behavior:'smooth',block:'start'})}}><Search size={18}/><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by guest, topic or keyword…" aria-label="Search conversations"/>{query&&<button type="button" className="field-clear" onClick={()=>setQuery('')} aria-label="Clear search"><X size={15}/></button>}<button type="submit" className="field-submit" aria-label="Show results"><ArrowUpRight size={17}/></button></form>
  </div></div></section>

  <section className="library page-wrap" aria-label="Episode library">
   <div className="filter-chips" role="group" aria-label="Filter by topic">{filters.map(f=><button key={f.label} aria-pressed={topic===f.value} onClick={()=>setTopic(f.value)}>{f.label}</button>)}</div>
   <div className="library-status" ref={results}><span aria-live="polite">{list.length} {list.length===1?'conversation':'conversations'}</span>
    <label className="sort-select"><span className="sr-only">Sort conversations</span><select value={sort} onChange={e=>setSort(e.target.value as keyof typeof sorts)}>{Object.entries(sorts).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select><ChevronDown size={15}/></label></div>
   <div className="episode-grid">{list.map(e=><article key={e.id} className="episode-card">
    <button className="episode-thumb" onClick={()=>play(e)} aria-label={`${e.audioUrl?'Listen to':'Watch'} ${e.title}`} tabIndex={-1}><img src={coverSrc(e)} alt="" loading="lazy"/><span className="play-disc" aria-hidden="true"><Play size={14} fill="currentColor"/></span></button>
    <div className="episode-body"><span className="episode-topic">{e.topic}</span><h3><button onClick={()=>play(e)}>{e.title}</button></h3><span className="episode-length"><Clock size={13}/> {e.duration}</span><span className="episode-guest"><Mic size={13}/> {e.guest}</span></div>
    <ArrowUpRight className="episode-arrow" size={18} aria-hidden="true"/>
   </article>)}</div>
   {!list.length&&<div className="empty-state"><Search size={24}/><h3>No conversations found</h3><p>Try another guest, topic or idea.</p><button className="btn btn-outline" onClick={reset}>Reset search</button></div>}
  </section>
 </>;
}
