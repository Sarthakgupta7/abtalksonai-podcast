import type {ComponentProps} from 'react';

/**
 * Adapted from Skiper 40 Link001, by @gurvinder-singh02.
 * Source: https://skiper-ui.com/r/skiper40.json
 * Free to use and modify in personal and commercial projects.
 * Attribution to Skiper UI is required for the free version.
 * Adaptation: native anchor props, accessible focus, CSS motion preferences.
 */
export function SkiperLink({children,className='',...props}:ComponentProps<'a'>){
 return <a {...props} className={`skiper-link ${className}`}>
  <span>{children}</span>
  <svg viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
 </a>;
}
