import {useState} from 'react';
import {ArrowUpRight,Palette} from 'lucide-react';

export function HostPortrait(){
 const [colour,setColour]=useState(false);
 return <button type="button" className={`host-portrait-control ${colour?'is-colour':''}`} aria-label="Show Anil Bajpai portrait in colour" aria-pressed={colour} onClick={()=>setColour(v=>!v)}>
  <span className="host-portrait-image"><img className="host-monochrome" src="/assets/anil-story-portrait.webp" alt="Anil Bajpai, founder of ABTalksOnAI and podcast host" loading="lazy" width="720" height="1080"/><img className="host-colour" src="/assets/anil-story-portrait.webp" alt="" aria-hidden="true" loading="lazy" width="720" height="1080"/></span>
  <span className="portrait-corner" aria-hidden="true"/><span className="portrait-topline"><span className="record-dot"/> The person behind the conversations</span>
  <span className="portrait-caption"><span><small>YOUR HOST</small><strong>Anil Bajpai</strong></span><ArrowUpRight size={23} aria-hidden="true"/></span>
  <span className="portrait-colour-hint"><Palette size={13} aria-hidden="true"/><span className="pointer-hint">Hover for a different perspective</span><span className="touch-hint">{colour?'Tap for black & white':'Tap to see in colour'}</span></span>
 </button>;
}
