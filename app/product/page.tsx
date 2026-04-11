import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import {
  Bot,
  LayoutGrid,
  Code,
  TrendingUp,
  Headphones,
  AudioWaveform,
  ShieldCheck,
} from "lucide-react";

const products = [
  {
    icon: <Bot size={20} />,
    title: "Meet your agent",
    description: "AI agents that deliver personalized, empathetic experiences.",
    href: "/product/meet-your-agent",
  },
  {
    icon: <LayoutGrid size={20} />,
    title: "Agent Studio",
    description: "Build powerful agents without engineering support.",
    href: "/product/agent-studio",
  },
  {
    icon: <Code size={20} />,
    title: "Agent SDK",
    description: "Conversational AI in your software development lifecycle.",
    href: "/product/agent-sdk",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "Insights",
    description: "Use AI to improve your AI with analytics and monitoring.",
    href: "/product/insights",
  },
  {
    icon: <Headphones size={20} />,
    title: "Live Assist",
    description: "Seamless collaboration between AI agents and human teams.",
    href: "/product/live-assist",
  },
  {
    icon: <AudioWaveform size={20} />,
    title: "Voice",
    description: "Natural, human-like voice AI for phone interactions.",
    href: "/product/voice",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Trust and reliability",
    description: "Enterprise-grade security, compliance, and responsible AI.",
    href: "/product/trust-and-reliability",
  },
];

export default function ProductPage() {
  return (
    <>
      <PageHero
        tag="Product"
        title="Pair Agent OS"
        description="Build, test, and optimize AI agents that transform your customer experience across every channel."
      />
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <a
                key={p.title}
                href={p.href}
                className="rounded-2xl border border-sierra-divider bg-white p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-sierra-green/10 flex items-center justify-center text-sierra-green mb-4">
                  {p.icon}
                </div>
                <h3 className="text-base font-medium text-sierra-text-dark mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-sierra-gray leading-relaxed">
                  {p.description}
                </p>
              </a>
            ))}
          </div>
        </Container>
      </section>
      <PageCTA title="Get started with Pair" />
    </>
  );
}
