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
