import Container from "@/components/layout/Container";

export default function ProductTestimonial() {
  return (
    <section className="py-24 md:py-24 xl:py-32 bg-white">
      <Container>
        <div className="mx-auto flex max-w-md md:max-w-3xl xl:max-w-5xl flex-col items-center gap-6 xl:gap-8 text-center">
          <blockquote className="text-3xl md:text-4xl xl:text-5xl xl:leading-[1.1] font-medium text-sierra-text-dark text-balance">
            Our members stopped asking if Fai was a bot. That is the moment we knew it was actually working.
          </blockquote>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-sierra-text-dark">
              Yousef Alshaea
            </p>
            <p className="text-sm text-sierra-gray">
              CEO, Flare Fitness
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
