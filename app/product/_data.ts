export type Media =
  | { type: "image"; src: string; alt: string; fit?: "cover" | "contain" }
  | { type: "video"; src: string; fit?: "cover" | "contain" }
  | { type: "rive"; key: "channels" | "empowerTeam" | "payForJob" }
  | { type: "trust" }
  | { type: "text"; text: string };

export type ProductFeature = {
  id: string;
  eyebrow?: string;
  title: string;
  body: string;
  imageSide: "left" | "right";
  bgTone: "white" | "tinted";
  media: Media;
};

export const PRODUCT_FEATURES: ProductFeature[] = [
  {
    id: "channels",
    eyebrow: "One brain",
    title: "One agent. Every channel.",
    body: "Voice, app, email, WhatsApp, ChatGPT. Pair runs on one brain across every channel, so customers never have to explain themselves twice.",
    imageSide: "left",
    bgTone: "tinted",
    media: { type: "rive", key: "channels" },
  },
  {
    id: "empower-team",
    eyebrow: "Pair with people",
    title: "AI up front. Humans where it matters.",
    body: "Pair handles the questions your team has answered a thousand times so they can focus on the conversations that actually need a human.",
    imageSide: "right",
    bgTone: "white",
    media: { type: "rive", key: "empowerTeam" },
  },
  {
    id: "outcome-pricing",
    eyebrow: "Outcome pricing",
    title: "Pay for results, not promises.",
    body: "You only pay when Pair resolves an issue end to end, so every invoice is proof of work the agent actually delivered.",
    imageSide: "left",
    bgTone: "tinted",
    media: { type: "rive", key: "payForJob" },
  },
  {
    id: "voice",
    eyebrow: "Voice",
    title: "Real conversation, not menu trees.",
    body: "Pair Voice listens, interrupts politely, and resolves the call in natural language. No press 1 for billing.",
    imageSide: "right",
    bgTone: "white",
    media: { type: "video", src: "/product/voice-waveform.mp4", fit: "cover" },
  },
  {
    id: "trust",
    eyebrow: "Trust and reliability",
    title: "Built for the audits you have to pass.",
    body: "SOC 2, ISO 27001, ISO 42001, HIPAA, GDPR, and the EU AI Act. The certifications your security team wants to see, before they ask.",
    imageSide: "left",
    bgTone: "tinted",
    media: { type: "trust" },
  },
];

export type ProductCustomer = {
  slug: string;
  company: string;
  logoSrc?: string;
  imageSrc: string;
  metricLabel: string;
  metricValue: string;
  tagline: string;
  naturalLogo?: boolean;
  hideLogo?: boolean;
};

export const PRODUCT_CUSTOMERS: ProductCustomer[] = [
  {
    slug: "ktech",
    company: "ktech",
    logoSrc: "/logos/ktech.png",
    imageSrc: "/photos/customers/ktech.jpg",
    metricLabel: "Admissions handled by Kadi",
    metricValue: "72%",
    tagline: "Kadi reaches students faster, making student life easier, while streamlining the admission and enrollment process.",
    naturalLogo: true,
  },
  {
    slug: "flare-fitness",
    company: "Flare Fitness",
    logoSrc: "/logos/flare-fitness-white.png",
    imageSrc: "/photos/customers/flare-fitness.png",
    metricLabel: "Member questions resolved",
    metricValue: "94%",
    tagline: "Our members stopped asking if Fai was a bot. That is the moment we knew it was actually working.",
    naturalLogo: true,
  },
];
