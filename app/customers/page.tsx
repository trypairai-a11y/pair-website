import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import Image from "next/image";

const stories = [
  { company: "Boutiqaat", slug: "boutiqaat", logoSrc: "/logos/Boutiqaat.png", logoClassName: "h-14 w-auto object-contain", quote: "Pair has transformed how we connect with our customers. Every interaction feels personal and on-brand.", author: "Abdulwahab Alessa", role: "Founder & Chief Executive Officer", industry: "Retail" },
  { company: "Cinescape", slug: "cinescape", logoSrc: "/logos/cinescape.png", logoClassName: "h-5 w-auto object-contain", quote: "Our guests now get instant answers at any hour. Pair made that possible without adding headcount.", author: "Nasser Bader Al Rowdan", role: "Chief Executive Officer", industry: "Entertainment" },
  { company: "Provin", slug: "provin", logoSrc: "/logos/provin.png", logoClassName: "h-10 w-auto object-contain", quote: "The AI agent understands our customers and responds in a way that feels natural and helpful every time.", author: "Nezar Al Saleh", role: "Founder & Chief Executive Officer", industry: "Technology" },
  { company: "ktech", slug: "ktech", logoSrc: "/logos/ktech.png", logoClassName: "h-8 w-auto object-contain", quote: "Pair gave us a competitive edge. We resolve customer issues faster and with far greater satisfaction.", author: "Rogerio Barreto Rodrigues", role: "Chief Executive Officer", industry: "Technology" },
  { company: "Flare Fitness", slug: "flare-fitness", logoSrc: "/logos/flare fitness.png", logoClassName: "h-10 w-auto object-contain", quote: "Our members get instant support for class bookings, membership questions, and wellness guidance whenever they need it.", author: "Operations Team", role: "Head of Member Experience", industry: "Health & Wellness" },
  { company: "CCK", slug: "cck", logoSrc: "/logos/cck.png", logoClassName: "h-10 w-auto object-contain", quote: "Pair helps us maintain our high standards of customer service even as we scale to new markets.", author: "Customer Experience Team", role: "Director of Operations", industry: "Food & Beverage" },
  { company: "Future Kid", slug: "future-kid", logoSrc: "/logos/future kid.png", logoClassName: "h-12 w-auto object-contain", quote: "Parents love being able to get instant answers about our facilities, birthday packages, and safety measures.", author: "Guest Relations Team", role: "Head of Guest Experience", industry: "Entertainment" },
  { company: "Macro", slug: "macro", logoSrc: "/logos/macro.png", logoClassName: "h-10 w-auto object-contain", quote: "The precision and reliability of Pair's AI agents give our clients confidence in every interaction.", author: "Product Team", role: "Chief Product Officer", industry: "Financial Services" },
  { company: "Taiba Hospital", slug: "taiba-hospital", logoSrc: "/logos/taiba.png", logoClassName: "h-14 w-auto object-contain", quote: "Patients can now schedule appointments, get answers to medical queries, and access their records instantly.", author: "Patient Services Team", role: "Director of Patient Experience", industry: "Healthcare" },
  { company: "Flash", slug: "flash", logoSrc: "/logos/flash.png", logoClassName: "h-10 w-auto object-contain", quote: "Our customers get real-time delivery updates and instant support, making the entire experience seamless.", author: "Operations Team", role: "Vice President, Customer Operations", industry: "Delivery & Logistics" },
  { company: "Yaqoub Al-Sanea", slug: "yaqoub-al-sanea", logoSrc: "/logos/yaqoub alsanea.png", logoClassName: "h-10 w-auto object-contain", quote: "Pair allows us to provide the same level of personalized service online that our customers experience in-store.", author: "Digital Team", role: "Head of Digital Transformation", industry: "Retail" },
  { company: "Yiswa", slug: "yiswa", logoSrc: "/logos/yiswa.png", logoClassName: "h-10 w-auto object-contain", quote: "With Pair, we scaled our support from hundreds to thousands of users without missing a beat.", author: "Product Team", role: "Co-Founder & CTO", industry: "Technology" },
];

export default function CustomersPage() {
  return (
    <>
      <PageHero tag="Customers" title="Customer stories" description="See how leading brands use Pair to transform their customer experience." />
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((s) => (
              <a key={s.company} href={`/customers/${s.slug}`} className="rounded-2xl border border-sierra-divider p-8 hover:shadow-md transition-shadow block">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Image src={s.logoSrc} alt={s.company} width={120} height={40} className={s.logoClassName} />
                  </div>
                  <span className="text-xs text-sierra-gray bg-sierra-bg px-3 py-1 rounded-full">{s.industry}</span>
                </div>
                <blockquote className="text-sm text-sierra-text leading-relaxed mb-6">&ldquo;{s.quote}&rdquo;</blockquote>
                <p className="text-sm font-medium text-sierra-text-dark leading-none">{s.author}</p>
                <p className="text-xs text-sierra-gray mt-0.5 leading-none">{s.role}</p>
              </a>
            ))}
          </div>
        </Container>
      </section>
      <PageCTA />
    </>
  );
}
