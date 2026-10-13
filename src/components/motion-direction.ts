import {useEffect} from 'react';

/** Progressive enhancement: native content stays usable before motion initializes. */
export function useMotionDirection(){
 useEffect(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  const selector='.hero-topic,.hero-intro,.hero-actions,.library-heading,.library-controls,.episode-row,.guest-tile,.invite-inner>div,.footer-top,.campus-intro,.campus-outcomes li';
  const observed=new Set<HTMLElement>();
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){(entry.target as HTMLElement).dataset.entrance='visible';observer.unobserve(entry.target)}
  }),{threshold:.08,rootMargin:'0px 0px -24px 0px'});
  function register(){
   document.querySelectorAll<HTMLElement>(selector).forEach(el=>{
    if(observed.has(el))return;
    observed.add(el);
    const siblings=el.parentElement?[...el.parentElement.children]:[];
    const index=el.matches('.episode-row,.guest-tile,.campus-outcomes li')?siblings.indexOf(el):el.matches('.hero-intro')?1:el.matches('.hero-actions')?2:0;
    el.style.setProperty('--entrance-delay',`${Math.min(index,3)*65}ms`);
    el.dataset.entrance=reduced.matches?'visible':'pending';
    if(!reduced.matches)observer.observe(el);
   });
  }
  register();
  const mutations=new MutationObserver(register);
  mutations.observe(document.querySelector('main')!,{childList:true,subtree:true});
  const focus=(e:FocusEvent)=>{
   const el=(e.target as HTMLElement).closest<HTMLElement>('[data-entrance]');
   if(el){el.dataset.entrance='visible';observer.unobserve(el)}
  };
  let frame=0;let active:HTMLElement|null=null;
  const reset=()=>{if(active){active.style.removeProperty('--pointer-x');active.style.removeProperty('--pointer-y');active.style.removeProperty('--magnet-x');active.style.removeProperty('--magnet-y');active.dataset.pointer='';active=null}};
  const move=(e:PointerEvent)=>{
   if(reduced.matches||!fine.matches||e.pointerType==='touch')return;
   const el=(e.target as HTMLElement).closest<HTMLElement>('.action-button,.featured-cover,.episode-row');
   if(el!==active)reset();active=el;
   cancelAnimationFrame(frame);
   if(!el)return;
   const clientX=e.clientX,clientY=e.clientY;
   frame=requestAnimationFrame(()=>{
    const r=el.getBoundingClientRect();if(!r.width||!r.height)return;
    el.style.setProperty('--pointer-x',`${clientX-r.left}px`);el.style.setProperty('--pointer-y',`${clientY-r.top}px`);
    if(el.matches('.action-button')){el.style.setProperty('--magnet-x',`${((clientX-r.left)/r.width-.5)*6}px`);el.style.setProperty('--magnet-y',`${((clientY-r.top)/r.height-.5)*4}px`)}
    el.dataset.pointer='active';
   });
  };
  const preference=()=>{reset();if(reduced.matches)observed.forEach(el=>{el.dataset.entrance='visible';observer.unobserve(el)})};
  document.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerleave',reset);window.addEventListener('blur',reset);document.addEventListener('focusin',focus);reduced.addEventListener('change',preference);fine.addEventListener('change',reset);
  return()=>{cancelAnimationFrame(frame);reset();observer.disconnect();mutations.disconnect();document.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',reset);window.removeEventListener('blur',reset);document.removeEventListener('focusin',focus);reduced.removeEventListener('change',preference);fine.removeEventListener('change',reset);observed.forEach(el=>{delete el.dataset.entrance;el.style.removeProperty('--entrance-delay')})};
 },[]);
}
