import CustomerStoryPage from "@/components/ui/CustomerStoryPage";

export default function MacroStory() {
  return (
    <CustomerStoryPage
      company="Macro"
      industry="Financial Services"
      logoSrc="/logos/macro.png"
      heroQuote={{
        text: "The precision and reliability of Pair's AI agents give our clients confidence in every interaction.",
        author: "Product Team",
        role: "Chief Product Officer",
      }}
      challenge="Macro needed to provide fast, accurate support for complex financial inquiries while maintaining strict compliance standards. Their clients expected immediate answers about accounts, transactions, and financial products, but the specialized nature of the questions meant long wait times for human agents."
      solution="Pair deployed AI agents trained on Macro's financial products and compliance requirements. The agents handle account inquiries, transaction lookups, product explanations, and documentation requests while maintaining full compliance with financial regulations. Sensitive operations are seamlessly escalated to certified human agents with complete conversation context."
      results={[
        { metric: "75%", description: "Faster response to client inquiries" },
        { metric: "100%", description: "Compliance adherence maintained" },
        { metric: "60%", description: "Reduction in support costs" },
      ]}
    />
  );
}
