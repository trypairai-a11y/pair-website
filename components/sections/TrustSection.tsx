import Image from "next/image";
import Container from "@/components/layout/Container";

const TRUST_BADGES = [
  { name: "SOC 2",        src: "/trust/soc2.png",       width: 2679, height: 3334 },
  { name: "ISO 27001",    src: "/trust/iso27001.png",   width: 2697, height: 3334 },
  { name: "ISO 42001",    src: "/trust/iso42001.png",   width: 2699, height: 3334 },
  { name: "HIPAA",        src: "/trust/hipaa.svg",      width: 648,  height: 800  },
  { name: "GDPR",         src: "/trust/gdpr.svg",       width: 646,  height: 800  },
  { name: "EU AI Act",    src: "/trust/eu-ai-act.svg",  width: 648,  height: 800  },
  { name: "STAR Level 1", src: "/trust/star.png",       width: 2658, height: 3334 },
];

export default function TrustSection() {
  return (
    <section className="bg-white pt-[64px] pb-4">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-[24px] leading-tight font-medium text-sierra-text-dark mb-3">
            Trust and reliability
          </h2>
          <p className="text-xs font-medium text-sierra-gray max-w-lg mx-auto">
            Pair is designed with the highest commitment to trust, security,
            and compliance.
          </p>
        </div>

        {/* Single row, padded sides, never cropped */}
        <div className="flex flex-nowrap items-center justify-center gap-1.5 px-4 overflow-x-auto scrollbar-hide">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.name} className="flex-shrink-0 flex flex-col items-center gap-2">
              <Image
                src={badge.src}
                alt={badge.name}
                width={badge.width}
                height={badge.height}
                className="h-[80px] w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
