import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";

export default function LegalPage({
  title,
  lastUpdated,
  sections,
}: {
  title: string;
  lastUpdated: string;
  sections: { heading: string; content: string }[];
}) {
  return (
    <>
      <PageHero tag="Legal" title={title} description={`Last updated: ${lastUpdated}`} />
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl">
            {sections.map((s) => (
              <div key={s.heading} className="mb-10">
                <h2 className="text-lg font-medium text-sierra-text-dark mb-3">
                  {s.heading}
                </h2>
                <p className="text-sm text-sierra-gray leading-relaxed whitespace-pre-line">
                  {s.content}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
