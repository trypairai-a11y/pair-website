import Container from "@/components/layout/Container";
import FeatureMedia from "@/components/sections/product/FeatureMedia";
import type { ProductFeature } from "@/app/product/_data";

export default function FeatureBlock({
  title,
  body,
  imageSide,
  bgTone,
  media,
  eyebrow,
}: ProductFeature) {
  const sectionBg = bgTone === "tinted" ? "bg-sierra-bg" : "bg-white";
  const figureBg = bgTone === "tinted" ? "bg-white" : "bg-sierra-bg";

  const figureColStart =
    imageSide === "left"
      ? "md:col-start-1 xl:col-start-2"
      : "md:col-start-8 xl:col-start-8";
  const copyColStart =
    imageSide === "left"
      ? "md:col-start-7 xl:col-start-7"
      : "md:col-start-1 xl:col-start-2";
  const copyAlign = imageSide === "left" ? "md:pl-2" : "md:pr-2";

  return (
    <section className={`py-16 md:py-24 xl:py-32 ${sectionBg}`}>
      <Container>
        <div className="grid grid-cols-12 gap-y-8 gap-x-6 md:gap-8 items-center">
          <div
            className={`col-span-12 md:col-span-5 xl:col-span-4 ${figureColStart} md:row-start-1`}
          >
            <div
              className={`relative aspect-square w-full overflow-hidden rounded-2xl xl:rounded-3xl ${figureBg} flex items-center justify-center`}
            >
              <FeatureMedia media={media} />
            </div>
          </div>

          <div
            className={`col-span-12 md:col-span-7 xl:col-span-4 ${copyColStart} md:row-start-1 ${copyAlign}`}
          >
            <div className="flex flex-col gap-4 md:gap-6 max-w-[475px]">
              {eyebrow && (
                <div className="self-start inline-flex items-center rounded-full border border-pair-blue/25 bg-white px-3 py-1.5 text-xs font-medium text-sierra-text-dark">
                  {eyebrow}
                </div>
              )}
              <h2 className="text-3xl md:text-4xl xl:text-[40px] xl:leading-[1.15] font-medium text-sierra-text-dark text-balance">
                {title}
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-sierra-gray">
                {body}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
