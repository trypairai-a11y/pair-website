import { pageMetadata } from "@/lib/constants";
import CustomerStoryPage from "@/components/ui/CustomerStoryPage";

export const metadata = pageMetadata(
  "Flare Fitness",
  "How Flare Fitness uses Pair to build memberships that feel personal."
);

export default function FlareFitnessStory() {
  return (
    <CustomerStoryPage
      company="Flare Fitness"
      industry="Health & Wellness"
      logoSrc="/logos/flare-fitness-white.png"
      heroQuote={{
        text: "Our members get instant support for class bookings, membership questions, and wellness guidance whenever they need it.",
        author: "Operations Team",
        role: "Head of Member Experience",
      }}
      challenge="Flare Fitness was growing rapidly with new studio locations opening across the region. Managing member inquiries about class schedules, memberships, personal training, and facility information across all locations was becoming unmanageable for their small support team, especially during peak hours."
      solution="Pair's AI agents serve as Flare Fitness's virtual member concierge, handling class bookings, membership renewals, schedule changes, and wellness recommendations. The agents have access to real-time class availability and member profiles, delivering personalized responses that reflect each member's fitness journey and preferences."
      results={[
        { metric: "55%", description: "Reduction in front-desk inquiries" },
        { metric: "40%", description: "Increase in class booking efficiency" },
        { metric: "24/7", description: "Member support availability" },
      ]}
    />
  );
}
