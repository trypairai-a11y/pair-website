import { pageMetadata } from "@/lib/constants";
import LegalPage from "@/components/ui/LegalPage";

export const metadata = pageMetadata(
  "Modern Slavery Statement",
  "Pair's commitment to preventing modern slavery and human trafficking in our business and supply chain."
);

const sections = [
  {
    heading: "Our commitment",
    content:
      "Pair Technologies, Inc. (\"Pair\") is committed to preventing modern slavery and human trafficking in all aspects of our business and supply chain. We have zero tolerance for modern slavery in any form, including forced labor, child labor, human trafficking, and servitude.",
  },
  {
    heading: "About our business",
    content:
      "Pair is an AI-powered customer experience platform headquartered in San Francisco, California. We develop and operate software solutions that enable businesses to deploy conversational AI agents. Our workforce consists primarily of technology professionals across engineering, product, design, sales, and operations.",
  },
  {
    heading: "Our supply chain",
    content:
      "As a technology company, our supply chain primarily consists of cloud infrastructure providers, software vendors, professional services firms, and office and equipment suppliers. We assess our supply chain for modern slavery risks and take steps to ensure our suppliers share our commitment to ethical labor practices.",
  },
  {
    heading: "Our policies",
    content:
      "We maintain policies and procedures to identify and mitigate the risk of modern slavery, including our Code of Conduct, which requires all employees and contractors to act ethically and with integrity; our Supplier Code of Conduct, which sets expectations for labor practices throughout our supply chain; and our whistleblowing procedures, which provide channels for reporting concerns without fear of retaliation.",
  },
  {
    heading: "Due diligence",
    content:
      "We conduct due diligence on new suppliers and regularly review existing supplier relationships. This includes assessing suppliers' labor practices and policies, requiring suppliers to confirm compliance with applicable labor laws, and monitoring for indicators of modern slavery risk.",
  },
  {
    heading: "Training and awareness",
    content:
      "We provide training to relevant staff to ensure they understand the risks of modern slavery and know how to identify and report potential issues. Our leadership team is committed to maintaining a culture of transparency and ethical business conduct.",
  },
  {
    heading: "Reporting concerns",
    content:
      "Anyone who suspects modern slavery in any part of our business or supply chain is encouraged to report their concerns through our confidential reporting channels or by contacting compliance@pair.ai. All reports will be investigated promptly and thoroughly.",
  },
  {
    heading: "Review",
    content:
      "This statement is reviewed and updated annually. It was approved by the Board of Directors of Pair Technologies, Inc.",
  },
];

export default function ModernSlaveryPage() {
  return (
    <LegalPage
      title="Modern Slavery Statement"
      lastUpdated="January 15, 2026"
      sections={sections}
    />
  );
}
