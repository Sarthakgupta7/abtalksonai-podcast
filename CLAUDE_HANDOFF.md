# ABTalksOnAI podcast website handoff

The site has been rebuilt with React, Vite, Tailwind CSS and Motion after research into the supplied podcast references. The previous plain HTML version is retained in Git history, but the current source is under src/.

## Run

```sh
npm install
npm run dev
```

Open http://127.0.0.1:4173 . Build with npm run build. Production assets are in dist/.

## Current files

- src/App.tsx: page structure, dialogs, guest fan and guest enquiry
- src/styles.css: visual design and responsive behavior
- src/episodes.ts: episode data
- src/components/arc/: Arc UI filters and foundation tokens
- src/components/vendor/: Skecher UI Velocity Tabs and Componentry Annotated Text
- src/components/ui/: Space UI Button and Spinner
- public/assets/: real guest/host imagery and episode thumbnails
- LIBRARY_SOURCES.md: exact component and image provenance
- PRODUCT.md and DESIGN.md: context and visual direction

## User requirements

Use ABTalksOnAI consistently. Avoid em dash punctuation. This is a separate podcast site. Anil Bajpai is the host and founder. The opening should communicate the show through its guests and conversations, with actual playback and clear episode browsing. Do not invent metrics, testimonials, credentials or endorsement claims. The guest form prepares an email draft; it does not send or store enquiries.

Keep all interactions working on mobile and keyboards, including the guest rail, search/filter clearing, dialogs and motion alternatives.

## References

https://kevinsurace.com/
https://trainplex.in/
https://prakharkepravachan.in/ (explicitly unaffiliated)
https://www.rajshamani.org/ (fan-made tribute)
https://allthingswtf.com/
https://beerbiceps.com/
https://seenunseen.in/
https://indiannoir.transistor.fm/
https://string-tune.fiddle.digital/
https://www.vengenceui.com/components
https://21st.dev/
https://useplanes.com/
https://componentry.dev/
https://uiarc.dev/
https://skecher-ui.com/
https://www.spaceui.one/
https://animations.dev/
https://easing.dev/
https://easings.co/
https://koboyo.com/page-mascot
https://www.linkedin.com/in/anil-bajpai/

See LIBRARY_SOURCES.md for integrated components versus visual references. No paid library license was purchased.

## Hosting

https://abtalksonai-podcast.sassy-duck-3577.chatgpt.site

The existing private Sites project ID is in .openai/hosting.json. Preserve it and the existing audience when editing. Local development needs no Sites access.

## Latest refinement

The real logo from the guest invitation is now in `public/assets/abtalksonai-logo.png`. Visual identity is warm gold, ivory and dark studio tones. `src/components/experience.tsx` holds the scroll and cursor effects. The mascot uses a global passive pointer listener and transforms pointer coordinates into SVG space, with spring pupils and listener cleanup.

Publication currently cannot proceed because the Sites connector returns `project_not_found` for the preserved project ID. The local site and production build remain usable. Do not silently create a replacement project.

## Active hosting

The rich-theme version is now deployed at https://abtalksonai-podcast.vercel.app in the existing Vercel workspace. Source is in the private GitHub repository https://github.com/Sarthakgupta7/abtalksonai-podcast. The legacy Sites project remains inaccessible. The GitHub-to-Vercel automatic deployment integration has not been enabled.
