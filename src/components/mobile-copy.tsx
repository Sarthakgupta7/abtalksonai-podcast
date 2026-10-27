import type {ReactNode} from 'react';
import {ChevronDown} from 'lucide-react';

// Keep the fuller editorial copy on wide screens and a concise version on phones.
export function AdaptiveCopy({children,mobile}:{children:ReactNode;mobile:ReactNode}){
 return <><span className="wide-copy">{children}</span><span className="phone-copy">{mobile}</span></>;
}

// Native disclosure preserves keyboard access and does not need extra application state.
export function MobileSummary({children,label,className=''}:{children:ReactNode;label:string;className?:string}){
 return <div className={`mobile-summary ${className}`}><div className="wide-details">{children}</div><details className="phone-details"><summary>{label}<ChevronDown size={16} aria-hidden="true"/></summary><div className="disclosure-body">{children}</div></details></div>;
}
