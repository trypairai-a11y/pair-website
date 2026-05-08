import { pageMetadata } from "@/lib/constants";
import CustomerStoryPage from "@/components/ui/CustomerStoryPage";

export const metadata = pageMetadata(
  "CCK",
  "How CCK uses Pair to deliver personalized customer support at scale."
);

export default function CCKStory() {
  return (
    <CustomerStoryPage
      company="CCK"
      industry="Food & Beverage"
      logoSrc="/logos/cck.png"
      heroQuote={{
        text: "Pair helps us maintain our high standards of customer service even as we scale to new markets.",
        author: "Customer Experience Team",
        role: "Director of Operations",
      }}
      challenge="CCK's expansion across multiple locations created a challenge in maintaining consistent customer service quality. Their team was handling a growing volume of inquiries about menus, catering orders, reservations, and dietary requirements, with response times suffering during peak meal hours."
      solution="Pair deployed AI agents that understand CCK's full menu, catering options, and operational details. The agents assist customers with placing orders, customizing meals for dietary needs, booking catering for events, and answering location-specific questions. Integration with CCK's ordering system enables real-time order tracking and updates."
      results={[
        { metric: "3x", description: "Faster response to customer inquiries" },
        { metric: "35%", description: "Increase in catering order volume" },
        { metric: "90%", description: "Customer inquiry resolution rate" },
      ]}
    />
  );
}
