"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";

const resources = [
  { title: "The enterprise guide to AI agents", type: "Whitepaper", description: "A comprehensive guide to evaluating, deploying, and optimizing AI agents for customer experience." },
  { title: "Boutiqaat: Transforming customer experience in e-commerce", type: "Case study", description: "How Boutiqaat deployed Pair to deliver personalized, AI-powered support to millions of customers across the GCC." },
  { title: "Building trust in AI: Security and compliance", type: "Webinar", description: "Join our trust team for a deep dive into Pair's security architecture and compliance certifications." },
  { title: "ROI of conversational AI", type: "Whitepaper", description: "A data-driven analysis of how AI agents impact customer satisfaction, retention, and operational costs." },
  { title: "Getting started with Agent Studio", type: "Guide", description: "A step-by-step walkthrough of building your first AI agent using Pair's no-code Agent Studio." },
  { title: "Voice AI best practices", type: "Guide", description: "Lessons learned from deploying voice AI agents across financial services, healthcare, and retail." },
  { title: "Cinescape: 24/7 guest support in entertainment", type: "Case study", description: "How Cinescape reduced call center volume by 65% while improving guest satisfaction scores." },
  { title: "AI agents for financial services", type: "Whitepaper", description: "Strategies for deploying compliant, trustworthy AI agents in banking, lending, and wealth management." },
  { title: "Introduction to the Pair Agent SDK", type: "Webinar", description: "A hands-on walkthrough of building custom AI agents with our declarative development framework." },
  { title: "Multilingual AI: Serving global customers", type: "Guide", description: "How to configure and optimize AI agents for Arabic, English, and 30+ languages." },
  { title: "ktech: Building competitive advantage with AI", type: "Case study", description: "How ktech reduced routine support tickets by 70% and improved customer satisfaction by 45%." },
  { title: "AI agent security: A CISO's guide", type: "Whitepaper", description: "Everything security leaders need to know about deploying AI agents safely in the enterprise." },
];

const categories = ["All", "Whitepapers", "Case studies", "Webinars", "Guides"];

const categoryMap: Record<string, string> = {
  Whitepapers: "Whitepaper",
  "Case studies": "Case study",
  Webinars: "Webinar",
  Guides: "Guide",
};

export default function ResourcesPage() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All"
      ? resources
      : resources.filter((r) => r.type === categoryMap[active]);

  return (
    <>
      <PageHero tag="Resources" title="Resources" description="Whitepapers, case studies, and guides to help you get the most from Pair." />
      <section className="py-16 bg-white">
        <Container>
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active === cat
                    ? "bg-sierra-green-dark text-white"
                    : "bg-sierra-bg text-sierra-text hover:bg-sierra-divider"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <div key={r.title} className="rounded-xl p-6 cursor-pointer">
                <span className="text-xs text-sierra-green font-medium bg-sierra-green/10 px-2 py-0.5 rounded">{r.type}</span>
                <h3 className="text-base font-medium text-sierra-text-dark mt-3 mb-2">{r.title}</h3>
                <p className="text-sm text-sierra-gray leading-relaxed">{r.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
