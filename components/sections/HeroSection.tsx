"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const HERO_VIDEOS = [
  "/hero/hero1.mp4",
  "/hero/hero2.mp4",
  "/hero/hero3.mp4",
  "/hero/hero4.mp4",
];

/* ------------------------------------------------------------------ */
/*  Chat scenario data — one per video                                 */
/* ------------------------------------------------------------------ */

const SCENARIOS = [
  {
    // Video 0: hero3.mp4 — Billing (Othman)
    bubbles: [
      { type: "user", name: "Othman", avatar: "/photos/headshots/hf_20260410_172518_83b9acad-9ba2-4b0c-b63c-9484cc90980b.png", text: "I don't recognize this 29 KD charge. Can you help?" },
      { type: "agent", text: "I see that charge, Othman. It looks like a duplicate from your last order. I've submitted a refund for you." },
      { type: "confirm", text: "29 KD refund initiated" },
    ],
  },
  {
    // Video 1: hero1.mp4 — Connectivity (Vanessa)
    bubbles: [
      { type: "user", name: "Vanessa", avatar: "/photos/stock/financial-services-headshot.jpg", text: "My WiFi keeps dropping." },
      { type: "agent", text: "Hi Vanessa! That's frustrating. I've reset it remotely. Your WiFi should be steady again within minutes." },
      { type: "confirm", text: "Connection restored" },
    ],
  },
  {
    // Video 2: hero2.mp4 — Appointment booking
    bubbles: [
      { type: "agent", text: "Yes, we have a few openings this morning." },
      { type: "picker" },
      { type: "confirm", text: "Appointment booked" },
    ],
  },
  {
    // Video 3: hero4.mp4
    bubbles: [
      { type: "user", name: "Sarah", avatar: "/photos/stock/financial-services-headshot.jpg", text: "I need to update my shipping address." },
      { type: "agent", text: "Of course, Sarah. I've pulled up your account. What's the new address?" },
      { type: "confirm", text: "Address updated" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Glass bubble wrapper — canvas blur positioned relative to header   */
/* ------------------------------------------------------------------ */

function GlassBubble({ align, className, headerRef, blurBg, children }: {
  align: "start" | "end";
  className?: string;
  headerRef: React.RefObject<HTMLElement | null>;
  blurBg: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Update blur background position relative to the header (not viewport)
  // so scrolling doesn't shift it
  useEffect(() => {
    const el = ref.current;
    const bg = bgRef.current;
    const header = headerRef.current;
    if (!el || !bg || !header) return;

    let animId: number;
    const update = () => {
      const bubbleRect = el.getBoundingClientRect();
      const headerRect = header.getBoundingClientRect();
      bg.style.left = `${headerRect.left - bubbleRect.left}px`;
      bg.style.top = `${headerRect.top - bubbleRect.top}px`;
      bg.style.width = `${headerRect.width}px`;
      bg.style.height = `${headerRect.height}px`;
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [headerRef, blurBg]);

  return (
    <div className={align === "end" ? "place-self-end" : "place-self-start"}>
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-2xl w-[75vw] max-w-[334px] ${className ?? ""}`}
        style={{
          boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
        }}
      >
        {/* Blurred video frame, positioned to match the header */}
        <div
          ref={bgRef}
          className="absolute pointer-events-none"
          style={{
            backgroundImage: blurBg ? `url(${blurBg})` : undefined,
            backgroundSize: "100% 100%",
          }}
        />
        <div className="absolute inset-0 bg-black/10" />
        {/* White glass border — fades out toward the bottom-right */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.2), inset 0 1px 3px rgba(255,255,255,0.08)",
            WebkitMaskImage: "linear-gradient(160deg, black 0%, transparent 50%), linear-gradient(200deg, rgba(0,0,0,0.2) 0%, transparent 25%)",
            maskImage: "linear-gradient(160deg, black 0%, transparent 50%), linear-gradient(200deg, rgba(0,0,0,0.2) 0%, transparent 25%)",
            WebkitMaskComposite: "source-over",
            maskComposite: "add",
          }}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Bubble components                                                  */
/* ------------------------------------------------------------------ */

function UserBubble({ name, avatar, text, headerRef, blurBg }: { name: string; avatar: string; text: string; headerRef: React.RefObject<HTMLElement | null>; blurBg: string }) {
  return (
    <GlassBubble align="end" headerRef={headerRef} blurBg={blurBg} className="p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-label-md text-white/80">
          <figure className="relative aspect-square size-4 overflow-hidden rounded-full">
            <img src={avatar} alt={name} className="absolute inset-0 h-full w-full object-cover" />
          </figure>
          <span>{name}</span>
        </div>
        <div className="text-[14px] font-normal text-white leading-snug">{text}</div>
      </div>
    </GlassBubble>
  );
}

function AgentBubble({ text, headerRef, blurBg }: { text: string; headerRef: React.RefObject<HTMLElement | null>; blurBg: string }) {
  return (
    <GlassBubble align="start" headerRef={headerRef} blurBg={blurBg} className="p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-label-md text-white/80">
          <figure className="relative aspect-square size-4 overflow-hidden">
            <img src="/branding/pair-icon-white.png" alt="Pair" className="block h-auto w-full object-cover" />
          </figure>
          <span>Pair Agent</span>
        </div>
        <div className="text-[14px] font-normal text-white leading-snug">{text}</div>
      </div>
    </GlassBubble>
  );
}

function ConfirmBubble({ text, headerRef, blurBg }: { text: string; headerRef: React.RefObject<HTMLElement | null>; blurBg: string }) {
  return (
    <GlassBubble align="start" headerRef={headerRef} blurBg={blurBg} className="px-4 py-3">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-white">{text}</span>
        <svg viewBox="0 0 16 16" fill="none" className="size-4 text-pair-gold">
          <circle cx="8" cy="8" r="7" fill="currentColor"/>
          <path d="M5.5 8l2 2 3-3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </GlassBubble>
  );
}

function PickerBubble({ headerRef, blurBg }: { headerRef: React.RefObject<HTMLElement | null>; blurBg: string }) {
  return (
    <GlassBubble align="start" headerRef={headerRef} blurBg={blurBg} className="p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-[12px] text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5"><path d="M15 18l-6-6 6-6"/></svg>
          <span className="font-medium">May 13</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5"><path d="M9 18l6-6-6-6"/></svg>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-pair-gold/80 px-3 py-1 text-[11px] font-medium text-white">08:00</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80">08:30</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80">09:30</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80">10:00</span>
        </div>
      </div>
    </GlassBubble>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function HeroSection() {
  const headerRef = useRef<HTMLElement>(null);
  const activeRef = useRef<HTMLVideoElement>(null);
  const preloadRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSlot, setActiveSlot] = useState<"a" | "b">("a");
  const blurRef = useRef("");
  const [blurBg, setBlurBg] = useState("");

  const nextIndex = (currentIndex + 1) % HERO_VIDEOS.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && activeRef.current) {
      activeRef.current.play().catch(() => {});
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted && preloadRef.current) {
      preloadRef.current.src = HERO_VIDEOS[nextIndex];
      preloadRef.current.load();
    }
  }, [mounted, nextIndex]);

  const handleVideoEnded = useCallback(() => {
    setActiveSlot((s) => (s === "a" ? "b" : "a"));
    setCurrentIndex((i) => (i + 1) % HERO_VIDEOS.length);
  }, []);

  useEffect(() => {
    if (mounted && activeRef.current) {
      activeRef.current.play().catch(() => {});
    }
  }, [activeSlot, mounted]);

  // Capture blurred video frames to a canvas for bubble backgrounds
  useEffect(() => {
    if (!mounted || !activeRef.current || !canvasRef.current) return;
    const video = activeRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    const isHero3 = HERO_VIDEOS[currentIndex] === "/hero/hero3.mp4";
    const CW = 480;
    let prevVpW = 0;
    let prevVpH = 0;

    let animId: number;
    let last = 0;

    const draw = (t: number) => {
      if (t - last > 42 && video.readyState >= 2) { // ~24fps, only when video has data
        // Read viewport size each frame so resize is reflected immediately
        const vpW = window.innerWidth;
        const vpH = window.innerHeight;

        // Resize canvas when viewport changes
        if (vpW !== prevVpW || vpH !== prevVpH) {
          prevVpW = vpW;
          prevVpH = vpH;
          canvas.width = CW;
          canvas.height = Math.round(CW * (vpH / vpW));
        }

        const isMobile = vpW < 768;
        const posX = (isHero3 && isMobile) ? 0.2 : 0.5;

        const vw = video.videoWidth || 1920;
        const vh = video.videoHeight || 1080;

        const videoAspect = vw / vh;
        const viewportAspect = vpW / vpH;
        let sx = 0, sy = 0, sw = vw, sh = vh;
        if (videoAspect > viewportAspect) {
          sw = vh * viewportAspect;
          sx = (vw - sw) * posX;
        } else {
          sh = vw / viewportAspect;
          sy = (vh - sh) * 0.5;
        }

        ctx.filter = "blur(28px) saturate(0.9)";
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, CW, canvas.height);
        const url = canvas.toDataURL("image/jpeg", 0.7);
        blurRef.current = url;
        setBlurBg(url);
        last = t;
      }
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [mounted, activeSlot, currentIndex]);

  const videoA = activeSlot === "a" ? HERO_VIDEOS[currentIndex] : HERO_VIDEOS[nextIndex];
  const videoB = activeSlot === "b" ? HERO_VIDEOS[currentIndex] : HERO_VIDEOS[nextIndex];

  const scenario = SCENARIOS[currentIndex];

  return (
    <header ref={headerRef} className="relative h-svh w-full overflow-hidden bg-black">
      {/* Hidden canvas for capturing blurred video frames */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Background videos (double-buffered) */}
      {mounted && (
        <div className="absolute inset-0">
          <video
            ref={activeSlot === "a" ? activeRef : preloadRef}
            key="video-a"
            muted
            playsInline
            onEnded={activeSlot === "a" ? handleVideoEnded : undefined}
            className={`absolute h-full w-full object-cover ${videoA === "/hero/hero3.mp4" ? "object-[20%_center] md:object-center" : "object-center"}`}
            style={{ zIndex: activeSlot === "a" ? 1 : 0 }}
            src={videoA}
          />
          <video
            ref={activeSlot === "b" ? activeRef : preloadRef}
            key="video-b"
            muted
            playsInline
            onEnded={activeSlot === "b" ? handleVideoEnded : undefined}
            className={`absolute h-full w-full object-cover ${videoB === "/hero/hero3.mp4" ? "object-[20%_center] md:object-center" : "object-center"}`}
            style={{ zIndex: activeSlot === "b" ? 1 : 0 }}
            src={videoB}
          />
        </div>
      )}

      {/* Content area */}
      <div className="mt-32 h-[calc(100%-(var(--spacing)*32))] xl:mt-56 xl:h-[calc(100%-(var(--spacing)*56))]">
        <div className="mx-auto w-full max-w-[1160px] px-6 lg:px-10 relative z-10 h-full">
          <h1 className="mb-4 text-headline-xl font-normal whitespace-pre-wrap text-white md:mb-6">
            {"Better customer\nexperiences.\nBuilt on Pair."}
          </h1>
          <a
            href="/learn-more"
            className="inline-flex items-center rounded-full bg-white text-black h-10 px-4 text-[12px] hover:text-blue-600 transition-colors duration-75"
          >
            Learn more
          </a>
        </div>
      </div>

      {/* Chat bubbles — synced to current video */}
      <div
        className="absolute bottom-0 right-0 overflow-hidden z-10"
        style={{
          width: "min(454px, 100%)",
          height: "45svh",
        }}
      >
        <div
          className="relative h-full flex flex-col justify-end gap-2 pb-8 px-4"
        >
        {scenario.bubbles.map((bubble, i) => (
          <div
            key={`${currentIndex}-${i}`}
            className="animate-[chatFadeIn_0.5s_ease-out_forwards]"
            style={{ opacity: 0, animationDelay: `${i * 0.4}s` }}
          >
            {bubble.type === "user" && (
              <UserBubble name={bubble.name!} avatar={bubble.avatar!} text={bubble.text!} headerRef={headerRef} blurBg={blurBg} />
            )}
            {bubble.type === "agent" && (
              <AgentBubble text={bubble.text!} headerRef={headerRef} blurBg={blurBg} />
            )}
            {bubble.type === "confirm" && (
              <ConfirmBubble text={bubble.text!} headerRef={headerRef} blurBg={blurBg} />
            )}
            {bubble.type === "picker" && (
              <PickerBubble headerRef={headerRef} blurBg={blurBg} />
            )}
          </div>
        ))}
        </div>
      </div>
    </header>
  );
}
