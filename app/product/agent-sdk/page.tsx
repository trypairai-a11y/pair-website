import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";

const features = [
  {
    title: "Declarative development",
    description:
      "Define agent behavior with simple, declarative configuration files. Focus on what your agent should do, not how.",
  },
  {
    title: "CI/CD tooling",
    description:
      "Integrate agent development into your existing pipelines. Test, version, and deploy agents like any other software.",
  },
  {
    title: "Multi-agent orchestration",
    description:
      "Coordinate multiple specialized agents that work together to handle complex customer scenarios.",
  },
];

export default function AgentSDKPage() {
  return (
    <>
      <PageHero
        tag="Product"
        title="Agent SDK"
        description="State of the art conversational AI in your software development lifecycle, with declarative development, CI/CD tooling, and multi-agent orchestration."
      />
      <section className="py-16 bg-white">
        <Container>
          {/* Code example */}
          <div className="rounded-2xl bg-gray-900 p-6 mb-16 overflow-x-auto">
            <pre className="text-sm text-green-400 font-mono leading-6">
{`from sierra import Agent, Policy, Tool

# Define your agent
agent = Agent(
    name="customer-support",
    model="sierra-large",
    tools=[
        Tool.order_lookup,
        Tool.process_return,
        Tool.schedule_callback,
    ],
    policies=[
        Policy.from_file("refund_policy.md"),
        Policy.from_file("shipping_policy.md"),
    ],
    guardrails={
        "max_refund_amount": 500,
        "require_approval_above": 200,
    },
)

# Deploy
agent.deploy(channel=["chat", "voice", "email"])`}
            </pre>
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
