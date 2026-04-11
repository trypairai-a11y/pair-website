import IndustryPage from "@/components/ui/IndustryPage";
export default function Page() {
  return <IndustryPage industry="Media" description="Reduce churn, increase engagement, and personalize the subscriber experience with intelligent AI agents." useCases={[
    { title: "Subscription management", description: "Handle plan changes, cancellations, pauses, and renewals while proactively offering retention incentives." },
    { title: "Content recommendations", description: "Suggest personalized content based on viewing history, preferences, and trending topics to boost engagement." },
    { title: "Account support", description: "Resolve login issues, manage family accounts, update payment methods, and troubleshoot streaming quality." },
  ]} />;
}
