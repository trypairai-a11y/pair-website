import Image from "next/image";
import Link from "next/link";

type CustomerCardProps = {
  company: string;
  slug?: string;
  logoSrc?: string;
  imageSrc: string;
  metricLabel: string;
  metricValue: string;
  tagline: string;
  featured?: boolean;
  hideLogo?: boolean;
  naturalLogo?: boolean;
  zoomOut?: boolean;
  zoomIn?: boolean;
  largerLogo?: boolean;
  objectTop?: boolean;
  brandColor?: string;
};

export default function CustomerCard({
  company,
  slug,
  logoSrc,
  imageSrc,
  metricLabel,
  metricValue,
  tagline,
  featured = false,
  hideLogo = false,
  naturalLogo = false,
  zoomOut = false,
  zoomIn = false,
  largerLogo = false,
  objectTop = false,
  brandColor,
}: CustomerCardProps) {
  const image = (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-2xl ${brandColor ? "" : "bg-sierra-bg"}`}
      style={brandColor ? { backgroundColor: brandColor } : undefined}
    >
      {!brandColor && (
        <Image
          src={imageSrc}
          alt={company}
          fill
          sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
          className={`object-cover ${objectTop ? "object-top" : ""} ${zoomOut ? "scale-100" : zoomIn ? "scale-[1.3]" : "scale-110"}`}
        />
      )}
      {!brandColor && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
      )}
      {!hideLogo && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={`${company} logo`}
              width={400}
              height={120}
              className={`${largerLogo ? "max-h-[42%] max-w-[78%]" : "max-h-[34%] max-w-[64%]"} object-contain ${naturalLogo ? "opacity-95" : "brightness-0 invert"}`}
            />
          ) : (
            <span className="px-4 text-center text-2xl md:text-3xl font-medium tracking-tight text-white">
              {company}
            </span>
          )}
        </div>
      )}
      <div className="absolute bottom-8 left-5 text-white">
        <p className="text-[10px] md:text-xs leading-none opacity-85">{metricLabel}</p>
        <p className="mt-1.5 text-[15px] md:text-lg font-medium leading-none">{metricValue}</p>
      </div>
    </div>
  );

  if (featured) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {image}
        <div className="md:pt-8 lg:pt-12">
          <h2 className="text-[24px] leading-[1.2] md:text-[40px] md:leading-[1.1] font-normal text-sierra-text-dark max-w-md">
            {tagline}
          </h2>
        </div>
      </div>
    );
  }

  const cardBody = (
    <>
      {image}
      <p className="mt-4 text-[14px] md:text-base text-sierra-text-dark leading-snug max-w-[28ch]">
        {tagline}
      </p>
    </>
  );

  if (slug) {
    return (
      <Link
        href={`/customers/${slug}`}
        aria-label={`${company} customer story`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pair-blue rounded-2xl"
      >
        {cardBody}
      </Link>
    );
  }

  return <div className="block">{cardBody}</div>;
}
