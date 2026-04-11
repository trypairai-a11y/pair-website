import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";

export default function AboutPage() {
  return (
    <>
      <PageHero tag="Company" title="About Pair" description="We're building the future of customer experience with conversational AI." />
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-[28px] leading-8 font-normal text-sierra-text-dark mb-6">Our mission</h2>
            <p className="text-base text-sierra-text leading-relaxed mb-4">Pair is on a mission to elevate every customer interaction through AI. We believe that every company deserves AI agents that are as thoughtful, knowledgeable, and empathetic as their best human team members.</p>
            <p className="text-base text-sierra-text leading-relaxed mb-4">Founded by Bret Taylor and Clay Bavor, Pair brings together decades of experience building products used by billions of people. Our team includes leaders from Salesforce, Google, Apple, and Meta, united by a shared vision of what AI can do for businesses and their customers.</p>
          </div>
        </Container>
      </section>
      <section className="py-16 bg-sierra-bg">
        <Container>
          <h2 className="text-[28px] leading-8 font-normal text-sierra-text-dark mb-8">Our values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Customer obsession", description: "Everything we build starts with the customer experience. We measure our success by our customers' success." },
              { title: "Trust first", description: "Security, compliance, and responsible AI aren't features\u2014they're foundations. We earn trust through transparency." },
              { title: "Relentless improvement", description: "We use AI to improve our AI. Every conversation is an opportunity to learn, iterate, and deliver more value." },
            ].map((v) => (
              <div key={v.title}>
                <h3 className="text-base font-medium text-sierra-text-dark mb-2">{v.title}</h3>
                <p className="text-sm text-sierra-gray leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center">
            <h2 className="text-[32px] leading-9 font-normal text-sierra-text-dark mb-4">Join our team</h2>
            <p className="text-base text-sierra-gray mb-8">We&apos;re hiring across engineering, product, design, and go-to-market.</p>
            <a href="/careers" className="inline-flex items-center rounded-full bg-sierra-green px-8 py-3.5 text-sm font-normal text-white hover:bg-sierra-green-light transition-colors">View open roles</a>
          </div>
        </Container>
      </section>
    </>
  );
}
