# ABTalksOnAI podcast

A separate podcast website for ABTalksOnAI, hosted by Anil Bajpai. Built with React, TypeScript, Vite, Tailwind CSS and Motion.

## Development

```sh
npm ci
npm run dev
```

The preview runs at http://127.0.0.1:4173.

## Build

```sh
npx tsc --noEmit
npm run build
```

Deploy `dist/` as static output. Vercel configuration is included.

## Features

Real episode links and playback, guest/topic search, responsive guest gallery, original supplied logo, spring cursor-tracking microphone, scroll word reveals and restrained image parallax. Reduced-motion settings are respected. Guest suggestions prepare an email draft and do not send or store submissions.

See `LIBRARY_SOURCES.md` for component and asset provenance and `CLAUDE_HANDOFF.md` for the editing context.
