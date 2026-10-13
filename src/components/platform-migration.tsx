import {useEffect, useRef} from 'react';
import {ArrowUpRight, X} from 'lucide-react';

const noticeKey = 'abtalksonai-platform-move-v1';

export function PlatformMigration() {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    try { if (sessionStorage.getItem(noticeKey)) return; } catch { /* Show the notice when storage is unavailable. */ }
    if (dialog.current && !dialog.current.open) dialog.current.showModal();
  }, []);
  const dismiss = () => {
    try { sessionStorage.setItem(noticeKey, 'dismissed'); } catch { /* Dismissal still works without storage. */ }
    dialog.current?.close();
  };
  return <dialog ref={dialog} className="migration-dialog" aria-labelledby="migration-title" aria-describedby="migration-description" onClose={dismiss}>
    <button className="icon-button migration-close" onClick={dismiss} aria-label="Close platform migration notice"><X size={20}/></button>
    <span className="section-kicker">A new home for the platform</span>
    <h2 id="migration-title">We’ve moved to<br/><span className="accent">app.klymb.ai</span></h2>
    <p id="migration-description">The ABTalksOnAI platform now lives at app.klymb.ai. Head there for your profile, projects and hackathons.</p>
    <p className="migration-podcast-note">Our podcast conversations are right here.</p>
    <a className="action-button migration-cta" href="https://app.klymb.ai/" onClick={dismiss}>Go to app.klymb.ai <ArrowUpRight size={18}/></a>
    <button className="quiet-link migration-stay" onClick={dismiss}>Stay for the podcast</button>
  </dialog>;
}
