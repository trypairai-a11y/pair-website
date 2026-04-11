import HeroSection from "@/components/sections/HeroSection";
import LogosSection from "@/components/sections/LogosSection";
import TransformSection from "@/components/sections/TransformSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AgentOSSection from "@/components/sections/AgentOSSection";
import InsightsSection from "@/components/sections/InsightsSection";
import AgentDataSection from "@/components/sections/AgentDataSection";
import TrustSection from "@/components/sections/TrustSection";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <>
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
        <InsightsSection />
      </ScrollReveal>
      <ScrollReveal>
        <AgentDataSection />
      </ScrollReveal>
      <ScrollReveal>
        <TrustSection />
      </ScrollReveal>
      <ScrollReveal>
        <CTASection />
      </ScrollReveal>
    </>
  );
}
