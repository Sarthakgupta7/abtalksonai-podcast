// Adapted from Motion Primitives, ibelick. MIT, see motion-primitives-LICENCE.md.
import {Children,cloneElement,useId,useState,useEffect,type ReactElement} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'motion/react';
type Item=ReactElement<{'data-id':string;className?:string;children?:React.ReactNode;onClick?:(event:React.MouseEvent)=>void}>;
export function AnimatedBackground({children,value}:{children:Item[];value:string}){
 const[activeId,setActiveId]=useState(value);const id=useId();const reduced=useReducedMotion();
 useEffect(()=>setActiveId(value),[value]);
 return Children.map(children,child=>cloneElement(child,{
  className:`dock-item ${child.props.className||''}`,
  'aria-current':activeId===child.props['data-id']?'location':undefined,
  onClick:(event:React.MouseEvent)=>{setActiveId(child.props['data-id']);child.props.onClick?.(event)},
 } as Partial<Item['props']>,<><AnimatePresence initial={false}>{activeId===child.props['data-id']&&<motion.span aria-hidden="true" className="dock-active" layoutId={reduced?undefined:`dock-${id}`} transition={{duration:reduced?0:.2,ease:[.23,1,.32,1]}} initial={false} animate={{opacity:1}} exit={{opacity:0}}/>}</AnimatePresence><span className="dock-label">{child.props.children}</span></>));
}
