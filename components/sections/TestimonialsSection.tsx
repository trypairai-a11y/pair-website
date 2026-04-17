import Image from "next/image";
import Container from "@/components/layout/Container";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  return (
    <section className="relative z-10 bg-white pt-10 pb-20 rounded-b-[2rem] [box-shadow:0_60px_80px_-10px_rgba(140,170,210,0.3)]">
      <Container>
        <h2 className="text-[24px] leading-tight font-normal text-sierra-text-dark text-center mb-9 whitespace-nowrap">
          Hear it from them.
        </h2>

        <div className="max-w-[680px] mx-auto flex flex-col gap-0">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="flex flex-col items-center text-center pb-4">
              {/* Logo */}
              <div className={`flex items-center justify-center min-h-[48px] ${t.logoContainerClassName ?? "mb-1"}`}>
                <Image
                  src={t.logoSrc}
                  alt={t.company}
                  width={220}
                  height={64}
                  className={t.logoClassName ?? "h-16 w-auto max-w-[260px] object-contain"}
                />
              </div>
              {/* Quote */}
              <blockquote className="text-[11px] leading-[1.4] text-sierra-gray font-medium mb-3.5 max-w-[420px] -mt-0.5 text-balance">
                {t.quote}
              </blockquote>
              {/* Attribution */}
              <p className="text-[9.5px] font-normal text-sierra-text-dark leading-none mt-3">{t.name}</p>
              <p className="text-[9px] text-sierra-gray font-medium mt-1.5 leading-none">{t.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
