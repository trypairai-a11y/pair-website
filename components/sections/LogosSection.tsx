import Image from "next/image";
import Container from "@/components/layout/Container";
import { COMPANY_LOGOS } from "@/lib/constants";

export default function LogosSection() {
  return (
    <section className="bg-white pt-section-lg pb-section">
      <Container className="pl-12">
        <div className="text-center mb-8">
          <h2 className="text-headline-sm font-normal text-sierra-text-dark mb-6 text-balance">
            Leading brands succeed with Pair
          </h2>
          <a
            href="/customers"
            className="inline-flex items-center rounded-full bg-sierra-green text-white h-10 px-5 text-[12px] font-medium hover:bg-sierra-green-light transition-colors"
          >
            Customer stories
          </a>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-x-8 gap-y-6 items-center justify-items-center max-w-3xl mx-auto">
          {COMPANY_LOGOS.map((logo) => (
            <div key={logo.name} className="flex items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.name}
                width={160}
                height={48}
                className={logo.imgClassName ?? "h-16 w-auto max-w-[140px] object-contain"}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
