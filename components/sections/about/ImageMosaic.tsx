import Image from "next/image";
import Container from "@/components/layout/Container";
import { MOSAIC } from "@/lib/about-content";

export default function ImageMosaic() {
  return (
    <section className="py-section bg-white">
      <Container narrow>
        <div className="grid grid-cols-12 gap-4 xl:gap-6">
          <div className="col-span-12 md:col-span-3 xl:col-span-4 relative aspect-square overflow-hidden rounded-3xl">
            <Image
              src={MOSAIC.small.src}
              alt={MOSAIC.small.alt}
              fill
              sizes="(min-width:768px) 25vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="col-span-12 md:col-span-9 md:col-start-4 xl:col-span-8 xl:col-start-5 relative aspect-[1.618/1] overflow-hidden rounded-3xl">
            <Image
              src={MOSAIC.large.src}
              alt={MOSAIC.large.alt}
              fill
              sizes="(min-width:768px) 75vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
