# ABTalksOnAI podcast design system

## Purpose and identity

Create a rich, welcoming destination for long-form conversations about AI, leadership, careers and human experience. Lead with the show and its guests, then introduce Anil Bajpai. Every layout must make a conversation easy to discover and play.

The original logo in `public/assets/abtalksonai-logo.png` is the supplied artwork. Preserve its lettering, proportions and silhouette. Write the brand as ABTalksOnAI in interface copy. Do not use em dash punctuation. Use real guest portraits and official episode covers. Do not invent guest credentials, metrics, endorsements or testimonials.

## Visual system

- Background: charcoal `#10100f`, with warm near-black `#15120e` for depth.
- Accent: champagne `#d6b777`; primary action gold `#edb951`.
- Text: warm ivory `#faf7f2`; secondary text `#bdb7a9`.
- Display typography: Instrument Serif for the hero, perspective statement and invitation.
- Browsing headings: Archivo. Controls and body: Manrope.
- Prefer spacious editorial compositions, original photography and restrained metallic details.
- Use glass for navigation and floating controls. Keep reading surfaces stable, dark and high contrast.

## Page structure

1. Show introduction, latest-episode action and five-person portrait fan.
2. Scroll-based perspective statement.
3. Latest full conversation, currently Ankita Deswal.
4. Searchable episode archive with topic filters.
5. Guest portraits and searchable, expandable directory.
6. Host introduction.
7. Guest suggestion and microphone mascot.
8. Follow links and platform link to `https://app.klymb.ai`.

The episode archive uses compact media rows. The guest directory records verified public guests, with provenance in `GUEST_SOURCES.md`; do not describe it as a complete list of unpublished guests.

## Phone behavior

- Body text should remain readable at 16px. Inputs use 16px to prevent phone zoom.
- Primary episode action fills the available width.
- Portrait fan becomes a swipeable rail with visible names.
- Navigation targets are at least 44px.
- Bottom dock stays fixed, respects safe areas and leaves enough content padding.
- Guest directory uses one column, search across all names and an explicit expand control.
- Dialogs fit the viewport and keep their close controls reachable.
- Never gate phone content visibility behind scroll animations.
- Check at 320px and 390px, including menu, player, search, expanded guest list and horizontal overflow.

## Motion and effects

Use the existing Motion library for UI transitions, section reveals, word opacity and mascot gaze. Keep native page scrolling. UI feedback should normally finish in 150 to 250ms. Restrained decorative entrances may be slower. Cursor interactions also need keyboard or touch equivalents.

ShaderGradient with React Three Fiber creates the slow gold water atmosphere behind the hero. It loads separately, unmounts outside the viewport and while the page is hidden, and uses a lower pixel density on phones. Reduced motion, Save Data and low CPU concurrency receive a static gold fallback.

LiquidGlassJS enhances navigation. Touch layouts use its lighter CSS fallback. Do not allow engine-generated positioning to override the fixed phone dock. The original logo receives a CSS-masked metallic highlight inspired by Liquid Logo; that tool's shader is not integrated.

Do not add a second animation engine unless a specific effect requires it. Reduced motion removes decorative movement. Playback and navigation must remain usable when enhancements fail.

## Resource selection for future improvements

Reviewed on 13 October 2026. These resources guide specific decisions; they are not all installed dependencies.

| Resource | Application to this site | Status |
| --- | --- | --- |
| Minimal Gallery, https://minimal.gallery/ | Editorial spacing, hierarchy and composition references | Reference |
| Component Gallery, https://component.gallery/ | Carousel, search, tabs and dialog behavior comparisons | Reference |
| 21st.dev, https://21st.dev/ | Find individual React components for a concrete need; review each component's source and license | Reference |
| shadcn/ui, https://ui.shadcn.com/ | Accessible component patterns and locally owned source when replacing a control is justified | Reference; existing Base UI and native dialogs remain |
| Aceternity UI, https://ui.aceternity.com/ | Selective portrait and featured-conversation interactions | Reference |
| Magic UI, https://magicui.design/ | Subtle accent motion | Shine Border already integrated |
| Motion Primitives, https://motion-primitives.com/ | Future transitions using the existing Motion stack | Candidate; site access returned 403 in this review |
| Anime.js, https://animejs.com/ | Evaluate only for a future effect unsupported by the current stack | Candidate, not installed |
| LiquidGlassJS, https://github.com/Surdeddd/liquidglassjs | Glass navigation and dock | Integrated |
| ShaderGradient, https://github.com/ruucm/shadergradient | Gold hero atmosphere | Integrated |

