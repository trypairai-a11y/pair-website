import Image from "next/image";
import { Sparkles, Handshake, Trophy } from "lucide-react";
import { COMPANY_LOGOS, pageMetadata } from "@/lib/constants";
import LearnMoreForm from "@/components/ui/LearnMoreForm";

export const metadata = pageMetadata(
  "Learn more",
  "Talk to the Pair team about deploying AI agents for your business. Get a tailored walkthrough of the platform."
);

const BULLETS = [
  {
    Icon: Sparkles,
    text: "Empowering customer experience teams to build and manage multichannel AI agents.",
  },
  {
    Icon: Handshake,
    text: "Partnering with your team beyond launch, with hands-on support and continuous improvements.",
  },
  {
    Icon: Trophy,
    text: "Solving complex problems with unparalleled CSAT and resolution rates across every channel.",
  },
];

const INDUSTRIES = [
  "Entertainment",
  "Healthcare",
  "Fitness",
  "Education",
  "Automotive",
  "F&B",
  "Retail",
  "Other",
];

const HERO_LOGO_NAMES = ["Boutiqaat", "ktech", "Flare Fitness", "Cinescape"];
const HERO_LOGOS = HERO_LOGO_NAMES
  .map((name) => COMPANY_LOGOS.find((l) => l.name === name))
  .filter((l): l is (typeof COMPANY_LOGOS)[number] => Boolean(l));

const LOGO_SIZE: Record<string, string> = {
  "Boutiqaat": "h-20",
  "ktech": "h-16",
  "Flare Fitness": "h-16 -translate-y-1",
  "Cinescape": "h-5 translate-y-1",
};

function TrustedLogos({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-base font-medium text-sierra-gray mb-8">Trusted by leading brands</p>
      <div className="flex flex-nowrap items-center gap-x-12">
        {HERO_LOGOS.map((logo) => (
          <Image
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            width={300}
            height={120}
            unoptimized
            className={`${LOGO_SIZE[logo.name] ?? "h-12"} w-auto object-contain grayscale opacity-60`}
          />
        ))}
      </div>
    </div>
  );
}

export default function LearnMorePage() {
  return (
    <section className="pt-32 lg:pt-36 pb-12 md:pb-40 lg:pb-56 bg-[#f6f5f3]">
      <div className="mx-auto max-w-[1160px] px-7 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16">
          {/* Left column */}
          <div className="flex flex-col lg:pt-2 xl:pt-4">
            <div className="md:max-w-3xl md:mx-0 lg:max-w-none w-full">
              <h1 className="text-[22px] sm:text-[18px] md:text-[28px] lg:text-[24px] xl:text-[26px] leading-[1.15] md:leading-[1.2] font-normal text-sierra-text-dark text-balance md:text-left lg:leading-[1.3]">
                Pair helps businesses build better, more human customer experiences.
              </h1>

              <ul className="mt-6 md:mt-6 space-y-3 md:space-y-2 max-w-md md:max-w-none lg:space-y-5 lg:max-w-md">
                {BULLETS.map(({ Icon, text }) => (
                  <li key={text} className="flex gap-2.5 md:gap-3 md:items-center lg:items-start">
                    <Icon className="mt-0.5 md:mt-0 lg:mt-1 size-4 md:size-4 lg:size-5 shrink-0 text-sierra-text-dark" strokeWidth={1.75} />
                    <p className="text-[13px] md:text-[13px] leading-snug md:leading-normal lg:leading-relaxed lg:text-[15px] text-sierra-text md:whitespace-nowrap lg:whitespace-normal">{text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <TrustedLogos className="hidden lg:block mt-auto pt-4" />
          </div>

          {/* Right column — form card */}
          <div className="rounded-3xl bg-white p-8 md:p-12">
            <h2 className="text-center text-[18px] md:text-[20px] leading-snug font-normal text-sierra-text-dark mb-10 max-w-none md:max-w-[400px] mx-auto">
              Let us know a bit about yourself,<br className="lg:hidden" /> and we will reach out soon.
            </h2>

            <LearnMoreForm industries={INDUSTRIES} />
          </div>

          {/* Logos — mobile/tablet, below form */}
          <TrustedLogos className="hidden sm:block md:hidden" />
        </div>
      </div>
    </section>
  );
}
