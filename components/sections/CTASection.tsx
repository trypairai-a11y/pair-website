import Container from "@/components/layout/Container";

export default function CTASection() {
  return (
    <section className="bg-white pt-22 pb-16">
      <Container>
        <div className="text-center">
          <h2 className="text-[24px] md:text-[32px] leading-tight font-normal text-sierra-text-dark mb-6">
            Discover what Pair can do for you
          </h2>
          <p className="text-[13px] font-normal text-sierra-gray mb-7 max-w-md mx-auto text-balance">
            Find out how Pair can help your business build better, more human
            customer experiences with AI.
          </p>
          <a
            href="/learn-more"
            className="inline-flex items-center rounded-full bg-sierra-green px-8 py-5 text-[13px] font-normal text-white hover:bg-sierra-green-light transition-colors md:px-7 md:py-5 md:text-sm"
          >
            Learn more
          </a>
        </div>
      </Container>
    </section>
  );
}
