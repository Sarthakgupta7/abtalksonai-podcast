import {ArrowUpRight,Lightbulb,Mic,Play,Target,Users} from 'lucide-react';
import {latestEpisode} from '../episodes';
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
  <PageHero kicker="The show" title="Why ABTalksOnAI?" subtitle="Because great conversations build a better tomorrow." media={<HostMedia/>}
   actions={<Link to="/conversations" className="btn btn-gold"><Play size={13} fill="currentColor"/> Watch the show</Link>}>
   <p>ABTalksOnAI is a candid, insightful podcast hosted by Anil Bajpai, where leaders, thinkers and doers come together to share their journeys, ideas and perspectives on the world we live in.</p>
  </PageHero>

  <section className="cream-section"><div className="page-wrap">
   <div className="quote-split"><CoverButton className="quote-media" episode={latestEpisode} label={`Play the conversation with ${latestEpisode.guest}`}/>
    <blockquote className="pull-quote"><span className="quote-mark" aria-hidden="true">“</span><p>The best conversations happen when people listen with curiosity, not judgment.</p><footer><Signature/></footer></blockquote></div>
   <div className="pillars"><h2>What makes ABTalksOnAI different?</h2><ul>{pillars.map(({Icon,title,text})=><li key={title}><span className="pillar-icon"><Icon size={22} strokeWidth={1.5}/></span><h3>{title}</h3><p>{text}</p></li>)}</ul></div>
  </div></section>

  <SubscribeBand/>
 </>;
}
