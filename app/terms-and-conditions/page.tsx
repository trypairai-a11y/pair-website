import { pageMetadata } from "@/lib/constants";
import LegalPage from "@/components/ui/LegalPage";

export const metadata = pageMetadata(
  "Terms & Conditions",
  "Terms of use for the Pair website and platform, governed by the laws of the State of Kuwait."
);

const sections = [
  {
    heading: "Who we are",
    content:
      "Pair is a customer experience platform built in Kuwait and operated by Pair, a company registered in the State of Kuwait (\"Pair\", \"we\", \"us\"). These Terms and Conditions (\"Terms\") govern your access to and use of trypair.ai, the Pair platform, and any service we provide through them.\n\nBy accessing or using the platform you agree to these Terms. If you are agreeing on behalf of a company, you confirm you are authorised to bind that company, and \"you\" means that company.",
  },
  {
    heading: "What the platform does",
    content:
      "Pair builds conversation intelligence for Kuwaiti and Gulf customer service. The platform lets a business run AI agents across its channels, review what those agents and its people said, and measure the result.\n\nCapabilities include agent building and deployment, live assistance for human agents, voice, conversation analytics and insights, and evaluation and reliability tooling. What is included for you is set out in your service agreement. We may add, change, or retire capabilities over time, and we will give notice of material changes that affect a live deployment.",
  },
  {
    heading: "Arabic and dialect handling",
    content:
      "The platform is designed to hear and respond in Kuwaiti Arabic, Modern Standard Arabic, and English. Dialect coverage and accuracy are described in our published methodology and baselines. Nothing in those documents is a guarantee of a specific accuracy score on your own data, and any figures we publish describe the conditions under which they were measured.",
  },
  {
    heading: "Your account",
    content:
      "Some parts of the platform require an account. You agree to give accurate registration information and to keep it current. You are responsible for keeping your credentials confidential and for everything done under your account.\n\nTell us without delay if you believe an account has been used without authorisation.",
  },
  {
    heading: "Acceptable use",
    content:
      "You may use the platform only for lawful purposes and in line with these Terms and with Kuwaiti law, including Law No. 63 of 2015 on Combating Information Technology Crimes and Law No. 20 of 2014 on Electronic Transactions.\n\nYou may not use the platform to break any applicable law; to infringe the rights of others; to send content that is fraudulent, deceptive, defamatory, or unlawful; to attempt unauthorised access to any system or account; to interfere with the operation of the service; to reverse engineer or extract our models; or to configure an AI agent to impersonate a person in a way that misleads the customer it is speaking to.\n\nYou must tell the people your agents speak to that they are speaking to an AI agent when the context does not make this obvious.",
  },
  {
    heading: "Your content and your data",
    content:
      "You keep ownership of the conversations, recordings, documents, and other content you or your customers put into the platform (\"Customer Data\"). You grant us a limited, non-exclusive licence to host, process, and transmit Customer Data for the sole purpose of providing and supporting the service for you.\n\nWe do not sell Customer Data. We do not use one customer's Customer Data to train models that serve another customer, unless you have separately and expressly agreed to it in writing.\n\nYou are responsible for having the legal basis and the consents needed to send Customer Data to us, including any consent required for call recording.",
  },
  {
    heading: "Our intellectual property",
    content:
      "The platform, its interfaces, models, documentation, benchmarks, and the Pair name and marks belong to Pair or our licensors. These Terms give you a right to use the service, not ownership of it. You may not copy, modify, resell, or create derivative works from our materials without our written consent.\n\nFeedback you send us about the platform may be used freely and without obligation to you.",
  },
  {
    heading: "Personal data",
    content:
      "Our handling of personal data is described in our Privacy Policy, and, where we process personal data on your behalf, in the data processing terms of your service agreement.\n\nWe operate in line with the data privacy protection framework issued by the Communication and Information Technology Regulatory Authority (CITRA) in Kuwait, and with any sector rules that apply to you. Where you require data residency in Kuwait, this is agreed in writing in your service agreement.",
  },
  {
    heading: "AI output and human oversight",
    content:
      "AI agents produce probabilistic output. They can be wrong, and they can be wrong confidently. The platform gives you controls to review, score, escalate, and override that output, and we expect you to use them for decisions that carry legal, financial, medical, or safety consequences.\n\nYou remain responsible for what your agents say to your customers, for the guardrails you configure, and for keeping a person in the loop where the decision warrants one.",
  },
  {
    heading: "Availability and support",
    content:
      "We work to keep the service available and schedule maintenance to limit disruption. We do not promise uninterrupted access. Any uptime commitment, support hours, and response targets that apply to you are those stated in your service agreement.\n\nSupport is delivered on the Kuwait working week unless your agreement says otherwise.",
  },
  {
    heading: "Fees",
    content:
      "Fees, billing cycle, currency, and payment terms are those set out in your service agreement or order form. Fees are exclusive of any tax, levy, or bank charge that applies, which is payable by you unless the agreement states otherwise.",
  },
  {
    heading: "Confidentiality",
    content:
      "Each of us may receive information from the other that is marked confidential or that a reasonable person would treat as confidential. Each of us agrees to protect the other's confidential information with at least the care we use for our own, to use it only for the purpose of the engagement, and to disclose it only to people who need it and are bound by equivalent obligations.\n\nThis does not apply to information that is public through no fault of the receiver, was already known without a duty of confidence, or must be disclosed under Kuwaiti law or a lawful order.",
  },
  {
    heading: "Limitation of liability",
    content:
      "To the maximum extent permitted by Kuwaiti law, neither party is liable for indirect or consequential loss, loss of profit, loss of revenue, loss of goodwill, or loss of anticipated savings arising from the service.\n\nAny cap on each party's total liability is that stated in your service agreement. Nothing in these Terms excludes liability that cannot be excluded under Kuwaiti law, including liability for fraud or for death or personal injury caused by negligence.",
  },
  {
    heading: "Indemnity",
    content:
      "You agree to indemnify Pair against claims, losses, and reasonable costs arising from your use of the service in breach of these Terms, from Customer Data you were not entitled to send us, or from content your AI agents produced under a configuration you set.\n\nWe agree to indemnify you against third party claims that the platform, as supplied by us and used in line with these Terms, infringes that third party's intellectual property rights.",
  },
  {
    heading: "Suspension and termination",
    content:
      "We may suspend access where use of the service threatens the security or integrity of the platform, breaches the acceptable use section, or is required to be suspended by law. Where circumstances allow we will give notice first, and restore access once the cause is resolved.\n\nEither party may terminate as set out in the service agreement. On termination your right to use the platform ends. You may export Customer Data during the export window stated in your agreement, after which we may delete it in line with our retention schedule. Sections that by their nature should survive termination will survive it.",
  },
  {
    heading: "Force majeure",
    content:
      "Neither party is liable for a delay or failure caused by an event beyond its reasonable control, including natural disaster, war, civil unrest, epidemic, act of a governmental or regulatory authority, failure of a public telecommunications network, or failure of a third party infrastructure provider.",
  },
  {
    heading: "Governing law and disputes",
    content:
      "These Terms are governed by the laws of the State of Kuwait.\n\nWe will try in good faith to resolve any dispute by discussion first. If that fails, the courts of the State of Kuwait have exclusive jurisdiction, unless your service agreement provides for arbitration, in which case that clause applies.",
  },
  {
    heading: "Language",
    content:
      "These Terms may be published in English and in Arabic. Where there is a conflict between the two versions, the Arabic version governs, in line with Kuwaiti practice.",
  },
  {
    heading: "Changes to these Terms",
    content:
      "We may update these Terms. We will post the updated version here and change the date at the top of this page. Where a change materially affects your rights we will give reasonable notice through the platform or to your registered contact. Continuing to use the service after a change means you accept it.",
  },
  {
    heading: "Contact",
    content:
      "Questions about these Terms: legal@trypair.ai\n\nPair, Kuwait City, State of Kuwait.\n\nBuilt in Kuwait. Paired, not queued.",
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms & Conditions" lastUpdated="August 18, 2026" sections={sections} />;
}
