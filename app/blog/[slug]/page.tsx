import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { ArrowLeft } from "lucide-react";

const posts: Record<string, { title: string; date: string; category: string; author: string; content: string[] }> = {
  "introducing-pair-agent-os-2": {
    title: "Introducing Pair Agent OS 2.0",
    date: "Mar 28, 2026",
    category: "Product",
    author: "Pair Team",
    content: [
      "Today we're excited to announce Pair Agent OS 2.0, the most significant update to our platform since launch. This release represents months of engineering effort and is informed by feedback from hundreds of enterprise customers.",
      "Agent OS 2.0 introduces three major capabilities: multi-agent orchestration for complex workflows, enhanced Agent Studio with visual journey building, and a new Insights dashboard that gives teams unprecedented visibility into agent performance.",
      "Multi-agent orchestration allows enterprises to deploy specialized agents that work together seamlessly. A customer inquiry might start with a triage agent, get routed to a product specialist agent, and hand off to a human expert if needed, all within a single conversation that feels natural and continuous.",
      "The enhanced Agent Studio now supports drag-and-drop journey building, making it possible for non-technical teams to create sophisticated agent workflows. Combined with our new simulation engine, teams can test agent behavior before deployment, reducing time-to-launch by up to 80%.",
      "Our new Insights dashboard brings together conversation analytics, performance metrics, and A/B testing in one place. Teams can identify trends, spot issues early, and continuously optimize their agents based on real data.",
      "Agent OS 2.0 is available today for all Pair customers. Existing agents will automatically benefit from performance improvements, and new features can be enabled through Agent Studio or the SDK.",
    ],
  },
  "boutiqaat-customer-story": {
    title: "How Boutiqaat scaled personal service across the GCC",
    date: "Mar 24, 2026",
    category: "Customer story",
    author: "Pair Team",
    content: [
      "Boutiqaat, the leading beauty and fashion e-commerce platform in the Middle East, serves millions of customers across the GCC region. When they came to Pair, they had a clear challenge: how to maintain the personal, on-brand service their customers love while scaling to meet growing demand.",
      "\"Every interaction with our customers should feel like they're getting advice from a trusted beauty expert,\" says Abdulwahab Alessa, Founder and CEO of Boutiqaat. \"We needed AI that could understand beauty, fashion, and our brand voice.\"",
      "Pair deployed AI agents trained on Boutiqaat's product catalog, brand guidelines, and customer service standards. The agents handle product recommendations, order tracking, returns, and beauty consultations in both Arabic and English.",
      "The results were immediate. Response times dropped by 78%, customer satisfaction scores reached 4.8 out of 5, and Boutiqaat tripled their support capacity without adding headcount. Most importantly, customers consistently report that interactions feel personal and helpful.",
      "\"Pair has transformed how we connect with our customers,\" says Alessa. \"Every interaction feels personal and on-brand. That's exactly what we wanted.\"",
    ],
  },
  "future-of-voice-ai": {
    title: "The future of voice AI in customer experience",
    date: "Mar 20, 2026",
    category: "Research",
    author: "Pair Research Team",
    content: [
      "Voice remains the most natural form of human communication, yet phone-based customer support has barely evolved in decades. Our research team has been studying how voice AI is poised to change that, and the findings are striking.",
      "Across industries, we found that customers still prefer voice for complex, emotional, or urgent issues. Over 60% of consumers say they reach for the phone when they have a problem that matters to them. Yet traditional IVR systems and long hold times have made phone support one of the lowest-rated customer experiences.",
      "Voice AI agents represent a fundamental shift. Unlike IVR systems that force customers through rigid menus, voice AI agents engage in natural conversation, understand context, and can handle complex multi-turn interactions. Our benchmarks show that well-designed voice agents resolve issues 3x faster than traditional phone support.",
      "Key to success is matching the agent's tone and pace to the customer's emotional state. Our research found that voice agents that adapt their speaking style based on conversational cues see 40% higher satisfaction scores than those with a fixed tone.",
      "We're also seeing exciting developments in multilingual voice AI. Pair's voice agents can now handle seamless language switching within a single conversation, a critical capability for markets like the GCC where customers may switch between Arabic and English.",
      "The future of voice AI is not about replacing human agents but about ensuring every customer gets immediate, empathetic, and effective support, regardless of when they call or how complex their issue is.",
    ],
  },
};

function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.content[0]?.slice(0, 160) ?? undefined,
    openGraph: {
      title: post.title,
      description: post.content[0]?.slice(0, 160) ?? undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return (
      <section className="pt-32 pb-16 bg-white">
        <Container>
          <h1 className="text-[44px] leading-[48px] font-normal text-sierra-text-dark mb-4">
            Post not found
          </h1>
          <Link href="/blog" className="text-sm text-sierra-green hover:underline">
            Back to blog
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 pb-8 bg-white">
        <Container>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-sierra-gray hover:text-sierra-text-dark transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-sierra-green font-medium bg-sierra-green/10 px-2 py-0.5 rounded">
              {post.category}
            </span>
            <span className="text-xs text-sierra-gray">{post.date}</span>
          </div>
          <h1 className="text-[44px] leading-[48px] font-normal text-sierra-text-dark mb-4 max-w-3xl">
            {post.title}
          </h1>
          <p className="text-sm text-sierra-gray">By {post.author}</p>
        </Container>
      </section>
      <section className="py-12 bg-white">
        <Container>
          <div className="max-w-3xl">
            {post.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-sm text-sierra-text leading-relaxed mb-6"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="max-w-3xl mt-12 pt-8 border-t border-sierra-divider">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-sierra-green hover:underline"
            >
              <ArrowLeft size={14} />
              Back to all posts
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

export { generateStaticParams };
