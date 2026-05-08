import { pageMetadata } from "@/lib/constants";
import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";

export const metadata = pageMetadata(
  "Meet your agent",
  "Personalized, context-aware AI agents that understand customers across every touchpoint."
);

const features = [
  {
    title: "Truly personalized",
    description:
      "Your AI agent remembers every customer interaction, understands preferences, and delivers experiences tailored to each individual.",
  },
  {
    title: "Natural conversation",
    description:
      "Engage customers in fluid, human-like dialogue that understands context, nuance, and intent across every touchpoint.",
  },
  {
    title: "Takes action",
    description:
      "Your agent doesn't just answer questions\u2014it resolves issues, processes orders, schedules appointments, and more.",
  },
  {
    title: "Always on brand",
    description:
      "Built with guardrails and policies that ensure every interaction reflects your brand voice and values.",
  },
  {
    title: "Continuous learning",
    description:
      "Improves over time by learning from every conversation, adapting to new scenarios, and refining its responses.",
  },
  {
    title: "Omnichannel",
    description:
      "Deploy one agent across chat, SMS, WhatsApp, email, voice, and more\u2014delivering a consistent experience everywhere.",
  },
];

export default function MeetYourAgentPage() {
  return (
    <>
      <PageHero
        tag="Product"
        title="Meet your AI agent"
        description="An AI agent that represents your brand, understands your customers, and resolves their needs with empathy and precision."
      />
      <section className="py-16 bg-white">
        <Container>
          {/* Agent demo mockup */}
          <div className="rounded-xl bg-sierra-bg p-8 mb-16">
            <div className="max-w-lg mx-auto">
              <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-sierra-green/15 flex items-center justify-center">
                    <span className="text-xs text-sierra-green font-medium">S</span>
                  </div>
                  <span className="text-sm font-medium text-sierra-text-dark">Pair Agent</span>
                </div>
                <p className="text-sm text-sierra-text leading-relaxed">
                  Hi Sarah! I see you recently purchased the Alpine jacket. How can I help you today?
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm ml-12">
                <p className="text-sm text-sierra-text leading-relaxed">
                  I&apos;d like to exchange it for a different size. Do you have it in medium?
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm mt-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-sierra-green/15 flex items-center justify-center">
                    <span className="text-xs text-sierra-green font-medium">S</span>
                  </div>
                  <span className="text-sm font-medium text-sierra-text-dark">Pair Agent</span>
                </div>
                <p className="text-sm text-sierra-text leading-relaxed">
                  Great news! The Alpine jacket is available in medium. I&apos;ve initiated the exchange and you&apos;ll receive a prepaid return label at your email shortly.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title}>
                <h3 className="text-base font-medium text-sierra-text-dark mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-sierra-gray leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <PageCTA />
    </>
  );
}
