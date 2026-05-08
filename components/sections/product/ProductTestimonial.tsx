import Container from "@/components/layout/Container";

export default function ProductTestimonial() {
  return (
    <section className="py-24 md:py-24 xl:py-32 bg-white">
      <Container>
        <div className="mx-auto flex max-w-md md:max-w-3xl xl:max-w-5xl flex-col items-center gap-6 xl:gap-8 text-center">
          <blockquote className="text-xl md:text-4xl xl:text-5xl xl:leading-[1.1] font-medium text-sierra-text-dark text-balance">
            Parents walk in asking for Kadi by name. She booked the appointment and walked them through every form. Kadi is our AI agent. To parents, she&apos;s just Kadi.
          </blockquote>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-sierra-text-dark">
              Admissions Team
            </p>
            <p className="text-sm text-sierra-gray">
              ktech
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
