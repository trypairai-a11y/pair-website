import { pageMetadata } from "@/lib/constants";
import CustomerStoryPage from "@/components/ui/CustomerStoryPage";

export const metadata = pageMetadata(
  "Provin",
  "How Provin uses Pair to power customer experiences across channels."
);

export default function ProvinStory() {
  return (
    <CustomerStoryPage
      company="Provin"
      industry="Technology"
      logoSrc="/logos/provin.png"
      heroQuote={{
        text: "The AI agent understands our customers and responds in a way that feels natural and helpful every time.",
        author: "Nezar Al Saleh",
        role: "Founder & Chief Executive Officer",
      }}
      challenge="Provin's growing portfolio of technology solutions meant their support team was fielding increasingly complex and diverse inquiries. Customers needed help with everything from onboarding and configuration to troubleshooting and account management. The team struggled to maintain consistent quality as ticket volume grew."
      solution="Pair's AI agents were trained on Provin's full product documentation and support history, enabling them to handle technical inquiries with the same depth as senior support engineers. The agents provide step-by-step guidance, escalate complex issues to the right specialist, and proactively follow up to ensure resolution."
      results={[
        { metric: "85%", description: "Automated resolution rate" },
        { metric: "60%", description: "Faster average resolution time" },
        { metric: "4.7/5", description: "Customer satisfaction score" },
      ]}
    />
  );
}
