"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import GradientCard from "@/components/ui/GradientCard";
import { FEATURE_CARDS } from "@/lib/constants";
import {
  Settings,
  MessageSquare,
  Mail,
  Headphones,
  Code,
  Workflow,
  AudioWaveform,
  MapPin,
  Pause,
  Play,
  Plus,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";

const RiveChannels = dynamic(() => import("@/components/ui/RiveChannels"), {
  ssr: false,
});

const RivePayForAJob = dynamic(() => import("@/components/ui/RivePayForAJob"), {
  ssr: false,
});

const RemotionEmpowerTeam = dynamic(() => import("@/components/ui/RemotionEmpowerTeam"), {
  ssr: false,
});

// ─── Hero card animated illustration ──────────────────────────────────────
function HeroIllustration({ paused }: { paused: boolean }) {
  return (
    <div className={`relative w-full h-full min-h-[500px] md:min-h-[600px] overflow-hidden flex flex-col${paused ? " hero-paused" : ""}`}>

      {/* Top zone — scenario cards appear here */}
      <div className="relative flex-1">

        {/* ── Scenario A: Gym ── */}

        {/* A1 — Membership widget (top-left) */}
        <div className="animate-hero-a1 absolute top-0 left-0 w-[260px] sm:w-[300px] bg-white/15 backdrop-blur rounded-2xl p-4 text-white">
          <p className="text-white/50 text-[10px] uppercase tracking-wider mb-3">Flair Fitness</p>
          <div className="flex gap-8 text-xs">
            <div>
              <p className="text-white/40 text-[10px] mb-0.5">Next class</p>
              <p className="font-medium">Sun, Sep 7</p>
              <p className="text-white/60">6:00 PM</p>
            </div>
            <div>
              <p className="text-white/40 text-[10px] mb-0.5">Membership</p>
              <p className="font-medium">Gold Tier</p>
              <p className="text-white/60">Since Jan 2024</p>
            </div>
          </div>
        </div>

        {/* A1 — Loyalty card (top-right) */}
        <div className="animate-hero-a1 absolute top-0 right-0 w-[130px] bg-white/15 backdrop-blur rounded-2xl p-3 text-white hidden sm:block">
          <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">Visits</p>
          <p className="text-2xl font-semibold">142</p>
          <p className="text-white/50 text-xs">this year</p>
        </div>

        {/* ── Scenario B: Food Delivery ── */}

        {/* B1 — Order widget (top) */}
        <div className="animate-hero-b1 absolute top-0 left-0 right-0 bg-white/15 backdrop-blur rounded-2xl p-4 text-white">
          <p className="text-white/50 text-[10px] uppercase tracking-wider mb-2">Your usual order</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Diet Pepsi × 1</p>
              <p className="text-xs text-white/60">French Fries × 1 &nbsp;·&nbsp; 0.750 KD</p>
            </div>
            <span className="text-xs bg-white/20 rounded-full px-4 py-1.5 font-medium text-white cursor-default">
              Reorder
            </span>
          </div>
        </div>
      </div>

      {/* Center zone — always visible AI agent bubble */}
      <div className="flex-shrink-0 flex justify-center py-4">
        <div className="max-w-[300px] w-full">
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center shrink-0">
                <img src="/branding/pair-icon-white.png" alt="Pair" className="w-3.5 h-3.5 object-contain" />
              </div>
              <span className="text-white/70 text-xs">AI Agent</span>
            </div>
            <p className="text-white text-sm leading-snug">
              Hi, Danah! Ready to reorder your usual?
            </p>
          </div>
        </div>
      </div>

      {/* Bottom zone — scenario cards appear here */}
      <div className="relative flex-1">

        {/* A3 — Upgrade confirmed card (bottom-right) */}
        <div className="animate-hero-a3 absolute bottom-0 right-0 w-[200px] bg-white/15 backdrop-blur rounded-2xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Flair Fitness</p>
              <p className="text-white/60 text-xs">Upgrade confirmed</p>
            </div>
          </div>
          <div className="flex gap-0.5 mt-1">
            {[1,2,3,4,5].map((s) => (
              <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= 5 ? "rgba(255,255,255,0.9)" : "none"} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>

        {/* B3 — Delivery ETA (bottom-right) */}
        <div className="animate-hero-b3 absolute bottom-0 right-0 w-[180px] bg-white/15 backdrop-blur rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <MapPin size={11} className="text-white/60" />
              <span className="text-white/60 text-[10px]">Delivery</span>
            </div>
            <span className="text-[10px] bg-white/20 rounded-full px-2 py-0.5">On its way</span>
          </div>
          <p className="text-xl font-semibold mt-1">ETA 12:05 PM</p>
          <div className="mt-2 h-1 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full w-4/5 rounded-full bg-white/70" />
          </div>
        </div>

      </div>

    </div>
  );
}

// ─── Spiral avatars illustration ──────────────────────────────────────────
const SPIRAL_AVATARS = [
  "/photos/headshots/caryn-seidman-clear.webp",
  "/photos/stock/ben-levick-headshot.jpg",
  "/photos/headshots/kit-garton-headshot.png",
  "/photos/stock/healthcare-headshot.jpg",
  "/photos/headshots/leala-francis.png",
  "/photos/stock/financial-services-headshot.jpg",
  "/photos/headshots/maureen-martin-weightwatchers.png",
  "/photos/headshots/telecom-headshot.png",
];

function SpiralAvatars() {
  const count = SPIRAL_AVATARS.length;
  const duration = 8; // seconds per full cycle
  const baseSize = 60;

  return (
    <div className="flex items-center justify-center w-full py-12">
      <div className="relative w-80 h-80">
        {/* Central Pair icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center z-10">
          <img
            src="/branding/pair-icon-white.png"
            alt="Pair"
            className="w-9 h-9 object-contain opacity-80"
          />
        </div>
        {/* Spiraling avatars */}
        {SPIRAL_AVATARS.map((src, i) => {
          const angle = (i * 360) / count;
          const delay = (i * duration) / count;
          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{
                width: baseSize,
                height: baseSize,
                animation: `spiral-orbit ${duration}s linear infinite`,
                animationDelay: `-${delay}s`,
                transformOrigin: "0 0",
              }}
            >
              <div
                className="rounded-full overflow-hidden shadow-lg"
                style={{
                  width: baseSize,
                  height: baseSize,
                  marginLeft: -baseSize / 2,
                  marginTop: -baseSize / 2,
                  animation: `spiral-fade ${duration}s linear infinite`,
                  animationDelay: `-${delay}s`,
                }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Smaller card illustrations ────────────────────────────────────────────
function SmallCardIllustration({ index }: { index: number }) {
  if (index === 1) {
    return <RemotionEmpowerTeam />;
  }

  if (index === 2) {
    return <RiveChannels />;
  }

  return <RivePayForAJob />;
}

// ─── Section ───────────────────────────────────────────────────────────────
export default function TransformSection() {
  const [hero, ...rest] = FEATURE_CARDS;
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-white pt-section-lg pb-section">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-headline-sm font-medium text-sierra-text-dark mb-3 text-balance">
            Transform your
            <br />
            customer experience
          </h2>
          <p className="text-xs font-medium text-sierra-gray">
            Pair helps the great companies of the world show up at their best.
          </p>
        </div>

        {/* Hero card – full width, tall */}
        <div
          className="group relative rounded-[1.1rem] p-6 pr-12 md:p-8 md:pr-12 flex flex-col min-h-[740px] md:min-h-[860px] mb-5 overflow-hidden"
          style={{ background: hero.gradient }}
        >
          {/* Title + description — always visible */}
          <h3 className="text-[19px] leading-7 font-medium text-white mb-6">
            {hero.title}
          </h3>

          {isExpanded ? (
            /* Expanded state: description + empty gradient space */
            <>
              <p className="text-[15px] leading-6 font-semibold text-white/80 mb-4">
                {hero.description}
              </p>
              <div className="flex-1" />
            </>
          ) : (
            /* Default state: illustration only, no description */
            <div className="flex-1 flex items-center justify-center">
              <HeroIllustration paused={!isPlaying} />
            </div>
          )}

          {/* Play/pause button — top-right, only when not expanded */}
          {!isExpanded && (
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/90 hover:bg-white transition-all flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100"
              aria-label={isPlaying ? "Pause animation" : "Play animation"}
            >
              {isPlaying
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-800"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                : <Play size={16} className="text-gray-800 fill-gray-800" />
              }
            </button>
          )}

          {/* Plus / X button — bottom-right */}
          <button
            onClick={() => setIsExpanded((e) => !e)}
            className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-white/25 hover:bg-white/35 transition-colors flex items-center justify-center"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded
              ? <X size={12} className="text-white" />
              : <Plus size={12} className="text-white" />
            }
          </button>
        </div>

        {/* Full-width Empower Every Team card */}
        <GradientCard
          title={rest[0].title}
          description={rest[0].description}
          gradient={rest[0].gradient}
          fillContent={true}
        >
          <SmallCardIllustration index={1} />
        </GradientCard>

        {/* Two smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {rest.slice(1).map((card, i) => (
            <GradientCard
              key={card.title}
              title={card.title}
              description={card.description}
              gradient={card.gradient}
            >
              <SmallCardIllustration index={i + 2} />
            </GradientCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
