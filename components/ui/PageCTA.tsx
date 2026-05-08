import Link from "next/link";
import Container from "@/components/layout/Container";

export default function PageCTA({
  title = "Discover what Pair can do for you",
  description = "Find out how Pair can help your business build better, more human customer experiences with AI.",
  narrow = false,
}: {
  title?: string;
  description?: string;
  narrow?: boolean;
}) {
  return (
    <section className="py-12 md:py-20 bg-white">
      <Container narrow={narrow}>
        <div className="text-center">
          <h2 className="text-[22px] leading-tight md:text-[32px] md:leading-9 font-normal text-sierra-text-dark mb-3 md:mb-4">
            {title}
          </h2>
          <p className="text-[13px] md:text-base text-sierra-gray mb-6 md:mb-8 max-w-md mx-auto">
            {description}
          </p>
          <Link
            href="/learn-more"
            className="inline-flex items-center rounded-full bg-sierra-green px-5 py-4.5 text-sm font-medium text-white hover:bg-sierra-green-light transition-colors md:px-6 md:py-5 md:text-sm"
          >
            Learn more
          </Link>
        </div>
      </Container>
    </section>
  );
}
