# Codebase Concerns

**Analysis Date:** 2026-05-08

## Tech Debt

**Hero headline contains placeholder token "TK":**
- Issue: The H1 on the homepage hero literally renders the string `"The first AI\nthat sounds\nlike a TK."` — `TK` is journalism shorthand for "to come" (a placeholder).
- Files: `components/sections/HeroSection.tsx:370`
- Impact: The most prominent copy on the entire marketing site reads "...sounds like a TK." in production.
- Fix approach: Replace the literal string with the intended noun (e.g., "human", "real person") and verify via the homepage at `/`.

**Sierra branding leaks (project was forked/inspired by Sierra):**
- Issue: Several files still contain leftover "Sierra" references in user-facing copy and code samples.
- Files:
  - `components/ui/AgentDisputeCard.tsx:49` — UI label reads `"Sierra Agent"` instead of `"Pair Agent"`.
  - `app/product/agent-sdk/page.tsx:36-41` — code block still says `from sierra import Agent, ...` and `model="sierra-large"`.
  - `components/layout/Navbar.tsx:155` — comment `Sierra-style 2-column grid`.
- Impact: Damages brand integrity; visitors who inspect code samples see a competitor's brand. The Tailwind theme tokens (`sierra-green`, `sierra-text`, `sierra-bg`, etc.) are pervasive and probably intentional aliases — the bigger concern is the user-visible copy and code blocks.
- Fix approach: Rename copy and code samples to "Pair". Decide whether to also rename the `sierra-*` theme tokens to `pair-*` for clarity.

**`<form>` on Learn More page has no submit handler:**
- Issue: `<form className="space-y-6" noValidate={false}>` has no `onSubmit`, no `action`, and no `method`. Clicking the submit button performs the browser's default GET to the same page with all form data appended as query string — including PII and "company email".
- Files: `components/ui/LearnMoreForm.tsx:12-83`
- Impact: Lead capture is silently broken. Any submitted PII is exposed in the URL bar, browser history, server logs, and analytics referrers — a privacy and compliance risk for a form that explicitly references the privacy policy.
- Fix approach: Add an `onSubmit={(e) => { e.preventDefault(); ... }}` that POSTs to a backend endpoint (or third-party form service like HubSpot/Marketo). At minimum, prevent default until the integration is wired.

**Submit button uses `cursor-pointer` even when disabled state styling is applied:**
- Issue: When the form is invalid, the button gets `bg-[#bfbab2] cursor-pointer hover:bg-[#b1aca2]` — visually subdued but still clickable, and there's no `disabled` attribute or `aria-disabled`.
- Files: `components/ui/LearnMoreForm.tsx:69-79`
- Impact: User can submit incomplete forms; "validation" is purely cosmetic.
- Fix approach: Either add `disabled={!isValid}` and `cursor-not-allowed` for the invalid state, or actually validate on submit.

**Duplicate `INSIGHT_CARDS` and `INSIGHTS_CARDS` constants:**
- Issue: `lib/constants.ts:101-122` defines `INSIGHT_CARDS` and `lib/constants.ts:147-168` defines `INSIGHTS_CARDS` — nearly identical (only differs by punctuation in one description).
- Files: `lib/constants.ts`
- Impact: `INSIGHT_CARDS` (without the S) is never imported anywhere — pure dead code. Risk of drift if someone updates the wrong one.
- Fix approach: Delete `INSIGHT_CARDS`. Keep `INSIGHTS_CARDS`.

**`TRUST_BADGES` redefined three times with different shapes:**
- Issue: The same logical list lives in `lib/constants.ts:170-178` (string-only abbreviations), `components/sections/TrustSection.tsx:4-12` (with PNG/SVG src+dimensions), and `components/sections/product/FeatureMedia.tsx:9-16` (src+alt only).
- Files: `lib/constants.ts`, `components/sections/TrustSection.tsx`, `components/sections/product/FeatureMedia.tsx`
- Impact: Three sources of truth; the lib constant version is never consumed because callers need image data.
- Fix approach: Promote a single canonical `TRUST_BADGES` (with `src`, `alt`, `width`, `height`) into `lib/constants.ts`, delete the local duplicates, delete the unused string-only version.

