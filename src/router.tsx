import {useEffect,useState,type AnchorHTMLAttributes} from 'react';

export const routes=[
 {path:'/',label:'Home'},
 {path:'/the-show',label:'The Show'},
 {path:'/conversations',label:'Conversations'},
 {path:'/guests',label:'Our Guests'},
 {path:'/meet-anil',label:'Meet Anil'},
 {path:'/campus',label:'Campus'},
] as const;
export type RoutePath=typeof routes[number]['path']|'/editorial';

// Links from the single-page version of the site keep working.
const legacyAnchors:Record<string,RoutePath>={'#home':'/','#latest':'/','#episodes':'/conversations','#guests':'/guests','#guest-directory':'/guests','#host':'/meet-anil','#story':'/campus','#campus':'/campus'};

function currentPath():RoutePath{
 const legacy=legacyAnchors[location.hash];
 if(location.pathname==='/'&&legacy&&location.hash!=='#latest'){history.replaceState(null,'',legacy);return legacy}
 if(location.pathname.replace(/\/+$/,'')==='/editorial')return '/editorial';
 const path=location.pathname.replace(/\/+$/,'')||'/';
 return routes.find(r=>r.path===path)?.path??'/';
}

export function navigate(path:RoutePath){
 if(path!==location.pathname)history.pushState(null,'',path);
 dispatchEvent(new PopStateEvent('popstate'));
 scrollTo({top:0,behavior:'instant'});
}

export function usePath(){
 const[path,setPath]=useState<RoutePath>(currentPath);
 useEffect(()=>{const update=()=>setPath(currentPath());addEventListener('popstate',update);addEventListener('hashchange',update);return()=>{removeEventListener('popstate',update);removeEventListener('hashchange',update)}},[]);
 return path;
}

export function Link({to,onClick,...props}:Omit<AnchorHTMLAttributes<HTMLAnchorElement>,'href'>&{to:RoutePath}){
 return <a {...props} href={to} onClick={e=>{onClick?.(e);if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();navigate(to)}}/>;
}
