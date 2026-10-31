# ABTalksOnAI podcast website

React, TypeScript, Vite, Tailwind CSS and Motion. Requires Node.js 22 LTS or later.

## Run locally

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4173.

## Build

```sh
npx tsc --noEmit
npm run build
```

Deploy `dist/` as static output with the supplied Vercel configuration. The default site has Home, The Show, Conversations, Our Guests, Meet Anil and Campus pages. The alternate editorial layout remains available at `/editorial`. Production: https://www.abtalks.in/.

The website includes the current episode catalogue, 51 searchable guests, topic filters, duration sorting, video/audio dialogs, campus photography, a horizontal story, responsive layouts and reduced-motion support. Guest suggestions prepare an email draft for the visitor to send.

Legacy section links resolve to their corresponding pages. Platform URLs including `/dashboard`, `/claude-signup`, `/verify`, `/claim`, `/r` and `/hackathon` redirect to app.klymb.ai.

### Automatic episode updates

The deployed Vercel site reads `/api/episodes`. This checks the official ABTalksOnAI YouTube Videos tab and public feed on a daily India-time cycle. A Vercel Cron Job targets midnight IST (18:30 UTC) every night, so visitors do not need to keep the website open. Open browser tabs pick up the nightly catalogue at 12:05 AM IST and when becoming visible again. During the day, requests reuse that day’s cached result. Vercel Hobby scheduling may invoke the job within the following hour; a visitor request after midnight also refreshes an outdated result. No YouTube API key or manual deployment is required for a new eligible upload to appear.

Eligible uploads must have a known duration of at least ten minutes. Shorts, videos labelled as trailers/teasers/previews/highlights, live streams, upcoming premieres and future publication dates are excluded. A channel-identity check prevents unrelated videos from entering the catalogue. `server/youtube.js` supports both current and older YouTube metadata formats.

The homepage, episode archive, editorial view and latest-episode buttons share the live catalogue. Verified guest names, designations, descriptions and portraits take precedence over automatic metadata. New guest identities and companies are not guessed. Add verified details to `src/episodes.ts` and `src/guests.ts` as needed.

The Vercel Runtime Cache retains a last-successful catalogue; the bundled `src/auto-episodes.json` and curated archive remain available if the source or cache is unavailable. Cache retention is best effort, not a permanent database. YouTube public page formats and access policies can change; `/api/episodes` exposes `status` and `checkedAt` for diagnostics. `npm run dev` uses the bundled catalogue if a local API is not running; deploy to Vercel for live syncing.

Run `npm test` for filtering, merge, cache and outage tests, then `npx tsc --noEmit` and `npm run build` before deploying. Include `api/` and `server/` when sharing or deploying the source project.
