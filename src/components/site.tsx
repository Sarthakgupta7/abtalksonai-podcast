import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from 'react';
import {ArrowUpRight,Check,Copy,Instagram,Linkedin,Mail,Menu,Play,X,Youtube,House,Clapperboard,Users,Ellipsis} from 'lucide-react';
import {VelocityTabs} from './vendor/velocity-tabs';
import {Link,routes,usePath} from '../router';
import {coverSrc,portraitSrc,type Episode} from '../episodes';

export const youtube='https://www.youtube.com/@ABTalksOnAI';
export const apple='https://podcasts.apple.com/us/podcast/abtalks/id1846296322';
export const instagram='https://www.instagram.com/abtalksonai/';
export const linkedin='https://www.linkedin.com/in/anil-bajpai/';

type Player={play:(episode:Episode)=>void;suggestGuest:()=>void};
export const PlayerContext=createContext<Player>({play:()=>{},suggestGuest:()=>{}});
export const usePlayer=()=>useContext(PlayerContext);

export function Wordmark(){return <span className="wordmark"><img src="/assets/abtalksonai-logo.png" alt="ABTalksOnAI, AI conversations that matter"/></span>}

export function SiteHeader(){
 const path=usePath();const[open,setOpen]=useState(false);
 useEffect(()=>setOpen(false),[path]);
 useEffect(()=>{const escape=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};addEventListener('keydown',escape);return()=>removeEventListener('keydown',escape)},[]);
 return <header className="site-nav"><div className="nav-inner">
  <Link to="/" className="nav-brand" aria-label="ABTalksOnAI home"><Wordmark/></Link>
  <nav className={open?'open':''} aria-label="Main navigation">{routes.map(r=><Link key={r.path} to={r.path} aria-current={path===r.path?'page':undefined}>{r.label}</Link>)}</nav>
  <a className="nav-youtube" href={youtube} target="_blank" rel="noopener"><Youtube size={15}/> YouTube <ArrowUpRight size={14}/></a>
  <button className="menu-button icon-button" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button>
 </div></header>;
}


export function MobileNavigation(){
 const path=usePath();const more=useRef<HTMLDialogElement>(null);const[open,setOpen]=useState(false);
 const extraRoutes=routes.filter(r=>['/the-show','/meet-anil','/campus'].includes(r.path));
 useEffect(()=>{more.current?.close()},[path]);
 useEffect(()=>{const media=matchMedia('(max-width:640px)');const close=()=>{if(!media.matches)more.current?.close()};media.addEventListener('change',close);return()=>media.removeEventListener('change',close)},[]);
 return <>
  <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
   {[{to:'/' as const,label:'Home',Icon:House},{to:'/conversations' as const,label:'Episodes',Icon:Clapperboard},{to:'/guests' as const,label:'Guests',Icon:Users}].map(({to,label,Icon})=><Link key={to} to={to} aria-current={path===to?'page':undefined}><Icon size={19} strokeWidth={1.7} aria-hidden="true"/><span>{label}</span></Link>)}
   <button type="button" aria-label="More pages" aria-current={extraRoutes.some(r=>r.path===path)?'page':undefined} aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-more-pages" onClick={()=>{more.current?.showModal();setOpen(true)}}><Ellipsis size={20} aria-hidden="true"/><span>More</span></button>
  </nav>
  <dialog ref={more} id="mobile-more-pages" className="mobile-more-pages" aria-labelledby="mobile-more-title" onClose={()=>setOpen(false)} onClick={e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)more.current?.close()}}}>
   <div className="mobile-more-heading"><h2 id="mobile-more-title">Explore ABTalksOnAI</h2><button type="button" className="icon-button" aria-label="Close more pages" onClick={()=>more.current?.close()}><X size={18}/></button></div>
   <nav aria-label="More pages">{extraRoutes.map(r=><Link key={r.path} to={r.path} aria-current={path===r.path?'page':undefined} onClick={()=>more.current?.close()}>{r.label}<ArrowUpRight size={17} aria-hidden="true"/></Link>)}</nav>
  </dialog>
 </>;
}

