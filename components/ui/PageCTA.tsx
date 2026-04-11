import Container from "@/components/layout/Container";

export default function PageCTA({
  title = "Discover what Pair can do for you",
  description = "Find out how Pair can help your business build better, more human customer experiences with AI.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center">
          <h2 className="text-[32px] leading-9 font-normal text-sierra-text-dark mb-4">
            {title}
          </h2>
          <p className="text-base text-sierra-gray mb-8 max-w-md mx-auto">
            {description}
          </p>
          <a
            href="/learn-more"
            className="inline-flex items-center rounded-full bg-sierra-green px-5 py-3.5 text-xs font-normal text-white hover:bg-sierra-green-light transition-colors md:px-6 md:py-4 md:text-sm"
          >
            Learn more
          </a>
        </div>
      </Container>
    </section>
  );
}
