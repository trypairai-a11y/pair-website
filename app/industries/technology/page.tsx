import IndustryPage from "@/components/ui/IndustryPage";
export default function Page() {
  return <IndustryPage industry="Technology" description="Scale customer support, accelerate onboarding, and reduce churn with AI agents built for technical products." useCases={[
    { title: "Technical support", description: "Diagnose issues, walk users through solutions, and escalate complex cases with full context to engineering teams." },
    { title: "Onboarding", description: "Guide new users through product setup, feature discovery, and best practices to accelerate time-to-value." },
    { title: "Account management", description: "Handle subscription changes, usage queries, API key management, and billing for self-serve and enterprise customers." },
  ]} />;
}
