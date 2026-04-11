import CustomerStoryPage from "@/components/ui/CustomerStoryPage";

export default function TaibaHospitalStory() {
  return (
    <CustomerStoryPage
      company="Taiba Hospital"
      industry="Healthcare"
      logoSrc="/logos/taiba.png"
      logoClassName="h-16 w-auto object-contain"
      heroQuote={{
        text: "Patients can now schedule appointments, get answers to medical queries, and access their records instantly.",
        author: "Patient Services Team",
        role: "Director of Patient Experience",
      }}
      challenge="Taiba Hospital serves thousands of patients daily across multiple departments. Patients needed help with appointment scheduling, insurance verification, test results, and general health inquiries. The front desk and call center were overwhelmed, leading to long wait times and frustrated patients at a time when they needed care the most."
      solution="Pair's AI agents now assist patients with appointment booking, pre-visit preparation, insurance questions, and post-visit follow-up. The agents understand medical terminology and can triage inquiries appropriately, routing urgent matters to clinical staff immediately while handling routine administrative tasks autonomously. All interactions comply with healthcare data privacy requirements."
      results={[
        { metric: "70%", description: "Reduction in appointment scheduling calls" },
        { metric: "40%", description: "Decrease in patient no-show rates" },
        { metric: "95%", description: "Patient satisfaction with AI-assisted booking" },
      ]}
    />
  );
}
