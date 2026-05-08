import Container from "@/components/layout/Container";
import { OFFICES } from "@/lib/about-content";

export default function OfficesLine() {
  return (
    <section className="py-section bg-white">
      <Container narrow>
        <div className="grid grid-cols-12 gap-x-4 gap-y-6 items-start">
          <h2 className="col-span-12 md:col-span-3 xl:col-span-4 text-headline-lg text-sierra-text-dark">
            {OFFICES.headline}
          </h2>
          <p className="col-span-12 md:col-span-8 md:col-start-5 xl:col-span-7 xl:col-start-6 text-headline-md text-sierra-text-dark text-balance">
            {OFFICES.bodyPrefix}
            {OFFICES.cities.map((c, i) => (
              <span key={c.label}>
                <span className="text-pair-blue">{c.label}</span>
                {i < OFFICES.cities.length - 1 ? ", " : ""}
              </span>
            ))}
            {OFFICES.bodyMiddle}
            {OFFICES.remote.map((r, i) => (
              <span key={r.label}>
                <span className="text-pair-blue">{r.label}</span>
                {i < OFFICES.remote.length - 2
                  ? ", "
                  : i === OFFICES.remote.length - 2
                  ? ", and "
                  : ""}
              </span>
            ))}
            {OFFICES.bodySuffix}
          </p>
        </div>
      </Container>
    </section>
  );
}
