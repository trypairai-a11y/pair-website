import IndustryPage from "@/components/ui/IndustryPage";
export default function Page() {
  return <IndustryPage industry="Telecommunications" description="Reduce call center volume and improve CSAT with AI agents that handle billing, troubleshooting, and plan changes." useCases={[
    { title: "Billing support", description: "Help customers understand charges, make payments, set up autopay, and resolve billing disputes instantly." },
    { title: "Technical troubleshooting", description: "Guide customers through network issues, device setup, and service restoration with step-by-step diagnostic flows." },
    { title: "Plan management", description: "Help customers compare plans, upgrade or downgrade service, and add lines or features to their account." },
  ]} quote={{ text: "Pair is a game-changer for meeting subscribers' needs. For every interaction, we gain valuable insights.", author: "Moshe Pridan", role: "Chief Product Officer", company: "SiriusXM" }} />;
}
