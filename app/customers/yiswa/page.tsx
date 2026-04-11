import CustomerStoryPage from "@/components/ui/CustomerStoryPage";

export default function YiswaStory() {
  return (
    <CustomerStoryPage
      company="Yiswa"
      industry="Technology"
      logoSrc="/logos/yiswa.png"
      heroQuote={{
        text: "With Pair, we scaled our support from hundreds to thousands of users without missing a beat.",
        author: "Product Team",
        role: "Co-Founder & CTO",
      }}
      challenge="As Yiswa's user base grew rapidly, their small support team could not keep pace. Users needed help with account setup, feature guidance, billing questions, and technical troubleshooting. Response times were increasing and user satisfaction was declining, threatening retention at a critical growth stage."
      solution="Pair's AI agents were deployed across Yiswa's support channels, handling onboarding walkthroughs, feature explanations, billing inquiries, and common technical issues. The agents learn from each interaction and continuously improve, while complex issues are routed to the right team member with full conversation context."
      results={[
        { metric: "5x", description: "Increase in support capacity" },
        { metric: "88%", description: "First-contact resolution rate" },
        { metric: "52%", description: "Reduction in support costs" },
      ]}
    />
  );
}
