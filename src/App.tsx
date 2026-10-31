import {lazy,Suspense,useEffect,useMemo,useState} from 'react';
import {routes,usePath} from './router';
import {type Episode} from './episodes';
import {EpisodeFeedProvider,useEpisodeCatalogue} from './episode-feed';
import {GuestForm,PlayerContext,PlayerDialog,SiteFooter,SiteHeader,MobileNavigation} from './components/site';
import {HomePage} from './pages/home';
import {ShowPage} from './pages/show';
import {ConversationsPage} from './pages/conversations';
import {CampusPage,GuestsPage,HostPage} from './pages/more';

const EditorialSite=lazy(()=>import('./components/editorial-site').then(module=>({default:module.EditorialSite})));

const pages={'/':HomePage,'/the-show':ShowPage,'/conversations':ConversationsPage,'/guests':GuestsPage,'/meet-anil':HostPage,'/campus':CampusPage};

function PodcastApp(){
 const {archiveEpisodes}=useEpisodeCatalogue();
 const path=usePath();const Page=pages[path as keyof typeof pages];
 const[selected,setSelected]=useState<Episode|null>(()=>archiveEpisodes.find(e=>e.id===new URLSearchParams(location.search).get('episode'))||null);const[guestOpen,setGuestOpen]=useState(false);
 const player=useMemo(()=>({play:(episode:Episode)=>{const url=new URL(location.href);url.searchParams.set('episode',episode.id);history.replaceState(null,'',url);setSelected(episode)},suggestGuest:()=>setGuestOpen(true)}),[]);
 const closePlayer=()=>{const url=new URL(location.href);url.searchParams.delete('episode');history.replaceState(null,'',url);setSelected(null)};
 useEffect(()=>{const sync=()=>{const id=new URLSearchParams(location.search).get('episode');setSelected(current=>current?.id===id?current:archiveEpisodes.find(e=>e.id===id)||null)};sync();addEventListener('popstate',sync);return()=>removeEventListener('popstate',sync)},[archiveEpisodes]);
 useEffect(()=>{if(path==='/'&&location.hash==='#latest')document.getElementById('latest')?.scrollIntoView({block:'start',behavior:'instant'})},[path]);
 useEffect(()=>{const label=path==='/editorial'?'Editorial':routes.find(r=>r.path===path)!.label;document.title=path==='/'?'ABTalksOnAI | Conversations that change perspective':`${label} | ABTalksOnAI`},[path]);
 return <PlayerContext.Provider value={player}>
  <a className="skip-link" href={path==='/editorial'?'#ed-main':'#main'}>Skip to content</a>
  {path!=='/editorial'&&<SiteHeader/>}
  {path==='/editorial'?<Suspense fallback={<main id="ed-main" className="page-wrap" aria-busy="true"><p>Loading the editorial edition…</p></main>}><EditorialSite onPlay={player.play}/></Suspense>:<main id="main" tabIndex={-1} key={path}><Page/></main>}
  {path!=='/editorial'&&<><SiteFooter/><MobileNavigation/></>}
  <PlayerDialog episode={selected} onClose={closePlayer}/>
  <GuestForm open={guestOpen} onClose={()=>setGuestOpen(false)}/>
 </PlayerContext.Provider>;
}

export default function App(){return <EpisodeFeedProvider><PodcastApp/></EpisodeFeedProvider>}