**`LIGHT_BG_ROUTES` duplicated between Navbar and Main:**
- Files: `components/layout/Navbar.tsx:9` and `components/layout/Main.tsx:5`
- Impact: Adding a route to one and forgetting the other will produce a navbar that disagrees with the page background.
- Fix approach: Move to `lib/constants.ts` and import from both.

**Internal links use raw `<a href="/...">` instead of `next/link`:**
- Issue: 16+ internal navigation links bypass Next.js's prefetched client-side routing.
- Files: `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`, `app/customers/page.tsx`, `app/product/page.tsx`, `app/industries/page.tsx`, `app/blog/page.tsx`, `components/ui/PageCTA.tsx`, `components/sections/CTASection.tsx`, `components/sections/LogosSection.tsx`, `components/sections/AgentDataSection.tsx`, `components/sections/about/CustomerCarousel.tsx`, etc. The only file that uses `next/link` is `components/ui/PillButton.tsx`.
- Impact: Full-page reloads on every internal navigation; lost prefetching, scroll restoration, and view transitions; slower perceived navigation; layout flash.
- Fix approach: Replace `<a href="/...">` with `<Link href="/...">` from `next/link` throughout. Keep `<a>` for external links only.

**Raw `<img>` instead of `next/image`:**
- Files: `components/sections/HeroSection.tsx:124`, `components/sections/HeroSection.tsx:140`, `components/sections/TransformSection.tsx:164`, `components/sections/TransformSection.tsx:895`, `app/demo/page.tsx:12`, `app/demo/page.tsx:28`
- Impact: No automatic responsive `srcset`, no lazy loading, no LCP optimization. The TransformSection uses `<img>` inside an animated spiral with many copies — measurable performance hit.
- Fix approach: Replace with `next/image`'s `Image` component (it's already used elsewhere). For the avatars in the hero bubbles, the source files live under `/photos/stock/` and could be optimized aggressively.

**`unoptimized` flag set on `next/image` in hot-path components:**
- Files: `components/sections/AgentDataSection.tsx:296`, `components/sections/LogosSection.tsx:32`, `app/learn-more/page.tsx:56`
- Impact: Bypasses Next.js image optimization (no AVIF/WebP, no resize) for the homepage logos and product cards. The home page logos alone include `Future Kid.png` at 671 KB and `portarage.png` at 562 KB — shipped at full size to every visitor.
- Fix approach: Drop `unoptimized` unless specifically needed for animated GIFs or SVGs that break optimization. For SVG logos, consider switching to inline SVG.

## Known Bugs

**Broken image: About page large mosaic photo:**
- Symptoms: The bigger image in `ImageMosaic` renders 404/broken because the path `/photos/editorial/modern-building.png` does not exist.
- Files: `lib/about-content.ts:117` declares `src: "/photos/editorial/modern-building.png"`. Actual file is at `public/photos/lifestyle/modern-building.png`.
- Trigger: Visit `/about` and scroll to the image mosaic.
- Workaround: Update the path to `/photos/lifestyle/modern-building.png`.

**`LearnMoreForm` field counter never includes industry:**
- Symptoms: The form requires the user to select an industry, but the validity check `isValid = FIELDS.every((f) => values[f].trim().length > 0)` includes `industry`, while `IndustrySelect` may not call `onValueChange` consistently — verify by manual test. (Lower-confidence observation; double-check.)
- Files: `components/ui/LearnMoreForm.tsx:25`, `components/ui/IndustrySelect.tsx`
- Workaround: Validate by inspecting `IndustrySelect`'s state propagation.

**Duplicate logo files committed:**
- Symptoms: `public/logos/Future Kid.png` and `public/logos/future-kid.png` are byte-for-byte identical (671,002 bytes each, 1.3 MB combined). Only `future-kid.png` is referenced in code.
- Files: `public/logos/Future Kid.png`
- Trigger: N/A — wastes disk and deploy bandwidth.
- Fix: Delete `public/logos/Future Kid.png`.

