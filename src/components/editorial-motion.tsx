import {useEffect,useRef,type ReactNode} from 'react';
import {motion,useReducedMotion,useScroll,useSpring,useTransform} from 'motion/react';

export function EditorialProgress(){const {scrollYProgress}=useScroll();return <motion.div className="ed-scroll-progress" aria-hidden="true" style={{scaleX:scrollYProgress}}/>}
export function EditorialParallax({children,className=''}:{children:ReactNode;className?:string}){
 const ref=useRef<HTMLDivElement>(null),reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const target=useTransform(scrollYProgress,[0,1],[14,-14]),y=useSpring(target,{stiffness:160,damping:32});
 return <div ref={ref} className={`ed-photo-parallax ${className}`}><motion.div style={{y:reduced?0:y}}>{children}</motion.div></div>;
}
export function useEditorialMotion(){
 useEffect(()=>{
  const root=document.querySelector('.editorial-site');if(!root)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
  const seen=new Set<HTMLElement>();
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){(e.target as HTMLElement).dataset.edReveal='shown';observer.unobserve(e.target)}}),{threshold:.07,rootMargin:'0px 0px -20px 0px'});
  const register=()=>root.querySelectorAll<HTMLElement>('.ed-episode,.ed-proof-grid>div,.ed-workshop-grid article,.ed-event-strip,.ed-practice,.ed-footer>div,.ed-hero-notes>a').forEach((el)=>{
   if(seen.has(el))return;seen.add(el);const i=[...(el.parentElement?.children||[])].indexOf(el);
   el.style.setProperty('--ed-delay',`${Math.max(0,i%3)*65}ms`);el.dataset.edReveal=reduced.matches?'shown':'waiting';if(!reduced.matches)observer.observe(el);
  });register();
  const mutation=new MutationObserver(register);mutation.observe(root,{childList:true,subtree:true});
  let current:HTMLElement|null=null,frame=0;
  const reset=()=>{if(current){current.style.removeProperty('--ed-rx');current.style.removeProperty('--ed-ry');current.style.removeProperty('--ed-mx');current.style.removeProperty('--ed-my');delete current.dataset.edPointer;current=null}};
  const move=(event:PointerEvent)=>{
   if(reduced.matches||!fine.matches||event.pointerType==='touch')return;
   const el=(event.target as HTMLElement).closest<HTMLElement>('.ed-episode,.ed-workshop-grid article,.ed-hero-notes>a,.ed-button');
   cancelAnimationFrame(frame);if(current!==el)reset();current=el;if(!el)return;
   const x=event.clientX,y=event.clientY;
   frame=requestAnimationFrame(()=>{const r=el.getBoundingClientRect();const dx=(x-r.left)/r.width-.5,dy=(y-r.top)/r.height-.5;el.style.setProperty('--ed-rx',`${-dy*3}deg`);el.style.setProperty('--ed-ry',`${dx*3}deg`);el.style.setProperty('--ed-spot-x',`${x-r.left}px`);el.style.setProperty('--ed-spot-y',`${y-r.top}px`);if(el.matches('.ed-button')){el.style.setProperty('--ed-mx',`${dx*5}px`);el.style.setProperty('--ed-my',`${dy*4}px`)}el.dataset.edPointer='active'});
  };
  const focus=(event:FocusEvent)=>{const el=(event.target as HTMLElement).closest<HTMLElement>('[data-ed-reveal]');if(el){el.dataset.edReveal='shown';observer.unobserve(el)}};
  const preference=()=>{reset();if(reduced.matches)seen.forEach(el=>{el.dataset.edReveal='shown';observer.unobserve(el)})};
  root.addEventListener('pointermove',move as EventListener,{passive:true});root.addEventListener('pointerleave',reset);root.addEventListener('focusin',focus as EventListener);window.addEventListener('blur',reset);reduced.addEventListener('change',preference);fine.addEventListener('change',reset);
  return()=>{cancelAnimationFrame(frame);reset();observer.disconnect();mutation.disconnect();root.removeEventListener('pointermove',move as EventListener);root.removeEventListener('pointerleave',reset);root.removeEventListener('focusin',focus as EventListener);window.removeEventListener('blur',reset);reduced.removeEventListener('change',preference);fine.removeEventListener('change',reset);seen.forEach(el=>delete el.dataset.edReveal)};
 },[]);
}
