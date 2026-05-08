# Coding Conventions

**Analysis Date:** 2026-05-08

## Naming Patterns

**Files:**
- Components: PascalCase `.tsx` matching the default export name (`HeroSection.tsx`, `PillButton.tsx`, `LearnMoreForm.tsx`).
- Pages: Lowercase `page.tsx` inside route directories per Next.js App Router (`app/learn-more/page.tsx`, `app/blog/[slug]/page.tsx`).
- Layouts: Lowercase `layout.tsx` (`app/layout.tsx`).
- Lib / data modules: kebab-case `.ts` (`lib/about-content.ts`, `lib/constants.ts`, `lib/utils.ts`).
- Route-private data files: prefixed with underscore (`app/product/_data.ts`).
- Two outliers in `components/ui/` use kebab-case (`liquid-glass.tsx`, `liquid-weather-glass.tsx`); everything else is PascalCase. Match the surrounding directory style when adding new files — prefer PascalCase for new components.

**Directories:**
- App routes: kebab-case (`app/learn-more/`, `app/modern-slavery-statement/`, `app/customers/flare-fitness/`).
- Dynamic routes: bracketed (`app/blog/[slug]/`).
- Component groups: lowercase plural (`components/ui/`, `components/sections/`, `components/layout/`, `components/icons/`).
- Sub-section groupings under `components/sections/`: lowercase singular matching the route they belong to (`components/sections/about/`, `components/sections/product/`).

**Functions / variables:**
- Components and hooks: PascalCase / `useFoo` (`function HeroSection()`, no custom hooks defined yet outside of section/page components).
- Internal helper components inside a file: PascalCase (`GlassBubble`, `UserBubble`, `AgentBubble` inside `components/sections/HeroSection.tsx`).
- Local helper functions: camelCase (`isArabic`, `arabicFont` in `components/sections/HeroSection.tsx`; `toggle` in `components/sections/about/ValuesAccordion.tsx`).
- Module-level constants: SCREAMING_SNAKE_CASE (`HERO_ITEMS`, `CROSSFADE_MS`, `SCENARIO_STAGGER_SECONDS`, `BUBBLES_PER_SCENARIO`, `LIGHT_BG_ROUTES`, `ALWAYS_DARK_ROUTES`, `NAV_LINKS`, `COMPANY_LOGOS`, `FEATURE_CARDS`, `TESTIMONIALS`, `BULLETS`, `INDUSTRIES`, `FIELDS`).
- Numeric layout tunables: SCREAMING_SNAKE_CASE with inline unit comment (`const GAP = 16; // mx-2 per side` in `components/sections/AgentDataSection.tsx`).

**Types:**
- Type aliases: PascalCase (`type Variant`, `type Size`, `type Props`, `type CustomerCardProps`, `type BubbleSlot`, `type AmbientBubble`, `export type PlatformCard`, `export type ProductFeature`, `export type ValueItem`).
- Interfaces: PascalCase (`interface ButtonConfig`, `interface GlassEffectProps`).
- Mixed `type` and `interface` are used; `type` is the more common idiom. Prefer `type` for new prop and data shapes; reserve `interface` for shapes that may be extended (see `interface GlassCalendarProps extends React.HTMLAttributes<HTMLDivElement>` in `components/ui/GlassCalendar.tsx`).
- Literal-string unions for variants: `type Variant = "primary" | "secondary" | "ghost"` in `components/ui/PillButton.tsx`.
- `as const` is used to derive a string-literal union from an array (`const FIELDS = [...] as const; type FieldName = (typeof FIELDS)[number]` in `components/ui/LearnMoreForm.tsx`).

## Code Style

**Formatting:**
- No Prettier config and no `format` script in `package.json`; formatting is hand-maintained. Match the surrounding file's style (indent width, quote style, trailing commas).
- Indentation: 2 spaces.
- Quotes: double quotes for both JSX attributes and TypeScript strings (single quotes appear only in `components/ui/liquid-weather-glass.tsx`).
- Semicolons: required at end of statements.
- Trailing commas in multi-line object/array literals are common and expected.
- Long Tailwind class strings are written on one line; conditional class assembly uses template literals or `[ ... ].join(" ")` (see `components/sections/about/ValuesAccordion.tsx`).

**Linting:**
- Tool: ESLint 9 with flat config (`eslint.config.mjs`).
- Configs extended: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- Default Next.js ignores (`.next/**`, `out/**`, `build/**`, `next-env.d.ts`) are re-applied via `globalIgnores`.
- Run with `npm run lint` (defined in `package.json` as `"lint": "eslint"`).
- No project-specific overrides on top of `eslint-config-next`. Stick to its defaults.

