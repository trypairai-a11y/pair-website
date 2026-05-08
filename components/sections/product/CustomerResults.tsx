import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import CustomerCard from "@/components/ui/CustomerCard";
import PillButton from "@/components/ui/PillButton";
import { PRODUCT_CUSTOMERS } from "@/app/product/_data";

export default function CustomerResults() {
  return (
    <section className="py-16 md:py-24 xl:py-32 bg-white">
      <Container>
        <div className="flex flex-col gap-6 pb-10 md:flex-row md:items-end md:justify-between md:pb-14">
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-medium leading-tight text-sierra-text-dark text-balance max-w-xl">
            The results speak for themselves
          </h2>
          <PillButton
            variant="secondary"
            href="/customers"
            className="self-start md:self-end"
            iconRight={<ArrowRight size={16} aria-hidden="true" />}
          >
            Our customers
          </PillButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-10">
          {PRODUCT_CUSTOMERS.map((c) => (
            <CustomerCard
              key={c.slug}
              company={c.company}
              slug={c.slug}
              imageSrc={c.imageSrc}
              logoSrc={c.logoSrc}
              metricLabel={c.metricLabel}
              metricValue={c.metricValue}
              tagline={c.tagline}
              naturalLogo={c.naturalLogo}
              hideLogo={c.hideLogo}
              largerLogo={c.largerLogo}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