Kage, AppShot Gallery, Refero Styles, Jiro, VibePrompt, Kinetics and MicroKit UI were supplied by name without exact links. Resolve the intended product and review its actual content before claiming adoption. DESIGN.md is this project's design specification, not a runtime package.

Uiverse, mapcn, Kitbitz and 3dicons may be useful for future needs. Maps and illustration-heavy sections do not currently serve the episode-discovery flow. Real people and their conversations remain the primary visual content. Do not reproduce supplied promotional component counts as verified facts.

## Delivery checks

Run TypeScript checking, production build and diff checks after implementation changes. Inspect the actual phone and desktop UI. Check episode playback, guest links, navigation and console errors. Preserve `vercel.json` redirects for old platform routes. Record copied-source provenance in `LIBRARY_SOURCES.md`. Push and deploy implementation changes under the user's existing authorization; documentation-only changes do not need a production deployment.

## Interaction refinement
The latest episode uses ThreeUI Community's circular glass play button, adapted to champagne. Guest cards have a restrained pointer perspective and glint on desktop, while phone cards remain stable. Motion Primitives powers the bottom dock's active-section highlight. Card labels, playback and native anchor navigation remain fully usable with the effects disabled. Host and footer links use native anchors with original site styling. Animmaster Lib is a visual reference pending access to its paid source pack. Actual integrations are recorded in LIBRARY_SOURCES.md.

## Motion refinement, 13 October 2026
Entrance reveals use a short 65ms ladder across episode rows and guest cards, capped at 195ms. IntersectionObserver reveals each item once; keyboard focus reveals content immediately. Desktop pointers add moving champagne highlights, a 3px maximum magnetic button offset, guest perspective and a featured-cover lift. Parallax uses a damped spring. Touch layouts use shorter 14px entrances and press feedback. Reduced motion makes all entrance content visible and disables spatial effects. No extra animation dependency is introduced.

## Story and campus content
The story uses a four-chapter horizontal rail driven by vertical scroll on screens at least 900px wide. Decorative numbers and orbit lines move at different speeds to create horizontal parallax. Smaller screens use native swipe and scroll snap; reduced motion uses a static grid. The story is grounded in pages 3 to 5 of the supplied story PDF. The campus section paraphrases the workshop invitation's outcomes, 60 to 90 minute format and team contact. Community counts, hiring totals, employer titles and superlative growth claims are intentionally omitted because they are unverified or inconsistent across the documents. Historical abtalks.in platform links are updated to app.klymb.ai.

## Editorial polish, 15 October 2026
Host portrait is a native toggle button, with monochrome and colour layers and a 650ms reveal on desktop hover or keyboard focus. On touch, tapping toggles colour. Only the main host portrait receives this treatment. Portrait framing keeps the face visible; name and identity sit below it. Host headings use a serif name and a compact sans-serif second line, with 15px desktop and 16px phone body copy. Four direct chapter buttons supplement the story's scroll interaction and show the current chapter.

## Reversible editorial version
The cream and navy reference is implemented at /editorial. The original rich website remains at /. Both versions use the same verified episode catalogue and shared player, while the editorial design has scoped CSS. It preserves company and workshop facts and avoids unsupported newsletter subscriptions, subscriber counts, specific course tracks or curriculum claims from the visual reference. The two explicit Vercel rewrites serve the editorial page without changing platform redirects. Original rich version checkpoint: commit 8f9fefa.

## Editorial motion pass
The /editorial version uses line-by-line hero entrances, one-time staggered reveals, 14px spring photo parallax, restrained pointer perspective on episode and workshop cards, short button light feedback, a shared filter highlight and a 200ms challenge-tab entrance. Desktop hover effects are gated to fine pointers. Keyboard focus immediately reveals content. Reduced motion removes spatial movement and makes entrance content visible. No animation dependencies are added; the original homepage motion remains unchanged.