**TypeScript (`tsconfig.json`):**
- `strict: true` — no `any` without an explicit annotation. The single existing `any` is in `components/ui/liquid-weather-glass.tsx:40` (`closest: (arg0: string) => any`); do not add more.
- `target: ES2017`, `module: esnext`, `moduleResolution: bundler`, `jsx: react-jsx`.
- Path alias: `"@/*": ["./*"]` — import everything via `@/components/...`, `@/lib/...`, `@/app/...`.
- `noEmit: true` — TypeScript only type-checks; Next.js compiles.

## Import Organization

**Order:** there is no enforced ordering tool, but the de facto pattern across files is:
1. React / Next.js built-ins (`import type { Metadata } from "next"`, `import { useRef, useEffect, useState } from "react"`, `import Image from "next/image"`, `import Link from "next/link"`, `import dynamic from "next/dynamic"`, `import { usePathname } from "next/navigation"`).
2. Third-party packages (`lucide-react`, `framer-motion`, `motion/react`, `clsx`, `tailwind-merge`, `@remotion/player`).
3. Internal modules via `@/` alias, grouped by layer: `@/components/layout/...`, `@/components/ui/...`, `@/components/sections/...`, `@/components/icons/...`, `@/lib/...`.
4. Relative imports last (e.g., sibling components inside a section subdirectory: `import CustomerCard from "./CustomerCard"` in `components/sections/about/CustomerCarousel.tsx`).

**Path Aliases:**
- `@/*` → repo root. All non-relative internal imports use this. 75 files import via `@/`.
- Examples: `import Container from "@/components/layout/Container"`, `import { TESTIMONIALS } from "@/lib/constants"`, `import { cn } from "@/lib/utils"`.

**`shadcn` aliases (`components.json`):** `components → @/components`, `utils → @/lib/utils`, `ui → @/components/ui`, `lib → @/lib`, `hooks → @/hooks`. Use these when adding shadcn-generated code.

## Component Patterns

**Default export per file:**
- Exactly one default-exported component per file (93 default-exported functions across the source tree). Helper components and types live in the same file as the consumer that uses them (e.g., `GlassBubble`, `UserBubble`, `AgentBubble`, `ConfirmBubble`, `PickerBubble` are all colocated in `components/sections/HeroSection.tsx`).
- Co-located content data is also common (constants array at the top of `components/sections/HeroSection.tsx`, `components/layout/Navbar.tsx`, `app/page.tsx`, `app/blog/[slug]/page.tsx`). Promote to `lib/` only when data is shared across more than one file (see `lib/constants.ts`, `lib/about-content.ts`).

**Props typing:**
- Inline object type as the parameter annotation is the dominant style. Example from `components/layout/Container.tsx`:
  ```tsx
  export default function Container({
    children,
    className = "",
    narrow = false,
  }: {
    children: React.ReactNode;
    className?: string;
    narrow?: boolean;
  }) { ... }
  ```
- For richer prop sets, define a named `type` above the component (`type Props = { ... }` in `components/ui/PillButton.tsx`; `type CustomerCardProps = { ... }` in `components/ui/CustomerCard.tsx`).
- Default values are set in the destructuring signature, not via `defaultProps`.
- `Readonly<{ children: React.ReactNode }>` is used in `app/layout.tsx` for the Next.js root layout — keep this exact pattern for layouts.

**Server vs client components:**
- Server-by-default. Add `"use client";` as the first line of the file only when the component uses `useState`, `useEffect`, `useRef`, `useId`, browser APIs (`window`, `document`, `IntersectionObserver`), event handlers on stateful elements, or `usePathname`. 31 files currently declare `"use client"`.
- Pages with server-only content (`app/about/page.tsx`, `app/product/page.tsx`, `app/learn-more/page.tsx`, `app/page.tsx`) stay server components and delegate interactivity to small client islands (`Navbar`, `LearnMoreForm`, `ScrollReveal`, `ValuesAccordion`, etc.).
- Client-only third-party components are loaded with `next/dynamic` and `ssr: false`. Examples: `components/sections/TransformSection.tsx` dynamically imports `RiveChannels`, `RivePayForAJob`, `RemotionEmpowerTeam`; `components/sections/AgentStudioSection.tsx` dynamically imports `@remotion/player`.

