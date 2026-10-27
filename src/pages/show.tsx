import {ArrowUpRight,Lightbulb,Mic,Play,Target,Users} from 'lucide-react';
import {latestEpisode} from '../episodes';
import {AdaptiveCopy} from '../components/mobile-copy';
import {Link} from '../router';
import {CoverButton,CtaBand,HostMedia,PageHero,Signature,youtube} from '../components/site';

const pillars=[
 {Icon:Mic,title:'Real conversations',text:'Unfiltered, honest and thought-provoking discussions.'},
 {Icon:Users,title:'Extraordinary guests',text:'Leaders, innovators, changemakers and experts from across fields.'},
 {Icon:Lightbulb,title:'Bigger perspectives',text:'Ideas that go beyond headlines and create real impact.'},
 {Icon:Target,title:'For a brighter future',text:'Because better conversations build better leaders, teams and communities.'},
];

export function SubscribeBand(){
 return <CtaBand title="Listen. Think. Build." text="Be part of the ABTalksOnAI community." action={<a className="btn btn-gold" href={`${youtube}?sub_confirmation=1`} target="_blank" rel="noopener">Subscribe on YouTube <ArrowUpRight size={15}/></a>}/>;
}

export function ShowPage(){
 return <>
  <PageHero kicker="The show" title="Why ABTalksOnAI?" subtitle="AI is changing work. Let’s understand it together." media={<HostMedia/>}
   actions={<Link to="/conversations" className="btn btn-gold"><Play size={13} fill="currentColor"/> Watch the show</Link>}>
   <p><AdaptiveCopy mobile="Anil Bajpai meets the people shaping AI, careers and leadership.">Hosted by Anil Bajpai, ABTalksOnAI brings founders, investors and practitioners into conversations about AI, careers, leadership and the decisions behind their work.</AdaptiveCopy></p>
  </PageHero>

  <section className="cream-section"><div className="page-wrap">
   <div className="quote-split"><CoverButton className="quote-media" episode={latestEpisode} label={`Play the conversation with ${latestEpisode.guest}`}/>
    <blockquote className="pull-quote"><span className="quote-mark" aria-hidden="true">“</span><p>The best conversations happen when people listen with curiosity, not judgment.</p><footer><Signature/></footer></blockquote></div>
   <div className="pillars"><h2>What makes ABTalksOnAI different?</h2><ul>{pillars.map(({Icon,title,text})=><li key={title}><span className="pillar-icon"><Icon size={22} strokeWidth={1.5}/></span><h3>{title}</h3><p>{text}</p></li>)}</ul></div>
  </div></section>

  <SubscribeBand/>
 </>;
}
