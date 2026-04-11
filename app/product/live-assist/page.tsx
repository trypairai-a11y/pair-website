import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";

const features = [
  {
    title: "Seamless handoff",
    description:
      "When a conversation requires human expertise, Pair transfers full context to your team\u2014no repetition needed.",
  },
  {
    title: "Agent context",
    description:
      "Human agents see the complete conversation history, customer profile, and AI-suggested next steps in one view.",
  },
  {
    title: "Real-time assist",
    description:
      "AI works alongside your human agents, suggesting responses, pulling up information, and automating routine steps.",
  },
];

export default function LiveAssistPage() {
  return (
    <>
      <PageHero
        tag="Product"
        title="Live Assist"
        description="Seamless collaboration between AI agents and your human team. The best of both worlds for every customer interaction."
      />
      <section className="py-16 bg-white">
        <Container>
          {/* Handoff mockup */}
          <div className="rounded-2xl bg-sierra-bg p-8 mb-16">
            <div className="max-w-lg mx-auto space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-sierra-green/15 flex items-center justify-center">
                    <span className="text-[10px] text-sierra-green font-medium">S</span>
                  </div>
                  <span className="text-xs font-medium text-sierra-text-dark">Pair Agent</span>
                </div>
                <p className="text-sm text-sierra-text">
                  This request requires specialized assistance. Let me connect you with our expert team.
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-xs font-medium text-blue-700 mb-2">Handoff to human agent</p>
                <div className="text-xs text-blue-600 space-y-1">
                  <p>Customer: Sarah Johnson (VIP, 5yr member)</p>
                  <p>Topic: Complex warranty claim for order #48291</p>
                  <p>Sentiment: Slightly frustrated</p>
                  <p>Suggested action: Offer expedited replacement</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-[10px] text-blue-700 font-medium">M</span>
                  </div>
                  <span className="text-xs font-medium text-sierra-text-dark">Mike (Support Team)</span>
                </div>
                <p className="text-sm text-sierra-text">
                  Hi Sarah, I can see the full history. Let me get this resolved for you right away.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-sierra-divider p-6">
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