**Variant-driven UI:**
- Pattern in `components/ui/PillButton.tsx`: define `Variant` and `Size` literal unions, build lookup maps (`variantClass: Record<Variant, string>`, `sizeClass: Record<Size, string>`), and concatenate into the final className. Replicate this when adding new variant-based components rather than ad-hoc conditionals.

**Composition hooks:**
- Compound state is held in plain `useState` and refs; no Context API for app-wide state.
- One small per-section context exists for cross-component DOM coordination: `HeroCardRefContext` in `components/sections/TransformSection.tsx`. Use the same pattern when child components need to read a parent's `ref` for visual effects (e.g., the bubble + hero canvas blur tracking).

## Tailwind Class Conventions

- Tailwind v4 with `@tailwindcss/postcss` (`postcss.config.mjs`). Theme tokens are declared in `app/globals.css` inside `@theme inline` (see `--color-sierra-green`, `--color-pair-blue`, `--font-sans`, `--radius-card`).
- Project-defined utilities live in `app/globals.css`: `.bg-glass`, `.card-glass`, `.glass-border`, `.border-glass-2xl`, `.scrollbar-hide`, `.py-section`, `.pb-section`, `.pt-section-lg`, `.agent-os-layer-{1,2,3}`. Reuse these utility classes instead of repeating the underlying styles.
- Brand color tokens (always prefer over raw hex):
  - `text-sierra-text-dark`, `text-sierra-text`, `text-sierra-gray` for body/foreground.
  - `bg-sierra-green`, `bg-sierra-green-light`, `bg-sierra-green-dark` (these resolve to blue values; the `sierra-green` name is a legacy of the original Sierra style and is the project-wide brand accent).
  - `bg-pair-blue`, `bg-pair-blue-dark`, `bg-pair-pearl`, `bg-pair-light`.
  - `border-sierra-divider`, `bg-sierra-bg` for surfaces.
- Raw hex (`#4d98e2`, `#f6f5f3`) appears in some inline styles — prefer the named token in new code.
- Arbitrary values are used for typography and spacing where the design demands precision: `text-[14px]`, `leading-[1.15]`, `min-h-[560px]`, `max-w-[1160px]`. This is intentional; do not invent a custom step in the theme to replace one-off values.
- Class string assembly:
  - Simple cases: template literals in JSX (`` className={`flex items-center ${active ? "text-white" : "text-sierra-gray"}`} ``).
  - Complex cases: `cn()` from `lib/utils.ts` (`twMerge(clsx(inputs))`) — used in `app/layout.tsx`. Use `cn()` whenever caller-supplied `className` could conflict with internal classes.
  - Multi-line lists: `[ "rounded-2xl", "motion-safe:transition-...", open ? "..." : "..." ].join(" ")` (see `components/sections/about/ValuesAccordion.tsx`).
- Responsive prefixes ascend in order in the class string: `text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]`. Always write classes in `base → sm → md → lg → xl → 2xl` order.
- Motion-safe variants: use `motion-safe:transition-...` for animations that should respect `prefers-reduced-motion`. Reduced-motion overrides also exist in CSS (`@media (prefers-reduced-motion: reduce)` in `app/globals.css`).
- Group hover and peer states are common (`group`, `group-hover:`, `lg:group-hover:`) — wrap the parent with `group` and target children explicitly.

## Error Handling

- No try/catch other than two defensive blocks in `components/sections/HeroSection.tsx` around `video.currentTime = 0` and `video.play()` (the `play()` Promise rejection is silenced with `.catch(() => {})` and the `currentTime` set is guarded by an empty `try {} catch {}`). This is intentional — DOM/video APIs throw under benign conditions and the recovery is to do nothing.
- Forms render their own validation messages instead of throwing. See `components/ui/TextField.tsx` (`onInvalid` handler reads `el.validity` and renders an inline `<p>` error) and `components/ui/LearnMoreForm.tsx` (computes `isValid` from the values map to gate the submit button).
- No global error boundary or `app/error.tsx` exists. If you add server-side data fetching that can fail, introduce `app/error.tsx` and `app/not-found.tsx` in the affected route segment per Next.js App Router conventions.

## Logging

- No logging framework. There are zero `console.log` / `console.warn` / `console.error` calls in `app/`, `components/`, or `lib/`.
- Do not add `console.*` calls to production code. If you need diagnostics during development, remove them before committing.

## Comments

