import { pageMetadata } from "@/lib/constants";
import IndustryPage from "@/components/ui/IndustryPage";

export const metadata = pageMetadata(
  "Retail and consumer goods",
  "AI agents for order tracking, returns, and personal product recommendations."
);

export default function Page() {
  return <IndustryPage industry="Retail and consumer goods" description="Transform shopping experiences with AI agents that drive loyalty, reduce returns, and increase lifetime value." useCases={[
    { title: "Order tracking", description: "Provide real-time order status, shipping updates, and delivery estimates proactively across every channel." },
    { title: "Returns and exchanges", description: "Process returns, initiate exchanges, and generate shipping labels instantly while offering smart alternatives." },
    { title: "Product recommendations", description: "Suggest products based on purchase history, browsing behavior, and conversation context to drive upsells." },
  ]} quote={{ text: "This isn't just about automation. It's about creating a better, faster experience that still feels personal and thoughtful.", author: "Sarah Wallis", role: "Chief Operating Officer", company: "Minted" }} />;
}
