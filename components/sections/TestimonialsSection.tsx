import Image from "next/image";
import Container from "@/components/layout/Container";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  return (
    <section className="relative z-10 bg-white pt-10 pb-32 lg:pb-40 rounded-b-[2rem] [box-shadow:0_60px_80px_-10px_rgba(140,170,210,0.3)]">
      <Container>
        <h2 className="text-[20px] md:text-[26px] lg:text-[30px] xl:text-[33px] leading-tight font-normal text-sierra-text-dark text-center mb-14 lg:mb-16 xl:mb-20 whitespace-nowrap">
          The results speak for themselves
        </h2>

        <div className="max-w-[680px] md:max-w-[900px] lg:max-w-[980px] xl:max-w-[1060px] mx-auto flex flex-col gap-0 md:grid md:grid-cols-2 md:gap-x-32 md:gap-y-8 lg:gap-x-40 lg:gap-y-10 xl:gap-x-48 xl:gap-y-12">
          {TESTIMONIALS.map((t) => (
            <div key={t.company} className="flex flex-col items-center text-center pb-4 md:pb-0">
              {/* Logo */}
              <div className={`flex items-center justify-center min-h-[40px] lg:min-h-[44px] xl:min-h-[48px] ${t.logoContainerClassName ?? ""}`}>
                {t.logoSrc ? (
                  <Image
                    src={t.logoSrc}
                    alt={t.company}
                    width={220}
                    height={64}
                    className={t.logoClassName ?? "h-16 lg:h-[72px] xl:h-20 w-auto max-w-[260px] lg:max-w-[290px] xl:max-w-[320px] object-contain"}
                  />
                ) : (
                  <span className="text-[18px] lg:text-[22px] xl:text-[24px] font-medium text-sierra-text-dark tracking-tight">
                    {t.company}
                  </span>
                )}
              </div>
              {/* Quote */}
              <blockquote className="text-[11px] lg:text-[12.5px] xl:text-[14px] leading-[1.2] text-sierra-gray font-normal max-w-[420px] lg:max-w-[470px] xl:max-w-[520px] text-balance -mt-0.5 lg:-mt-1 xl:-mt-1.5">
                {t.quote[0]}
                <br />
                {t.quote[1]}
              </blockquote>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
