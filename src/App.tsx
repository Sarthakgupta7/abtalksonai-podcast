import {EditorialSite} from './components/editorial-site';
import {useEffect,useMemo,useState} from 'react';
import {routes,usePath} from './router';
import {type Episode} from './episodes';
import {GuestForm,PlayerContext,PlayerDialog,SiteFooter,SiteHeader,MobileNavigation} from './components/site';
import {HomePage} from './pages/home';
import {ShowPage} from './pages/show';
import {ConversationsPage} from './pages/conversations';
import {CampusPage,GuestsPage,HostPage} from './pages/more';

const pages={'/':HomePage,'/the-show':ShowPage,'/conversations':ConversationsPage,'/guests':GuestsPage,'/meet-anil':HostPage,'/campus':CampusPage};

export default function App(){
 const path=usePath();const Page=pages[path as keyof typeof pages];
 const[selected,setSelected]=useState<Episode|null>(null);const[guestOpen,setGuestOpen]=useState(false);
 const player=useMemo(()=>({play:setSelected,suggestGuest:()=>setGuestOpen(true)}),[]);
 useEffect(()=>{if(path==='/'&&location.hash==='#latest')document.getElementById('latest')?.scrollIntoView({block:'start',behavior:'instant'})},[path]);
 useEffect(()=>{const label=path==='/editorial'?'Editorial':routes.find(r=>r.path===path)!.label;document.title=path==='/'?'ABTalksOnAI | Conversations that change perspective':`${label} | ABTalksOnAI`},[path]);
 return <PlayerContext.Provider value={player}>
  <a className="skip-link" href="#main">Skip to content</a>
  {path!=='/editorial'&&<SiteHeader/>}
  {path==='/editorial'?<EditorialSite onPlay={setSelected}/>:<main id="main" key={path}><Page/></main>}
  {path!=='/editorial'&&<><SiteFooter/><MobileNavigation/></>}
  <PlayerDialog episode={selected} onClose={()=>setSelected(null)}/>
  <GuestForm open={guestOpen} onClose={()=>setGuestOpen(false)}/>
 </PlayerContext.Provider>;
}
