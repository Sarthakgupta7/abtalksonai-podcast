import {useState} from 'react';
import {ArrowUpRight, Search, X} from 'lucide-react';
import {guestDirectory} from '../guests';
import {archiveEpisodes} from '../episodes';
import {usePlayer} from './site';

export function GuestDirectory() {
  const {play}=usePlayer();
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const filtered = guestDirectory.filter(g => `${g.name} ${g.conversations.map(c=>c.title).join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()));
  const visible = expanded || query.trim() ? filtered : filtered.slice(0,12);
  return <div className={`guest-directory ${expanded?'is-expanded':''} ${query.trim()?'is-searching':''}`} id="guest-directory">
    <div className="directory-heading"><div><h3>Meet the people behind the ideas.</h3><p>Explore our guests and the conversations they’ve shared.</p></div><label className="search-field guest-search"><Search size={18}/><input type="search" aria-label="Search our guests" placeholder="Find a guest or topic" value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button aria-label="Clear guest search" onClick={()=>setQuery('')}><X size={17}/></button>}</label></div>
    <p className="directory-count" role="status">{filtered.length} {filtered.length===1?'guest':'guests'}{query.trim()?' found':' in our conversations'}</p>
    <ul className="directory-list">{visible.map(g=><li key={g.name}><a href={g.conversations[0].url} onClick={event=>{if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;const c=g.conversations[0];const sourceAliases:Record<string,string>={'Ankita Deswal':'R_eRsCIGCik','John Straw':'imGYBKye9Mw','Kathrin Kind':'6ZsgA6UvOFk','Stefano Ferrara':'S8bp9Axa0EI'};const episode=archiveEpisodes.find(e=>e.episodeUrl===c.url||c.url.includes(`v=${e.id}`))||archiveEpisodes.find(e=>e.id===sourceAliases[g.name]);if(episode){event.preventDefault();play(episode)}}} target="_blank" rel="noopener" aria-label={`Open conversation with ${g.name}`}><span className="guest-initials" aria-hidden="true">{g.name.replace(/^Dr\. /,'').split(' ').filter(Boolean).slice(0,2).map(n=>n[0]).join('')}</span><span className="directory-person"><strong>{g.name}</strong><small>{g.conversations[0].title}</small></span><ArrowUpRight size={19}/></a>{g.conversations.length>1&&<a className="directory-more" href={g.conversations[1].url} target="_blank" rel="noopener">Another conversation <ArrowUpRight size={13}/></a>}</li>)}</ul>
    {!filtered.length&&<div className="directory-empty"><p>No guests found. Try another name or topic.</p><button className="text-link" onClick={()=>setQuery('')}>Clear search</button></div>}
    {!query.trim()&&guestDirectory.length>12&&<button className="directory-toggle" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}>{expanded?'Show fewer guests':`Explore all ${guestDirectory.length} guests`} <span aria-hidden="true">{expanded?'−':'+'}</span></button>}
  </div>;
}
