import Image from "next/image";
import Container from "@/components/layout/Container";

export default function AgentOSSection() {
  return (
    <>
      {/* Scroll spacer – starts behind the testimonials card (z-10) and reveals on scroll */}
      <div className="relative z-0 h-[45vh] -mt-[22vh] md:h-[80vh] md:-mt-[40vh]">
        <div className="sticky top-[40%] md:top-[45%] flex items-center justify-center">
          <div className="w-full text-center px-4">
            <h2 className="text-[26px] md:text-[36px] leading-tight font-normal text-sierra-text-dark mb-3">
              Pair Platform
            </h2>
            <p className="text-[13px] md:text-sm font-normal text-sierra-gray">
              Everything, in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard image section */}
      <div className="relative z-10 mt-2 md:mt-4 overflow-clip pt-4 md:pt-10 [mask-image:linear-gradient(to_bottom,black_90%,transparent)]">
        <Container>
          <div className="max-w-6xl mx-auto relative">
            <Image
              src="/product/pair-platform-dashboard.svg"
              alt=""
              width={896}
              height={560}
              className="agent-os-layer agent-os-layer-1 w-full h-auto"
              aria-hidden
            />
            <Image
              src="/product/agent-studio-table.svg"
              alt="Pair Platform dashboard showing insights, conversations, and analytics"
              width={896}
              height={560}
              className="agent-os-layer agent-os-layer-2 absolute inset-0 w-full h-auto"
              priority
            />
            <Image
              src="/product/search-bar.png"
              alt=""
              width={896}
              height={560}
              className="agent-os-layer agent-os-layer-3 absolute inset-0 w-full h-auto"
              aria-hidden
            />
          </div>
        </Container>
        <div className="h-8 w-full md:h-24 lg:h-36 2xl:h-48" />
      </div>
    </>
  );
}
