import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CustomerCardData } from "@/lib/about-content";

export default function CustomerCard({ data }: { data: CustomerCardData }) {
  return (
    <Link
      href={data.href}
      aria-label={`${data.company} customer story`}
      className="group relative flex aspect-square lg:aspect-auto lg:min-h-[450px] flex-col justify-between gap-y-6 overflow-hidden rounded-2xl border border-[#e4e0dc] bg-[#f6f5f3] p-4 lg:p-6 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-pair-blue outline-none"
    >
      <Image
        src={data.imageSrc}
        alt={data.imageAlt}
        fill
        sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 90vw"
        quality={60}
        className="absolute inset-0 object-cover opacity-0 motion-safe:transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      <div className="relative flex grow flex-col justify-between gap-y-6">
        <div className="place-self-start ml-2 md:ml-3">
          {data.logoHoverSrc ? (
            <div className="relative inline-block">
              <Image
                src={data.logoSrc}
                alt={data.logoAlt}
                width={240}
                height={72}
                className={`${data.logoClass ?? "max-h-14 md:max-h-16"} w-auto object-contain motion-safe:transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0`}
              />
              <Image
                src={data.logoHoverSrc}
                alt=""
                aria-hidden="true"
                width={240}
                height={72}
                className={`${data.logoClass ?? "max-h-14 md:max-h-16"} w-auto object-contain absolute top-0 left-0 h-full opacity-0 motion-safe:transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100`}
              />
            </div>
          ) : (
            <Image
              src={data.logoSrc}
              alt={data.logoAlt}
              width={240}
              height={72}
              className={`${data.logoClass ?? "max-h-14 md:max-h-16"} w-auto object-contain motion-safe:transition-[filter] duration-300 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert`}
            />
          )}
        </div>

        <div className="flex flex-col gap-y-4 opacity-100 motion-safe:transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 lg:gap-y-5">
          <blockquote className="text-body-md text-sierra-text-dark max-w-prose pr-4 md:pr-0">
            &ldquo;{data.quote}&rdquo;
          </blockquote>
          <figcaption className="flex flex-col gap-0.5">
            <span className="text-body-sm font-medium text-sierra-text-dark">
              {data.authorName}
            </span>
            {data.authorTitle && (
              <span className="text-label-md text-sierra-gray">
                {data.authorTitle}
              </span>
            )}
          </figcaption>
        </div>

        <div className="absolute right-0 bottom-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-pair-blue opacity-0 motion-safe:transition-[border-radius,opacity] duration-300 group-hover:opacity-100 group-focus-visible:rounded-lg group-focus-visible:opacity-100">
          <ArrowRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
