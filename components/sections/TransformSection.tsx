"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import GradientCard from "@/components/ui/GradientCard";
import { FEATURE_CARDS } from "@/lib/constants";
import { MapPin, Package, Pill, Play, Plus, X } from "lucide-react";
import dynamic from "next/dynamic";

const HERO_GRADIENT =
  "linear-gradient(130deg, rgb(42, 95, 74) 0%, rgb(26, 62, 48) 100%)";

const HeroCardRefContext = createContext<React.RefObject<HTMLDivElement | null> | null>(null);

const RiveChannels = dynamic(() => import("@/components/ui/RiveChannels"), {
  ssr: false,
});

const RivePayForAJob = dynamic(() => import("@/components/ui/RivePayForAJob"), {
  ssr: false,
});

const RemotionEmpowerTeam = dynamic(() => import("@/components/ui/RemotionEmpowerTeam"), {
  ssr: false,
});

function StarRow({ size = 14 }: { size?: number }) {
  return (
    <div className="flex gap-0.5 mt-1.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="rgba(255,255,255,0.95)"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.5"
          className="animate-hero-star"
          style={{ ["--star-delay" as string]: `${i * 0.18}s` }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ProgressBar({ end = 80, delay = 0, dur = 4, thin = false }: { end?: number; delay?: number; dur?: number; thin?: boolean }) {
  return (
    <div className={`mt-2.5 ${thin ? "h-[3px]" : "h-1"} rounded-full bg-white/15 overflow-hidden`}>
      <div
        className="h-full rounded-full bg-white/75 animate-hero-progress"
        style={{
          ["--bar-end" as string]: `${end}%`,
          ["--bar-delay" as string]: `${delay}s`,
          ["--bar-dur" as string]: `${dur}s`,
        }}
      />
    </div>
  );
}

function PulseDot({ color = "rgb(126, 211, 156)" }: { color?: string }) {
  return (
    <span className="relative inline-flex w-2 h-2">
      <span className="absolute inset-0 rounded-full animate-hero-pulse" style={{ background: color }} />
      <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: color }} />
    </span>
  );
}

function Equalizer() {
  return (
    <div className="flex items-end gap-[3px] h-3.5">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-[3px] h-full rounded-full bg-white/70 animate-hero-eq"
          style={{ ["--eq-delay" as string]: `${i * 0.12}s` }}
        />
      ))}
    </div>
  );
}

function CheckBoxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function GlassBubble({ className, children }: { className?: string; children: React.ReactNode }) {
  const heroRef = useContext(HeroCardRefContext);
  const ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const bg = bgRef.current;
    const hero = heroRef?.current;
    if (!el || !bg || !hero) return;

    let animId = 0;
    const update = () => {
      const bubbleRect = el.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();
      bg.style.left = `${heroRect.left - bubbleRect.left}px`;
      bg.style.top = `${heroRect.top - bubbleRect.top}px`;
      bg.style.width = `${heroRect.width}px`;
      bg.style.height = `${heroRect.height}px`;
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [heroRef]);

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-2xl ${className ?? ""}`}>
      {/* Bubble's own painted slice of the hero gradient — blurred for the frosted feel,
          and isolated to this bubble so overlaps don't bleed through */}
      <div
        ref={bgRef}
        className="absolute pointer-events-none"
        style={{
          background: HERO_GRADIENT,
          filter: "saturate(140%) brightness(0.75)",
        }}
      />
      {/* Specular highlight to sell the glass */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(140deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 35%, transparent 60%)",
        }}
      />
      {/* White glass border — fades toward bottom-right */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          boxShadow:
            "inset 0 0 0 1.5px rgba(255,255,255,0.35), inset 0 1px 4px rgba(255,255,255,0.15)",
          WebkitMaskImage:
            "linear-gradient(160deg, black 0%, transparent 50%), linear-gradient(200deg, rgba(0,0,0,0.2) 0%, transparent 25%)",
          maskImage:
            "linear-gradient(160deg, black 0%, transparent 50%), linear-gradient(200deg, rgba(0,0,0,0.2) 0%, transparent 25%)",
          WebkitMaskComposite: "source-over",
          maskComposite: "add",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function AgentBubble({ className, text }: { className: string; text: string }) {
  return (
    <GlassBubble className={`${className} p-5`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center shrink-0">
          <Image
            src="/branding/pair-icon-white.png"
            alt="Pair"
            width={16}
            height={16}
            className="w-4 h-4 object-contain"
          />
        </div>
        <span className="text-white/75 text-[12px]">AI Agent</span>
        <Equalizer />
      </div>
      <p className="text-white text-[15px] leading-snug">{text}</p>
    </GlassBubble>
  );
}

const SCENARIO_STAGGER_SECONDS = 7;
const BUBBLES_PER_SCENARIO = 3;

type BubbleSlot = {
  position: string;
  body: React.ReactNode;
};

const BUBBLES: BubbleSlot[] = [
  // Scenario A — Gym
  {
    position: "top-[12%] left-[6%] w-[320px]",
    body: (
      <GlassBubble className="p-5 text-white">
        <div className="flex items-center justify-between mb-3">
          <p className="text-white/55 text-[10px] uppercase tracking-wider">Flare Fitness</p>
          <span className="text-[10px] text-white/70 flex items-center gap-1.5">
            <PulseDot />
            Member · 1y
          </span>
        </div>
        <div className="flex gap-8 text-[13px]">
          <div>
            <p className="text-white/45 text-[10px] mb-0.5">Next class</p>
            <p className="font-medium">Sun, Sep 7</p>
            <p className="text-white/60">6:00 PM</p>
          </div>
          <div>
            <p className="text-white/45 text-[10px] mb-0.5">Membership</p>
            <p className="font-medium">Gold Tier</p>
            <p className="text-white/60">14 visits</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10px] text-white/55">Progress to VIP</span>
          <span className="text-[10px] text-white/75">82%</span>
        </div>
        <ProgressBar end={82} delay={0.4} dur={3.6} thin />
      </GlassBubble>
    ),
  },
  {
    position: "top-[42%] right-[6%] w-[280px]",
    body: <AgentBubble className="" text="Hi, Danah! Your gold tier's ready to upgrade to VIP." />,
  },
  {
    position: "bottom-[14%] left-[8%] w-[260px]",
    body: (
      <GlassBubble className="p-5 text-white">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <CheckBoxIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[14px] font-medium">Flare Fitness</p>
            <p className="text-white/60 text-[12px]">Upgrade confirmed</p>
          </div>
        </div>
        <StarRow />
      </GlassBubble>
    ),
  },

  // Scenario B — Food Delivery
  {
    position: "top-[12%] right-[6%] w-[320px]",
    body: (
      <GlassBubble className="p-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-white/55 text-[10px] uppercase tracking-wider mb-1.5">Your usual order</p>
            <p className="text-[14px] font-medium leading-tight">Diet Pepsi × 1</p>
            <p className="text-[12px] text-white/60 mt-0.5">French Fries × 1 &nbsp;·&nbsp; 0.750 KD</p>
          </div>
          <span className="shrink-0 text-[12px] bg-white/20 rounded-full px-4 py-2 font-medium text-white cursor-default">
            Reorder
          </span>
        </div>
      </GlassBubble>
    ),
  },
  {
    position: "top-[42%] left-[6%] w-[280px]",
    body: <AgentBubble className="" text="Hi, Danah! Ready to reorder your usual?" />,
  },
  {
    position: "bottom-[14%] right-[8%] w-[280px]",
    body: (
      <GlassBubble className="p-5 text-white">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <MapPin size={12} className="text-white/65" />
            <span className="text-white/65 text-[11px]">Delivery</span>
          </div>
          <span className="text-[10px] bg-white/20 rounded-full px-2.5 py-0.5 flex items-center gap-1.5">
            <PulseDot />
            On its way
          </span>
        </div>
        <p className="text-[22px] font-semibold mt-1.5">ETA 12:05 PM</p>
        <ProgressBar end={78} delay={0.2} dur={4} />
        <div className="mt-1.5 flex justify-between text-[10px] text-white/55">
          <span>Restaurant</span>
          <span>You</span>
        </div>
      </GlassBubble>
    ),
  },

  // Scenario C — Retail
  {
    position: "top-[12%] left-[6%] w-[300px]",
    body: (
      <GlassBubble className="p-5 text-white">
        <p className="text-white/55 text-[10px] uppercase tracking-wider mb-2">Your wishlist</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] font-medium">Nike Pegasus 41</p>
            <p className="text-[12px] text-white/60">Size 42 &nbsp;·&nbsp; Back in stock</p>
          </div>
          <PulseDot />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10px] text-white/55">Stock level</span>
          <span className="text-[10px] text-white/75">12 left</span>
        </div>
        <ProgressBar end={28} delay={0.3} dur={3.2} thin />
      </GlassBubble>
    ),
  },
  {
    position: "top-[42%] right-[6%] w-[280px]",
    body: <AgentBubble className="" text="Hi, Danah! Your size is back in stock." />,
  },
  {
    position: "bottom-[14%] left-[8%] w-[280px]",
    body: (
      <GlassBubble className="p-5 text-white">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Package size={17} className="text-white" />
          </div>
          <div>
            <p className="text-[14px] font-medium">Added to cart</p>
            <p className="text-white/60 text-[12px]">Nike Pegasus 41</p>
          </div>
        </div>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-[20px] font-semibold">32 KD</p>
          <span className="text-[10px] text-white/55 mb-1">Express ships today</span>
        </div>
      </GlassBubble>
    ),
  },

  // Scenario D — Travel
  {
    position: "top-[12%] right-[6%] w-[300px]",
    body: (
      <GlassBubble className="p-5 text-white">
        <p className="text-white/55 text-[10px] uppercase tracking-wider mb-2">Your next stay</p>
        <div>
          <p className="text-[14px] font-medium">Four Seasons Kuwait</p>
          <p className="text-[12px] text-white/60">Oct 15–17 &nbsp;·&nbsp; Sea view</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10px] text-white/55">Loyalty points</span>
          <span className="text-[10px] text-white/75">2,840 / 3,500</span>
        </div>
        <ProgressBar end={81} delay={0.3} dur={3.4} thin />
      </GlassBubble>
    ),
  },
  {
    position: "top-[42%] left-[6%] w-[280px]",
    body: <AgentBubble className="" text="Hi, Danah! Ready to book your favorite suite?" />,
  },
  {
    position: "bottom-[14%] right-[8%] w-[280px]",
    body: (
      <GlassBubble className="p-5 text-white">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <CheckBoxIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[14px] font-medium">Corniche Suite</p>
            <p className="text-white/60 text-[12px]">Upgrade confirmed</p>
          </div>
        </div>
        <StarRow />
      </GlassBubble>
    ),
  },

  // Scenario E — Healthcare
  {
    position: "top-[12%] left-[6%] w-[300px]",
    body: (
      <GlassBubble className="p-5 text-white">
        <p className="text-white/55 text-[10px] uppercase tracking-wider mb-2">Next appointment</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] font-medium">Dr. Al-Khalid</p>
            <p className="text-[12px] text-white/60">Tomorrow 2:30 PM</p>
          </div>
          <PulseDot />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10px] text-white/55">Confirmation</span>
          <span className="text-[10px] text-white/75">Awaiting</span>
        </div>
        <ProgressBar end={48} delay={0.4} dur={3.4} thin />
      </GlassBubble>
    ),
  },
  {
    position: "top-[42%] right-[6%] w-[280px]",
    body: <AgentBubble className="" text="Hi, Danah! Time to confirm your appointment?" />,
  },
  {
    position: "bottom-[14%] left-[8%] w-[280px]",
    body: (
      <GlassBubble className="p-5 text-white">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Pill size={17} className="text-white" />
          </div>
          <div>
            <p className="text-[14px] font-medium">Prescription ready</p>
            <p className="text-white/60 text-[12px]">Pickup today</p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[10px]">
          <span className="text-white/55">Pharmacy queue</span>
          <span className="text-white/75">3 ahead</span>
        </div>
        <ProgressBar end={64} delay={0.3} dur={3.2} thin />
      </GlassBubble>
    ),
  },
];

/* ── Ambient background bubbles — always-on, faded, fill empty space ── */
type AmbientBubble = {
  position: string;
  delay: number;
  dur: number;
  min: number;
  max: number;
  body: React.ReactNode;
};

const AMBIENT_BUBBLES: AmbientBubble[] = [
  {
    position: "top-[6%] left-[40%] w-[150px]",
    delay: 0,
    dur: 9,
    min: 0.16,
    max: 0.3,
    body: (
      <GlassBubble className="p-3 text-white">
        <p className="text-white/55 text-[9px] uppercase tracking-wider mb-1">Today</p>
        <div className="flex items-baseline gap-1.5">
          <p className="text-[15px] font-medium animate-hero-tick">12,840</p>
          <span className="text-[10px] text-white/55">served</span>
        </div>
      </GlassBubble>
    ),
  },
  {
    position: "top-[8%] right-[36%] w-[170px]",
    delay: 1.6,
    dur: 10,
    min: 0.14,
    max: 0.28,
    body: (
      <GlassBubble className="p-3 text-white">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-white/55 text-[9px] uppercase tracking-wider">Resolution</span>
          <span className="text-white/75 text-[10px]">96%</span>
        </div>
        <ProgressBar end={96} delay={0.5} dur={3.6} thin />
      </GlassBubble>
    ),
  },
  {
    position: "top-[28%] left-[36%] w-[130px]",
    delay: 0.8,
    dur: 11,
    min: 0.16,
    max: 0.3,
    body: (
      <GlassBubble className="px-3 py-2 text-white">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-white/65 flex items-center gap-1.5">
            <PulseDot />
            Live
          </span>
          <Equalizer />
        </div>
      </GlassBubble>
    ),
  },
  {
    position: "top-[34%] right-[34%] w-[150px]",
    delay: 2.4,
    dur: 9.5,
    min: 0.14,
    max: 0.26,
    body: (
      <GlassBubble className="p-3 text-white">
        <p className="text-white/55 text-[9px] uppercase tracking-wider mb-1">Avg response</p>
        <p className="text-[15px] font-medium">1.4 sec</p>
      </GlassBubble>
    ),
  },
  {
    position: "top-[58%] left-[42%] w-[160px]",
    delay: 1.1,
    dur: 10.5,
    min: 0.15,
    max: 0.28,
    body: (
      <GlassBubble className="p-3 text-white">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-white/55 text-[9px] uppercase tracking-wider">CSAT</span>
          <span className="text-white/75 text-[10px]">4.9</span>
        </div>
        <StarRow size={11} />
      </GlassBubble>
    ),
  },
  {
    position: "top-[64%] right-[38%] w-[140px]",
    delay: 2.9,
    dur: 9,
    min: 0.16,
    max: 0.3,
    body: (
      <GlassBubble className="px-3 py-2 text-white">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/55">Onboarded</span>
          <span className="text-[12px] font-medium animate-hero-tick">+24%</span>
        </div>
      </GlassBubble>
    ),
  },
  {
    position: "bottom-[8%] left-[42%] w-[170px]",
    delay: 0.6,
    dur: 11,
    min: 0.14,
    max: 0.27,
    body: (
      <GlassBubble className="p-3 text-white">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] uppercase tracking-wider text-white/55">Active chats</span>
          <span className="text-[10px] text-white/75">238</span>
        </div>
        <ProgressBar end={68} delay={0.4} dur={3.8} thin />
      </GlassBubble>
    ),
  },
  {
    position: "bottom-[18%] right-[36%] w-[150px]",
    delay: 2.2,
    dur: 10,
    min: 0.15,
    max: 0.28,
    body: (
      <GlassBubble className="p-3 text-white">
        <p className="text-white/55 text-[9px] uppercase tracking-wider mb-1">Languages</p>
        <p className="text-[13px] font-medium">EN · العربية · हिन्दी</p>
      </GlassBubble>
    ),
  },
  // ── Extra tiny faded blobs — fill the gaps ──────────────────────────────
  {
    position: "top-[3%] left-[28%] w-[90px]",
    delay: 3.4,
    dur: 12,
    min: 0.06,
    max: 0.14,
    body: (
      <GlassBubble className="px-2.5 py-1.5 text-white">
        <p className="text-[9px] text-white/65">Uptime <span className="text-white/85">99.9%</span></p>
      </GlassBubble>
    ),
  },
  {
    position: "top-[4%] right-[24%] w-[80px]",
    delay: 1.9,
    dur: 11,
    min: 0.07,
    max: 0.16,
    body: (
      <GlassBubble className="px-2.5 py-1.5 text-white">
        <div className="flex items-center gap-1.5">
          <PulseDot />
          <span className="text-[9px] text-white/70">238 live</span>
        </div>
      </GlassBubble>
    ),
  },
  {
    position: "top-[16%] left-[32%] w-[110px]",
    delay: 4.1,
    dur: 13,
    min: 0.08,
    max: 0.18,
    body: (
      <GlassBubble className="p-2.5 text-white">
        <p className="text-[9px] text-white/55 uppercase tracking-wider mb-0.5">NPS</p>
        <p className="text-[12px] font-medium">72</p>
      </GlassBubble>
    ),
  },
  {
    position: "top-[18%] right-[28%] w-[100px]",
    delay: 2.7,
    dur: 10.5,
    min: 0.06,
    max: 0.15,
    body: (
      <GlassBubble className="px-2.5 py-1.5 text-white">
        <p className="text-[9px] text-white/65">Latency <span className="text-white/85">82ms</span></p>
      </GlassBubble>
    ),
  },
  {
    position: "top-[22%] left-[52%] w-[70px]",
    delay: 5.2,
    dur: 12.5,
    min: 0.05,
    max: 0.12,
    body: (
      <GlassBubble className="px-2 py-1 text-white">
        <p className="text-[9px] text-white/70">+12%</p>
      </GlassBubble>
    ),
  },
  {
    position: "top-[26%] right-[22%] w-[85px]",
    delay: 0.4,
    dur: 11.5,
    min: 0.07,
    max: 0.16,
    body: (
      <GlassBubble className="px-2.5 py-1.5 text-white">
        <p className="text-[9px] text-white/65">Auto-resolve</p>
        <p className="text-[11px] font-medium">87%</p>
      </GlassBubble>
    ),
  },
  {
    position: "top-[44%] left-[40%] w-[120px]",
    delay: 3.8,
    dur: 11,
    min: 0.07,
    max: 0.16,
    body: (
      <GlassBubble className="p-2.5 text-white">
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-white/55 uppercase tracking-wider">Retention</span>
          <span className="text-[10px] text-white/75">91%</span>
        </div>
        <ProgressBar end={91} delay={0.5} dur={3.6} thin />
      </GlassBubble>
    ),
  },
  {
    position: "top-[48%] right-[42%] w-[80px]",
    delay: 1.3,
    dur: 12,
    min: 0.05,
    max: 0.13,
    body: (
      <GlassBubble className="px-2.5 py-1.5 text-white">
        <p className="text-[9px] text-white/70">FRT 0.9s</p>
      </GlassBubble>
    ),
  },
  {
    position: "top-[50%] left-[24%] w-[90px]",
    delay: 4.6,
    dur: 13,
    min: 0.06,
    max: 0.14,
    body: (
      <GlassBubble className="px-2.5 py-1.5 text-white">
        <div className="flex items-center gap-1.5">
          <PulseDot />
          <span className="text-[9px] text-white/65">Streaming</span>
        </div>
      </GlassBubble>
    ),
  },
  {
    position: "top-[52%] right-[24%] w-[100px]",
    delay: 2.0,
    dur: 11,
    min: 0.07,
    max: 0.16,
    body: (
      <GlassBubble className="p-2.5 text-white">
        <p className="text-[9px] text-white/55 uppercase tracking-wider mb-0.5">Channels</p>
        <p className="text-[11px] font-medium">7 active</p>
      </GlassBubble>
    ),
  },
  {
    position: "top-[72%] left-[34%] w-[110px]",
    delay: 3.3,
    dur: 10.5,
    min: 0.07,
    max: 0.16,
    body: (
      <GlassBubble className="p-2.5 text-white">
        <p className="text-[9px] text-white/55 uppercase tracking-wider mb-0.5">Self-serve</p>
        <p className="text-[11px] font-medium">74%</p>
      </GlassBubble>
    ),
  },
  {
    position: "top-[76%] right-[26%] w-[85px]",
    delay: 5.0,
    dur: 12,
    min: 0.05,
    max: 0.13,
    body: (
      <GlassBubble className="px-2.5 py-1.5 text-white">
        <p className="text-[9px] text-white/70">Tier Gold</p>
      </GlassBubble>
    ),
  },
  {
    position: "top-[80%] left-[52%] w-[75px]",
    delay: 0.9,
    dur: 13.5,
    min: 0.05,
    max: 0.12,
    body: (
      <GlassBubble className="px-2 py-1 text-white">
        <p className="text-[9px] text-white/70">×3.4 LTV</p>
      </GlassBubble>
    ),
  },
  {
    position: "bottom-[28%] left-[28%] w-[100px]",
    delay: 4.2,
    dur: 11,
    min: 0.06,
    max: 0.15,
    body: (
      <GlassBubble className="px-2.5 py-1.5 text-white">
        <p className="text-[9px] text-white/65">Voice mins</p>
        <p className="text-[11px] font-medium">4,210</p>
      </GlassBubble>
    ),
  },
  {
    position: "bottom-[32%] right-[44%] w-[70px]",
    delay: 2.5,
    dur: 12.5,
    min: 0.05,
    max: 0.12,
    body: (
      <GlassBubble className="px-2 py-1 text-white">
        <p className="text-[9px] text-white/70">99.5%</p>
      </GlassBubble>
    ),
  },
  {
    position: "bottom-[4%] left-[26%] w-[110px]",
    delay: 1.7,
    dur: 11.5,
    min: 0.07,
    max: 0.16,
    body: (
      <GlassBubble className="p-2.5 text-white">
        <p className="text-[9px] text-white/55 uppercase tracking-wider mb-0.5">Effort score</p>
        <p className="text-[11px] font-medium">1.2 / 5</p>
      </GlassBubble>
    ),
  },
  {
    position: "bottom-[6%] right-[26%] w-[85px]",
    delay: 3.6,
    dur: 13,
    min: 0.06,
    max: 0.14,
    body: (
      <GlassBubble className="px-2.5 py-1.5 text-white">
        <p className="text-[9px] text-white/70">Agents 14 on</p>
      </GlassBubble>
    ),
  },
  {
    position: "bottom-[12%] left-[58%] w-[80px]",
    delay: 4.9,
    dur: 12,
    min: 0.05,
    max: 0.13,
    body: (
      <GlassBubble className="px-2.5 py-1.5 text-white">
        <p className="text-[9px] text-white/70">+148 today</p>
      </GlassBubble>
    ),
  },
  {
    position: "bottom-[24%] left-[58%] w-[95px]",
    delay: 0.2,
    dur: 11,
    min: 0.06,
    max: 0.15,
    body: (
      <GlassBubble className="px-2.5 py-1.5 text-white">
        <p className="text-[9px] text-white/55 uppercase tracking-wider mb-0.5">Tickets</p>
        <p className="text-[11px] font-medium">1,420 cleared</p>
      </GlassBubble>
    ),
  },
];

function HeroIllustration({ paused, heroRef }: { paused: boolean; heroRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <HeroCardRefContext.Provider value={heroRef}>
      <div className={`relative w-full h-full min-h-[380px] md:min-h-[360px] overflow-hidden${paused ? " hero-paused" : ""}`}>
        {/* Ambient bubble bed — fills empty space, always-on, faded */}
        <div className="hidden md:block absolute inset-0 pointer-events-none" aria-hidden="true">
          {AMBIENT_BUBBLES.map((b, i) => (
            <div
              key={`amb-${i}`}
              className={`absolute animate-hero-ambient ${b.position}`}
              style={{
                ["--amb-delay" as string]: `${b.delay}s`,
                ["--amb-dur" as string]: `${b.dur}s`,
                ["--amb-min" as string]: `${b.min}`,
                ["--amb-max" as string]: `${b.max}`,
              }}
            >
              {b.body}
            </div>
          ))}
        </div>

        {/* Active scenario bubbles */}
        {BUBBLES.map((bubble, i) => {
          const scenario = Math.floor(i / BUBBLES_PER_SCENARIO);
          const sub = i % BUBBLES_PER_SCENARIO;
          return (
            <div
              key={i}
              className={`animate-hero-bubble animate-hero-bubble-${sub} absolute ${bubble.position}`}
              style={{ animationDelay: `${scenario * SCENARIO_STAGGER_SECONDS}s` }}
            >
              {bubble.body}
            </div>
          );
        })}
      </div>
    </HeroCardRefContext.Provider>
  );
}

// ─── Smaller card illustrations ────────────────────────────────────────────
function SmallCardIllustration({ index, paused = false }: { index: number; paused?: boolean }) {
  if (index === 1) {
    return <RemotionEmpowerTeam paused={paused} />;
  }

  if (index === 2) {
    return <RiveChannels paused={paused} />;
  }

  return <RivePayForAJob paused={paused} />;
}

// ─── Section ───────────────────────────────────────────────────────────────
export default function TransformSection() {
  const [hero, ...rest] = FEATURE_CARDS;
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const heroCardRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-white pt-4 md:pt-5 xl:pt-6 pb-16 md:pb-20 xl:pb-24">
      <div className="mx-auto max-w-[1180px] px-5 md:px-7 lg:px-9 xl:px-9">
        <div className="text-center mb-14">
          <h2 className="text-[24px] leading-[30px] md:text-[26px] md:leading-[32px] xl:text-[30px] xl:leading-[36px] font-medium text-sierra-text-dark text-balance max-w-[320px] md:max-w-none mx-auto">
            Built for the companies<br />Kuwait loves.
          </h2>
          <p className="mt-4 text-[14px] md:text-[16px] xl:text-[17px] leading-[1.5] font-normal text-sierra-gray max-w-[240px] md:max-w-xl mx-auto text-balance">
            Pair helps the businesses you love show up at their best.
          </p>
        </div>

        {/* Unified grid: stacked on sm, 2x2 on md/lg, hero full-width + 3 below on xl */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {/* Hero card – full width on xl, quadrant on md/lg */}
        <div
          ref={heroCardRef}
          className="xl:col-span-3 group relative rounded-[1.1rem] flex flex-col min-h-[560px] md:min-h-[580px] xl:min-h-[860px] overflow-hidden"
          style={{ background: hero.gradient }}
        >
          <h3 className="text-[16px] leading-6 font-medium text-white mb-4 md:mb-3 relative z-10 px-9 pt-9 pr-14">
            {hero.title}
          </h3>

          <div className={`flex-1 flex items-center justify-center ${isExpanded ? "hidden md:flex" : "flex"}`}>
            <HeroIllustration paused={!isPlaying} heroRef={heroCardRef} />
          </div>

          <p className={`text-[15px] leading-6 font-normal text-white px-9 pb-9 pr-14 md:pr-9 relative z-10 md:mt-auto ${isExpanded ? "block" : "hidden md:block"}`}>
            {hero.description}
          </p>

          {isExpanded && <div className="flex-1 md:hidden" />}

          {/* Play/pause button — top-right, only when not expanded */}
          {!isExpanded && (
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/90 hover:bg-white transition-all flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100"
              aria-label={isPlaying ? "Pause animation" : "Play animation"}
            >
              {isPlaying
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-800"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                : <Play size={16} className="text-gray-800 fill-gray-800" />
              }
            </button>
          )}

          {/* Plus / X button — bottom-right, only on small screens */}
          <button
            onClick={() => setIsExpanded((e) => !e)}
            className="md:hidden absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded
              ? <X size={18} className="text-white" />
              : <Plus size={18} className="text-white" />
            }
          </button>
        </div>

        {/* Three smaller cards — fill remaining grid cells */}
        <GradientCard
          title={rest[0].title}
          description={rest[0].description}
          gradient={rest[0].gradient}
          backgroundContent={true}
        >
          {({ paused }) => <SmallCardIllustration index={1} paused={paused} />}
        </GradientCard>
        {rest.slice(1).map((card, i) => (
          <GradientCard
            key={card.title}
            title={card.title}
            description={card.description}
            gradient={card.gradient}
          >
            {({ paused }) => <SmallCardIllustration index={i + 2} paused={paused} />}
          </GradientCard>
        ))}
        </div>
      </div>
    </section>
  );
}
