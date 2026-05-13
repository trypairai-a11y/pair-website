import { pageMetadata } from "@/lib/constants";
import LegalPage from "@/components/ui/LegalPage";

export const metadata = pageMetadata(
  "Privacy Policy",
  "How Pair collects, uses, and protects your information."
);

const sections = [
  {
    heading: "Introduction",
    content:
      "Pair Technologies, Inc. (\"Pair,\" \"we,\" \"us,\" or \"our\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our platform, or interact with our AI agents.\n\nBy accessing or using our services, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our services.",
  },
  {
    heading: "Information we collect",
    content:
      "We may collect personal information that you voluntarily provide to us when you register for an account, request a demo, subscribe to our newsletter, or otherwise contact us. This includes your name, email address, company name, job title, phone number, and any other information you choose to provide.\n\nWe also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates and times of your visits.",
  },
  {
    heading: "How we use your information",
    content:
      "We use the information we collect to provide, maintain, and improve our services; to process transactions and send related information; to communicate with you about products, services, and events; to monitor and analyze usage trends; to detect, prevent, and address technical issues and security threats; and to comply with legal obligations.",
  },
  {
    heading: "Data sharing and disclosure",
    content:
      "We do not sell your personal information. We may share your information with service providers who perform services on our behalf, with business partners with your consent, in response to legal process or government requests, and in connection with a merger, acquisition, or sale of assets.\n\nAll third-party service providers are contractually obligated to protect your data and use it only for the purposes we specify.",
  },
  {
    heading: "Data security",
    content:
      "We implement industry-standard security measures to protect your personal information, including encryption in transit and at rest, access controls, regular security assessments, and compliance with ISO 27001 standards where applicable.",
  },
  {
    heading: "Data retention",
    content:
      "We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, comply with our legal obligations, resolve disputes, and enforce our agreements. When we no longer need your data, we securely delete or anonymize it.",
  },
  {
    heading: "Your rights",
    content:
      "Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data; the right to object to or restrict processing; the right to data portability; and the right to withdraw consent.\n\nTo exercise any of these rights, please contact us at privacy@pair.ai.",
  },
  {
    heading: "International transfers",
    content:
      "Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers, including Standard Contractual Clauses and other approved transfer mechanisms.",
  },
  {
    heading: "Changes to this policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our website and updating the \"Last updated\" date. Your continued use of our services after any changes constitutes acceptance of the updated policy.",
  },
  {
    heading: "Contact us",
    content:
      "If you have questions about this Privacy Policy or our data practices, please contact us at privacy@pair.ai or write to us at:\n\nKuwait, Kuwait City",
  },
];

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" lastUpdated="March 1, 2026" sections={sections} />;
}
