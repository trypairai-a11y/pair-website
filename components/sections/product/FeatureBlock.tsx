import Container from "@/components/layout/Container";
import FeatureMedia from "@/components/sections/product/FeatureMedia";
import type { ProductFeature } from "@/app/product/_data";

export default function FeatureBlock({
  title,
  body,
  imageSide,
  media,
}: ProductFeature) {
  const figureColStart =
    imageSide === "left"
      ? "md:col-start-1 xl:col-start-2"
      : "md:col-start-8 xl:col-start-8";
  const copyColStart =
    imageSide === "left"
      ? "md:col-start-6 xl:col-start-8"
      : "md:col-start-1 xl:col-start-2";
  const copyAlign = imageSide === "left" ? "md:pl-6 xl:pl-0" : "md:pr-6 xl:pr-0";
  const sectionBg = imageSide === "left" ? "bg-sierra-bg" : "bg-white";
  const figureBg = imageSide === "left" ? "bg-white" : "bg-sierra-bg";

  return (
    <section className={`py-10 md:py-24 xl:py-32 ${sectionBg}`}>
      <Container narrow>
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 gap-y-6 isolate">
          <div
            className={`col-span-12 md:row-start-1 md:col-span-5 xl:col-span-4 ${figureColStart}`}
          >
            <div className={`relative aspect-square w-full overflow-hidden rounded-2xl xl:rounded-3xl ${figureBg}`}>
              <FeatureMedia media={media} />
            </div>
          </div>

          <div
            className={`col-span-12 flex flex-col md:row-start-1 md:col-span-7 md:max-w-[475px] md:self-center xl:col-span-4 ${copyColStart} ${copyAlign}`}
          >
            <h2 className="text-2xl md:text-4xl xl:text-[40px] xl:leading-[1.15] font-normal md:font-medium text-sierra-text-dark text-balance">
              {title}
            </h2>
            <p className="mt-5 md:mt-6 text-sm md:text-lg leading-relaxed text-sierra-gray">
              {body}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
