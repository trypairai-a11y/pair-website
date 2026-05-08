# Technology Stack

**Analysis Date:** 2026-05-08

## Languages

**Primary:**
- TypeScript ^5 - All application code under `app/`, `components/`, `lib/`, `remotion/` (`.ts` and `.tsx`)
- TSX (React 19 JSX) - All UI components and route pages

**Secondary:**
- CSS - Single global stylesheet at `app/globals.css` using Tailwind v4 `@import` and `@theme inline` blocks
- MJS (ES modules) - Build/lint configs: `postcss.config.mjs`, `eslint.config.mjs`

## Runtime

**Environment:**
- Node.js (no `.nvmrc` or `.node-version` pinned; local dev observed on Node v25.2.1)
- Next.js App Router with React Server Components enabled (`"rsc": true` in `components.json`)

**Package Manager:**
- npm (lockfile `package-lock.json` v3 present at repo root)
- No `yarn.lock` or `pnpm-lock.yaml`

## Frameworks

**Core:**
- Next.js `16.2.2` - App Router framework. Entry layout at `app/layout.tsx`, routes under `app/*/page.tsx`. **Important:** project README/AGENTS.md flag this as a Next.js version with breaking changes vs older docs; consult `node_modules/next/dist/docs/` before assuming legacy API behavior.
- React `19.2.4` + React DOM `19.2.4` - Hooks-based, Server Components by default, `"use client"` opt-in (e.g. `components/ui/LearnMoreForm.tsx:1`)
- Tailwind CSS `^4` (via `@tailwindcss/postcss` `^4`) - Configured CSS-first through `app/globals.css` (no `tailwind.config.*` file; theme defined inline via `@theme inline`)
- shadcn `^4.2.0` - Component generator using `radix-nova` style. Config at `components.json`, base color `neutral`, generated UI lives in `components/ui/`
- Radix UI `radix-ui` `^1.4.3` - Primitive components consumed by shadcn-generated UI

**Animation / Media:**
- Framer Motion `^12.38.0` and `motion` `^12.38.0` (alias package) - Both present; code imports from both `framer-motion` and `motion/react`
- `tw-animate-css` `^1.4.0` - Imported in `app/globals.css`
- Remotion `^4.0.447` + `@remotion/cli` + `@remotion/player` - Video composition pipeline. Entry `remotion/index.ts`, root `remotion/Root.tsx`, compositions in `remotion/Composition.tsx` and `remotion/EmpowerEveryTeam.tsx`. Player embedded in browser via `components/ui/RemotionEmpowerTeam.tsx`
- `@rive-app/react-canvas` `^4.28.0` - Rive runtime for `.riv` animations. Wrappers: `components/ui/RiveChannels.tsx`, `RiveEmpowerTeam.tsx`, `RivePayForAJob.tsx`. Asset files: `public/channels.riv`, `public/empower-every-team.riv`, `public/pay-for-a-job.riv`

**Testing:**
- None detected - no `jest`, `vitest`, `playwright` (the `.playwright-mcp/` folder is an MCP scratch directory listed in `.gitignore`, not a Playwright test suite), `@testing-library/*`, or test scripts in `package.json`

**Build/Dev:**
- Next.js CLI - `next dev`, `next build`, `next start` (see `package.json:5-9`)
- ESLint `^9` with `eslint-config-next` `16.2.2` - flat config at `eslint.config.mjs` composes `core-web-vitals` + `typescript` rule sets and re-applies default ignores (`.next/**`, `out/**`, `build/**`, `next-env.d.ts`)
- TypeScript compiler in no-emit mode (`"noEmit": true`) for type-check only

## Key Dependencies

**Critical:**
- `next` `16.2.2` - Application framework
- `react` / `react-dom` `19.2.4` - UI runtime
- `tailwindcss` `^4` + `@tailwindcss/postcss` `^4` - Styling pipeline
- `shadcn` `^4.2.0` + `radix-ui` `^1.4.3` - Component foundation
- `remotion` + `@remotion/player` `^4.0.447` - Programmatic video / animated marketing media
- `@rive-app/react-canvas` `^4.28.0` - Interactive vector animation playback

**Utilities:**
- `clsx` `^2.1.1` - Conditional className composition
- `tailwind-merge` `^3.5.0` - Dedupe Tailwind utilities. Combined into the `cn(...)` helper at `lib/utils.ts:4-6`
- `class-variance-authority` `^0.7.1` - Variant prop API for components (shadcn convention)
- `date-fns` `^4.1.0` - Date formatting
- `lucide-react` `^1.8.0` - Icon library (set as shadcn `iconLibrary` in `components.json:13`)

## Configuration

**TypeScript (`tsconfig.json`):**
- Target ES2017, module ESNext, `moduleResolution: bundler`
- `strict: true`, `noEmit: true`, `jsx: react-jsx`, `incremental: true`
- Path alias `@/*` -> `./*` (used everywhere, e.g. `@/lib/utils`, `@/components/ui/...`)
- Includes `**/*.mts`, `next-env.d.ts`, `.next/types/**`, `.next/dev/types/**`
- Next.js TS plugin enabled via `"plugins": [{ "name": "next" }]`

**Next.js (`next.config.ts`):**
- Configures `images.remotePatterns` to allow only `https://cdn.sanity.io`
- No experimental flags, no custom webpack, no rewrites/redirects/headers

**PostCSS (`postcss.config.mjs`):**
- Single plugin: `@tailwindcss/postcss` (Tailwind v4 plugin model)

**shadcn (`components.json`):**
- `style: "radix-nova"`, `rsc: true`, `tsx: true`
- Tailwind: css path `app/globals.css`, baseColor `neutral`, CSS variables on, no prefix
- Aliases: `components -> @/components`, `utils -> @/lib/utils`, `ui -> @/components/ui`, `lib -> @/lib`, `hooks -> @/hooks`
- `iconLibrary: lucide`, `rtl: false`

**ESLint (`eslint.config.mjs`):**
- Flat config (`defineConfig`) extending `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Re-asserts `globalIgnores` for `.next/**`, `out/**`, `build/**`, `next-env.d.ts`

**Environment:**
- No `.env*` files present in repo (`.env*` is in `.gitignore`)
- No `process.env` or `NEXT_PUBLIC_*` reads anywhere in `app/`, `components/`, `lib/`, or `remotion/` - the site does not read runtime configuration from env vars

**Build artifacts:**
- `.next/` (committed-out via `.gitignore`)
- `tsconfig.tsbuildinfo` ignored

## Platform Requirements

**Development:**
- Node.js compatible with Next.js 16 / React 19 (Node 18.18+ per Next 16 requirements; no version pin in repo)
- npm (matches lockfile)

**Production:**
- Vercel - `.vercel/project.json` links the working tree to Vercel project `pair-website` (`projectId: prj_iBWOkhiiaEqPDYZo3cO6L4xn2dkX`, org `team_DnFUretUWpdwZQ4JGa3g13nN`). `.vercelignore` excludes a handful of unused `public/` photo assets from upload. No `vercel.json` is checked in; the build relies on Vercel's default Next.js detection.

---

*Stack analysis: 2026-05-08*
