<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Architecture, in one screen

- **Routing**: Next.js 16 App Router. Every folder under `app/` with a `page.tsx` is a route. Layouts (`layout.tsx`) wrap their segment.
- **Server vs client**: pages are server components by default. `"use client"` only when the file uses hooks, browser APIs, or event handlers. Server pages can `export const metadata: Metadata`; client pages need a sibling `layout.tsx` for metadata.
- **Content sources**:
  - `lib/constants.ts` — nav, customer logos, testimonials, trust badges, footer columns, SEO constants (`SITE_URL`, `SITE_NAME`, `SITE_TAGLINE`, `SITE_DESCRIPTION`).
  - `lib/about-content.ts` — `/about` page content (mission, values, customers, offices).
  - `app/product/_data.ts` — `/product` feature blocks.
  - Per-customer/per-industry static pages live in their own folder under `app/customers/<slug>/` or `app/industries/<slug>/`.
- **Components**:
  - `components/layout/` — Navbar, Footer, Container, Main.
  - `components/sections/` — page-level sections (HeroSection, TransformSection, AgentDataSection, InsightsSection, etc.).
  - `components/ui/` — reusable primitives (PageHero, PageCTA, CustomerStoryPage, IndustryPage, LegalPage, Carousel, etc.).
- **Imports**: always use the `@/` alias (e.g. `@/components/layout/Container`). Never use `../../` relative imports.

## Animation pipelines

- **Rive**: `public/*.riv` files (`channels.riv`, `empower-every-team.riv`, `pay-for-a-job.riv`) are loaded by `components/ui/Rive*.tsx` wrappers using `@rive-app/react-canvas`. They render inside the home page's TransformSection.
- **Remotion**: `remotion/EmpowerEveryTeam.tsx` is dynamically imported by `components/ui/RemotionEmpowerTeam.tsx` in the home page transform section. The Remotion folder is part of the production bundle (lazy-loaded), not a separate authoring environment.
- **Framer Motion** (`motion/react`): used for in-section reveal, accordion expand/collapse, and carousel cross-fades.

## Hard rules

- **No em dashes**. Use hyphens or rewrite. (Lint does not catch this; review copy edits visually.)
- **Internal links use `<Link>` from `next/link`**. ESLint blocks raw `<a href="/...">`.
- **Images use `<Image>` from `next/image`**. ESLint blocks raw `<img>`.
- **Never read a ref's `.current` during render**. Mirror to state if you need a value visible to React.
- **Never call `setState` synchronously inside `useEffect`** — use `useSyncExternalStore` for media queries / external sources, or initialize state lazily.

## Verification

Before commit/PR:

```bash
npm run lint     # must be clean
npx tsc --noEmit # must be clean
npm run build    # must succeed; 45+ routes prerendered
```

For UI changes, also `npm run dev` and click through the affected route.

## Deployment

Vercel. No env vars. Production canonical URL is `lib/constants.ts` `SITE_URL` (currently `https://pair.com`).
