# Codebase Structure

**Analysis Date:** 2026-05-08

## Directory Layout

```
Pair Website/
├── app/                              # Next.js App Router routes (one folder = one URL segment)
│   ├── layout.tsx                    # Root layout: <html>, fonts, Navbar/Main/Footer
│   ├── page.tsx                      # Home (/)
│   ├── globals.css                   # Tailwind v4 imports + @theme tokens + keyframes
│   ├── icon.png                      # Favicon
│   ├── about/page.tsx                # /about
│   ├── blog/
│   │   ├── page.tsx                  # /blog index
│   │   └── [slug]/page.tsx           # /blog/<slug> (dynamic, generateStaticParams)
│   ├── careers/page.tsx              # /careers
│   ├── customers/
│   │   ├── page.tsx                  # /customers index
│   │   └── <slug>/page.tsx           # /customers/<slug> per-customer story (10 entries)
│   ├── demo/                         # Internal demos
│   │   ├── page.tsx
│   │   └── hero-glass/page.tsx
│   ├── events/page.tsx               # /events
│   ├── industries/
│   │   ├── page.tsx                  # /industries index
│   │   └── <slug>/page.tsx           # 6 vertical pages (retail, technology, …)
│   ├── learn-more/page.tsx           # Lead-capture form on light background
│   ├── modern-slavery-statement/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── terms-and-conditions/page.tsx
│   ├── product/
│   │   ├── page.tsx                  # /product index
│   │   ├── _data.ts                  # Colocated typed dataset (underscore = not a route)
│   │   └── <slug>/page.tsx           # 8 product feature pages
│   └── resources/page.tsx            # /resources
├── components/
│   ├── icons/                        # SVG icon components (`PairLogo`, `SocialIcons`, `DatabaseIcon`)
│   ├── layout/                       # Site chrome (`Navbar`, `Footer`, `Main`, `Container`)
│   ├── sections/                     # Composed page sections
│   │   ├── *.tsx                     # Home-page sections (Hero, Logos, Transform, …)
│   │   ├── about/                    # /about-only sections
│   │   └── product/                  # /product-only sections
│   └── ui/                           # Reusable primitives + page templates
├── lib/
│   ├── about-content.ts              # /about page content tree
│   ├── constants.ts                  # NAV_LINKS, COMPANY_LOGOS, TESTIMONIALS, etc.
│   └── utils.ts                      # `cn` Tailwind class merger
├── remotion/                         # Remotion compositions (CLI-registered + in-page <Player>)
│   ├── index.ts                      # `registerRoot(RemotionRoot)`
│   ├── Root.tsx                      # `<Composition>` declarations
│   ├── Composition.tsx               # Starter composition
│   └── EmpowerEveryTeam.tsx          # Composition embedded in TransformSection
├── public/                           # Static assets served as-is
│   ├── *.riv                         # Rive bundles at root (channels, empower-every-team, pay-for-a-job)
│   ├── agent-studio/                 # Product mocks
│   ├── branding/                     # Pair brand marks
│   ├── hero/                         # Home-page hero video clips
│   ├── insights/                     # Insights/dashboard imagery
│   ├── logos/                        # Customer logos
│   ├── photos/                       # customers/, headshots/, lifestyle/, stock/
│   ├── product/                      # Product page mocks (SVG + PNG + MP4)
│   └── trust/                        # Compliance badges (SOC 2, ISO, HIPAA, GDPR, EU AI Act)
├── .planning/codebase/               # GSD codebase maps (this directory)
├── .claude/                          # Claude Code project configuration
├── .vercel/, .vercelignore           # Vercel deploy metadata
├── package.json                      # Dependencies (Next 16.2.2, React 19.2.4, Remotion 4, Rive 4)
├── package-lock.json
├── next.config.ts                    # Image remotePatterns (cdn.sanity.io)
├── next-env.d.ts                     # Generated, gitignored
├── tsconfig.json                     # Strict TS, alias `@/*` -> repo root
├── tsconfig.tsbuildinfo              # Build cache (gitignored)
├── eslint.config.mjs                 # Flat config: eslint-config-next core-web-vitals + typescript
├── postcss.config.mjs                # @tailwindcss/postcss
├── components.json                   # shadcn/ui config (style: radix-nova, rsc: true)
├── README.md
├── AGENTS.md / CLAUDE.md             # Repo-wide agent guidance
└── .gitignore
```

## Directory Purposes

**`app/`:**
- Purpose: Every page lives here under the App Router
- Contains: `layout.tsx`, `page.tsx`, route folders, optional `_data.ts` colocated (underscore prefix prevents the folder from becoming a route)
- Key files: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

**`app/<segment>/`:**
- Purpose: One URL segment per directory; nested folders extend the path
- Contains: A `page.tsx` (server component by default), optional dynamic `[slug]/page.tsx`, optional `_data.ts`
- Key files: `app/product/_data.ts` is the canonical example of colocated content

**`components/icons/`:**
- Purpose: Hand-rolled SVG icons that need theming (color prop, hover variant)
- Contains: `PairLogo.tsx`, `SocialIcons.tsx` (LinkedIn, Instagram), `DatabaseIcon.tsx`
- Key files: `components/icons/PairLogo.tsx`

**`components/layout/`:**
- Purpose: Persistent site chrome rendered by the root layout
- Contains: `Navbar.tsx` (client, scroll/hover theming + mobile drawer), `Footer.tsx` (server), `Main.tsx` (client, switches background per route), `Container.tsx` (server, centered max-width wrapper)
- Key files: `components/layout/Navbar.tsx`, `components/layout/Container.tsx`

**`components/sections/`:**
- Purpose: Page-level composed blocks. Top-level files are home-page sections; subfolders scope sections to a specific route
- Contains: `HeroSection.tsx`, `LogosSection.tsx`, `TransformSection.tsx`, `TestimonialsSection.tsx`, `AgentOSSection.tsx`, `AgentDataSection.tsx`, `AgentStudioSection.tsx`, `InsightsSection.tsx`, `LifetimeValueSection.tsx`, `TrustSection.tsx`, `CTASection.tsx`, plus `about/` and `product/` subdirectories
- Key files: `components/sections/HeroSection.tsx`, `components/sections/TransformSection.tsx`

**`components/sections/about/`:**
- Purpose: Sections used only by `/about`
- Contains: `AboutHero.tsx`, `MissionLine.tsx`, `ValuesAccordion.tsx`, `CustomerCarousel.tsx`, `OfficesLine.tsx`, `ImageMosaic.tsx`, `CustomerCard.tsx` (about-page variant)

**`components/sections/product/`:**
- Purpose: Sections used by product pages
- Contains: `ProductHero.tsx`, `FeatureBlock.tsx`, `FeatureMedia.tsx` (Rive/video/image dispatcher), `ProductTestimonial.tsx`, `CustomerResults.tsx`, `FinalCTA.tsx`

**`components/ui/`:**
- Purpose: Reusable primitives, animation hosts, and full-page templates
- Contains:
  - Page templates: `PageHero.tsx`, `PageCTA.tsx`, `CustomerStoryPage.tsx`, `IndustryPage.tsx`, `LegalPage.tsx`
  - Cards: `FeatureCard.tsx`, `GradientCard.tsx`, `CustomerCard.tsx`, `TestimonialCard.tsx`, `AgentDisputeCard.tsx`, `AnalyticsInsightCard.tsx`
  - Form: `LearnMoreForm.tsx`, `TextField.tsx`, `IndustrySelect.tsx`
  - Animation hosts: `RiveChannels.tsx`, `RiveEmpowerTeam.tsx`, `RivePayForAJob.tsx`, `RemotionEmpowerTeam.tsx`
  - Effects/utility: `ScrollReveal.tsx`, `Carousel.tsx`, `CollapsibleSearchBar.tsx`, `liquid-glass.tsx`, `liquid-weather-glass.tsx`, `GlassCalendar.tsx`, `ChatBubble.tsx`, `DashboardMockup.tsx`, `PlatformCardMocks.tsx`, `PillButton.tsx`

**`lib/`:**
- Purpose: Shared TypeScript modules (data + helpers). No runtime side effects
- Contains: `constants.ts` (nav, logos, testimonials, footer, trust badges), `about-content.ts` (about-page content tree), `utils.ts` (`cn` helper)

**`remotion/`:**
- Purpose: Remotion compositions registered for the CLI/preview tool, also imported by `components/ui/RemotionEmpowerTeam.tsx` to play in-page
- Contains: `index.ts` (calls `registerRoot`), `Root.tsx` (composition list), `Composition.tsx`, `EmpowerEveryTeam.tsx`
- Notes: Files use plain React (no `"use client"` directive). The Remotion runtime injects its own video config

**`public/`:**
- Purpose: Static assets served from the site root (`/foo.png` -> `public/foo.png`)
- Contains: `.riv` files at the root, image/video assets in subfolders by usage
- Naming: kebab-case for new assets; legacy clips use sentence-case with spaces (`hero/Timeline 1.mp4`)
- Reminder: Per project memory, save SVGs into `public/SVG/` going forward

**`.planning/codebase/`:**
- Purpose: GSD codebase maps consumed by `/gsd-plan-phase` and `/gsd-execute-phase`
- Contains: `ARCHITECTURE.md`, `STRUCTURE.md`, plus other focus-area docs as they are generated

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root HTML shell, fonts, persistent chrome
- `app/page.tsx`: Home route
- `remotion/index.ts`: Remotion CLI entry (`registerRoot`)

**Configuration:**
- `next.config.ts`: Next.js config (image `remotePatterns`)
- `tsconfig.json`: TypeScript strict mode, `@/*` path alias
- `eslint.config.mjs`: Flat config wrapping `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- `postcss.config.mjs`: Tailwind v4 PostCSS plugin
- `components.json`: shadcn/ui config (style: `radix-nova`, RSC, lucide icons, base color `neutral`)
- `app/globals.css`: Tailwind imports + `@theme inline` tokens + custom keyframes

**Core Logic:**
- `app/<segment>/page.tsx`: Per-route composition
- `components/sections/`: Page sections
- `components/ui/`: Reusable building blocks

**Data Modules:**
- `lib/constants.ts`: Site-wide brand/data constants
- `lib/about-content.ts`: About-page content
- `app/product/_data.ts`: Product feature schema and entries

**Testing:**
- Not present. No Jest/Vitest/Playwright config files. The `.playwright-mcp/` folder is gitignored MCP scratch output, not a test suite

## Naming Conventions

**Files:**
- React components: `PascalCase.tsx` (`HeroSection.tsx`, `CustomerStoryPage.tsx`)
- Lower-case primitives: `kebab-case.tsx` for a few legacy/shadcn-style files (`liquid-glass.tsx`, `liquid-weather-glass.tsx`)
- Data and helpers: `kebab-case.ts` (`about-content.ts`) or domain word (`constants.ts`, `utils.ts`)
- Route files: lower-case `page.tsx`, `layout.tsx`, dynamic `[slug]/page.tsx`
- Colocated route data: leading underscore (`_data.ts`) so the folder is not promoted to a route

**Directories:**
- Route segments: kebab-case lower (`learn-more`, `modern-slavery-statement`, `terms-and-conditions`, `travel-transportation-hospitality`)
- Component groups: lower-case nouns (`layout`, `sections`, `ui`, `icons`)
- Asset groups: lower-case nouns mirroring usage (`hero`, `logos`, `trust`, `branding`, `photos/customers`)

**Components:**
- Section components: end with `Section` (`HeroSection`, `TestimonialsSection`, `CTASection`)
- Page templates: end with `Page` (`CustomerStoryPage`, `IndustryPage`, `LegalPage`)
- Animation wrappers: prefixed with engine name (`Rive*`, `Remotion*`)
- Default export per file matches the file name

**Variables and constants:**
- Module-level data constants: SCREAMING_SNAKE_CASE (`NAV_LINKS`, `COMPANY_LOGOS`, `FEATURE_CARDS`, `PRODUCT_FEATURES`, `ABOUT_HERO`)
- Local consts: camelCase

## Where to Add New Code

**New marketing route:**
- Create `app/<segment>/page.tsx` exporting a default React component (server by default)
- Place segment-specific copy in a colocated `_data.ts` if it is non-trivial (mirror `app/product/_data.ts`)
- Add the route to navigation/footer in `lib/constants.ts` (`NAV_LINKS`, `FOOTER_COLUMNS`) if it should be linked

**New customer story:**
- Add `app/customers/<slug>/page.tsx` returning `<CustomerStoryPage … />` (`components/ui/CustomerStoryPage.tsx`)
- Add an entry to the `stories` array in `app/customers/page.tsx`
- Drop assets in `public/photos/customers/<slug>.{jpg,png}` and `public/logos/<slug>.png`
- Update `lib/constants.ts` `COMPANY_LOGOS`/`TESTIMONIALS` if the customer should appear in those lists

**New industry page:**
- Add `app/industries/<slug>/page.tsx` returning `<IndustryPage … />` (`components/ui/IndustryPage.tsx`)

**New product feature page:**
- Add `app/product/<slug>/page.tsx`
- Append a typed entry to `PRODUCT_FEATURES` in `app/product/_data.ts` if the feature should appear on the index
- Add a tile in `app/product/page.tsx` `products` array

**New legal page:**
- Add `app/<segment>/page.tsx` returning `<LegalPage … />` (`components/ui/LegalPage.tsx`) with `sections` array
- Update `LEGAL_LINKS` in `lib/constants.ts` if it should appear in the footer

**New page section:**
- If reusable across pages: add to `components/sections/<Name>Section.tsx`
- If scoped to one page: add under `components/sections/<page>/<Name>.tsx` (mirror `components/sections/about/` and `components/sections/product/`)
- Server component by default; add `"use client"` only if you use hooks, browser APIs, or event handlers

**New reusable UI primitive:**
- Add `components/ui/<Name>.tsx` (PascalCase)
- Use `next/image` for content imagery and `lucide-react` for icons
- Wrap layout in `<Container>` (`components/layout/Container.tsx`) when integrating into pages

**New Rive animation:**
- Drop the `.riv` bundle into `public/<name>.riv` (root or subfolder)
- Add a wrapper at `components/ui/Rive<Name>.tsx` modelled on `components/ui/RiveChannels.tsx`
- If used inside a server section, import via `next/dynamic(..., { ssr: false })` (see `components/sections/TransformSection.tsx:14`); if used from another client component, a static import is fine (see `components/sections/product/FeatureMedia.tsx`)

**New Remotion composition:**
- Add the composition file to `remotion/<Name>.tsx`
- Register it in `remotion/Root.tsx` so the CLI can preview it
- For in-page use, add a wrapper modelled on `components/ui/RemotionEmpowerTeam.tsx` and load it with `next/dynamic(..., { ssr: false })`

**Shared content/data:**
- Site-wide: extend `lib/constants.ts`
- Page-scoped: prefer a colocated `_data.ts` next to the route, or `lib/<page>-content.ts` (mirror `lib/about-content.ts`)

**Shared utilities:**
- Pure helpers go in `lib/utils.ts` (or a new module under `lib/`)

**New static asset:**
- Images: `public/photos/<group>/<file>.{jpg,png}`
- Logos: `public/logos/<brand>.{png,svg}`
- Trust/compliance badges: `public/trust/<name>.{svg,png}`
- Hero clips: `public/hero/<file>.mp4`
- SVG icons (per project memory): `public/SVG/<file>.svg`
- Brand marks: `public/branding/<file>.{png,svg}`
- Reference assets via root-relative path (`/photos/customers/foo.jpg`); `next/image` requires a known width/height or `fill` plus a sized parent

## Special Directories

**`.next/`:**
- Purpose: Next.js build output and dev cache
- Generated: Yes
- Committed: No (gitignored)

**`.vercel/`:**
- Purpose: Vercel project metadata
- Generated: Yes (by `vercel link`)
- Committed: No (gitignored via `.vercelignore` and `.gitignore`)

**`.playwright-mcp/`:**
- Purpose: Scratch directory used by Playwright MCP browser sessions
- Generated: Yes
- Committed: No (gitignored)

**`.planning/`:**
- Purpose: GSD planning artefacts (codebase maps, phase plans)
- Generated: By `/gsd-*` commands
- Committed: Yes (so future agents can read the maps)

**`.claude/`:**
- Purpose: Claude Code project configuration
- Generated: By tooling
- Committed: Yes for shared config; user-specific entries should stay local

**`node_modules/`:**
- Purpose: Installed dependencies
- Generated: Yes (`npm install`)
- Committed: No

**`tsconfig.tsbuildinfo`, `next-env.d.ts`:**
- Purpose: TypeScript build cache and Next.js type ambient
- Generated: Yes
- Committed: No (gitignored)

---

*Structure analysis: 2026-05-08*
