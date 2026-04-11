import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import { Search, Monitor, FlaskConical, Eye } from "lucide-react";

const features = [
  {
    icon: <Search size={20} />,
    title: "Explorer",
    description:
      "Analyze agent performance with ChatGPT-style Deep Research for conversations. Ask questions about trends, patterns, and anomalies.",
  },
  {
    icon: <Monitor size={20} />,
    title: "Monitors",
    description:
      "Identify conversations needing extra attention proactively. Set alerts for sentiment drops, escalations, or policy violations.",
  },
  {
    icon: <FlaskConical size={20} />,
    title: "Experiments",
    description:
      "Run A/B tests to optimize agent behavior and improve outcomes. Compare strategies and roll out winners automatically.",
  },
  {
    icon: <Eye size={20} />,
    title: "Observability",
    description:
      "Monitor every conversation in real-time with full trace visibility. See exactly how your agent makes decisions.",
  },
];

export default function InsightsPage() {
  return (
    <>
      <PageHero
        tag="Product"
        title="Insights"
        description="Use AI to improve your AI. Analyze agent performance, identify opportunities, and continuously optimize customer outcomes."
      />
      <section className="py-16 bg-white">
        <Container>
          {/* Dashboard mockup */}
          <div className="rounded-2xl bg-sierra-bg p-8 mb-16">
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-xs text-sierra-gray mb-4">Explorer</p>
              <p className="text-sm text-sierra-text-dark mb-4">
                &quot;What are the top reasons customers contact support after making a purchase?&quot;
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs font-medium text-sierra-text mb-2">Key findings:</p>
                <ul className="text-xs text-sierra-gray space-y-1.5 list-disc list-inside">
                  <li>32% of post-purchase contacts are about delivery status updates</li>
                  <li>24% relate to size exchanges (highest in apparel)</li>
                  <li>18% are about missing order confirmations</li>
                  <li>Recommendation: Add proactive shipping notifications to reduce contacts by ~30%</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-sierra-green/10 flex items-center justify-center text-sierra-green flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-base font-medium text-sierra-text-dark mb-1">
                    {f.title}
                  </h3>
                  <p className="text-sm text-sierra-gray leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <PageCTA />
    </>
  );
}
