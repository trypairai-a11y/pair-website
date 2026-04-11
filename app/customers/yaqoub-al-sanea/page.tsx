import CustomerStoryPage from "@/components/ui/CustomerStoryPage";

export default function YaqoubAlSaneaStory() {
  return (
    <CustomerStoryPage
      company="Yaqoub Al-Sanea"
      industry="Retail"
      logoSrc="/logos/yaqoub alsanea.png"
      heroQuote={{
        text: "Pair allows us to provide the same level of personalized service online that our customers experience in-store.",
        author: "Digital Team",
        role: "Head of Digital Transformation",
      }}
      challenge="Yaqoub Al-Sanea is a trusted retail brand with a loyal customer base built on in-store personal service. As the company expanded its digital presence, they needed to replicate that same personalized experience online. Customers expected knowledgeable product guidance, sizing help, and availability information that only seasoned sales associates could typically provide."
      solution="Pair's AI agents were trained on Yaqoub Al-Sanea's complete product catalog and customer service standards. The agents provide personalized product recommendations, check stock availability across locations, assist with sizing and styling questions, and handle order management. The experience mirrors the attentive service customers receive in-store."
      results={[
        { metric: "45%", description: "Increase in online conversion rate" },
        { metric: "68%", description: "Of customer inquiries resolved by AI" },
        { metric: "4.6/5", description: "Average customer satisfaction rating" },
      ]}
    />
  );
}
