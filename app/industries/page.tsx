import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import { Landmark, HeartPulse, Radio, Film, Plane, ShoppingBag, Cpu } from "lucide-react";

const industries = [
  { icon: <Landmark size={20} />, title: "Financial services", href: "/industries/financial-services", description: "Account management, fraud detection, and loan processing." },
  { icon: <HeartPulse size={20} />, title: "Healthcare", href: "/industries/healthcare", description: "Patient scheduling, claims processing, and care coordination." },
  { icon: <Radio size={20} />, title: "Telecommunications", href: "/industries/telecommunications", description: "Billing support, technical troubleshooting, and plan management." },
  { icon: <Film size={20} />, title: "Media", href: "/industries/media", description: "Subscription management, content recommendations, and account support." },
  { icon: <Plane size={20} />, title: "Travel and hospitality", href: "/industries/travel-transportation-hospitality", description: "Booking management, loyalty programs, and concierge services." },
  { icon: <ShoppingBag size={20} />, title: "Retail and consumer goods", href: "/industries/retail", description: "Order tracking, returns, and product recommendations." },
  { icon: <Cpu size={20} />, title: "Technology", href: "/industries/technology", description: "Technical support, onboarding, and account management." },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero tag="Industries" title="AI agents for every industry" description="Pair powers AI agents across industries, helping companies deliver exceptional customer experiences at scale." />
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind) => (
              <a key={ind.title} href={ind.href} className="rounded-2xl border border-sierra-divider bg-white p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-sierra-green/10 flex items-center justify-center text-sierra-green mb-4">{ind.icon}</div>
                <h3 className="text-base font-medium text-sierra-text-dark mb-2">{ind.title}</h3>
                <p className="text-sm text-sierra-gray leading-relaxed">{ind.description}</p>
              </a>
            ))}
          </div>
        </Container>
      </section>
      <PageCTA />
    </>
  );
}
