import Link from "next/link";
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
        <div className="flex flex-col gap-4 pb-8 md:pb-12 lg:pb-14 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-headline-lg text-sierra-text-dark text-balance lg:max-w-[66%]">
            Our customers.
          </h2>
          <Link
            href="/customers"
            className="hidden lg:inline-flex shrink-0 items-center gap-2 rounded-full bg-pair-blue text-white h-11 px-5 text-body-sm font-medium motion-safe:transition-colors duration-300 hover:bg-pair-blue-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pair-blue"
          >
            Read more
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>

        <ul
          aria-live="polite"
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:snap-none"
        >
          {CUSTOMERS.map((c) => (
            <li
              key={c.company}
              aria-roledescription="slide"
              aria-label={c.company}
              className="snap-start flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[1_1_auto]"
            >
              <CustomerCard data={c} />
            </li>
          ))}
        </ul>

        <div className="mt-6 flex lg:hidden justify-center">
          <Link
            href="/customers"
            className="inline-flex items-center gap-2 rounded-full bg-pair-blue text-white h-11 px-5 text-body-sm font-medium motion-safe:transition-colors duration-300 hover:bg-pair-blue-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pair-blue"
          >
            Read more
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
