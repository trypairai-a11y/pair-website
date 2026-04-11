import Container from "@/components/layout/Container";

export default function CTASection() {
  return (
    <section className="bg-white pt-20 pb-14">
      <Container>
        <div className="text-center">
          <h2 className="text-[24px] leading-tight font-medium text-sierra-text-dark mb-6">
            Discover what Pair can do for you
          </h2>
          <p className="text-xs font-medium text-sierra-gray mb-6 max-w-md mx-auto text-balance">
            Find out how Pair can help your business build better, more human
            customer experiences with AI.
          </p>
          <a
            href="/learn-more"
            className="inline-flex items-center rounded-full bg-sierra-green px-7 py-5 text-sm font-medium text-white hover:bg-sierra-green-light transition-colors md:px-8 md:py-5 md:text-base"
          >
            Learn more
          </a>
        </div>
      </Container>
    </section>
  );
}
