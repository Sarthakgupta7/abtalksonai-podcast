import {Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode} from 'react';
import {useReducedMotion} from 'motion/react';

const GoldShader = lazy(() => import('./gold-shader'));
class EffectBoundary extends Component<{children:ReactNode},{failed:boolean}> {
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true}}
 render(){return this.state.failed?null:this.props.children}
}

export function RichAtmosphere(){
 const ref=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();
 const[active,setActive]=useState(false);
 const[phone,setPhone]=useState(false);
 useEffect(()=>{
  const el=ref.current;if(!el)return;
  const mobile=matchMedia('(max-width:760px)');
  const connection=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection;
  const lowPower=(navigator.hardwareConcurrency||8)<4;
  let visible=false;
  const sync=()=>{setPhone(mobile.matches);setActive(visible&&!document.hidden&&!connection?.saveData&&!lowPower)};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()},{threshold:0});
  observer.observe(el);document.addEventListener('visibilitychange',sync);mobile.addEventListener('change',sync);
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);mobile.removeEventListener('change',sync)};
 },[]);
 return <div ref={ref} className="rich-atmosphere" aria-hidden="true"><div className="gold-fallback"/>{active&&!reduced&&<EffectBoundary><Suspense fallback={null}><GoldShader phone={phone}/></Suspense></EffectBoundary>}<div className="atmosphere-vignette"/><div className="atmosphere-grain"/></div>;
}

export function useGlassNavigation(){
 useEffect(()=>{
  let disposed=false;const handles:{destroy:()=>void}[]=[];
  // Refraction on desktop; the engine's lighter frosted backend on touch devices.
  import('@surdeddd/liquidglass').then(({attach})=>{
   if(disposed)return;
   const desktop=matchMedia('(hover:hover) and (pointer:fine)').matches;
   document.querySelectorAll<HTMLElement>('.nav-glass-surface,.phone-dock').forEach(el=>{
    handles.push(attach(el,{preset:'frosted',backend:desktop?'css-svg':'css-fallback',tint:'#15120e',tintOpacity:.78,blur:18,refraction:10,dispersion:.08,radius:24,physics:false,motionLight:false,adaptive:false,quality:{mapSide:64,maxDpr:1,caPasses:1}}));
   });
  }).catch(()=>{/* The authored glass surface remains usable if the enhancement fails. */});
  return()=>{disposed=true;handles.forEach(handle=>handle.destroy())};
 },[]);
}
