import Image from "next/image";
import Link from "next/link";
import HeroDynamic from "@/components/sections/HeroDynamic";

/* ------------------------------------------------------------------ */
/*  HeroSection — server-rendered shell                                */
/*                                                                     */
/*  All static UI (headline, button, LQIP backdrop, LCP poster) is     */
/*  plain HTML so it paints instantly on first byte with zero React    */
/*  boot-up cost. The interactive video + chat bubble pieces are       */
/*  isolated in HeroDynamic, which hydrates separately.                */
/* ------------------------------------------------------------------ */

export default function HeroSection() {
  return (
    <header
      className="relative h-[100svh] w-full overflow-hidden md:h-[88svh] xl:h-[92svh]"
      style={{
        // Inline LQIP (24px-wide JPEG, ~280 bytes) of the first hero scene so
        // the header paints a colour-correct blurred backdrop during HTML
        // parse — the poster and then the video crossfade over it.
        background:
          "#000 url(\"data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAHAAbAAD//gAQTGF2YzYyLjI4LjEwMAD/2wBDAAgoKC8oLzc3Nzc3N0E8QUNDQ0FBQUFDQ0NISEhVVVVISEhDQ0hIUFBVVVxfXFdXVVdfX2RkZHh4c3OMjJGsrM//xABfAAADAQEAAAAAAAAAAAAAAAAFBwYCBAEBAQEAAAAAAAAAAAAAAAAAAwACEAABAwIGAwEAAAAAAAAAAAABAgAxEQMSURMhMkGhYYHxEQEAAAAAAAAAAAAAAAAAAAAA/8AAEQgADgAYAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8AaN2WI1ClYEAcvrypeIxm4BdzkN6lVSfQ6YEMS8vCqKx+vk1RkfDD26lCd+3SOYf/2Q==\") center/cover no-repeat",
      }}
    >
      {/* First-scenario poster as a priority Image — Next will serve AVIF/WebP
          and inject a high-priority preload. This is the LCP candidate; the
          videos crossfade in on top once they're ready. */}
      <Image
        src="/hero/posters/Timeline 2.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover object-center"
      />

      {/* Videos + chat bubbles — only client-hydrated piece on this page. */}
      <HeroDynamic />

      {/* Headline + CTA — pure server HTML, painted immediately. */}
      <div className="relative z-10 mt-28 h-[calc(100%-(var(--spacing)*28))] xl:mt-32 xl:h-[calc(100%-(var(--spacing)*32))]">
        <div className="mx-auto w-full max-w-[1160px] px-7 lg:px-10 xl:pl-6 relative h-full">
          <h1
            className="mt-36 mb-6 text-[32px] leading-[1.05] font-normal whitespace-pre-wrap text-white md:mt-48 md:mb-8 md:text-[44px] md:font-normal lg:mt-[6rem] lg:text-[40px] lg:font-normal xl:mt-[16rem] xl:text-[48px]"
            style={{ WebkitFontSmoothing: "subpixel-antialiased", MozOsxFontSmoothing: "auto", color: "#ffffff" }}
          >
            {"The first AI\nthat sounds\nlike a Kuwaiti."}
          </h1>
          <Link
            href="/learn-more"
            className="inline-flex items-center rounded-full bg-white text-black font-light h-10 px-4 text-[13px] md:font-normal md:h-auto md:px-7 md:py-5 md:text-[13px] md:bg-white/95 md:hover:bg-white md:hover:text-pair-blue lg:h-14 lg:px-10 lg:py-0 lg:text-[14px] hover:text-blue-600 transition-colors duration-75"
          >
            Learn more
          </Link>
        </div>
      </div>
    </header>
  );
}
