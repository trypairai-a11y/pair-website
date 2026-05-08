import { pageMetadata } from "@/lib/constants";
import LegalPage from "@/components/ui/LegalPage";

export const metadata = pageMetadata(
  "Terms & Conditions",
  "Terms of use for the Pair website and platform."
);

const sections = [
  {
    heading: "Acceptance of terms",
    content:
      "These Terms and Conditions (\"Terms\") govern your access to and use of the Pair Technologies, Inc. (\"Pair\") website, platform, and services. By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our services.",
  },
  {
    heading: "Description of services",
    content:
      "Pair provides an AI-powered customer experience platform that enables businesses to deploy conversational AI agents across multiple channels. Our services include the Pair Agent OS platform, Agent Studio, Agent SDK, analytics and insights tools, and related support services.",
  },
  {
    heading: "Account registration",
    content:
      "To access certain features of our services, you must register for an account. You agree to provide accurate, current, and complete information during registration and to keep your account information updated. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
  },
  {
    heading: "Acceptable use",
    content:
      "You agree to use our services only for lawful purposes and in accordance with these Terms. You may not use our services to violate any applicable laws or regulations; infringe upon the rights of others; transmit harmful, fraudulent, or deceptive content; attempt to gain unauthorized access to our systems; interfere with the proper functioning of our services; or use our AI agents to generate content that is misleading, harmful, or discriminatory.",
  },
  {
    heading: "Intellectual property",
    content:
      "All content, features, and functionality of our services, including but not limited to text, graphics, logos, software, and AI models, are owned by Pair or our licensors and are protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works based on our proprietary materials without our prior written consent.\n\nYou retain ownership of any content you provide through our platform. By submitting content, you grant Pair a non-exclusive, worldwide license to use, process, and store such content solely for the purpose of providing our services.",
  },
  {
    heading: "Data processing",
    content:
      "Our processing of personal data is governed by our Privacy Policy and any applicable Data Processing Agreement. For enterprise customers, data processing terms are specified in the applicable service agreement.",
  },
  {
    heading: "Service level and availability",
    content:
      "We strive to maintain high availability of our services but do not guarantee uninterrupted access. We may perform scheduled maintenance, during which services may be temporarily unavailable. Specific uptime commitments, if applicable, are outlined in your service agreement.",
  },
  {
    heading: "Limitation of liability",
    content:
      "To the maximum extent permitted by law, Pair shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your access to or use of our services.",
  },
  {
    heading: "Indemnification",
    content:
      "You agree to indemnify, defend, and hold harmless Pair and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising out of or related to your use of our services, your violation of these Terms, or your violation of any rights of another party.",
  },
  {
    heading: "Termination",
    content:
      "We may terminate or suspend your access to our services at any time, with or without cause, upon notice. Upon termination, your right to use our services will immediately cease. Provisions that by their nature should survive termination will remain in effect.",
  },
  {
    heading: "Governing law",
    content:
      "These Terms are governed by the laws of the State of California, without regard to its conflict of laws provisions. Any disputes arising from these Terms shall be resolved in the courts located in San Francisco County, California.",
  },
  {
    heading: "Changes to these terms",
    content:
      "We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on our website. Your continued use of our services after such changes constitutes acceptance of the modified Terms.",
  },
  {
    heading: "Contact",
    content:
      "If you have questions about these Terms, please contact us at legal@pair.ai.",
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms & Conditions" lastUpdated="March 1, 2026" sections={sections} />;
}
