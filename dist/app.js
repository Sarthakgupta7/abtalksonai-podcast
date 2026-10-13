'use strict';
// Episode names, links and runtime verified against the official channel on 2026-10-12.
const episodes = [
 {id:'B2roTlSVjhI',guest:'Kevin Surace',title:'Why AI Agents Are Your New Employees',topic:'AI & work',duration:'39 min',terms:'identity code agents automation'},
 {id:'OmSfxSfBE6I',guest:'Pranav Pai',title:'How VCs Decide Which Startups to Fund',topic:'Startups',duration:'55 min',terms:'venture capital 3one4 funding investing'},
 {id:'Z-SfLBIK87U',guest:'Dr. Aniruddha Malpani',title:'How AI Will Transform Healthcare & Education in India',topic:'AI & work',duration:'56 min',terms:'health education india'},
 {id:'jZqR3_Vj4Fk',guest:'Beny Rubinstein',title:'What Investors Really Look for in AI Startups?',topic:'Startups',duration:'48 min',terms:'investment careers azure'},
 {id:'imGYBKye9Mw',guest:'John Straw',title:'AI vs Jobs: What Happens to 90 Million Workers by 2030?',topic:'AI & work',duration:'40 min',terms:'jobs career future'},
 {id:'S8bp9Axa0EI',guest:'Stefano Ferrara',title:'How Investors Decide Which AI Startups Will Win',topic:'Startups',duration:'37 min',terms:'venture founders entrepreneurship'},
 {id:'6ZsgA6UvOFk',guest:'Prof. Dr. Kathrin Kind',title:'Is AI Dangerous? The Future of Jobs, Autonomous Cars & India',topic:'AI & work',duration:'39 min',terms:'safety autonomous cars education'},
 {id:'R_eRsCIGCik',guest:'Sqn Ldr (Retd.) Ankita Deswal',title:'What Movies Don’t Show About Air Force Life',topic:'Human stories',duration:'52 min',terms:'leadership air force military life'}
];
let activeTopic='All';
const grid=document.querySelector('#episode-grid');
function renderEpisodes(){
 const query=document.querySelector('#search').value.trim().toLowerCase();
 const shown=episodes.filter(e=>(activeTopic==='All'||e.topic===activeTopic)&&`${e.title} ${e.guest} ${e.terms}`.toLowerCase().includes(query));
 grid.replaceChildren(...shown.map(e=>{
  const article=document.createElement('article');article.className='episode';
  article.innerHTML=`<button class="episode-media" data-play="${e.id}" aria-label="Watch ${e.guest}: ${e.title.replaceAll('"','&quot;')}"><img src="assets/${e.id}.jpg" alt="${e.guest} podcast episode thumbnail" loading="lazy"><span class="episode-play" aria-hidden="true">▶</span><span class="duration">${e.duration}</span></button><div class="episode-meta"><span>${e.topic}</span><span>FULL CONVERSATION</span></div><h3><button data-play="${e.id}">${e.title}</button></h3><div class="episode-guest"><span>${e.guest}</span><a href="https://www.youtube.com/watch?v=${e.id}" target="_blank" rel="noopener" aria-label="Open ${e.guest} episode on YouTube">↗</a></div>`;return article;
 }));
 document.querySelector('#empty').hidden=shown.length!==0;
 document.querySelector('#results-status').textContent=`${shown.length} conversation${shown.length===1?'':'s'} found`;
}
document.querySelectorAll('[data-topic]').forEach(btn=>btn.addEventListener('click',()=>{activeTopic=btn.dataset.topic;document.querySelectorAll('[data-topic]').forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});renderEpisodes()}));
document.querySelector('#search').addEventListener('input',renderEpisodes);
document.querySelector('#reset-filters').addEventListener('click',()=>{document.querySelector('#search').value='';document.querySelector('[data-topic="All"]').click();document.querySelector('#search').focus()});
renderEpisodes();
const videoDialog=document.querySelector('#video-dialog');
document.addEventListener('click',e=>{const trigger=e.target.closest('[data-play]');if(!trigger)return;const episode=episodes.find(x=>x.id===trigger.dataset.play);if(!episode)return;document.querySelector('#video-title').textContent=episode.title;document.querySelector('#youtube-fallback').href=`https://www.youtube.com/watch?v=${episode.id}`;const iframe=document.createElement('iframe');iframe.src=`https://www.youtube-nocookie.com/embed/${episode.id}?autoplay=1&rel=0`;iframe.title=episode.title;iframe.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';document.querySelector('#video-container').replaceChildren(iframe);videoDialog.showModal()});
videoDialog.addEventListener('close',()=>document.querySelector('#video-container').replaceChildren());
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()})});
const menu=document.querySelector('.menu-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');document.querySelector('#navigation').classList.toggle('open',open)});
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');document.querySelector('#navigation').classList.remove('open')}
document.querySelectorAll('#navigation a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const guestDialog=document.querySelector('#guest-dialog');document.querySelector('#guest-open').addEventListener('click',()=>guestDialog.showModal());let suggestion='';
document.querySelector('#guest-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);suggestion=`Hello ABTalksOnAI team,\n\nI would like to suggest ${data.get('guest')} for the podcast.\n\n${data.get('reason')}\n\nSuggested by ${data.get('name')}`;document.querySelector('#guest-feedback').hidden=false;window.location.href=`mailto:abtalks.podcast@gmail.com?subject=${encodeURIComponent('Podcast guest suggestion: '+data.get('guest'))}&body=${encodeURIComponent(suggestion)}`});
document.querySelector('#copy-suggestion').addEventListener('click',async e=>{try{await navigator.clipboard.writeText(suggestion);e.target.textContent='Copied'}catch{const box=document.createElement('textarea');box.value=suggestion;box.readOnly=true;document.querySelector('#guest-feedback').append(box);box.focus();box.select();e.target.textContent='Select and copy the text below'}});
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const words=document.querySelector('.word-reveal');words.innerHTML=words.textContent.trim().split(/\s+/).map(w=>`<span>${w}</span>`).join(' ');const wordSpans=[...words.children];
let scrollScheduled=false;function updateScroll(){scrollScheduled=false;const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.scroll-progress').style.transform=`scaleX(${max>0?scrollY/max:0})`;const rect=words.getBoundingClientRect();const progress=Math.max(0,Math.min(1,(innerHeight*.85-rect.top)/(innerHeight*.5)));wordSpans.forEach((w,i)=>w.classList.toggle('read',reduced.matches||i<progress*wordSpans.length));document.querySelectorAll('.strike').forEach((s,i)=>s.classList.toggle('crossed',reduced.matches||rect.top<innerHeight*.35-i*35));if(!reduced.matches){document.querySelectorAll('.drift').forEach(el=>{const r=el.getBoundingClientRect();el.style.transform=`translateY(${Math.max(-12,Math.min(12,(innerHeight/2-r.top)*.025))}px)`})}else document.querySelectorAll('.drift').forEach(el=>el.style.transform='none')}
window.addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateScroll)}},{passive:true});reduced.addEventListener('change',updateScroll);updateScroll();
const mascot=document.querySelector('.mascot');let blinkTimeout;mascot.addEventListener('click',()=>{clearTimeout(blinkTimeout);mascot.classList.add('hello');document.querySelector('#mascot-caption').textContent='Keep asking good questions.';blinkTimeout=setTimeout(()=>{mascot.classList.remove('hello');document.querySelector('#mascot-caption').textContent='I’m all ears.'},1800)});
document.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType==='touch')return;const r=mascot.getBoundingClientRect();const dx=Math.max(-3,Math.min(3,(e.clientX-r.left-r.width/2)/90));const dy=Math.max(-3,Math.min(3,(e.clientY-r.top-r.height/2)/90));mascot.querySelector('.pupils').style.translate=`${dx}px ${dy}px`},{passive:true});


function updateActiveNavigation(){
 let current='';for(const id of ['episodes','conversations','host'])if(document.getElementById(id).getBoundingClientRect().top<innerHeight*.38)current='#'+id;
 document.querySelectorAll('#navigation a').forEach(a=>{const active=a.hash===current;a.classList.toggle('current',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
}
window.addEventListener('scroll',updateActiveNavigation,{passive:true});updateActiveNavigation();
