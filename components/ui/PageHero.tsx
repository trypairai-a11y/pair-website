import Container from "@/components/layout/Container";

export default function PageHero({
  title,
  description,
  tag,
  narrow = false,
}: {
  title: string;
  description: string;
  tag?: string;
  narrow?: boolean;
}) {
  return (
    <section className="pt-32 pb-16 bg-white">
      <Container narrow={narrow}>
        {tag && (
          <span className="inline-block text-xs font-medium text-sierra-green tracking-wider uppercase mb-4">
            {tag}
          </span>
        )}
        <h1 className="text-[44px] leading-[48px] font-normal text-sierra-text-dark mb-4 max-w-3xl">
          {title}
        </h1>
        <p className="text-sm md:text-lg text-sierra-gray max-w-2xl">{description}</p>
      </Container>
    </section>
  );
}
