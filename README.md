# Pair Website

Marketing site for Pair — AI agents that deliver personalized, empathetic customer experiences across every channel.

Built with Next.js 16 (App Router, Turbopack), React 19, TypeScript 5, Tailwind CSS 4, Framer Motion, Remotion, and Rive.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Run the development server with hot reload |
| `npm run build` | Build the production bundle (45+ static routes) |
| `npm start` | Start the production server (after `build`) |
| `npm run lint` | Run ESLint across the project |

## Project layout

```
app/                      # Next.js App Router
  layout.tsx              # Root layout: fonts, site metadata, navbar, footer
  page.tsx                # Home
  robots.ts               # Generates robots.txt
  sitemap.ts              # Generates sitemap.xml
  opengraph-image.tsx     # Programmatic OG image (1200x630)
  twitter-image.tsx       # Twitter card image
  about/                  # /about
  blog/                   # /blog and /blog/[slug]
  customers/              # /customers and 10 customer stories
  industries/             # /industries and 6 industry pages
  product/                # /product and 8 product surfaces
  privacy-policy/         # legal
  terms-and-conditions/
  modern-slavery-statement/
  careers/                # unlinked from main nav (direct link only)
  events/
  learn-more/
  resources/
  demo/                   # noindex; visual experiments
components/
  layout/                 # Navbar, Footer, Container, Main
  sections/               # Page-level section components (HeroSection, etc.)
    about/                # /about page sections
    product/              # /product page sections
  ui/                     # Reusable UI primitives (PageHero, PageCTA, etc.)
  icons/                  # PairLogo, SocialIcons
lib/
  constants.ts            # Site-wide content: nav, logos, testimonials, SEO constants
  about-content.ts        # Content for the /about page (mission, values, team)
  utils.ts                # cn() class composition helper
public/
  branding/               # Pair brand assets
  hero/                   # Hero videos (mp4)
  logos/                  # Customer logos
  photos/                 # Customer & lifestyle photography
  insights/, product/, agent-studio/, trust/  # Product imagery
  *.riv                   # Rive animation files
remotion/                 # Remotion compositions (used inside the home page)
```

## Stack notes

- **Next.js 16** with the App Router and Turbopack. All pages are statically prerendered (`○ Static`) except `/blog/[slug]` which uses `generateStaticParams`.
- **React 19** with `useSyncExternalStore`-based hooks for media queries.
- **Tailwind CSS 4** with `tw-animate-css` and `shadcn/tailwind.css` imported in `app/globals.css`.
- **Fonts** are loaded via `next/font/google` (`Inter` for Latin, `Almarai` for Arabic). No custom font files are shipped.
- **Animations**: Framer Motion for component animations; Rive (`*.riv` files in `public/`) and Remotion for richer set-piece animations on the home page.
- **Internal links**: always use `next/link` `<Link>` (lint enforces). External and `mailto:` links use `<a>`.
- **Images**: always use `next/image` `<Image>` (lint enforces).

## SEO

- Site-wide metadata in `app/layout.tsx` (title template, OG, Twitter, robots).
- Per-route metadata exported from each `page.tsx` (or via segment `layout.tsx` for client pages).
- `app/robots.ts` and `app/sitemap.ts` generate `/robots.txt` and `/sitemap.xml` at build time.
- Programmatic OG image in `app/opengraph-image.tsx` (rendered to a 1200×630 PNG by `next/og`).
- Set the production canonical URL in `lib/constants.ts` (`SITE_URL`). Currently `https://pair.com`.

## Deployment

The site is configured for Vercel and deploys as a fully static build. There are no environment variables, no databases, and no runtime APIs.

## Conventions

- Don't use em dashes anywhere in copy or code (use hyphens or rewrite).
- Save SVGs to `public/SVG/` if added in the future.
- Prefer editing `lib/constants.ts` over hardcoding repeated content.
- Pages: `metadata: Metadata` export per leaf `page.tsx`. For `"use client"` pages, add a sibling `layout.tsx` exporting metadata.
- Run `npm run lint` and `npm run build` before pushing.

## License

Proprietary. (c) Pair Technologies, Inc.
