import Image from "next/image";

export function AskMock() {
  return (
    <div className="absolute inset-0 bg-white">
      <Image
        src="/insights/ask.png"
        alt="Ask Pair: What made 12,000 customers ask for a real person?"
        fill
        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 86vw"
        className="object-contain pointer-events-none"
        draggable={false}
      />
    </div>
  );
}

export function StatsMock() {
  return (
    <div className="absolute inset-0 bg-white">
      <Image
        src="/insights/stats.png"
        alt="Stats: total conversations bar chart with 92% CSAT"
        fill
        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 86vw"
        className="object-contain pointer-events-none"
        draggable={false}
      />
    </div>
  );
}

export function TestMock() {
  return (
    <div className="absolute inset-0 bg-white">
      <Image
        src="/insights/test.png"
        alt="Test: Arabic test conversation between agent and customer"
        fill
        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 86vw"
        className="object-contain pointer-events-none"
        draggable={false}
      />
    </div>
  );
}

export function StepsMock() {
  return (
    <div className="absolute inset-0 bg-white">
      <Image
        src="/insights/steps.png"
        alt="Steps: agent reasoning with Guardrails, Decisions, and Response rows"
        fill
        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 86vw"
        className="object-contain pointer-events-none"
        draggable={false}
      />
    </div>
  );
}