export function SiteFooter(){
 const path=usePath();
 return <footer className="site-footer"><div className="page-wrap">
  <div className="footer-top"><Link to="/" aria-label="Back to ABTalksOnAI home"><Wordmark/></Link>
   <nav aria-label="Footer navigation">{routes.map(r=><Link key={r.path} to={r.path} aria-current={path===r.path?'page':undefined}>{r.label}</Link>)}</nav>
   <div className="footer-social"><a href={youtube} target="_blank" rel="noopener" aria-label="YouTube"><Youtube size={17}/></a><a href={linkedin} target="_blank" rel="noopener" aria-label="Anil Bajpai on LinkedIn"><Linkedin size={16}/></a><a href={instagram} target="_blank" rel="noopener" aria-label="Instagram"><Instagram size={16}/></a></div>
  </div>
  <div className="footer-bottom"><span>© 2026 ABTalksOnAI. All rights reserved.</span><a href={apple} target="_blank" rel="noopener">Apple Podcasts <ArrowUpRight size={12}/></a><a href="mailto:abtalks.podcast@gmail.com">Get in touch <Mail size={12}/></a><span className="footer-credit">A podcast by <strong>ABTalksOnAI</strong></span></div>
 </div></footer>;
}

export function Kicker({children,mark='line'}:{children:ReactNode;mark?:'line'|'plus'|'none'}){return <span className={`kicker kicker-${mark}`}>{children}</span>}

// Photography bleeds in from the right and fades into black, as on the home hero.
export function HeroMedia({children,className=''}:{children:ReactNode;className?:string}){return <div className={`page-hero-media ${className}`} aria-hidden="true">{children}</div>}

export function PageHero({kicker,title,subtitle,children,actions,media,className=''}:{kicker:string;title:ReactNode;subtitle?:ReactNode;children?:ReactNode;actions?:ReactNode;media?:ReactNode;className?:string}){
 return <section className={`page-hero ${className}`}>{media}<div className="page-wrap hero-inner">
  <div className="hero-copy"><Kicker>{kicker}</Kicker><h1>{title}</h1>{subtitle&&<p className="hero-subtitle">{subtitle}</p>}{children&&<div className="hero-body">{children}</div>}{actions&&<div className="hero-actions">{actions}</div>}</div>
 </div></section>;
}

export function HostMedia({interactive=false}:{interactive?:boolean}){
 const[colour,setColour]=useState(false);
 if(!interactive)return <HeroMedia className="host-media"><img src={portraitSrc('anil')} alt=""/></HeroMedia>;
 return <div className="page-hero-media host-media host-colour-media"><button type="button" className={colour?'is-colour':''} aria-label="Show Anil Bajpai portrait in colour" aria-pressed={colour} onClick={()=>setColour(v=>!v)}><img src="/assets/anil-story-portrait.webp" alt="Anil Bajpai, founder of ABTalksOnAI and podcast host"/><span>Hover or tap to see in colour</span></button></div>;
}

export function Signature({className=''}:{className?:string}){return <span className={`signature ${className}`}>Anil Bajpai</span>}

export function CoverButton({episode,label,className=''}:{episode:Episode;label:string;className?:string}){
 const {play}=usePlayer();
 return <button className={`cover-button ${className}`} onClick={()=>play(episode)} aria-label={label}><img src={coverSrc(episode)} alt="" loading="lazy"/><span className="play-disc" aria-hidden="true"><Play size={18} fill="currentColor"/></span></button>;
}

export function CtaBand({title,text,action}:{title:ReactNode;text:ReactNode;action:ReactNode}){
 return <section className="cta-band"><div className="page-wrap cta-inner"><div className="cta-copy"><Kicker>Join the conversation</Kicker><h2>{title}</h2><p>{text}</p></div>{action}</div></section>;
}

