import IndustryPage from "@/components/ui/IndustryPage";
export default function Page() {
  return <IndustryPage industry="Financial services" description="Help customers manage accounts, detect fraud, and process applications with secure, compliant AI agents." useCases={[
    { title: "Account management", description: "Enable customers to check balances, transfer funds, update information, and manage cards through natural conversation." },
    { title: "Fraud detection", description: "Instantly verify suspicious activity, lock compromised accounts, and guide customers through resolution steps." },
    { title: "Loan processing", description: "Walk applicants through the loan process, collect required documents, and provide real-time status updates." },
  ]} quote={{ text: "Home ownership is personal and our agent is personal. We always say clients vote with clicks, and clients love the agent.", author: "Alex McGillis", role: "Vice President, Product Management", company: "Rocket Mortgage" }} />;
}