**When to comment:**
- Explain the *why*, not the *what*. Examples worth modeling:
  - `// One video element per item — never swap src, so the browser never shows a black "loading" frame mid-cycle.` (`components/sections/HeroSection.tsx`)
  - `// Capture blurred video frames into a hidden canvas, then use the data URL as the bubble's blurred backdrop. <video> elements are composited on a separate GPU layer, so CSS backdrop-filter can't see them — this is the reliable cross-browser way to make the bubble follow the video.` (`components/sections/HeroSection.tsx`)
  - `// mx-2 per side = 16px gap between cards` (`components/sections/AgentDataSection.tsx`).
- Use banner comments (`/* --- ... --- */` or `// ─── ... ─── `) to separate large sections of a long file (see `components/sections/HeroSection.tsx`, `components/sections/TransformSection.tsx`).
- Animation/CSS keyframes in `app/globals.css` carry timing-table comments — keep this style when adding new keyframes.

**JSDoc / TSDoc:**
- Not used anywhere. Don't add JSDoc unless the project starts publishing types.

## Function Design

- Components are typically 30-150 lines; large interactive sections (`HeroSection.tsx`, `TransformSection.tsx`, `AgentDataSection.tsx`) run 300-1000 lines and concentrate complexity in a single file rather than splitting across many files. This is intentional for animation-heavy sections; do not gratuitously split them.
- Pure helpers (e.g., `isArabic`, `arabicFont` in `HeroSection.tsx`) are one-liners declared at module scope above the component.
- Event handlers wrapped in `useCallback` whenever they're added/removed as DOM listeners or passed to memoized children (see `components/sections/AgentDataSection.tsx` — `onMouseMove`, `onMouseUp`, `onTouchMove`, `onTouchEnd`).

## Module Design

**Exports:**
- Components: single `export default function ...` per file.
- Data / types: named exports from `lib/constants.ts`, `lib/about-content.ts`, `app/product/_data.ts`.
- Utilities: named export (`export function cn(...)` in `lib/utils.ts`).

**Barrel files:**
- None. Import directly from the source file (`import { cn } from "@/lib/utils"`, not from `@/lib`). Do not introduce `index.ts` barrels — they break Next.js tree-shaking signals and are not used anywhere in this project.

## Links and Images

**Links:**
- Bare `<a href="...">` is the dominant pattern for internal navigation across `app/` and `components/`. Only `components/ui/PillButton.tsx` uses `next/link`, and it switches to a bare `<a>` when the href is `http*` or `#`. New code should follow the surrounding file's choice rather than convert. If you need prefetch behavior or are working inside a button-style primitive, use `next/link`; otherwise an `<a>` is fine.
- External links always set `target="_blank"` and `rel="noopener noreferrer"` (see `components/layout/Footer.tsx` and `components/ui/PillButton.tsx`).

**Images:**
- 16 files import `next/image` and use `<Image />` with explicit `width`/`height` or `fill` + `sizes`. This is the default — use `<Image />` for any static asset under `public/`.
- Three files use a bare `<img>` tag (`components/sections/HeroSection.tsx`, `components/sections/TransformSection.tsx`, others). These are inside heavy animation contexts where `next/image`'s wrapper interferes with positioning. Only fall back to `<img>` when you have a concrete reason and document it inline.
- For images served from a CMS, configure `next.config.ts` `images.remotePatterns` (currently allows `cdn.sanity.io`).

## Accessibility

- ARIA attributes appear in 16 files. Common patterns:
  - `aria-label` on icon-only buttons (`components/layout/Footer.tsx`, `components/layout/Navbar.tsx`, `components/ui/GradientCard.tsx`).
  - `aria-hidden="true"` on decorative icons / spans (`components/sections/about/ValuesAccordion.tsx`, `components/sections/AgentOSSection.tsx`).
  - `aria-expanded` / `aria-controls` on accordion buttons (`components/sections/about/ValuesAccordion.tsx`).
  - `role="group"` + `aria-roledescription="slide"` + `aria-label="N of M"` on carousel slides (`components/sections/AgentDataSection.tsx`, `components/sections/about/CustomerCarousel.tsx`).
  - `aria-live="polite"` on dynamic carousel containers.
- Focus styles are explicit: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pair-blue` (`ValuesAccordion.tsx`) or `focus-visible:outline-sierra-green` (`PillButton.tsx`).
- Decorative SVGs must include `role="img"` + `aria-label` when meaningful, or `aria-hidden` when purely visual (`components/icons/PairLogo.tsx`).

---

*Convention analysis: 2026-05-08*
