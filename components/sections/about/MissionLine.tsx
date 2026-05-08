import Container from "@/components/layout/Container";
import { MISSION } from "@/lib/about-content";

export default function MissionLine() {
  return (
    <section className="py-section bg-white">
      <Container narrow>
        <div className="grid grid-cols-12 gap-x-4 gap-y-6 items-start">
          <h2 className="col-span-12 md:col-span-7 text-headline-md text-sierra-text-dark text-balance">
            {MISSION.headline}
          </h2>
          <p className="col-span-12 md:col-span-5 md:col-start-8 xl:col-span-4 xl:col-start-9 text-body-md text-sierra-gray">
            {MISSION.body}
          </p>
        </div>
      </Container>
    </section>
  );
}
