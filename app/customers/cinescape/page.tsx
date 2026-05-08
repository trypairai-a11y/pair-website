import { pageMetadata } from "@/lib/constants";
import CustomerStoryPage from "@/components/ui/CustomerStoryPage";

export const metadata = pageMetadata(
  "Cinescape",
  "How Cinescape makes every caller feel like a guest with Pair."
);

export default function CinescapeStory() {
  return (
    <CustomerStoryPage
      company="Cinescape"
      industry="Entertainment"
      logoSrc="/logos/cinescape.png"
      logoClassName="h-6 w-auto object-contain"
      heroQuote={{
        text: "Our guests now get instant answers at any hour. Pair made that possible without adding headcount.",
        author: "Nasser Bader Al Rowdan",
        role: "Chief Executive Officer",
      }}
      challenge="Cinescape, Kuwait's premier cinema and entertainment destination, needed to handle a high volume of guest inquiries about showtimes, ticket availability, food orders, and event bookings. With peak demand around new releases and weekends, wait times were climbing and guests were turning to competitors for faster answers."
      solution="Pair's AI agents now serve as Cinescape's always-on guest concierge, answering questions about showtimes, helping guests select seats, processing food pre-orders, and managing loyalty rewards. The agents handle inquiries in Arabic and English around the clock, ensuring no guest is left waiting regardless of the time or day."
      results={[
        { metric: "24/7", description: "Guest support availability" },
        { metric: "65%", description: "Reduction in call center volume" },
        { metric: "92%", description: "First-contact resolution rate" },
      ]}
    />
  );
}
