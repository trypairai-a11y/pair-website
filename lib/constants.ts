export const NAV_LINKS = [
  { label: "Product", href: "#product", hasDropdown: true },
  { label: "Industries", href: "#industries", hasDropdown: true },
  { label: "Customers", href: "#customers", hasDropdown: false },
  { label: "Company", href: "#company", hasDropdown: true },
];

export const COMPANY_LOGOS = [
  // Top row
  { name: "Boutiqaat",          src: "/logos/Boutiqaat.png",     imgClassName: "h-28 w-[200px]", opacityClass: "opacity-50 group-hover:opacity-100" },
  { name: "ktech",              src: "/logos/ktech.png",         imgClassName: "h-20 w-[164px]" },
  { name: "Flare Fitness",      src: "/logos/flare fitness.png", imgClassName: "h-20 w-[164px]" },
  // Middle
  { name: "CCK",                src: "/logos/cck.png",           imgClassName: "h-20 w-[164px]" },
  { name: "Future Kid",         src: "/logos/future kid.png",    imgClassName: "h-16 w-[132px]" },
  { name: "Cinescape",          src: "/logos/cinescape.png",     imgClassName: "h-5 w-[174px]" },
  { name: "Macro",              src: "/logos/macro.png",         imgClassName: "h-24 w-[182px] brightness-75 group-hover:brightness-100", opacityClass: "opacity-100" },
  { name: "Taiba Hospital",     src: "/logos/taiba.png",         imgClassName: "h-28 w-[200px]" },
  // Bottom rows
  { name: "The Burrow",         src: "/logos/The Burrow.png",    imgClassName: "h-24 w-[120px]", opacityClass: "opacity-40 group-hover:opacity-100" },
  { name: "Provin",             src: "/logos/provin.png",        imgClassName: "h-20 w-[164px]" },
  { name: "Portarage",          src: "/logos/portarage.png",     imgClassName: "h-24 w-[200px]" },
  { name: "Yiswa",              src: "/logos/yiswa.png",         imgClassName: "h-20 w-[164px]" },
];

export const FEATURE_CARDS = [
  {
    title: "Known, not numbered.",
    description:
      "The best customer service is the one the customer never has to explain.",
    gradient:
      "linear-gradient(130deg, rgb(42, 95, 74) 0%, rgb(26, 62, 48) 100%)",
  },
  {
    title: "AI up front. Humans where it matters.",
    description:
      "Your team stops answering the same question for the 100th time. Pair does that. They do the hard stuff.",
    gradient:
      "linear-gradient(131deg, rgb(61, 120, 182) 29.8%, rgb(3, 189, 245) 175.51%)",
  },
  {
    title: "One agent. Every channel.",
    description:
      "Voice. Chat. Email. WhatsApp. SMS. Same brain.",
    gradient:
      "linear-gradient(130deg, rgb(156, 125, 145) 0%, rgb(181, 69, 101) 100%)",
  },
  {
    title: "Pay for a job well done",
    description:
      "No resolution. No bill.",
    gradient:
      "linear-gradient(130deg, rgb(194, 103, 77) 0%, rgb(162, 70, 45) 100%)",
  },
];

export const TESTIMONIALS = [
  {
    company: "Boutiqaat",
    logoSrc: "/logos/Boutiqaat.png",
    quote: "It sounds like us. That is the part we did not expect.",
    name: "Abdullah Aljulaibi",
    title: "Co-Founder & Chief Executive Officer",
  },
  {
    company: "Cinescape",
    logoSrc: "/logos/cinescape.png",
    logoClassName: "h-5 w-auto object-contain",
    logoContainerClassName: "mb-3 mt-4 flex items-center justify-center min-h-[48px]",
    quote: "3 AM. Eid weekend. Sold out shows. Pair handled it.",
    name: "Nasser Bader Al Rowdan",
    title: "Chief Executive Officer",
  },
  {
    company: "Flare Fitness",
    logoSrc: "/logos/flare fitness.png",
    quote: "Our members stopped asking if they were talking to a bot.",
    // TODO: confirm signatory with Bayan before deploy
    name: "",
    title: "",
  },
  {
    company: "ktech",
    logoSrc: "/logos/ktech.png",
    quote: "We cut response time to seconds. Satisfaction went up, not down.",
    name: "Rogerio Barreto Rodrigues",
    title: "Chief Executive Officer",
  },
];

export const INSIGHT_CARDS = [
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
      "Understand every agent action, from tool calls, knowledge lookups, latency and more.",
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
  {
    heading: "Product",
    links: [
      { label: "Product overview", href: "/product" },
      { label: "Meet your agent", href: "/product/meet-your-agent" },
      { label: "Agent Studio", href: "/product/agent-studio" },
      { label: "Agent SDK", href: "/product/agent-sdk" },
      { label: "Insights", href: "/product/insights" },
      { label: "Live Assist", href: "/product/live-assist" },
      { label: "Voice", href: "/product/voice" },
      { label: "Trust and reliability", href: "/product/trust-and-reliability" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Industries overview", href: "/industries" },
      { label: "Financial services", href: "/industries/financial-services" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Telecommunications", href: "/industries/telecommunications" },
      { label: "Media", href: "/industries/media" },
      { label: "Travel and hospitality", href: "/industries/travel-transportation-hospitality" },
      { label: "Retail and consumer goods", href: "/industries/retail" },
      { label: "Technology", href: "/industries/technology" },
    ],
  },
  {
    heading: "Customers",
    links: [{ label: "Customer stories", href: "/customers" }],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Resources", href: "/resources" },
      { label: "Careers", href: "/careers" },
      { label: "Trust Center", href: "https://trust.pair.ai/" },
      { label: "Events", href: "/events" },
    ],
  },
];

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Modern Slavery Statement", href: "/modern-slavery-statement" },
  { label: "Cookie Preferences", href: "#manage-cookies" },
];
