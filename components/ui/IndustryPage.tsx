import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";

export default function IndustryPage({
  industry,
  description,
  useCases,
  quote,
}: {
  industry: string;
  description: string;
  useCases: { title: string; description: string }[];
  quote?: { text: string; author: string; role: string; company: string };
}) {
  return (
    <>
      <PageHero
        tag="Industries"
        title={`AI agents for ${industry.toLowerCase()}`}
        description={description}
      />
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-[28px] leading-8 font-normal text-sierra-text-dark mb-8">
            Use cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="rounded-2xl border border-sierra-divider p-6"
              >
                <h3 className="text-base font-medium text-sierra-text-dark mb-2">
                  {uc.title}
                </h3>
                <p className="text-sm text-sierra-gray leading-relaxed">
                  {uc.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {quote && (
        <section className="py-16 bg-sierra-bg">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <blockquote className="text-lg text-sierra-text leading-relaxed mb-6">
                &ldquo;{quote.text}&rdquo;
              </blockquote>
              <p className="text-sm font-medium text-sierra-text-dark leading-none">
                {quote.author}
              </p>
              <p className="text-xs text-sierra-gray mt-0.5 leading-none">
                {quote.role}, {quote.company}
              </p>
            </div>
          </Container>
        </section>
      )}

      <PageCTA
        title={`Discover what Pair can do for ${industry.toLowerCase()}`}
        description={`Learn how leading ${industry.toLowerCase()} companies are using AI agents to transform their customer experience.`}
      />
    </>
  );
}
