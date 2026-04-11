ASSET FOLDER STRUCTURE
=====================

public/
└── images/
    ├── branding/         Pair brand assets (logos, icons)
    │                     pair-blue.png, pair-white.png
    │                     pair-icon-blue.png, pair-icon-white.png
    │
    ├── logos/             Customer/partner company logos
    │                     boutiqaat.png, cinescape.png, etc.
    │
    ├── hero/              Hero section assets
    │                     hero-bg.png (poster fallback)
    │                     hero-poster.jpg
    │                     maria.jpg (chat avatar)
    │
    ├── icons/             Inline SVG icons (UI icons)
    │                     arrow-right.svg, check.svg, etc.
    │
    ├── trust/             Compliance and trust badges
    │                     soc2.png, iso27001.png, hipaa.svg, etc.
    │
    ├── insights/          Insights section product images
    │                     agent-memory.png, customer-data.png, etc.
    │
    ├── agent-studio/      Agent Studio product screenshots
    │                     agent-studio.png, agent-sdk.png
    │
    ├── product/           Product UI screenshots and demos
    │                     chat demos, live-assist, dashboards, etc.
    │
    ├── photos/            Photography assets
    │   ├── headshots/     People portraits and headshots
    │   ├── lifestyle/     Lifestyle and stock-style photos
    │   ├── editorial/     Blog, press, and editorial images
    │   ├── stock/         General stock photography
    │   └── sierra/        Sierra-specific brand images
    │
    ├── customers/         Customer brand/product images
    │                     minted-stationery.png, ramp-card.png, etc.
    │
    ├── backgrounds/       Background and decorative images
    │
    └── covers/            Cover images for events, articles


WHERE EACH ASSET IS USED:
========================

1. Pair logos       -> components/icons/PairLogo.tsx
2. Customer logos   -> lib/constants.ts (COMPANY_LOGOS, TESTIMONIALS)
                    -> app/customers/ pages
3. Hero assets      -> components/sections/HeroSection.tsx
4. Trust badges     -> components/sections/TrustSection.tsx
5. Insights images  -> components/sections/InsightsSection.tsx
6. Agent Studio     -> components/sections/AgentStudioSection.tsx
7. Pair icon        -> components/sections/HeroSection.tsx (chat bubbles)
                    -> components/sections/TransformSection.tsx
