import { pageMetadata } from "@/lib/constants";
import CustomerStoryPage from "@/components/ui/CustomerStoryPage";

export const metadata = pageMetadata(
  "Boutiqaat",
  "How Boutiqaat scaled personal beauty service across the GCC with Pair."
);

export default function BoutiqaatStory() {
  return (
    <CustomerStoryPage
      company="Boutiqaat"
      industry="Retail"
      logoSrc="/logos/boutiqaat.png"
      logoClassName="h-16 w-auto object-contain"
      heroQuote={{
        text: "Pair has transformed how we connect with our customers. Every interaction feels personal and on-brand.",
        author: "Abdulwahab Alessa",
        role: "Founder & Chief Executive Officer",
      }}
      challenge="As the leading beauty and fashion e-commerce platform in the Middle East, Boutiqaat serves millions of customers across the GCC region. With a rapidly growing customer base and an expanding product catalog, the team faced mounting pressure to deliver personalized, responsive support at scale while maintaining the premium brand experience their customers expect."
      solution="Pair deployed AI agents that understand Boutiqaat's product catalog, customer preferences, and brand voice. The agents handle product recommendations, order tracking, returns, and beauty consultations in both Arabic and English, ensuring every interaction feels personal and on-brand. Integration with Boutiqaat's existing systems enables the agents to access real-time inventory and customer history for truly contextual conversations."
      results={[
        { metric: "78%", description: "Reduction in average response time" },
        { metric: "4.8/5", description: "Customer satisfaction score" },
        { metric: "3x", description: "Increase in support capacity without additional headcount" },
      ]}
    />
  );
}
