import {ArrowRight,Play,ArrowUpRight,Youtube} from 'lucide-react';
import {episodes,latestEpisode,portraitSrc,type Episode} from '../episodes';
import {Link,navigate} from '../router';
import {CoverButton,Kicker,usePlayer,youtube} from '../components/site';

const byPortrait=(name:string)=>episodes.find(e=>e.portrait===name)!;
export const latestGuests:{name:string;label:string;note:string;episode:Episode|null}[]=[
 {name:'pranav',label:'Pranav Pai',note:'Managing Partner & CIO, 3one4 Capital',episode:byPortrait('pranav')},
 {name:'sunil',label:'Sunil Grover',note:'Managing Partner, G2C Ventures',episode:episodes.find(e=>e.id==='m19dviOKDbk')!},
 {name:'anil',label:'Anil Bajpai',note:'Your host',episode:null},
 {name:'navisha',label:'Navisha Prabhakar',note:'Regional Head, Google',episode:byPortrait('navisha')},
 {name:'malpani',label:'Aniruddha Malpani',note:'Founder & Angel Investor, Malpani Ventures',episode:byPortrait('malpani')},
];

export function PersonCard({name,label,note,onOpen,actionLabel}:{name:string;label:string;note:string;onOpen:()=>void;actionLabel:string}){
 return <button className={`person-card person-${name} ${name==='anil'?'is-host':''}`} onClick={onOpen} aria-label={actionLabel}><span className="person-photo"><img src={portraitSrc(name)} alt="" loading="lazy"/></span><span className="person-text"><strong>{label}</strong><small>{note}</small></span></button>;
}

export function HomePage(){
 const {play}=usePlayer();const featured=latestEpisode;
 return <>
  <section className="home-hero" aria-labelledby="home-title">
   <div className="home-hero-media" aria-hidden="true"><img src="/assets/studio-hero.jpg" alt=""/></div>
   <div className="page-wrap home-hero-inner"><div className="hero-copy">
    <Kicker>The conversation starts here</Kicker>
    <h1 id="home-title">Ideas worth<br/>talking about.</h1>
    <p className="home-hero-lede">AI, work and the people shaping what comes next. A podcast with Anil Bajpai.</p>
    <div className="hero-actions"><button className="btn btn-gold btn-lg" onClick={()=>play(featured)}><Play size={15} fill="currentColor"/> Watch latest episode</button><a className="btn btn-quiet btn-gold-text" href={youtube} target="_blank" rel="noopener"><Youtube size={18}/> YouTube <ArrowUpRight size={15}/></a></div>
   </div></div>
  </section>

  <section className="featured page-wrap" id="latest" aria-labelledby="featured-title">
   <div className="section-head"><Kicker>Latest episode</Kicker><Link to="/conversations" className="text-link">View all <ArrowUpRight size={16}/></Link></div>
   <div className="featured-grid">
    <CoverButton className="featured-cover" episode={featured} label={`Play the conversation with ${featured.guest}`}/>
    <div className="featured-copy"><span className="featured-topic">{featured.topic} · {featured.duration}</span><h2 id="featured-title">{featured.title}</h2>
     <p className="featured-byline">{featured.guest} × Anil Bajpai</p><p className="featured-summary">{featured.summary}</p>
     <button className="underline-link" onClick={()=>play(featured)}>{featured.audioUrl?'Listen to episode':'Watch episode'} <ArrowUpRight size={16}/></button></div>
   </div>
  </section>

  <section className="latest page-wrap" aria-labelledby="latest-title">
   <div className="section-head"><div><Kicker>Featured voices</Kicker><h2 id="latest-title">People behind the conversations</h2></div></div>
   <div className="person-row">{latestGuests.map(g=><PersonCard key={g.name} {...g} actionLabel={g.episode?`${g.episode.audioUrl?'Listen to':'Watch'} the conversation with ${g.label}`:'Meet host Anil Bajpai'} onOpen={()=>g.episode?play(g.episode):navigate('/meet-anil')}/>)}</div>
  </section>

  <section className="page-wrap ideas-section">
   <div className="ideas-banner"><div className="ideas-mosaic" aria-hidden="true">{episodes.filter(e=>!e.audioUrl).map(e=><img key={e.id} src={`/assets/${e.id}.jpg`} alt="" loading="lazy"/>)}</div>
    <div className="ideas-copy"><h2>Every guest. Every idea.<br/>A deeper look at what’s next.</h2><Link to="/conversations" className="btn btn-outline">Explore all episodes <ArrowRight size={15}/></Link></div></div>
  </section>
 </>;
}
