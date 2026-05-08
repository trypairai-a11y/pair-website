import { pageMetadata } from "@/lib/constants";
import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import { Brain, BookOpen, Network, GitBranch } from "lucide-react";

export const metadata = pageMetadata(
  "The Brain",
  "Persistent agent memory, knowledge, and reasoning - the cognitive layer that powers Pair."
);

const features = [
  {
    icon: <Brain size={20} />,
    title: "Memory",
    description:
      "Persistent context across every conversation. Agents remember preferences, history, and the thread of every customer relationship.",
  },
  {
    icon: <BookOpen size={20} />,
    title: "Knowledge",
    description:
      "Connect every source of truth. Policies, product catalogs, internal docs, and live systems are grounded into every answer.",
  },
  {
    icon: <Network size={20} />,
    title: "Learning",
    description:
      "Every interaction sharpens the next. Patterns surface, edge cases get captured, and the brain compounds with every conversation.",
  },
  {
    icon: <GitBranch size={20} />,
    title: "Reasoning",
    description:
      "Multi-step decisions, traceable from intent to action. See exactly how the agent thinks, and why it chose what it did.",
  },
];

export default function TheBrainPage() {
  return (
    <>
      <PageHero
        tag="Product"
        title="The Brain"
        description="The data platform behind every Pair agent. Memory, knowledge, learning, and reasoning, unified into one continuously-improving intelligence layer."
      />
      <section className="py-16 bg-white">
        <Container>
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
