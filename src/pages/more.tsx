import {ArrowUpRight,Play} from 'lucide-react';
import {episodes,latestEpisode,portraitSrc} from '../episodes';
import {GuestDirectory} from '../components/guest-directory';
import {guestDirectory} from '../guests';
import {StoryJourney,CampusWorkshop} from '../components/story-and-campus';
import {CtaBand,HeroMedia,HostMedia,Kicker,PageHero,Signature,linkedin,usePlayer} from '../components/site';
import {PersonCard} from './home';
import {SubscribeBand} from './show';

const featuredGuests=[
 {name:'pranav',label:'Pranav Pai',note:'Managing Partner & CIO, 3one4 Capital'},
 {name:'sunil',label:'Sunil Grover',note:'Managing Partner, G2C Ventures'},
 {name:'malpani',label:'Dr. Aniruddha Malpani',note:'Founder & Angel Investor, Malpani Ventures'},
 {name:'navisha',label:'Navisha Prabhakar',note:'Regional Head, Google'},
 {name:'kathrin',label:'Prof. Dr. Kathrin Kind',note:'World Economic Forum GFC Member'},
 {name:'stefano',label:'Stefano Ferrara',note:'Co-founder, VenturOS · Investor'},
];

// The hero mixes in guests who do not have a card below, so it does not repeat the grid.
const mosaicGuests=['amrish','pranav','vladimir','kathrin','manish','sunil','walid','navisha'];

export function GuestsPage(){
 const {play,suggestGuest}=usePlayer();
 return <>
  <PageHero kicker="Our guests" media={<HeroMedia className="hero-mosaic guest-mosaic">{mosaicGuests.map(name=><img key={name} src={portraitSrc(name)} alt=""/>)}</HeroMedia>} title={<>A title tells you what they do.<br/>A conversation tells you <em>who they are.</em></>}><p>Founders. Investors. Practitioners. Every voice brings a different perspective.</p></PageHero>
  <section className="page-wrap guests-page">
   <div className="guest-grid">{featuredGuests.map(g=>{const episode=episodes.find(e=>g.name==='sunil'?e.id==='m19dviOKDbk':e.portrait===g.name)!;return <PersonCard key={g.name} {...g} actionLabel={`${episode.audioUrl?'Listen to':'Watch'} the conversation with ${g.label}`} onOpen={()=>play(episode)}/>})}</div>
   <GuestDirectory/>
  </section>
  <CtaBand title="Who should we talk to next?" text="A story worth sharing. A question worth asking. Tell us who you’d like to hear from." action={<button className="btn btn-gold" onClick={suggestGuest}>Suggest a guest <ArrowUpRight size={15}/></button>}/>
 </>;
}

export function HostPage(){
 const {play}=usePlayer();
 return <>
  <section className="page-hero host-page-hero" aria-labelledby="host-page-title">
   <div className="host-page-heading"><Kicker>Meet the host</Kicker><h1 id="host-page-title">Anil Bajpai.<br/>Always <em>curious.</em></h1></div>
   <HostMedia interactive/>
   <div className="host-page-biography"><div className="hero-body"><p>Anil Bajpai is the founder of ABTalksOnAI and your host. He brings his experience in enterprise technology to conversations about AI, leadership and careers.</p><p>His curiosity connects big ideas with everyday decisions: how we work, what we build and where we go next. Every conversation is a chance to learn from someone who sees the world differently.</p></div>
    <div className="hero-actions"><a className="btn btn-gold" href={linkedin} target="_blank" rel="noopener">Connect on LinkedIn <ArrowUpRight size={15}/></a><button className="btn btn-quiet" onClick={()=>play(latestEpisode)}><Play size={13} fill="currentColor"/> Watch the latest episode</button></div>
   </div>
  </section>
  <section className="cream-section"><div className="page-wrap host-quote">
   <blockquote className="pull-quote"><span className="quote-mark" aria-hidden="true">“</span><p>AI is not a feature. It’s a new operating model.</p><footer><Signature/></footer></blockquote>
   <div className="host-facts"><div><strong>{episodes.length}</strong><span>Featured conversations</span></div><div><strong>{guestDirectory.length}</strong><span>Guests in conversation</span></div><div><strong>{new Set(episodes.map(e=>e.topic)).size}</strong><span>Themes, from AI at work to human stories</span></div></div>
  </div></section>
  <SubscribeBand/>
 </>;
}

export function CampusPage(){
 return <>
  <PageHero className="campus-page-hero" kicker="Campus" media={<HeroMedia><img src="/assets/studio-hero.jpg" alt=""/></HeroMedia>} title={<>Beyond the microphone,<br/><em>into the classroom.</em></>} actions={<a className="btn btn-gold" href="mailto:team@abtalks.in?subject=Campus%20AI%20workshop%20enquiry">Plan a campus workshop <ArrowUpRight size={15}/></a>}>
   <p>The questions raised on the podcast became a reason to build together: challenges, workshops and ViCodathon, connecting what industry needs with what students can do next.</p>
  </PageHero>
  <StoryJourney/>
  <CampusWorkshop/>
 </>;
}
