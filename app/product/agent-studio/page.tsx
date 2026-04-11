import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import { Route, BookOpen, ShieldAlert, FlaskConical } from "lucide-react";

const features = [
  {
    icon: <Route size={20} />,
    title: "Journeys",
    description:
      "Design conversation flows visually. Define how your agent handles different scenarios with a no-code builder.",
  },
  {
    icon: <BookOpen size={20} />,
    title: "Knowledge",
    description:
      "Connect your knowledge base, FAQs, and documentation so your agent always has accurate, up-to-date information.",
  },
  {
    icon: <ShieldAlert size={20} />,
    title: "Guardrails",
    description:
      "Set policies and boundaries to ensure your agent stays on topic, on brand, and compliant with your guidelines.",
  },
  {
    icon: <FlaskConical size={20} />,
    title: "Simulations",
    description:
      "Test your agent against thousands of scenarios before going live. Identify gaps and improve performance continuously.",
  },
];

export default function AgentStudioPage() {
  return (
    <>
      <PageHero
        tag="Product"
        title="Agent Studio"
        description="Build powerful AI agents without engineering support. Design journeys, integrate knowledge, set guardrails, and improve over time."
      />
      <section className="py-16 bg-white">
        <Container>
          {/* Studio mockup */}
          <div className="rounded-2xl border border-sierra-divider bg-white shadow-sm overflow-hidden mb-16">
            <div className="bg-gray-50 px-6 py-3 border-b border-sierra-divider flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-300" />
                <div className="w-3 h-3 rounded-full bg-yellow-300" />
                <div className="w-3 h-3 rounded-full bg-green-300" />
              </div>
              <span className="text-xs text-sierra-gray ml-4">Agent Studio</span>
            </div>
            <div className="p-6">
              <div className="flex gap-6">
                <div className="w-48 flex-shrink-0 hidden md:block">
                  {["Journeys", "Knowledge", "Policies", "Tools", "Simulations"].map((item, i) => (
                    <div
                      key={item}
                      className={`px-3 py-2 rounded-lg text-xs ${
                        i === 0 ? "bg-sierra-green/10 text-sierra-green font-medium" : "text-sierra-gray"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <div className="text-xs text-sierra-gray mb-4">
                    Journeys / <span className="text-sierra-text-dark">Returns & Exchanges</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-sierra-text mb-2">
                      <span className="font-medium text-amber-700">Observation:</span> Customer wants to return or exchange a product.
                    </p>
                    <p className="text-xs text-sierra-text">
                      <span className="font-medium text-amber-700">Goal:</span> Process the return or exchange efficiently and ensure satisfaction.
                    </p>
                    <div className="mt-4 rounded-lg bg-white p-3 border border-sierra-divider">
                      <p className="text-xs font-medium text-sierra-text mb-2">Policies</p>
                      <ul className="text-[11px] text-sierra-gray space-y-1.5 list-disc list-inside">
                        <li>Returns accepted within 30 days of purchase with receipt.</li>
                        <li>Exchanges are free for size or color changes.</li>
                        <li>Refunds processed to original payment method within 5 business days.</li>
                      </ul>
                    </div>
                  </div>
                </div>
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
