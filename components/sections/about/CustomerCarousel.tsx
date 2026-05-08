import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import { CUSTOMERS } from "@/lib/about-content";
import CustomerCard from "./CustomerCard";

export default function CustomerCarousel() {
  return (
    <section
      className="py-section bg-white"
      aria-roledescription="carousel"
      aria-label="Customer stories"
      style={{ position: "relative", zIndex: 4 }}
    >
      <Container narrow>
        <div className="flex flex-col gap-4 pb-8 md:pb-12 xl:pb-14 xl:flex-row xl:items-center xl:justify-between">
          <h2 className="text-headline-lg text-sierra-text-dark text-balance xl:max-w-[66%]">
            Trusted by customer-obsessed teams.
          </h2>
          <a
            href="/customers"
            className="hidden xl:inline-flex shrink-0 items-center gap-2 rounded-full bg-pair-blue text-white h-11 px-5 text-body-sm font-medium motion-safe:transition-colors duration-300 hover:bg-pair-blue-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pair-blue"
          >
            Read more
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </a>
        </div>

        <ul
          aria-live="polite"
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4 xl:mx-0 xl:px-0 xl:grid xl:grid-cols-3 xl:gap-4 xl:overflow-visible xl:snap-none"
        >
          {CUSTOMERS.map((c) => (
            <li
              key={c.company}
              aria-roledescription="slide"
              aria-label={c.company}
              className="snap-start flex-[0_0_85%] md:flex-[0_0_45%] xl:flex-[1_1_auto]"
            >
              <CustomerCard data={c} />
            </li>
          ))}
        </ul>

        <div className="mt-6 flex xl:hidden justify-center">
          <a
            href="/customers"
            className="inline-flex items-center gap-2 rounded-full bg-pair-blue text-white h-11 px-5 text-body-sm font-medium motion-safe:transition-colors duration-300 hover:bg-pair-blue-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pair-blue"
          >
            Read more
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}
