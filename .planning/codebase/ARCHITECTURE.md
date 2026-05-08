<!-- refreshed: 2026-05-08 -->
# Architecture

**Analysis Date:** 2026-05-08

## System Overview

```text
┌──────────────────────────────────────────────────────────────────────┐
│                  Browser (React 19 + Next.js 16 App Router)           │
├──────────────────┬──────────────────┬───────────────────────────────┤
│  Server Components │  Client Components│  Embedded Animation Players  │
│  (default)        │   ("use client")  │   Rive · Remotion · <video>  │
│  `app/**/page.tsx`│ `components/ui/*` │ `components/ui/Rive*.tsx`,   │
│                   │ navbars, carousels│ `RemotionEmpowerTeam.tsx`    │
└────────┬──────────┴──────────┬───────┴─────────────┬────────────────┘
         │                     │                       │
         ▼                     ▼                       ▼
┌──────────────────────────────────────────────────────────────────────┐
│                Root Layout · `app/layout.tsx`                         │
│   <html> · fonts (Inter, Almarai) · <Navbar/> · <Main/> · <Footer/>  │
└──────────────────────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────────────────────────────┐
│         Shared Modules                                                │
│   `lib/constants.ts`   (logos, testimonials, copy data)              │
│   `lib/about-content.ts` (about-page content tree)                   │
│   `lib/utils.ts`         (`cn` Tailwind class merge helper)           │
│   `app/product/_data.ts` (product feature schema and entries)         │
└──────────────────────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────────────────────────────┐
│  Static Assets (`public/`) · `.riv` files · `.mp4` clips · images    │
│  Built output: `.next/` (committed-out), deployed to Vercel          │
└──────────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Root layout | Mounts global fonts, Navbar, Main, Footer | `app/layout.tsx` |
| Navbar | Sticky header, scroll/hover theming, mobile drawer | `components/layout/Navbar.tsx` |
| Main wrapper | Picks page background based on pathname | `components/layout/Main.tsx` |
| Footer | Site-wide footer, legal links, social icons | `components/layout/Footer.tsx` |
| Container | Centered max-width wrapper used by sections | `components/layout/Container.tsx` |
| Section components | Compose home/about/product sections | `components/sections/*.tsx` |
| Reusable UI primitives | Cards, hero, CTA, page templates, form fields | `components/ui/*.tsx` |
| Page templates | `CustomerStoryPage`, `IndustryPage`, `LegalPage` consumed by route pages | `components/ui/CustomerStoryPage.tsx`, `components/ui/IndustryPage.tsx`, `components/ui/LegalPage.tsx` |
| Animation drivers | Rive (`.riv`) and Remotion `<Player>` wrappers | `components/ui/RiveChannels.tsx`, `components/ui/RiveEmpowerTeam.tsx`, `components/ui/RivePayForAJob.tsx`, `components/ui/RemotionEmpowerTeam.tsx` |
| Remotion compositions | Video definitions registered for the Remotion CLI/preview | `remotion/Root.tsx`, `remotion/EmpowerEveryTeam.tsx`, `remotion/Composition.tsx` |
| Static content modules | Centralized data for sections and pages | `lib/constants.ts`, `lib/about-content.ts`, `app/product/_data.ts` |
| Class-name helper | `cn` merges Tailwind classes via `clsx` + `tailwind-merge` | `lib/utils.ts` |

## Pattern Overview

**Overall:** Next.js 16 App Router static marketing site. Server Components by default, client components opted in with `"use client"` only when interactivity, browser APIs, or animation libraries require it. There is no API layer, database, or authentication — every page renders from local TypeScript data modules and assets in `public/`.

**Key Characteristics:**
- App Router file-based routing under `app/` (no `pages/` directory)
- React 19 + TypeScript strict mode, JSX preserved via `"jsx": "react-jsx"`
- Tailwind CSS v4 with theme tokens declared inside `app/globals.css` via `@theme inline`
- shadcn/ui scaffolding (`components.json` with `"style": "radix-nova"`, `"rsc": true`) but only a subset of primitives are present
- Animation stack: Rive (`@rive-app/react-canvas`), Remotion (`@remotion/player`), Framer Motion / `motion`, plus raw `<video>` and CSS keyframes
- Dual-purpose Remotion: the `remotion/` directory exposes compositions both for the Remotion CLI (`remotion/index.ts` calls `registerRoot`) and for embedded `<Player>` instances on the website
- No data fetching, API routes, server actions, middleware, or auth — pure static rendering
- Path alias `@/*` maps to repo root (`tsconfig.json`), used pervasively

## Layers

**Routes (`app/`):**
- Purpose: Each subfolder declares a URL via `page.tsx`; `layout.tsx` defines the global shell
- Location: `app/`
- Contains: Server components by default; small `_data.ts` colocated where a route ships its own typed dataset (e.g. `app/product/_data.ts`)
- Depends on: `components/`, `lib/`, `public/`
- Used by: Next.js routing; deep-linked from Navbar (`lib/constants.ts` `NAV_LINKS`) and Footer (`FOOTER_COLUMNS`)

**Layout shell (`components/layout/`):**
- Purpose: Site chrome (Navbar, Footer, Main background switcher, Container)
- Location: `components/layout/`
- Contains: Mostly client components (`Navbar.tsx`, `Main.tsx` use `usePathname`); `Footer.tsx` and `Container.tsx` are server components
- Depends on: `lib/constants.ts`, `components/icons/`
- Used by: `app/layout.tsx` once at the root

**Section components (`components/sections/`):**
- Purpose: Large composed page sections (HeroSection, TransformSection, TestimonialsSection, AgentDataSection, AgentOSSection, CTASection, etc.) plus page-scoped subfolders (`sections/about/`, `sections/product/`)
- Location: `components/sections/`
- Contains: Mix of server (`LogosSection`, `TestimonialsSection`, `CTASection`, `AgentOSSection`, `TrustSection`) and client (`HeroSection`, `TransformSection`, `AgentDataSection`, `AgentStudioSection`, `InsightsSection`, `LifetimeValueSection`) components
- Depends on: `components/ui/`, `lib/constants.ts`, `components/layout/Container.tsx`
- Used by: Top-level route pages (e.g. `app/page.tsx` composes `HeroSection`, `LogosSection`, `TransformSection`, …)

**UI primitives and templates (`components/ui/`):**
- Purpose: Reusable cards (`FeatureCard`, `GradientCard`, `CustomerCard`, `TestimonialCard`), animation hosts (`Rive*`, `RemotionEmpowerTeam`), form controls (`TextField`, `IndustrySelect`, `LearnMoreForm`), shared page templates (`PageHero`, `PageCTA`, `CustomerStoryPage`, `IndustryPage`, `LegalPage`), helpers (`ScrollReveal`, `Carousel`, `liquid-glass`)
- Location: `components/ui/`
- Depends on: `next/image`, `lucide-react`, `lib/utils.ts`, `lib/constants.ts`
- Used by: `components/sections/*` and many `app/**/page.tsx` files directly

**Data modules (`lib/`, `app/product/_data.ts`, `lib/about-content.ts`):**
- Purpose: Source-of-truth content (logos, testimonials, feature copy, customer cards, value props) consumed by sections and pages
- Location: `lib/`, plus colocated `_data.ts` (the leading underscore signals "not a route segment" to App Router)
- Used by: Every section/page that displays brand content

**Animation roots (`remotion/`):**
- Purpose: Remotion compositions registered for the Remotion CLI/preview; the same components are also rendered in-page via `@remotion/player`
- Location: `remotion/`
- Contains: `index.ts` (`registerRoot`), `Root.tsx` (composition list), `Composition.tsx` (starter), `EmpowerEveryTeam.tsx` (used at runtime by `components/ui/RemotionEmpowerTeam.tsx`)

**Static assets (`public/`):**
- Purpose: Images, SVGs, video clips, and Rive bundles served as-is
- Location: `public/`
- Notable: Rive bundles at the root (`channels.riv`, `empower-every-team.riv`, `pay-for-a-job.riv`); hero clips in `public/hero/`; product mocks in `public/product/`; trust badges in `public/trust/`; brand marks in `public/branding/`; per-customer photos in `public/photos/customers/`

## Data Flow

### Primary Request Path

1. Browser requests a URL (e.g. `/product/agent-studio`)
2. Next.js resolves `app/product/agent-studio/page.tsx` (`app/product/agent-studio/page.tsx:33`)
3. Root `RootLayout` renders the `<html>`/`<body>` shell, fonts, Navbar, Main, Footer (`app/layout.tsx:28`)
4. Page server component composes `PageHero`, body sections, `PageCTA` (`app/product/agent-studio/page.tsx:34`)
5. Any `"use client"` subtree (e.g. `Navbar`, `HeroSection`, `RiveChannels`) hydrates in the browser; static content is streamed as-is

### Home Page Composition

1. `app/page.tsx` exports `Home`
2. `HeroSection` (`components/sections/HeroSection.tsx`, client) drives the rotating video + glass-bubble overlay
3. `LogosSection` → `TransformSection` (with embedded Rive + Remotion via `dynamic(...)`) → `TestimonialsSection` → `AgentOSSection` → two `AgentDataSection` instances → `CTASection`
4. Most sections are wrapped in `<ScrollReveal>` (`components/ui/ScrollReveal.tsx`) so they fade/translate in once an `IntersectionObserver` reports visibility

### Animation Flow

1. **Rive:** Client wrapper components import `useRive` from `@rive-app/react-canvas`, point at a `.riv` file in `public/`, and load `"State Machine 1"`. Example: `components/ui/RiveChannels.tsx:5`
2. **Remotion (in-page):** `components/ui/RemotionEmpowerTeam.tsx` loads `<Player>` from `@remotion/player`, mounts the `EmpowerEveryTeam` composition (`remotion/EmpowerEveryTeam.tsx`), sizes itself to its container with a `ResizeObserver`, and toggles play/pause via a ref
3. **Remotion (CLI):** `remotion/index.ts` calls `registerRoot(RemotionRoot)`. `remotion/Root.tsx` lists `Starter` and `EmpowerEveryTeam` compositions, used by the Remotion preview/CLI tooling. The Next.js bundle does not import `registerRoot`
4. **Heavy animations are dynamic:** `components/sections/TransformSection.tsx:14-22` and `components/sections/AgentStudioSection.tsx:7` use `next/dynamic(..., { ssr: false })` so Rive/Remotion never run in the server render

### Theming and Routing-Sensitive Chrome

1. `Navbar` (`components/layout/Navbar.tsx:48`) and `Main` (`components/layout/Main.tsx:8`) call `usePathname()`
2. `Navbar` swaps between transparent / dark / light variants based on `LIGHT_BG_ROUTES` and `ALWAYS_DARK_ROUTES` constants and on scroll direction
3. `Main` flips its background between `bg-white` and `bg-[#f6f5f3]` for `/learn-more`

**State Management:**
- No global state library. Local `useState`/`useRef` only, scoped to client components
- Animation libraries manage their own internal state (Rive state machines, Remotion frames)

## Key Abstractions

**Page templates (UI primitives that render full pages):**
- Purpose: Reduce per-route boilerplate to a single component call
- Examples: `components/ui/CustomerStoryPage.tsx`, `components/ui/IndustryPage.tsx`, `components/ui/LegalPage.tsx`
- Pattern: Each route file imports the template and passes props (e.g. `app/customers/cinescape/page.tsx`, `app/industries/retail/page.tsx`, `app/privacy-policy/page.tsx`)

**Content-as-module:**
- Purpose: Centralize editable copy/data in TypeScript so route files stay declarative
- Examples: `lib/constants.ts` (logos, testimonials, footer columns), `lib/about-content.ts` (about-page content tree), `app/product/_data.ts` (`PRODUCT_FEATURES`, `PRODUCT_CUSTOMERS`)
- Pattern: Strongly typed (`type Media = ...`, `ProductFeature`, `CustomerCardData`) and consumed via named exports

**Glass-card pattern:**
- Purpose: Position a blurred backdrop that tracks an external element so frosted bubbles look like they sit on the underlying video/gradient
- Examples: `components/sections/HeroSection.tsx` (`GlassBubble`), `components/sections/TransformSection.tsx` (`GlassBubble` with `HeroCardRefContext`), `components/ui/liquid-glass.tsx`, `components/ui/liquid-weather-glass.tsx`
- Pattern: A `RefObject<HTMLElement>` is threaded down via props or React Context; an inner `<div>` is positioned each frame (`requestAnimationFrame`) using `getBoundingClientRect`

**Tailwind theme tokens in CSS:**
- Purpose: Declare design tokens (`--color-sierra-green`, `--color-pair-blue`, `--radius-card`, etc.) once and reuse via Tailwind utilities
- Location: `app/globals.css` `@theme inline { ... }` (Tailwind v4 syntax)
- Used by: Every component (`bg-sierra-green`, `text-sierra-text-dark`, `rounded-card`, etc.)

**`cn` class merge helper:**
- File: `lib/utils.ts`
- Pattern: `cn(...inputs)` = `twMerge(clsx(inputs))`. Used wherever conditional Tailwind classes need de-duplication

## Entry Points

**Root layout:**
- Location: `app/layout.tsx`
- Triggers: All requests
- Responsibilities: Sets `<html lang="en">`, applies `Inter` (`--font-sans`) and `Almarai` (`--font-almarai`) Google fonts, defines `<title>`/`<description>` metadata, mounts `<Navbar>`, `<Main>` and `<Footer>` once

**Home page:**
- Location: `app/page.tsx`
- Triggers: GET `/`
- Responsibilities: Composes hero + marketing sections; defines local `PLATFORM_CARDS` array passed into `AgentDataSection`

**Other route pages:**
- Pattern: One `page.tsx` per route segment; one `[slug]/page.tsx` for dynamic routes (`app/blog/[slug]/page.tsx` exports `generateStaticParams`)
- Notable: `app/learn-more/page.tsx` (lead-capture form), `app/customers/<slug>/page.tsx` (case studies via `CustomerStoryPage`), `app/industries/<slug>/page.tsx` (vertical pages via `IndustryPage`), `app/product/<slug>/page.tsx` (per-feature pages)

**Remotion CLI entry:**
- Location: `remotion/index.ts` calls `registerRoot(RemotionRoot)` from `remotion/Root.tsx`
- Triggers: Used only by the Remotion CLI / preview tooling (no `remotion` script is currently defined in `package.json`); the Next.js app does not import `registerRoot`

**Static assets:**
- Location: `public/`
- Triggers: Direct fetch (e.g. `/hero/Timeline 1.mp4`, `/channels.riv`, `/branding/pair-icon-white.png`)

## Architectural Constraints

- **Threading:** Single-threaded React render. Several components run a permanent `requestAnimationFrame` loop (`HeroSection.tsx`, `TransformSection.tsx`, `liquid-glass.tsx`) — they cancel on unmount but stay hot while the section is mounted.
- **No SSR for animations:** Rive and Remotion players are imported via `next/dynamic(..., { ssr: false })` (`components/sections/TransformSection.tsx:14-22`, `components/sections/AgentStudioSection.tsx:7`). Direct imports of `Rive*`/`RemotionEmpowerTeam` from a server component would break the build because they require browser APIs.
- **Client-component boundary:** Any component using hooks (`useState`, `useEffect`, `useRef`, `usePathname`, `useRive`), event handlers, or browser-only APIs must declare `"use client"` as line 1. Server components cannot pass functions as props to other server components.
- **Global state:** None. There is no Zustand/Redux/Context store at the app level. The only `createContext` instance is `HeroCardRefContext` in `components/sections/TransformSection.tsx`, scoped to that section.
- **No async data:** All copy lives in TypeScript modules. The site is fully static; `app/blog/[slug]/page.tsx` resolves `params` (Promise in Next.js 16) but reads from a local object.
- **Image domains:** `next.config.ts` allows `cdn.sanity.io` only. New remote images require a config update.
- **TypeScript strict:** `tsconfig.json` has `"strict": true` and `"noEmit": true` — every component is type-checked but compilation is delegated to Next.js.
- **Path alias:** Only `@/*` is configured; relative imports beyond a single hop are discouraged.
- **No tests:** No Jest/Vitest/Playwright config files. There is a `.playwright-mcp/` artifact directory (gitignored) but no test runner or `*.test.*` files.

## Anti-Patterns

### Importing animation libraries directly into server components

**What happens:** Importing `RiveChannels`, `RiveEmpowerTeam`, `RivePayForAJob`, or `RemotionEmpowerTeam` directly from a server component would attempt to run `useRive` / `Player` during the server render, which requires `window`/`HTMLCanvasElement`.
**Why it's wrong:** Build/runtime error, because these libraries are browser-only and the wrappers carry `"use client"` plus DOM refs.
**Do this instead:** Either consume them from another client component, or use `next/dynamic(import("..."), { ssr: false })` as in `components/sections/TransformSection.tsx:14`. `components/sections/product/FeatureMedia.tsx` is itself a client component (`"use client"` at line 1), which is why it can import the `Rive*` wrappers statically.

### Adding `"use client"` to large data/static sections

**What happens:** Some sections are marked `"use client"` even though they only render Tailwind markup (e.g. carousels with state make sense; pure layout sections do not).
**Why it's wrong:** Forces unneeded JS into the bundle and prevents server-side optimisations.
**Do this instead:** Match the pattern in `components/sections/LogosSection.tsx`, `components/sections/TestimonialsSection.tsx`, `components/sections/CTASection.tsx`, and `components/sections/AgentOSSection.tsx`: keep server components by default and only opt in to client when hooks/handlers are required (see `components/sections/HeroSection.tsx`, `TransformSection.tsx`, `AgentDataSection.tsx`).

### Hard-coding copy inside route files

**What happens:** Mixing long marketing copy into route components alongside layout JSX makes copy edits noisy and error-prone.
**Why it's wrong:** Copy changes touch the same files as layout changes, the data is harder to localize, and large arrays push past the readable size of a route file.
**Do this instead:** Follow `app/product/_data.ts` (typed `PRODUCT_FEATURES`, `PRODUCT_CUSTOMERS`) or `lib/about-content.ts` (`ABOUT_HERO`, `MISSION`, `VALUES`, `CUSTOMERS`, `OFFICES`, `MOSAIC`) and import named exports into the page. Keep route files declarative.

### Using `<img>` for content imagery

**What happens:** A few components use raw `<img src="...">` tags (e.g. inside `components/sections/HeroSection.tsx` for avatars; `components/sections/TransformSection.tsx` for the Pair icon).
**Why it's wrong:** Skips Next.js image optimisation and triggers `next/image` ESLint warnings.
**Do this instead:** Prefer `next/image` `<Image>` (see `components/sections/LogosSection.tsx:27`, `components/ui/CustomerCard.tsx:46`). Raw `<img>` is acceptable only inside fast-cycling animation overlays where layout precision beats optimisation.

## Error Handling

**Strategy:** No runtime error boundaries are wired up. Pages are static and content modules are typed at compile time, so most failures surface as TypeScript errors during `next build`.

**Patterns:**
- Dynamic route fallbacks: `app/blog/[slug]/page.tsx:56` returns an inline "Post not found" panel when the slug is missing
- Animation guards: Rive wrappers (`components/ui/RiveChannels.tsx:16`) and Remotion player (`components/ui/RemotionEmpowerTeam.tsx:27`) check `if (rive) { ... }` / `if (!player) return;` before issuing play/pause
- `dynamic(..., { ssr: false })` prevents server-side crashes for canvas-only components

## Cross-Cutting Concerns

**Logging:** None. No `console.log` infrastructure or analytics SDK detected.
**Validation:** Lightweight client-side validation only (`components/ui/LearnMoreForm.tsx:25` — `isValid` from non-empty fields). The form has no `onSubmit` handler wired to a backend.
**Authentication:** None. The site is fully public.
**Internationalization:** Not configured at the framework level (`<html lang="en">`). Arabic content is rendered ad hoc by detecting Arabic Unicode ranges and applying `var(--font-almarai)` (`components/sections/HeroSection.tsx:115` `isArabic`/`arabicFont`).
**Accessibility:** ARIA labels on icon-only buttons (Navbar burger, social icons), `aria-roledescription="carousel"` on carousels, `alt` text on `next/image` instances. Some decorative `<img>` tags lack `alt` or rely on `aria-hidden`.

---

*Architecture analysis: 2026-05-08*