**Customer cards on `/customers` are not navigable:**
- Symptoms: Each story passes a `slug` prop, but `CustomerCard` (`components/ui/CustomerCard.tsx`) never wraps the card in a link. The cards look clickable (cursor doesn't change, no anchor) but do nothing.
- Files: `components/ui/CustomerCard.tsx`, `app/customers/page.tsx`
- Trigger: Visit `/customers`, click any non-featured card.
- Fix: Wrap the card content in `<Link href={`/customers/${slug}`}>` when `slug` is present. Note that `The Burrow`, `Banta Furniture`, and `Future Kid` have no slug and no destination page — either build pages or remove from the grid.

**Customer story author/role copy is generic placeholder:**
- Symptoms: Most customer story pages use `author: "Operations Team"`, `role: "Vice President, Customer Operations"` (Flash, Macro, Flare Fitness) — not real attribution.
- Files: `app/customers/flash/page.tsx`, `app/customers/macro/page.tsx`, `app/customers/flare-fitness/page.tsx`, `app/customers/cinescape/page.tsx`, etc.
- Fix: Replace with real, named quotes from the customers (or remove the byline if not approved).

**Industry page financial-services uses Rocket Mortgage testimonial:**
- Symptoms: `app/industries/financial-services/page.tsx:7` quotes Alex McGillis from Rocket Mortgage — Pair has no Rocket Mortgage as a customer (per `lib/constants.ts` testimonial set: Boutiqaat, Cinescape, Flare Fitness, ktech).
- Fix: Replace with a real Pair customer or remove.

**`generateStaticParams` is exported via re-export instead of direct export:**
- Symptoms: `app/blog/[slug]/page.tsx:48` declares `function generateStaticParams()` then `export { generateStaticParams }` at the bottom. While this works in some Next.js versions, the canonical Next 16 pattern is `export async function generateStaticParams() {}`.
- Files: `app/blog/[slug]/page.tsx:48,121`
- Fix: Convert to a direct export and confirm against the locally bundled docs (`node_modules/next/dist/docs/`).

**Public `/demo` and `/demo/hero-glass` pages exposed in production:**
- Symptoms: These appear to be dev-only sandboxes (`app/demo/page.tsx` mutates `<main>` background via DOM, `hero-glass/page.tsx` just re-renders the production hero). They are publicly indexable.
- Files: `app/demo/page.tsx`, `app/demo/hero-glass/page.tsx`
- Fix: Either move to a non-public location (e.g., `app/_demo`), gate behind `process.env.NODE_ENV !== "production"`, or delete.

## Security Considerations

**Form submission leaks PII to URL/server logs:**
- See `LearnMoreForm` issue above. With no `onSubmit`, default form submission appends `firstName`, `lastName`, `jobTitle`, `email`, `company`, `industry` to the URL as a GET query string.
- Files: `components/ui/LearnMoreForm.tsx`
- Risk: PII in browser history, server access logs, analytics referrer chains.
- Recommendations: Add `e.preventDefault()` and POST to a server action or backend.

**External Unsplash image hot-linked at runtime:**
- Files: `components/ui/AgentDisputeCard.tsx:13` — `https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=400&q=80`. Also `components/ui/liquid-glass.tsx:207`.
- Risk: Unsplash content terms can change; image can disappear or be replaced; an attacker who controls DNS could swap content. Also leaks Pair page metadata (Referer header) to Unsplash on every visit.
- Mitigation: Download and self-host these images, or stop using these components if dead (both are unreferenced — see Test Coverage / Dead Code).

**No Content Security Policy (CSP) or other security headers:**
- Files: `next.config.ts:3-12` — only configures `images.remotePatterns` for Sanity. No `headers()` function.
- Risk: No CSP to mitigate XSS, no `Strict-Transport-Security` declared at app level (Vercel may add it), no `X-Content-Type-Options`, no `Referrer-Policy`, no `Permissions-Policy`.
- Recommendations: Add a `headers()` function in `next.config.ts` setting at minimum: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying camera/microphone/geolocation by default, and a CSP scoped to needed origins (self, Sanity CDN, Vercel analytics).

**Admin/internal Vercel directory committed (`.vercel/`) but `.vercelignore` empty/missing:**
- Files: `.vercel/` exists in repo, `.vercelignore` is referenced in `git status` but appears empty.
- Risk: `.vercel/project.json` typically contains project + org IDs. Low severity but should not be checked in.
- Fix: Ensure `.vercel` is in `.gitignore` (currently line 42) — it is. Confirm none of its contents are tracked: `git ls-files .vercel`.

## Performance Bottlenecks

**Three uncompressed MP4s loaded eagerly on the homepage hero:**
- Problem: `HeroSection.tsx:341-360` mounts three `<video preload="auto">` elements at once: `Timeline 1.mp4` (11.4 MB), `Timeline 2.mp4` (12.7 MB), `Timeline 3.mp4` (11.7 MB). Total: ~35 MB downloaded on every homepage visit before user interaction.
- Files: `components/sections/HeroSection.tsx`, `public/hero/`
- Cause: All three videos are preloaded so swaps "never wait on a decoder" (per the comment).
- Improvement: Re-encode at lower bitrate (target 2-3 MB each, roughly 4x reduction) using H.264/AV1 with two-pass. Consider `preload="metadata"` on inactive videos and switch to `preload="auto"` only on the next video when the current one fires `timeupdate` past 50%.

**Customer photos > 5 MB shipped at full resolution:**
- Problem: `provin.png` (9.1 MB), `meet-agent-arabic.png` (9.1 MB), `lifestyle/COVER.png` (8.8 MB), `banta-furniture.png` (8.0 MB), `ktech.jpg` (7.1 MB), `yaqoub-al-sanea.png` (6.3 MB), `macro.png` (5.5 MB).
- Files: `public/photos/customers/*`, `public/photos/lifestyle/COVER.png`, `public/product/meet-agent-arabic.png`, `public/product/retention-campaign-chart.png` (2.8 MB).
- Cause: PNG used where JPEG would be 5-10x smaller; no compression pass; no AVIF/WebP variants pre-generated.
- Improvement: Convert raster customer photos from PNG → JPEG (or AVIF) at 1920px max width, target 250-400 KB each. Run `next/image` with `unoptimized` removed where applicable.

**`TransformSection` is 1010 lines of inline JSX with heavy animation loops:**
- Problem: Single component holds 5 scenarios × 3 bubbles + 30+ ambient bubbles + animated spiral with 12 image clones. Many `requestAnimationFrame` loops run continuously even when off-screen.
- Files: `components/sections/TransformSection.tsx` (1010 lines)
- Cause: Component grew organically.
- Improvement: Split into `BubbleScenarios.tsx`, `AmbientBubbles.tsx`, `HeroIllustration.tsx`. Pause `requestAnimationFrame` loops when section is off-screen (use `IntersectionObserver`). Many ambient bubbles render constantly though they're decorative.

**Multiple per-component `requestAnimationFrame` loops in the hero:**
- Problem: `HeroSection.tsx` runs three concurrent rAF loops: one to render blurred video frames into a canvas (`draw`), one per `GlassBubble` to track header position (`update`). Each rAF fires every frame (~60Hz) regardless of need.
- Files: `components/sections/HeroSection.tsx:62-69, 287-326`
- Cause: Polling for layout changes via rAF is simple but expensive.
- Improvement: Use `ResizeObserver` for header geometry changes; throttle the canvas redraw to 24-30 fps (videos are typically 24 fps); skip canvas redraws when the bubble overlay is hidden.

**Carousel components remount on every resize:**
- Files: `components/sections/AgentDataSection.tsx:201-215`, `components/sections/InsightsSection.tsx:172-185`
- Cause: `useEffect` with `index, maxIndex, offsetForIndex, getCardWidth` dependencies recreates the resize handler on every state change.
- Improvement: Stabilize the resize handler with `useRef` for the latest values, or use `useEvent`-style pattern.

## Fragile Areas

**`HeroSection` blurred-video bubble effect depends on canvas frame capture:**
- Files: `components/sections/HeroSection.tsx:269-327`
- Why fragile: Captures video frames into an offscreen canvas, exports as JPEG dataURL, sets as a CSS `background-image`. Any change to video format, CORS, autoplay policy, or canvas tainting (e.g. moving video to a CDN with different headers) breaks the effect silently. The fallback is "no blur" which exposes a white tinted box on top of black video.
- Safe modification: Always test with the three actual videos in dev. Don't move videos to a different origin without verifying CORS.
- Test coverage: None.

**`Navbar` has 6 boolean state flags + 1 ref controlling visibility/theme:**
- Files: `components/layout/Navbar.tsx:39-47`
- Why fragile: `scrolled`, `visible`, `mobileOpen`, `activeDropdown`, `navHovered`, `canHover`, `mobileSubmenu` combine into 256 possible states. The `darkTheme` derived value (line 105) is the OR of 6 conditions — any future change risks a regression in the navbar's color scheme on a specific route × scroll × hover combination.
- Safe modification: Snapshot test each route × scroll-position combination, or refactor into a state machine (e.g., XState or a `useReducer`).

**Mobile dropdown navigation is unreachable:**
- Files: `components/layout/Navbar.tsx:36` declares `const DROPDOWN_DATA: Record<string, DropdownItem[]> = {};` (always empty). Lines 156-177 and 266-273 conditionally render dropdown panels gated on `link.hasDropdown && DROPDOWN_DATA[link.label]` — both false for every link in `NAV_LINKS` (which has `hasDropdown: false` for all three links).
- Why fragile: ~90 lines of dead UI logic that will break silently when someone tries to enable a dropdown.
- Safe modification: Either delete the dead branches or populate `DROPDOWN_DATA` and flip a `hasDropdown: true` flag.

**About page `OFFICES` has dead branches for multi-city/remote:**
- Files: `lib/about-content.ts:93-109` has `cities: [{ label: "Kuwait City", lead: true }]`, `bodyMiddle: ""`, `remote: []`. `OfficesLine.tsx:21-30` iterates `OFFICES.remote` and renders ", and " separators that will never appear.
- Safe modification: Either populate the data or simplify the component.

## Scaling Limits

**Blog and Resources content lives inline in TSX files:**
- Files: `app/blog/page.tsx:7-25` (17 posts inline), `app/blog/[slug]/page.tsx:4-46` (only 3 posts have content; 14 of the 17 listed posts will 404), `app/resources/page.tsx:7-20`.
- Current capacity: 17 listed blog posts, 3 with bodies. Resources are list-only with no detail pages.
- Limit: Adding a 4th blog post body means editing the same TSX file. No CMS, no Markdown, no preview. The `cdn.sanity.io` allowlist in `next.config.ts:8` suggests Sanity was planned but not wired.
- Scaling path: Wire the existing Sanity remote pattern to a real Sanity project; or move posts to local MDX with `next-mdx-remote`.

**14 of 17 blog post slugs return "Post not found":**
- Files: `app/blog/page.tsx` lists 17 posts; `app/blog/[slug]/page.tsx` has bodies only for `introducing-pair-agent-os-2`, `boutiqaat-customer-story`, `future-of-voice-ai`. Clicking any other listed post hits the 404 fallback.
- Impact: 82% of links from `/blog` are broken.
- Fix: Add bodies for the remaining 14 posts, or remove them from the index.

**Customer-story coverage gaps:**
- Files: `app/customers/page.tsx` lists 12 customers; `app/customers/` has detail pages only for 10 (missing: `the-burrow`, `banta-furniture`, `future-kid`). Those three cards have no `slug` set, so even with the navigation bug fixed they have no destination.

## Dependencies at Risk

**`shadcn` listed as a runtime dependency:**
- Files: `package.json:26` declares `"shadcn": "^4.2.0"` under `dependencies`. shadcn is a CLI for copying components — typically installed via `npx shadcn` and not a runtime import. Importing it at runtime is unusual.
- Risk: Bundle bloat or build-time confusion.
- Migration plan: Move to `devDependencies` (or remove if unused at runtime; check `app/globals.css` line `@import "shadcn/tailwind.css"`).

**`framer-motion` and `motion` both installed at the same version:**
- Files: `package.json:18-20` — `framer-motion: ^12.38.0` and `motion: ^12.38.0`. `motion` is the rebranded successor of `framer-motion`; shipping both doubles the bundle for the same code.
- Risk: Bundle duplication (~30-40 KB gzipped).
- Migration plan: Pick one (`motion` is the active package). `LifetimeValueSection.tsx:4` imports `motion/react`; nothing currently imports `framer-motion` directly, so it can be removed.

**`lucide-react` pinned to `^1.8.0`:**
- Files: `package.json:19`
- Risk: lucide-react `1.x` is years old; current is `0.4xx` after a re-version. The `^1.8.0` constraint may be incorrect or pulling an unrelated package. Verify the version actually installed and the icon API used.

**Remotion `@remotion/cli` listed under runtime `dependencies`:**
- Files: `package.json:12`
- Risk: CLI tooling shouldn't ship in the production bundle. The Next.js bundler should tree-shake it, but it inflates `node_modules` on Vercel.
- Migration plan: Move `@remotion/cli` to `devDependencies`.

## Missing Critical Features

**No page-level `metadata` or `generateMetadata` exports:**
- Files: Only `app/layout.tsx:22-26` exports `metadata`. None of the 30+ pages export `metadata` or `generateMetadata`, so every page shares the same title (`"Better customer experiences | Pair"`) and description.
- Blocks: SEO ranking, social sharing previews (Open Graph, Twitter Card), accurate browser tabs, accessibility (every page has the same `<title>`).
- Fix: Add `export const metadata: Metadata` to each page (`/about`, `/customers`, `/product`, `/learn-more`, every customer story, every industry page, every blog post via `generateMetadata({ params })`). Include `openGraph`, `twitter`, `alternates.canonical`.

**No `robots.txt`, `sitemap.xml`, or `manifest.json`:**
- Files: `app/` has no `robots.ts`, `sitemap.ts`, `manifest.ts`, or `opengraph-image.tsx`. Only `app/icon.png` is present.
- Blocks: Search engines have no sitemap to crawl; no PWA manifest; no default OG image for social shares.
- Fix: Add `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, `app/opengraph-image.tsx` per Next 16 conventions (see locally bundled docs in `node_modules/next/dist/docs/`).

**Form has no backend:**
- Files: `components/ui/LearnMoreForm.tsx`
- Blocks: Lead capture is the conversion goal of `/learn-more` and indirectly the entire site. Without a backend, every "Learn more" or "Discover more" CTA dead-ends.

**No analytics or error monitoring:**
- Files: No imports of `@vercel/analytics`, `@sentry/*`, PostHog, Datadog, etc.
- Blocks: Cannot measure conversion, traffic, or production errors.

**No automated tests of any kind:**
- Files: No `*.test.*` or `*.spec.*` files; no test runner in `package.json` scripts (only `dev`, `build`, `start`, `lint`).
- Blocks: Every change is manually QA'd; the broken hero "TK", `/about` mosaic 404, and form submission bug all slipped through.

## Test Coverage Gaps

**Dead code: section components imported nowhere:**
- Files: `components/sections/AgentStudioSection.tsx`, `components/sections/LifetimeValueSection.tsx`, `components/sections/InsightsSection.tsx`, `components/sections/TrustSection.tsx`.
- Risk: Renders fine in dev but ships unused JS in builds (or gets tree-shaken — unverified). Signals confusion about which sections are canonical for the home page.
- Priority: Medium. Either link them from a page or delete.

**Dead code: UI components imported nowhere:**
- Files: `components/ui/AgentDisputeCard.tsx`, `components/ui/AnalyticsInsightCard.tsx`, `components/ui/ChatBubble.tsx`, `components/ui/DashboardMockup.tsx`, `components/ui/FeatureCard.tsx`, `components/ui/RiveEmpowerTeam.tsx` (only used by `FeatureMedia.tsx`, but `FeatureMedia` is itself unused on most pages — verify), `components/ui/TestimonialCard.tsx`, `components/ui/PlatformCardMocks.tsx` (the `AskMock`/`StatsMock`/`TestMock`/`StepsMock` exports are unreferenced), `components/ui/CollapsibleSearchBar.tsx`, `components/ui/liquid-glass.tsx`, `components/ui/liquid-weather-glass.tsx`.
- Risk: ~3,500+ lines of dead code. Increases cognitive load when navigating the project; some still pull external Unsplash assets.
- Priority: Medium. Delete or at least move to a `_legacy` directory.

**No verification of static asset paths:**
- Files: `lib/about-content.ts`, `lib/constants.ts`, all customer story pages.
- Risk: The `MOSAIC.large.src` 404 (`/photos/editorial/...`) bug exists because nothing checks that `Image src` paths resolve. Manual review missed it.
- Priority: High. Add a build-time script that walks all `Image` `src` literals and verifies the file exists in `public/`. Even a simple grep + stat loop would have caught the editorial/ vs lifestyle/ mismatch.

**Missing `lang` switching for Arabic content:**
- Files: `app/layout.tsx:34` hard-codes `<html lang="en">`, but `HeroSection.tsx:115-116` and `LifetimeValueSection.tsx:40-44, 96-104` render Arabic strings inline. Per WCAG, these spans should carry `lang="ar"` and `dir="rtl"`.
- Risk: Screen readers mispronounce Arabic content; search engines may not surface Arabic queries.
- Priority: Medium. The hero already uses `dir="auto"` — extend to `lang` attributes.

**Empty/uninformative alt text on visible imagery:**
- Files:
  - `components/sections/AgentOSSection.tsx:27,43` — two large dashboard images set `alt=""` (one is `aria-hidden`, the other is not — the visible one passes alt to the second image only).
  - `components/sections/about/CustomerCard.tsx:33` — hover-state logo has `alt=""` (intentional for decorative duplicate, but `aria-hidden` is also set, so OK).
  - `components/sections/TransformSection.tsx:895` — orbiting headshot images use `alt=""` and are not `aria-hidden`. They're decorative but should at least be `aria-hidden`.
  - `lib/about-content.ts:9` — `ABOUT_HERO.image.alt` is just `"Pair"` — uninformative for a large hero photo.
- Priority: Medium. Add real alt text or `aria-hidden="true"` on truly decorative images.

**Accessibility: form fields lack proper label association:**
- Files: `components/ui/LearnMoreForm.tsx:30-58` — `<label className={...}>` is a sibling of `<TextField>`, not wrapping it, and there's no `htmlFor`/`id` linkage.
- Risk: Screen readers don't announce field labels; clicking the visible label doesn't focus the input.
- Priority: High. Either wrap the input in the label or set `htmlFor={id}` and pass `id` through to `TextField`.

**Accessibility: buttons-as-divs / non-button cards:**
- Files: `app/careers/page.tsx:31` — job rows are `<div ... cursor-pointer>` with no role, no `tabIndex`, no `onClick`. Visually clickable but keyboard-inaccessible and don't actually navigate.
- Priority: Medium.

**SEO: hardcoded copyright year:**
- Files: `components/layout/Footer.tsx:37,57` hard-codes `© 2026 Pair`.
- Priority: Low. Use `new Date().getFullYear()` or accept that 2026 is correct for the current year.

**Robots / indexing: `/demo`, `/demo/hero-glass` are crawlable:**
- See "Public `/demo` ... pages exposed in production" above.
- Priority: Medium for SEO hygiene.

---

*Concerns audit: 2026-05-08*
