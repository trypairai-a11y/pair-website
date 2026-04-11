import Image from "next/image";
import Container from "@/components/layout/Container";

export default function AgentOSSection() {
  return (
    <>
      {/* Scroll spacer with sticky title pinned at 65% down the viewport */}
      <div className="relative z-0 h-[30vh] -mt-20">
        <div className="sticky top-[65%] flex items-center justify-center">
          <div className="w-full text-center px-4">
            <h2 className="text-[24px] leading-tight font-medium text-sierra-text-dark mb-3">
              Pair Platform
            </h2>
            <p className="text-xs font-medium text-sierra-gray">
              Build, test, and optimize the best AI agents.
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard image section */}
      <div className="relative z-10 mt-4 overflow-clip pt-10 [mask-image:linear-gradient(to_bottom,black_90%,transparent)]">
        <Container>
          <div className="max-w-4xl mx-auto relative">
            <Image
              src="/product/pair-platform-dashboard .svg"
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
              src="/product/search bar.png"
              alt=""
              width={896}
              height={560}
              className="agent-os-layer agent-os-layer-3 absolute inset-0 w-full h-auto"
              aria-hidden
            />
          </div>
        </Container>
        <div className="h-24 w-full lg:h-36 2xl:h-48" />
      </div>
    </>
  );
}
