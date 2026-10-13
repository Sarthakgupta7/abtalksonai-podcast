# UI component provenance

The frontend now uses React, Vite, Tailwind CSS and Motion.

## Integrated source components

- Arc UI Chip Group and foundation/motion tokens: https://uiarc.dev/components/chip-group . Source installed from the public free registry at https://uiarc.dev/r/chip-group.json and its declared dependencies. Used for topic filters.
- Skecher UI Velocity Tabs: https://skecher-ui.com/docs/velocity-tabs . Source from https://github.com/CoDesign-Spa27/skecher-ui/blob/main/components/ui-components/velocity-tabs.tsx . Used for episode watch/about selection.
- Space UI Button and Spinner: https://www.spaceui.one/docs/installation . Source installed from the public registry at https://www.spaceui.one/r/primitives-button.json . Used for primary actions.
- Componentry Annotated Text: https://componentry.dev/ . Public source at https://componentry.dev/r/annotated-text.json . Used for the hero underline and host copy annotation.

## Visual references, without proprietary source

Planes photo stack/carousel interaction patterns inform the custom guest fan. The reviewed Planes photo stack is Pro, so its proprietary source is not included and no license was purchased. https://useplanes.com/components/photo-stack

The wider composition draws on the supplied Raj Shamani tribute site, Prakhar unaffiliated site, All Things WTF, BeerBiceps, Seen and Unseen, Indian Noir, Kevin Surace and Trainplex. Their content and images are not reused.

## Image provenance

Guest portraits are shown through CSS viewports of the user's existing guest collateral image. The source collage is preserved intact. Anil's portrait was downloaded from the supplied LinkedIn profile on 13 October 2026. Episode thumbnails are from the official ABTalksOnAI YouTube channel. No people or claims were synthesized.

## Brand and motion refinement

- `public/assets/abtalksonai-logo.png`: original embedded logo, extracted with its PDF alpha mask from the user-supplied `/Users/sarthak/Downloads/ABTalks_Guest_Invitation_SARAH.pdf`. It has not been redrawn or reworded.
- `src/components/experience.tsx`: custom Motion components for spring cursor gaze, scroll word opacity, image parallax and page progress. Pointer coordinates are mapped through the SVG inverse screen matrix so rotation and responsive scaling do not offset the gaze.
- Motion direction also references animations.dev, easing.dev and the supplied StringTune examples. No paid course content or library code is copied.

## Latest content update

- Ankita is selected as the latest conversation and listed first, verified against the official channel upload order on 13 October 2026. https://www.youtube.com/@ABTalksOnAI/videos
- Navisha's portrait uses the original guest board's middle column, second row. Her full podcast audio and duration are sourced from the official show RSS feed, https://anchor.fm/s/10a76dd14/podcast/rss. Her career webinar is not substituted for the podcast.
- Magic UI Shine Border source: https://magicui.design/r/shine-border.json, adapted through a gold palette and a reduced-motion fallback. The open-source Magic UI component is integrated; its premium blocks are not. https://github.com/magicuidesign/magicui
- Emil Kowalski's skill is already installed and applied: https://github.com/emilkowalski/skills/tree/main/skills/emil-design-eng
- 21st.dev, Originkit and MotionSites are reviewed design resources. Originkit requires sign-in for source delivery, so no authenticated component code is imported. No paid prompt or component purchase was made.

## Gold and glass enhancement
- ShaderGradient: https://github.com/ruucm/shadergradient (MIT), actual lazy-loaded React renderer with React Three Fiber v9.
- React Three Fiber: https://github.com/pmndrs/react-three-fiber (MIT), used by ShaderGradient.
- LiquidGlassJS: https://github.com/Surdeddd/liquidglassjs (MIT), actual navigation material engine; refraction on pointer devices, CSS fallback on touch devices, no spring movement on navigation.
- Liquid Logo: https://github.com/collidingScopes/liquid-logo, visual reference only. The implemented CSS highlight masks the original logo artwork, with no copied shader code and no alteration to the logo asset.
- Rendering pauses by unmounting the hero canvas outside the viewport or while the page is hidden. Reduced motion and Save Data use the static gold fallback. Phone pixel density is capped at 0.65.
