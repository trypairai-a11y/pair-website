import HeroSection from "@/components/sections/HeroSection";
import LogosSection from "@/components/sections/LogosSection";
import TransformSection from "@/components/sections/TransformSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AgentOSSection from "@/components/sections/AgentOSSection";
import AgentDataSection from "@/components/sections/AgentDataSection";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";
const PLATFORM_CARDS = [
  {
    title: "Ask",
    description:
      "Ask anything. Get the answer in plain language, not dashboards.",
    image: { src: "/insights/ask.png", alt: "Ask interface preview" },
  },
  {
    title: "Stats",
    description:
      "Track the metrics that matter. Act on them before they slip.",
    image: { src: "/insights/stats.png", alt: "Stats dashboard preview" },
  },
  {
    title: "Test",
    description:
      "Test every tone and policy on real traffic. Ship what wins.",
    image: { src: "/insights/test.png", alt: "Test interface preview" },
  },
  {
    title: "Steps",
    description:
      "See how the agent thinks. Step by step. Decision by decision.",
    image: { src: "/insights/steps.png", alt: "Steps reasoning preview" },
  },
];

export default function Home() {
  return (
    <>
      {/* HeroSection renders the first poster via next/image with priority,
          which injects its own high-priority preload. No manual <link
          rel="preload"> needed. */}
      <HeroSection />
      <ScrollReveal>
        <LogosSection />
      </ScrollReveal>
      <ScrollReveal>
        <TransformSection />
      </ScrollReveal>
      <ScrollReveal className="relative z-10">
        <TestimonialsSection />
      </ScrollReveal>
      <AgentOSSection />
      <ScrollReveal>
        <AgentDataSection
          title="Smarter, everyday."
          buttonLabel="Product"
          buttonHref="/product"
          buttonIcon="trending"
          cards={PLATFORM_CARDS}
        />
      </ScrollReveal>
      <ScrollReveal>
        <AgentDataSection />
      </ScrollReveal>
      <ScrollReveal>
        <CTASection />
      </ScrollReveal>
    </>
  );
}
