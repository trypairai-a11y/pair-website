import { pageMetadata } from "@/lib/constants";
import CustomerStoryPage from "@/components/ui/CustomerStoryPage";

export const metadata = pageMetadata(
  "ktech",
  "How ktech streamlines admissions and student life with Pair's AI agent Kadi."
);

export default function KtechStory() {
  return (
    <CustomerStoryPage
      company="ktech"
      industry="Technology"
      logoSrc="/logos/ktech.png"
      heroQuote={{
        text: "Pair gave us a competitive edge. We resolve customer issues faster and with far greater satisfaction.",
        author: "Rogerio Barreto Rodrigues",
        role: "Chief Executive Officer",
      }}
      challenge="As a fast-growing technology company, ktech needed to scale its customer support operations to match business growth. Their team was spending too much time on repetitive inquiries, leaving less capacity for high-value customer interactions and strategic initiatives."
      solution="Pair's platform enabled ktech to deploy intelligent agents that handle routine support requests autonomously while seamlessly escalating complex issues to human agents with full context. The AI agents integrate with ktech's existing tools to provide real-time account information and personalized recommendations."
      results={[
        { metric: "70%", description: "Reduction in routine support tickets" },
        { metric: "45%", description: "Improvement in customer satisfaction" },
        { metric: "2.5x", description: "More issues resolved per day" },
      ]}
    />
  );
}
