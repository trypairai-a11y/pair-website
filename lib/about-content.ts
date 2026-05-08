import type { LucideIcon } from "lucide-react";
import { Heart, Shield, Sparkles, Zap, Users } from "lucide-react";

export const ABOUT_HERO = {
  title: "Building the future of\ncustomer experience.",
  subtitle: "About Pair.",
  image: {
    src: "/photos/lifestyle/COVER.png",
    alt: "Pair",
    objectPosition: "50% 50%",
  },
};

export const MISSION = {
  headline: "Pair is on a mission to make every customer interaction feel known, not numbered.",
  body: "We help businesses build, deploy, and trust AI agents that work alongside human teams across every channel. Voice, chat, email, app, the same brain across all of them.",
};

export type ValueItem = {
  icon: LucideIcon;
  label: string;
  body: string;
};

export const VALUES: ValueItem[] = [
  {
    icon: Heart,
    label: "Customer obsession",
    body: "Everything we build starts with the customer experience. We measure our success by our customers' success, not our own.",
  },
  {
    icon: Shield,
    label: "Trust first",
    body: "Security, compliance, and responsible AI aren't features. They're foundations. We earn trust through transparency at every layer.",
  },
  {
    icon: Sparkles,
    label: "Relentless improvement",
    body: "We use AI to improve our AI. Every conversation is an opportunity to learn, iterate, and deliver more value to the people we serve.",
  },
  {
    icon: Zap,
    label: "Pace",
    body: "We move fast because our customers can't wait. Every week we ship something that makes their agents smarter, kinder, or faster.",
  },
  {
    icon: Users,
    label: "Pair as a team",
    body: "We pair hard problems with sharp minds. We hire the best people in the industry, then trust them to do the work that matters.",
  },
];

export type CustomerCardData = {
  href: string;
  company: string;
  logoSrc: string;
  logoHoverSrc?: string;
  logoAlt: string;
  logoClass?: string;
  imageSrc: string;
  imageAlt: string;
  quote: string;
  authorName: string;
  authorTitle: string;
};

export const CUSTOMERS: CustomerCardData[] = [
  {
    href: "/customers",
    company: "ktech",
    logoSrc: "/logos/ktech.png",
    logoAlt: "ktech logo",
    logoClass: "max-h-20 md:max-h-24 -mt-1 md:-mt-2",
    imageSrc: "/photos/customers/ktech.jpg",
    imageAlt: "A ktech engineer at work",
    quote: "Kadi reaches students faster, making student life easier, while streamlining the admission and enrollment process.",
    authorName: "Abdelwahab Boodai",
    authorTitle: "",
  },
  {
    href: "/customers",
    company: "Flare Fitness",
    logoSrc: "/logos/flare-fitness.png",
    logoHoverSrc: "/logos/flare-fitness-white.png",
    logoAlt: "Flare Fitness logo",
    imageSrc: "/photos/customers/flare-fitness.png",
    imageAlt: "A Flare Fitness member training",
    quote: "Our members stopped asking if Fai was a bot. That is the moment we knew it was actually working.",
    authorName: "Yousef Alshaea",
    authorTitle: "",
  },
  {
    href: "/customers",
    company: "Future Kid",
    logoSrc: "/logos/future-kid.png",
    logoAlt: "Future Kid logo",
    logoClass: "max-h-14 md:max-h-16",
    imageSrc: "/photos/customers/future-kid.png",
    imageAlt: "A child playing at Future Kid",
    quote: "Parents book birthday parties before they reach the front desk. The whole night runs smoother.",
    authorName: "Sarah Alkhaled",
    authorTitle: "",
  },
];

export const OFFICES: {
  headline: string;
  bodyPrefix: string;
  cities: { label: string; lead?: boolean }[];
  bodyMiddle: string;
  remote: { label: string }[];
  bodySuffix: string;
} = {
  headline: "Where we work",
  bodyPrefix: "Based in ",
  cities: [
    { label: "Kuwait City", lead: true },
  ],
  bodyMiddle: "",
  remote: [],
  bodySuffix: ".",
};

export const MOSAIC = {
  small: {
    src: "/photos/lifestyle/nexus.png",
    alt: "A Pair team member at work",
  },
  large: {
    src: "/photos/lifestyle/headband-phone.png",
    alt: "Pair's headquarters in Kuwait City",
  },
};
