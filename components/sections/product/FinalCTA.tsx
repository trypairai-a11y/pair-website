import Container from "@/components/layout/Container";
import PillButton from "@/components/ui/PillButton";

export default function FinalCTA() {
  return (
    <section className="py-16 md:py-24 xl:py-32 bg-white">
      <Container>
        <div className="mx-auto flex max-w-3xl xl:max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-medium leading-tight text-sierra-text-dark text-balance">
            See what Pair can do for you
          </h2>
          <p className="max-w-prose xl:max-w-[560px] text-sm md:text-base leading-relaxed text-sierra-gray text-balance">
            Talk to a Pair agent. Decide for yourself.
          </p>
          <div className="mt-2 flex justify-center gap-2">
            <PillButton
              variant="primary"
              href="/learn-more"
              className="!h-12 sm:!h-10 !px-7 sm:!px-4 !font-normal"
            >
              Learn more
            </PillButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
