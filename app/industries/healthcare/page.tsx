import IndustryPage from "@/components/ui/IndustryPage";
export default function Page() {
  return <IndustryPage industry="Healthcare" description="Improve patient access, streamline operations, and deliver compassionate support with HIPAA-compliant AI agents." useCases={[
    { title: "Patient scheduling", description: "Let patients book, reschedule, or cancel appointments 24/7 through natural conversation across any channel." },
    { title: "Claims processing", description: "Guide patients through insurance claims, verify coverage, and provide real-time status updates on pending claims." },
    { title: "Care coordination", description: "Help patients navigate referrals, prescription refills, and follow-up care with personalized, context-aware support." },
  ]} />;
}
