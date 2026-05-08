# External Integrations

**Analysis Date:** 2026-05-08

## APIs & External Services

This is a marketing website with no backend API routes. The codebase contains zero `fetch()` calls, zero API client SDK imports (no Stripe, Supabase, Firebase, AWS, OpenAI, etc.), and zero `process.env` reads in application code. External "integrations" are limited to image/CDN hosts referenced in `<Image src>` and CSS background URLs, plus social media destinations linked from the footer.

**Image / CDN hosts referenced in code:**
- `cdn.sanity.io` - Sole entry in `next.config.ts` `images.remotePatterns` (allowed for Next Image optimization). Used by `components/sections/InsightsSection.tsx` for two demo card thumbnails (e.g. `https://cdn.sanity.io/images/ca4jck6w/production/...png`). Project ID `ca4jck6w` is referenced but no Sanity client SDK is installed - images are hot-linked to the Sanity CDN, not fetched via the Sanity API.
- `images.unsplash.com` - Used as raw CSS `background-image` URLs in `components/ui/liquid-glass.tsx` and `components/ui/AgentDisputeCard.tsx`. **Not** in `next.config.ts` remote patterns, so these bypass `next/image` optimization.
- `parsefiles.back4app.com` - Hard-coded URLs for liquid-glass app icon mockups in `components/ui/liquid-glass.tsx` (Claude/Finder/ChatGPT/Maps/Safari/Steam icon PNGs). Also bypasses `next/image`.

**Social platforms (outbound links only):**
- LinkedIn - `https://www.linkedin.com/company/105122522` in `components/layout/Footer.tsx:60`
- Instagram - `https://www.instagram.com/trypair/` in `components/layout/Footer.tsx:69`
- Inline SVG icons for X, TikTok, Instagram, YouTube, LinkedIn live in `components/icons/SocialIcons.tsx` (placeholder X href `https://x.com/notsurajgaud` appears in code but is not currently wired into the footer)

## Data Storage

**Databases:**
- None - no DB client, ORM, or connection string anywhere in the repo

**File Storage:**
- Local filesystem only - all media served from `public/` (logos, photos, Rive `.riv` files, etc.). External CDNs (Sanity, Unsplash, Back4App) are read-only image references, not user uploads.

**Caching:**
- None at the application layer (Vercel/Next.js may apply default edge caching, but nothing is configured in `next.config.ts`)

## Authentication & Identity

**Auth Provider:**
- None - the site is fully public marketing content. No auth library (NextAuth/Auth.js, Clerk, Supabase Auth, etc.) is installed, and no protected routes exist.

## Monitoring & Observability

**Error Tracking:**
- None - no Sentry, Datadog, Bugsnag, or similar SDK detected

**Analytics:**
- None - no Google Analytics (`gtag`), PostHog, Mixpanel, Segment, or Vercel Analytics package detected

**Logs:**
- Browser `console.*` only (no server-side logging since there are no server routes)

## CI/CD & Deployment

**Hosting:**
- Vercel - linked via `.vercel/project.json` (project `pair-website`, ID `prj_iBWOkhiiaEqPDYZo3cO6L4xn2dkX`, team `team_DnFUretUWpdwZQ4JGa3g13nN`). No `vercel.json` overrides; deploys use Vercel's default Next.js build.

**CI Pipeline:**
- None checked into the repo - no `.github/workflows/`, no `.gitlab-ci.yml`, no CircleCI/Buffalo config. CI is implicit through Vercel preview deployments triggered by Git pushes.

**Deployment exclusions:**
- `.vercelignore` removes a small set of unused stock photos from upload (`public/girl`, `public/photos/stock/clay-stage-customers.png`, `public/photos/editorial/verge-all-in-*`, `public/product/sierra-conversation-{1,2,3}.png`)

## Environment Configuration

**Required env vars:**
- None - `grep -rE "process\.env|NEXT_PUBLIC_"` across `app/`, `components/`, `lib/`, `remotion/` returns no matches. The application has no runtime configuration via env vars.

**Secrets location:**
- Not applicable - no `.env*` files exist in the working tree, and `.env*` is git-ignored. Vercel project settings could in theory hold secrets, but no code consumes them.

## Webhooks & Callbacks

**Incoming:**
- None - no API routes (`app/api/**` does not exist), no `route.ts` / `route.tsx` files anywhere in `app/`

**Outgoing:**
- None - no `fetch()` calls, no webhook posters

## Form Submissions

`components/ui/LearnMoreForm.tsx` renders a "Learn more" lead-capture form (first/last name, job title, email, company, industry) with client-side validation only. It is **not wired to any submission handler** - the `<form>` has no `onSubmit` and no `action`, so the submit button currently does nothing on production. Treat this as a known integration gap rather than a working integration.

## Fonts

Loaded via `next/font/google` in `app/layout.tsx`:
- `Inter` (Latin subset, weights 300/400/500/600/700, `display: swap`) bound to `--font-sans`
- `Almarai` (Arabic subset, weights 300/400/700/800) bound to `--font-almarai`

These are bundled and self-hosted by Next.js at build time, so they do not require runtime calls to Google Fonts.

## Embedded Media Runtimes

Not "integrations" in the API sense, but worth tracking because they ship third-party runtime code into the browser:
- **Remotion Player** - `@remotion/player` renders compositions defined in `remotion/Root.tsx` (`Starter`, `EmpowerEveryTeam`) inside the page via `components/ui/RemotionEmpowerTeam.tsx`
- **Rive runtime** - `@rive-app/react-canvas` plays `.riv` files served from `public/` (`channels.riv`, `empower-every-team.riv`, `pay-for-a-job.riv`)

---

*Integration audit: 2026-05-08*
