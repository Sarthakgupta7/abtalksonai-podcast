import {useEffect,useState,type ComponentProps,type ReactNode} from 'react';
import {motion,useMotionValue,useSpring,useReducedMotion} from 'motion/react';
import {Headphones,Play,Search} from 'lucide-react';
import {AnimatedBackground} from './vendor/animated-background';

// Original implementation informed by Aceternity's perspective-card interaction.
export function DepthCard({children,...props}:Omit<ComponentProps<typeof motion.button>,'children'> & {children:ReactNode}){
 const reduced=useReducedMotion();const x=useMotionValue(0);const y=useMotionValue(0);
 const rx=useSpring(x,{stiffness:260,damping:26});const ry=useSpring(y,{stiffness:260,damping:26});
 return <motion.button {...props} style={{rotateX:reduced?0:rx,rotateY:reduced?0:ry,transformPerspective:900}} onPointerMove={e=>{
  if(reduced||e.pointerType==='touch'||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
  const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty("--pointer-x",`${e.clientX-r.left}px`);e.currentTarget.style.setProperty("--pointer-y",`${e.clientY-r.top}px`);x.set(-(e.clientY-r.top-r.height/2)/r.height*9);y.set((e.clientX-r.left-r.width/2)/r.width*9);
 }} onPointerLeave={()=>{x.set(0);y.set(0)}} onBlur={()=>{x.set(0);y.set(0)}}>{children}<span className="card-glint" aria-hidden="true"/></motion.button>;
}

export function PhoneNavigation(){
 const[active,setActive]=useState('latest');
 useEffect(()=>{
  const observer=new IntersectionObserver(entries=>{
   const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
   if(visible[0])setActive(visible[0].target.id);
  },{rootMargin:'-15% 0px -45% 0px',threshold:[0,.1,.3,.6]});
  ['latest','episodes','guests'].forEach(id=>{const el=document.getElementById(id);if(el)observer.observe(el)});
  return()=>observer.disconnect();
 },[]);
 return <nav className="phone-dock" aria-label="Quick podcast navigation"><AnimatedBackground value={active}>
  <a data-id="latest" href="#latest"><Play size={18}/><span>Latest</span></a>
  <a data-id="episodes" href="#episodes"><Headphones size={18}/><span>Episodes</span></a>
  <a data-id="guests" href="#guests"><Search size={18}/><span>Guests</span></a>
 </AnimatedBackground></nav>;
}
