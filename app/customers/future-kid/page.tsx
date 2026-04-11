import CustomerStoryPage from "@/components/ui/CustomerStoryPage";

export default function FutureKidStory() {
  return (
    <CustomerStoryPage
      company="Future Kid"
      industry="Entertainment"
      logoSrc="/logos/future kid.png"
      logoClassName="h-14 w-auto object-contain"
      heroQuote={{
        text: "Parents love being able to get instant answers about our facilities, birthday packages, and safety measures.",
        author: "Guest Relations Team",
        role: "Head of Guest Experience",
      }}
      challenge="Future Kid operates family entertainment centers that attract thousands of visitors daily. Parents had frequent questions about age-appropriate activities, birthday party packages, safety protocols, pricing, and hours. The guest services team was overwhelmed, especially during school holidays and weekends."
      solution="Pair's AI agents now handle guest inquiries across chat and messaging channels, providing detailed information about activities, helping parents plan visits, booking birthday packages, and answering safety-related questions. The agents understand the nuances of each location's offerings and adjust recommendations based on children's ages and interests."
      results={[
        { metric: "80%", description: "Reduction in phone call volume" },
        { metric: "50%", description: "Increase in online birthday bookings" },
        { metric: "4.9/5", description: "Parent satisfaction with AI support" },
      ]}
    />
  );
}
