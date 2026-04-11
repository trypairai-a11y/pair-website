import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";

const features = [
  {
    title: "Natural speech",
    description: "Human-like voice interactions that understand tone, pace, and conversational flow.",
  },
  {
    title: "Multi-language",
    description: "Serve customers in their preferred language with native-quality speech in dozens of languages.",
  },
  {
    title: "Tone matching",
    description: "Your agent adapts its tone to match your brand\u2014whether warm and friendly or professional and precise.",
  },
];

export default function VoicePage() {
  return (
    <>
      <PageHero
        tag="Product"
        title="Voice"
        description="Deploy natural, human-like voice AI agents that handle phone calls with the same quality as your best human agents."
      />
      <section className="py-16 bg-white">
        <Container>
          {/* Voice waveform mockup */}
          <div className="rounded-2xl bg-sierra-bg p-8 mb-16">
            <div className="max-w-lg mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="flex items-center justify-center gap-1 mb-4">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-sierra-green"
                      style={{ height: `${12 + Math.sin(i * 0.5) * 20 + Math.random() * 15}px` }}
                    />
                  ))}
                </div>
                <p className="text-sm text-sierra-text-dark">
                  &quot;I&apos;d like to check on the status of my reservation for next Friday.&quot;
                </p>
                <p className="text-xs text-sierra-gray mt-2">Live transcription</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-sierra-divider p-6">
                <h3 className="text-base font-medium text-sierra-text-dark mb-2">{f.title}</h3>
                <p className="text-sm text-sierra-gray leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <PageCTA />
    </>
  );
}
