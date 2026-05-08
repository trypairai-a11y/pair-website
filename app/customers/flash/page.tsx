import { pageMetadata } from "@/lib/constants";
import CustomerStoryPage from "@/components/ui/CustomerStoryPage";

export const metadata = pageMetadata(
  "Flash",
  "How Flash uses Pair to deliver fast, personal customer service."
);

export default function FlashStory() {
  return (
    <CustomerStoryPage
      company="Flash"
      industry="Delivery & Logistics"
      logoSrc="/logos/flash.png"
      logoClassName="h-10 w-auto object-contain"
      heroQuote={{
        text: "Our customers get real-time delivery updates and instant support, making the entire experience seamless.",
        author: "Operations Team",
        role: "Vice President, Customer Operations",
      }}
      challenge="Flash's delivery platform processes thousands of orders daily. Customers frequently reached out about order status, delivery ETAs, address changes, and refund requests. The support team was spending most of their time on repetitive tracking inquiries, leaving little bandwidth for complex issues that required human attention."
      solution="Pair's AI agents integrate directly with Flash's logistics systems to provide real-time order tracking, automated delivery updates, and instant resolution for common issues like address corrections and refund processing. For complex cases involving damaged goods or delivery disputes, the agents seamlessly escalate to human agents with full order history."
      results={[
        { metric: "82%", description: "Automated resolution of delivery inquiries" },
        { metric: "90%", description: "Reduction in average wait time" },
        { metric: "30%", description: "Decrease in refund processing time" },
      ]}
    />
  );
}
