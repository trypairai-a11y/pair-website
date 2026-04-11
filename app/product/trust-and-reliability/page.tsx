import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import { TRUST_BADGES } from "@/lib/constants";

const features = [
  {
    title: "Data security",
    description: "Enterprise-grade encryption, access controls, and data isolation. Your data is never used to train models.",
  },
  {
    title: "Compliance",
    description: "SOC 2, ISO 27001, HIPAA, GDPR, and EU AI Act compliant. Regular third-party audits and penetration testing.",
  },
  {
    title: "Responsible AI",
    description: "Built-in guardrails, content moderation, and bias detection. Full audit trails for every conversation.",
  },
];

export default function TrustPage() {
  return (
    <>
      <PageHero
        tag="Product"
        title="Trust and reliability"
        description="Pair is designed with the highest commitment to trust, security, and compliance. Your customers' data is safe with us."
      />
      <section className="py-16 bg-white">
        <Container>
          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.name} className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full bg-sierra-text-dark flex items-center justify-center">
                  <span className="text-white text-[10px] font-medium text-center leading-tight px-1">
                    {badge.abbreviation}
                  </span>
                </div>
                <span className="text-xs text-sierra-gray">{badge.name}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-sierra-divider p-6">
                <h3 className="text-base font-medium text-sierra-text-dark mb-2">{f.title}</h3>
                <p className="text-sm text-sierra-gray leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <PageCTA />
    </>
  );
}
