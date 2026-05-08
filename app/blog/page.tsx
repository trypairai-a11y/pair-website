"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";

const posts = [
  { slug: "introducing-pair-agent-os-2", title: "Introducing Pair Agent OS 2.0", date: "Mar 28, 2026", category: "Product", excerpt: "Today we're launching the next generation of our agent platform with new capabilities for enterprise teams." },
  { slug: "boutiqaat-customer-story", title: "How Boutiqaat scaled personal service across the GCC", date: "Mar 24, 2026", category: "Customer story", excerpt: "Learn how Boutiqaat deployed AI agents to deliver personalized beauty and fashion recommendations at scale." },
  { slug: "future-of-voice-ai", title: "The future of voice AI in customer experience", date: "Mar 20, 2026", category: "Research", excerpt: "Our latest research on how voice AI is transforming phone-based customer interactions." },
  { slug: "building-responsible-ai-agents", title: "Building responsible AI agents: Our approach", date: "Mar 14, 2026", category: "Trust", excerpt: "A deep dive into how Pair approaches responsible AI, from guardrails to bias detection." },
  { slug: "outcome-based-pricing", title: "Why outcome-based pricing changes everything", date: "Feb 28, 2026", category: "Insights", excerpt: "How paying for outcomes rather than interactions aligns incentives and delivers more value." },
  { slug: "agent-studio-best-practices", title: "Agent Studio best practices for enterprise teams", date: "Feb 22, 2026", category: "Product", excerpt: "Tips and patterns for building robust AI agent workflows using Agent Studio's visual builder." },
  { slug: "cinescape-customer-story", title: "How Cinescape delivers 24/7 guest support", date: "Feb 18, 2026", category: "Customer story", excerpt: "Cinescape's journey to providing instant, always-on support for their entertainment venues." },
  { slug: "multilingual-ai-agents", title: "Building multilingual AI agents that feel native", date: "Feb 12, 2026", category: "Engineering", excerpt: "Technical insights into how our agents deliver natural conversations in Arabic, English, and 30+ languages." },
  { slug: "ai-agents-healthcare", title: "AI agents in healthcare: Opportunities and guardrails", date: "Feb 5, 2026", category: "Research", excerpt: "How healthcare organizations can deploy AI agents while maintaining compliance and patient trust." },
  { slug: "agent-sdk-getting-started", title: "Getting started with the Pair Agent SDK", date: "Jan 30, 2026", category: "Engineering", excerpt: "A developer's guide to building custom AI agents with our declarative SDK and CI/CD tooling." },
  { slug: "ktech-customer-story", title: "How ktech gained a competitive edge with AI", date: "Jan 24, 2026", category: "Customer story", excerpt: "ktech's strategy for using AI agents to resolve customer issues faster and with greater satisfaction." },
  { slug: "conversational-ai-benchmarks", title: "2026 conversational AI benchmarks", date: "Jan 18, 2026", category: "Research", excerpt: "Our annual analysis of conversational AI performance across industries, channels, and use cases." },
  { slug: "live-assist-launch", title: "Introducing Live Assist: The best of AI and human support", date: "Jan 12, 2026", category: "Product", excerpt: "Seamless handoff between AI agents and human experts with full conversation context." },
  { slug: "security-compliance-update", title: "2026 security and compliance update", date: "Dec 28, 2025", category: "Trust", excerpt: "Our latest certifications, audit results, and commitment to protecting your data." },
  { slug: "retail-ai-agents-guide", title: "The complete guide to AI agents in retail", date: "Dec 20, 2025", category: "Insights", excerpt: "How leading retailers are using AI agents to drive conversion, reduce returns, and build loyalty." },
  { slug: "agent-memory-deep-dive", title: "Agent memory: How Pair agents remember your customers", date: "Dec 14, 2025", category: "Engineering", excerpt: "A technical exploration of how our agents build and use customer context across conversations." },
  { slug: "provin-customer-story", title: "How Provin achieved 85% automated resolution", date: "Dec 8, 2025", category: "Customer story", excerpt: "Provin's approach to deploying AI agents that handle complex technical support inquiries." },
];

const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

export default function BlogPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <PageHero tag="Blog" title="Blog" description="Insights, product updates, and stories from the Pair team." />
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
            {filtered.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="rounded-xl overflow-hidden block">
                <div className="h-40 bg-gradient-to-br from-sierra-bg to-white" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-sierra-green font-medium bg-sierra-green/10 px-2 py-0.5 rounded">{post.category}</span>
                    <span className="text-xs text-sierra-gray">{post.date}</span>
                  </div>
                  <h3 className="text-base font-medium text-sierra-text-dark mb-2">{post.title}</h3>
                  <p className="text-sm text-sierra-gray leading-relaxed">{post.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
