import Container from "@/components/layout/Container";
import PillButton from "@/components/ui/PillButton";

export default function ProductHero() {
  return (
    <header className="pt-32 pb-20 md:pt-40 md:pb-24 xl:pt-48 xl:pb-32 bg-white">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl md:text-6xl xl:text-7xl font-normal leading-[1.05] tracking-tight text-sierra-text-dark text-balance">
            Pair Platform
          </h1>
          <p className="max-w-xl text-base md:text-lg xl:text-xl leading-relaxed text-sierra-gray">
            Build, deploy, and trust AI agents
            <br />
            across every customer channel.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <PillButton variant="primary" href="/learn-more" className="!font-normal">
              Learn more
            </PillButton>
          </div>
        </div>
      </Container>
    </header>
  );
}