export function PlayerDialog({episode,onClose}:{episode:Episode|null;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);const[view,setView]=useState('watch');const[copied,setCopied]=useState(false);const[shareFailed,setShareFailed]=useState(false);
 useEffect(()=>{if(episode){setView('watch');setCopied(false);setShareFailed(false);dialog.current?.showModal()}else dialog.current?.close()},[episode]);
 return <dialog ref={dialog} className="player-dialog" onClose={onClose} onClick={e=>{if(e.target!==e.currentTarget)return;const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose()}} aria-labelledby="player-title">
 {episode&&<><div className="dialog-heading"><div><span className="micro-label">{episode.guest?`IN CONVERSATION WITH ${episode.guest.toUpperCase()}`:'ABTalksOnAI / FULL CONVERSATION'}</span><h2 id="player-title">{episode.title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close episode"><X size={20}/></button></div>
 <VelocityTabs className="episode-view-tabs" aria-label="Episode view" value={view} onValueChange={setView} tabs={[{value:'watch',label:episode.audioUrl?'Listen':'Watch'},{value:'notes',label:'Episode notes'}]}/>
 {view==='watch'?episode.audioUrl?<div className="audio-conversation"><img src={coverSrc(episode)} alt={episode.portrait?episode.guest:'ABTalksOnAI audio archive'}/><div><span className="kicker kicker-none">A conversation with {episode.guest}</span><p>{episode.summary}</p><audio controls preload="none" src={episode.audioUrl}>Your browser does not support audio playback.</audio><small>Full podcast audio{episode.duration&&` · ${episode.duration}`}</small></div></div>:<div className="video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${episode.id}?autoplay=1&rel=0`} title={episode.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/></div>:<div className="episode-notes"><span className="topic-tag">{episode.topic}{episode.duration&&` · ${episode.duration}`}</span><h3>{episode.guest?`${episode.guest} with Anil Bajpai`:'Hosted by Anil Bajpai'}</h3><p>{episode.summary}</p><p>{episode.audioUrl?'Listen to the full conversation using the audio player, or open the podcast on its original platform.':'For the full conversation and any available chapters, visit the episode on YouTube.'}</p>{episode.publishedAt&&<p className="episode-published">Published {new Date(episode.publishedAt).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</p>}{episode.sourceUrl&&<a className="text-link" href={episode.sourceUrl} target="_blank" rel="noopener">Official episode source <ArrowUpRight size={15}/></a>}</div>}
 <div className="player-bottom"><span>{episode.duration&&`${episode.duration} · `}Full conversation</span><button type="button" className="text-link episode-share" onClick={async()=>{try{const url=new URL(location.href);url.searchParams.set('episode',episode.id);await navigator.clipboard.writeText(url.href);setCopied(true);setShareFailed(false)}catch{setShareFailed(true)}}}>{copied?<Check size={15}/>:<Copy size={15}/>} {copied?'Link copied':'Copy episode link'}</button><span className="sr-only" role="status">{copied?'Episode link copied':shareFailed?'Copy the episode URL from your address bar':''}</span>{shareFailed&&<small>Copy the link from your address bar.</small>}<a href={episode.episodeUrl||`https://www.youtube.com/watch?v=${episode.id}`} target="_blank" rel="noopener">{episode.audioUrl?'Open podcast':'Open on YouTube'} <ArrowUpRight size={15}/></a></div></>}
 </dialog>;
}

export function GuestForm({open,onClose}:{open:boolean;onClose:()=>void}){
 const d=useRef<HTMLDialogElement>(null);const[prepared,setPrepared]=useState(false);const[copy,setCopy]=useState(false);const[body,setBody]=useState('');
 useEffect(()=>{if(open){setPrepared(false);d.current?.showModal()}else d.current?.close()},[open]);
 return <dialog className="guest-dialog" ref={d} onClose={onClose} aria-labelledby="suggest-title"><div className="dialog-heading"><h2 id="suggest-title">Who should we talk to?</h2><button className="icon-button" onClick={onClose} aria-label="Close guest suggestion"><X size={20}/></button></div><p>A person, an idea, a different perspective. Tell us why their story belongs here.</p><form onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);const message=`Hello ABTalksOnAI team,\n\nI would like to suggest ${f.get('guest')} for the podcast.\n\n${f.get('reason')}\n\nSuggested by ${f.get('name')}`;setBody(message);setPrepared(true);window.location.href=`mailto:abtalks.podcast@gmail.com?subject=${encodeURIComponent('Podcast guest suggestion: '+f.get('guest'))}&body=${encodeURIComponent(message)}`}}><label>Your name<input name="name" required maxLength={100} autoComplete="name"/></label><label>Guest name<input name="guest" required maxLength={100}/></label><label>What would you like us to explore?<textarea name="reason" required rows={4} maxLength={2000}/></label><button className="btn btn-gold" type="submit">Prepare an email <ArrowUpRight size={16}/></button><small>This opens a draft in your email app. You choose when to send it.</small>{prepared&&<div className="form-feedback" role="status"><p>If your email app did not open, copy your suggestion and email <a href="mailto:abtalks.podcast@gmail.com">abtalks.podcast@gmail.com</a>.</p><button type="button" className="text-link" onClick={async()=>{try{await navigator.clipboard.writeText(body);setCopy(true)}catch{setCopy(false)}}}>{copy?<Check size={16}/>:<Copy size={16}/>} {copy?'Copied':'Copy suggestion'}</button><textarea readOnly value={body} aria-label="Prepared suggestion"/></div>}</form></dialog>;
}
