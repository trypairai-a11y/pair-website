export type Media =
  | { type: "image"; src: string; alt: string; fit?: "cover" | "contain" }
  | { type: "video"; src: string; fit?: "cover" | "contain" }
  | { type: "rive"; key: "channels" | "empowerTeam" | "payForJob" }
  | { type: "text"; text: string };

export type ProductFeature = {
  id: string;
  title: string;
  body: string;
  imageSide: "left" | "right";
  media: Media;
};

export const PRODUCT_FEATURES: ProductFeature[] = [
  {
    id: "voice",
    title: "Voice.",
    body: "Pair answers in your customer's dialect, listens, and solves it on the call. No IVR. No waiting.",
    imageSide: "left",
    media: { type: "video", src: "/product/voice-waveform.mp4", fit: "cover" },
  },
  {
    id: "insights",
    title: "Insights.",
    body: "Ask in plain language. Pair reads every chat, call, and message. Finds the pattern. Runs the experiment. Every conversation makes the next one better.",
    imageSide: "right",
    media: { type: "image", src: "/insights/ask.png", alt: "Insights report asking what made 12,000 customers ask for a real person, with order stuck in customs surfaced as the top reason from 400,000 conversations.", fit: "contain" },
  },
  {
    id: "meet-your-agent",
    title: "Agent.",
    body: "Sounds like a Kuwaiti. Thinks like your best agent. Catches dialect, tone, and the small cues. Always on. Always on brand.",
    imageSide: "left",
    media: {
      type: "image",
      src: "/product/meet-agent-arabic.jpg",
      alt: "A Pair customer asking in Arabic where their order is, holding a tablet with the agent message overlaid.",
      fit: "cover",
    },
  },
  {
    id: "channels",
    title: "Channels.",
    body: "Voice, app, email, WhatsApp, Instagram, ChatGPT. One brain across every channel. Customers never repeat themselves.",
    imageSide: "right",
    media: {
      type: "image",
      src: "/product/conversations-list.png",
      alt: "List of customer conversations across voice, app, email, WhatsApp, Instagram, and ChatGPT channels handled by a single Pair agent.",
      fit: "contain",
    },
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
  largerLogo?: boolean;
};

export const PRODUCT_CUSTOMERS: ProductCustomer[] = [
  {
    slug: "ktech",
    company: "ktech",
    logoSrc: "/logos/ktech.png",
    imageSrc: "/photos/customers/ktech.jpg",
    metricLabel: "Increase in enrolled students",
    metricValue: "41%",
    tagline: "Kadi reaches students faster, making student life easier while streamlining admissions.",
  },
  {
    slug: "flare-fitness",
    company: "Flare Fitness",
    logoSrc: "/logos/flare-fitness-white.png",
    imageSrc: "/photos/customers/flare-fitness.jpg",
    metricLabel: "Member questions answered",
    metricValue: "89%",
    tagline: "Our members stopped asking if Fai was a bot. That is the moment we knew it was actually working.",
    naturalLogo: true,
  },
  {
    slug: "future-kid",
    company: "Future Kid",
    logoSrc: "/logos/future-kid.png",
    imageSrc: "/photos/customers/future-kid.jpg",
    metricLabel: "Customer satisfaction",
    metricValue: "4.9/5",
    tagline: "Parents book birthday parties before they reach the front desk. The whole night runs smoother.",
  },
];
