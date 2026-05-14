import type { Metadata } from "next";

export const SITE_URL = "https://pair.com";
export const SITE_NAME = "Pair";
export const SITE_TAGLINE = "Better customer experiences";
export const SITE_DESCRIPTION =
  "Better customer experiences. Built on Pair. Deploy AI agents that deliver personalized, empathetic customer experiences across every channel.";

export function pageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  };
}

export const NAV_LINKS = [
  { label: "Product", href: "/product", hasDropdown: false },
  { label: "Customers", href: "/customers", hasDropdown: false },
  { label: "Company", href: "/about", hasDropdown: false },
];

export const COMPANY_LOGOS = [
  // Top row
  { name: "Boutiqaat",          src: "/logos/boutiqaat.png",     imgClassName: "h-28 w-[200px]", opacityClass: "lg:opacity-50 lg:group-hover:opacity-100" },
  { name: "ktech",              src: "/logos/ktech.png",         imgClassName: "h-20 w-[164px]" },
  { name: "Provin",             src: "/logos/provin.png",        imgClassName: "h-20 w-[164px]" },
  // Middle
  { name: "CCK",                src: "/logos/cck.png",           imgClassName: "h-20 w-[164px]" },
  { name: "Cinescape",          src: "/logos/cinescape.png",     imgClassName: "h-5 w-[174px]" },
  { name: "Macro",              src: "/logos/macro.png",         imgClassName: "h-24 w-[182px] lg:brightness-75 lg:group-hover:brightness-100", opacityClass: "opacity-100" },
  { name: "Flash",              src: "/logos/flash.png",         imgClassName: "h-20 w-[164px]" },
  // Bottom rows
  { name: "The Burrow",         src: "/logos/the-burrow.png",    imgClassName: "h-24 w-[120px]", opacityClass: "lg:opacity-40 lg:group-hover:opacity-100" },
  { name: "Portarage",          src: "/logos/portarage.png",     imgClassName: "h-24 w-[200px]" },
  { name: "Yiswa",              src: "/logos/yiswa.png",         imgClassName: "h-20 w-[164px]" },
  { name: "Flare Fitness",      src: "/logos/flare-fitness.png", imgClassName: "h-16 w-[180px]" },
  { name: "Future Kid",         src: "/logos/future-kid.png",    imgClassName: "h-16 w-16" },
];

export const FEATURE_CARDS = [
  {
    title: "Known, not numbered.",
    description:
      "The best service never makes a customer explain twice, because you already know who they are.",
    gradient:
      "linear-gradient(130deg, rgb(42, 95, 74) 0%, rgb(26, 62, 48) 100%)",
  },
  {
    title: "AI up front. Humans where it matters.",
    description:
      "Your team stops answering the same question for the 100th time. Pair does that. They do the hard stuff.",
    gradient:
      "linear-gradient(180deg, #6ab8e8 0%, #4a96d4 45%, #2a6bbf 100%)",
  },
  {
    title: "One agent. Every channel.",
    description:
      "Voice, app, email, WhatsApp, ChatGPT, all one brain, so customers never explain twice.",
    gradient:
      "linear-gradient(130deg, rgb(156, 125, 145) 0%, rgb(181, 69, 101) 100%)",
  },
  {
    title: "Results, not promises.",
    description:
      "You only pay when Pair resolves an issue, so every invoice is proof of work delivered.",
    gradient:
      "linear-gradient(130deg, rgb(194, 103, 77) 0%, rgb(162, 70, 45) 100%)",
  },
];

export const TESTIMONIALS = [
  {
    company: "Boutiqaat",
    logoSrc: "/logos/boutiqaat.png",
    logoClassName: "h-[72px] lg:h-[80px] xl:h-[88px] w-auto max-w-[260px] lg:max-w-[290px] xl:max-w-[320px] object-contain",
    quote: [
      "Pair has been a reliable technology partner for our team.",
      "We value their professionalism and ongoing collaboration.",
    ],
    name: "Abdullah Aljulaibi",
    title: "Co-Founder & Chief Executive Officer",
  },
  {
    company: "Cinescape",
    logoSrc: "/logos/cinescape.png",
    logoClassName: "h-5 w-auto object-contain",
    logoContainerClassName: "mb-3 mt-4 flex items-center justify-center min-h-[48px]",
    quote: [
      "Pair has been a valuable partner across our operations,",
      "professional, consistent, and easy to collaborate with.",
    ],
    name: "Nasser Bader Al Rowdan",
    title: "Chief Executive Officer",
  },
  {
    company: "Flare Fitness",
    logoSrc: "/logos/flare-fitness.png",
    logoClassName: "h-14 lg:h-16 xl:h-[72px] w-auto object-contain",
    logoContainerClassName: "mb-6",
    quote: [
      "Our members stopped asking if Fai was a bot.",
      "That is the moment we knew it was actually working.",
    ],
    name: "Yousef Alshaea",
    title: "",
  },
  {
    company: "ktech",
    logoSrc: "/logos/ktech.png",
    logoContainerClassName: "mb-4",
    quote: [
      "Kadi reaches students faster, making student life easier,",
      "while streamlining the admission and enrollment process.",
    ],
    name: "Abdelwahab Boodai",
    title: "",
  },
];

export const AGENT_DATA_CARDS = [
  {
    title: "Agent memory",
    description:
      "Personalize experiences for each customer based on real-time context from conversation history.",
  },
  {
    title: "Customer data",
    description:
      "Integrate structured data from  systems of record and existing data warehouses.",
  },
  {
    title: "Recommendations",
    description:
      'Configure strategies, audiences, and available "inventory" to power your agent\'s decisioning engine.',
  },
  {
    title: "Proactive engagement",
    description:
      "Respond to real-world signals by triggering next best action workflows across any channel.",
  },
];

export const INSIGHTS_CARDS = [
  {
    title: "Explorer",
    description:
      "Analyze agent performance with ChatGPT-style Deep Research for conversations.",
  },
  {
    title: "Monitors",
    description:
      "Identify conversations needing extra attention proactively.",
  },
  {
    title: "Experiments",
    description:
      "Run multivariate tests to optimize conversation design and agent performance.",
  },
  {
    title: "Observability",
    description:
      "Understand every agent action - from tool calls, knowledge lookups, latency and more.",
  },
];

export const TRUST_BADGES = [
  { name: "SOC 2", abbreviation: "SOC 2" },
  { name: "ISO 27001", abbreviation: "ISO 27001" },
  { name: "ISO 42001", abbreviation: "ISO 42001" },
  { name: "HIPAA", abbreviation: "HIPAA" },
  { name: "GDPR", abbreviation: "GDPR" },
  { name: "EU AI Act", abbreviation: "EU AI Act" },
  { name: "STAR Level One", abbreviation: "STAR" },
];

export const FOOTER_COLUMNS = [
  { heading: "Product", href: "/product" },
  { heading: "Customers", href: "/customers" },
  { heading: "Company", href: "/about" },
];

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];
