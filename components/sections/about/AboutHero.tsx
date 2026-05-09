import Image from "next/image";
import { ABOUT_HERO } from "@/lib/about-content";

export default function AboutHero() {
  return (
    <header className="pt-32 pb-12 md:pt-36 md:pb-16 bg-white">
      <div className="mx-auto w-full max-w-[1726px] px-6 lg:px-10">
        <div className="flex flex-col items-center gap-6 text-center xl:max-w-[66.67%] xl:mx-auto">
          <h1 className="text-headline-xl text-balance whitespace-pre-wrap text-sierra-text-dark">
            {ABOUT_HERO.title}
          </h1>
          <p className="max-w-xl text-body-md md:text-body-lg xl:text-headline-sm text-sierra-gray">
            {ABOUT_HERO.subtitle}
          </p>
        </div>
        <div className="relative mt-10 md:mt-12 aspect-square w-full md:aspect-[16/7] overflow-hidden rounded-3xl md:rounded-[2rem]">
          <Image
            src={ABOUT_HERO.image.src}
            alt={ABOUT_HERO.image.alt}
            fill
            preload
            sizes="95vw"
            quality={75}
            style={{ objectPosition: ABOUT_HERO.image.objectPosition }}
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}
