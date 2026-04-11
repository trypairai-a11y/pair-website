import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import Image from "next/image";

export default function CustomerStoryPage({
  company,
  industry,
  logoSrc,
  logoClassName,
  heroQuote,
  challenge,
  solution,
  results,
}: {
  company: string;
  industry: string;
  logoSrc?: string;
  logoClassName?: string;
  heroQuote: { text: string; author: string; role: string };
  challenge: string;
  solution: string;
  results: { metric: string; description: string }[];
}) {
  return (
    <>
      <PageHero
        tag="Customer story"
        title={company}
        description={`How ${company} transformed their customer experience with Pair.`}
      />

      {/* Hero quote */}
      <section className="py-16 bg-sierra-bg">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            {logoSrc && (
              <div className="flex justify-center mb-6">
                <Image
                  src={logoSrc}
                  alt={company}
                  width={160}
                  height={48}
                  className={logoClassName ?? "h-12 w-auto object-contain"}
                />
              </div>
            )}
            <blockquote className="text-lg text-sierra-text leading-relaxed mb-6">
              &ldquo;{heroQuote.text}&rdquo;
            </blockquote>
            <p className="text-sm font-medium text-sierra-text-dark leading-none">
              {heroQuote.author}
            </p>
            <p className="text-xs text-sierra-gray mt-1 leading-none">
              {heroQuote.role}, {company}
            </p>
          </div>
        </Container>
      </section>

      {/* Challenge */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-[28px] leading-8 font-normal text-sierra-text-dark mb-4">
              The challenge
            </h2>
            <p className="text-sm text-sierra-gray leading-relaxed">
              {challenge}
            </p>
          </div>
        </Container>
      </section>

      {/* Solution */}
      <section className="py-16 bg-sierra-bg">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-[28px] leading-8 font-normal text-sierra-text-dark mb-4">
              The Pair solution
            </h2>
            <p className="text-sm text-sierra-gray leading-relaxed">
              {solution}
            </p>
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-[28px] leading-8 font-normal text-sierra-text-dark mb-8">
            Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((r) => (
              <div
                key={r.metric}
                className="rounded-2xl border border-sierra-divider p-6 text-center"
              >
                <p className="text-3xl font-medium text-sierra-green mb-2">
                  {r.metric}
                </p>
                <p className="text-sm text-sierra-gray">{r.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <PageCTA
        title={`See what Pair can do for ${industry.toLowerCase()}`}
        description={`Learn how leading ${industry.toLowerCase()} companies are using AI agents to transform their customer experience.`}
      />
    </>
  );
}
