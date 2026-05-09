"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Hero items: video + paired chat scenario                           */
/* ------------------------------------------------------------------ */

const HERO_ITEMS = [
  {
    video: "/hero/Timeline 2.mp4",
    bubbles: [
      { type: "user", name: "Maryam", avatar: "/photos/headshots/spiral-1.png", text: "My WiFi keeps dropping." },
      { type: "agent", text: "Hi Maryam! That's frustrating. I've reset it remotely. Your WiFi should be steady again within minutes." },
      { type: "confirm", variant: "wifi", title: "Home_Network_5GHz", text: "Connected" },
    ],
  },
  {
    video: "/hero/Timeline 3.mp4",
    bubbles: [
      { type: "user", name: "Faisal", avatar: "/photos/headshots/spiral-3.png", text: "Same suite next week?" },
      { type: "agent", text: "Done. Oct 15-17 at Four Seasons. Sea view. Confirmation sent." },
      { type: "confirm", text: "Booked." },
    ],
  },
  {
    video: "/hero/Timeline 1.mp4",
    bubbles: [
      { type: "user", name: "Danah", avatar: "/photos/headshots/spiral-5.png", text: "Any appointments today?" },
      { type: "agent", text: "8:00, 8:30, 9:30, or 10:00. Which works?" },
      { type: "confirm", text: "Booked for 9:30." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Glass bubble wrapper — glass frame + canvas-driven video blur      */
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

  // Position the blurred video image to track the header so the bubble's
  // "blurred backdrop" stays aligned with the actual video underneath.
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
        className={`relative overflow-hidden w-full max-w-none rounded-2xl text-white md:w-[75vw] md:max-w-[334px] ${className ?? ""}`}
      >
        {/* Blurred video frame, positioned to match the header crop */}
        <div
          ref={bgRef}
          className="absolute pointer-events-none"
          style={{
            backgroundImage: blurBg ? `url(${blurBg})` : undefined,
            backgroundSize: "100% 100%",
          }}
        />
        {/* Glass tint: white @ 10% on top of the blurred video */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(255, 255, 255, 0.10)" }}
        />
        {/* Gradient hairline border (2px) via mask-composite */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            padding: "2px",
            background: "linear-gradient(rgba(248, 248, 248, 0.12) 0%, rgba(255, 255, 255, 0) 100%)",
            WebkitMask: "conic-gradient(#000 0 0) content-box, conic-gradient(#000 0 0)",
            mask: "conic-gradient(#000 0 0) content-box, conic-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
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

const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);
const arabicFont = (text: string) => (isArabic(text) ? { fontFamily: "var(--font-almarai)" } : undefined);

function UserBubble({ name, avatar, text, headerRef, blurBg }: { name: string; avatar: string; text: string; headerRef: React.RefObject<HTMLElement | null>; blurBg: string }) {
  return (
    <GlassBubble align="end" headerRef={headerRef} blurBg={blurBg} className="p-5 md:p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[14px] text-white/80 md:text-[12px]">
          <figure className="relative aspect-square size-5 overflow-hidden rounded-full md:size-4">
            <Image src={avatar} alt={name} fill sizes="20px" className="object-cover" />
          </figure>
          <span style={arabicFont(name)}>{name}</span>
        </div>
        <div dir="auto" className="text-[17px] md:text-[14px] font-normal text-white leading-snug" style={arabicFont(text)}>{text}</div>
      </div>
    </GlassBubble>
  );
}

function AgentBubble({ text, agentName, headerRef, blurBg }: { text: string; agentName?: string; headerRef: React.RefObject<HTMLElement | null>; blurBg: string }) {
  return (
    <GlassBubble align="start" headerRef={headerRef} blurBg={blurBg} className="p-5 md:p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[14px] text-white/80 md:text-[12px]">
          <figure className="relative aspect-square size-5 overflow-hidden md:size-4">
            <Image src="/branding/pair-icon-white.png" alt="Pair" width={20} height={20} className="block h-auto w-full object-cover" />
          </figure>
          <span>{agentName ?? "Pair Agent"}</span>
        </div>
        <div dir="auto" className="text-[17px] md:text-[14px] font-normal text-white leading-snug" style={arabicFont(text)}>{text}</div>
      </div>
    </GlassBubble>
  );
}

function ConfirmBubble({ text, title, variant, headerRef, blurBg }: { text: string; title?: string; variant?: string; headerRef: React.RefObject<HTMLElement | null>; blurBg: string }) {
  if (variant === "wifi") {
    return (
      <GlassBubble align="start" headerRef={headerRef} blurBg={blurBg} className="px-5 py-4 md:px-4 md:py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#34C759] md:size-9">
            <svg viewBox="0 0 24 24" fill="none" className="size-6 text-white md:size-5">
              <path d="M2.5 9.5C5.2 7 8.5 5.5 12 5.5s6.8 1.5 9.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5.5 12.5C7.4 10.9 9.6 10 12 10s4.6.9 6.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8.5 15.5C9.5 14.7 10.7 14.2 12 14.2s2.5.5 3.5 1.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="18.5" r="1.3" fill="currentColor"/>
            </svg>
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[17px] md:text-[14px] font-medium text-white truncate" style={arabicFont(title ?? "")}>{title}</span>
            <span className="flex items-center gap-1.5 text-[14px] md:text-[12px] text-white/80">
              <span style={arabicFont(text)}>{text}</span>
              <svg viewBox="0 0 16 16" fill="none" className="size-4 md:size-3.5 text-white/70">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M5 8l2 2 4-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </GlassBubble>
    );
  }
  return (
    <GlassBubble align="start" headerRef={headerRef} blurBg={blurBg} className="px-6 py-5 md:px-4 md:py-3">
      <div className="flex items-center justify-between gap-3">
        <span dir="auto" className="text-[17px] md:text-[13px] font-medium text-white" style={arabicFont(text)}>{text}</span>
        <svg viewBox="0 0 16 16" fill="none" className="size-6 md:size-4 text-pair-blue">
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
          <span className="rounded-full bg-pair-blue/80 px-3 py-1 text-[11px] font-medium text-white">08:00</span>
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

const CROSSFADE_MS = 500;

export default function HeroSection() {
  const headerRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  // One video element per item — never swap src, so the browser never
  // shows a black "loading" frame mid-cycle.
  const [activeIndex, setActiveIndex] = useState(0);
  const [blurBg, setBlurBg] = useState("");
  const [visibleCount, setVisibleCount] = useState(0);
  // Initial paint only downloads the active clip; inactive clips warm up
  // shortly after so they're ready by the time crossfade fires.
  const [preloadAll, setPreloadAll] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const id = window.setTimeout(() => setPreloadAll(true), 1000);
    return () => clearTimeout(id);
  }, [mounted]);

  useEffect(() => {
    if (!preloadAll) return;
    HERO_ITEMS.forEach((_, i) => {
      const v = videoRefs.current[i];
      if (v && v.preload === "auto" && v.readyState < 1) {
        try { v.load(); } catch {}
      }
    });
  }, [preloadAll]);

  // Active video plays from 0. Inactive videos pause and (after the crossfade
  // finishes) rewind to 0, so the just-ended clip stays on its last frame
  // while it fades out and isn't seeking through black mid-fade.
  useEffect(() => {
    if (!mounted) return;
    const timeouts: number[] = [];
    HERO_ITEMS.forEach((_, i) => {
      const v = videoRefs.current[i];
      if (!v) return;
      if (i === activeIndex) {
        try { v.currentTime = 0; } catch {}
        v.play().catch(() => {});
      } else {
        v.pause();
        timeouts.push(
          window.setTimeout(() => {
            const el = videoRefs.current[i];
            if (el) { try { el.currentTime = 0; } catch {} }
          }, CROSSFADE_MS + 100),
        );
      }
    });
    return () => timeouts.forEach(clearTimeout);
  }, [mounted, activeIndex]);

  // Reveal bubbles one at a time when the scenario changes
  useEffect(() => {
    setVisibleCount(0);
    const total = HERO_ITEMS[activeIndex].bubbles.length;
    const ids: number[] = [];
    for (let i = 0; i < total; i++) {
      ids.push(window.setTimeout(() => {
        setVisibleCount((c) => Math.max(c, i + 1));
      }, i * 1400));
    }
    return () => ids.forEach((id) => clearTimeout(id));
  }, [activeIndex]);

  // Capture blurred video frames into a hidden canvas, then use the data URL
  // as the bubble's blurred backdrop. <video> elements are composited on a
  // separate GPU layer, so CSS backdrop-filter can't see them — this is the
  // reliable cross-browser way to make the bubble follow the video.
  useEffect(() => {
    if (!mounted || !canvasRef.current || !headerRef.current) return;
    const video = videoRefs.current[activeIndex];
    if (!video) return;
    const canvas = canvasRef.current;
    const header = headerRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    const CW = 960;
    let prevHW = 0;
    let prevHH = 0;
    let animId: number;
    let last = 0;

    const draw = (t: number) => {
      if (t - last > 42 && video.readyState >= 2) {
        const headerRect = header.getBoundingClientRect();
        const hW = headerRect.width;
        const hH = headerRect.height;
        if (hW <= 0 || hH <= 0) {
          animId = requestAnimationFrame(draw);
          return;
        }

        if (hW !== prevHW || hH !== prevHH) {
          prevHW = hW;
          prevHH = hH;
          canvas.width = CW;
          canvas.height = Math.round(CW * (hH / hW));
        }

        const vw = video.videoWidth || 1920;
        const vh = video.videoHeight || 1080;
        const videoAspect = vw / vh;
        const headerAspect = hW / hH;
        let sx = 0, sy = 0, sw = vw, sh = vh;
        if (videoAspect > headerAspect) {
          sw = vh * headerAspect;
          sx = (vw - sw) * 0.5;
        } else {
          sh = vw / headerAspect;
          sy = (vh - sh) * 0.5;
        }

        ctx.filter = "blur(28px) saturate(0.9)";
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, CW, canvas.height);
        setBlurBg(canvas.toDataURL("image/jpeg", 0.9));
        last = t;
      }
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [mounted, activeIndex]);

  const scenario = HERO_ITEMS[activeIndex];

  return (
    <header ref={headerRef} className="relative h-[100svh] w-full overflow-hidden bg-black md:h-[88svh] xl:h-[92svh]">
      {/* Hidden canvas for capturing blurred video frames */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Background videos: one element per clip, all preloaded so swaps
          never wait on a decoder. The active clip plays from 0; ended clips
          stay on their last frame while opacity crossfades, then quietly
          rewind to 0 once they're invisible. No black frames between cuts. */}
      <div className="absolute inset-0">
        {HERO_ITEMS.map((item, i) => (
          <video
            key={item.video}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            muted
            playsInline
            preload={activeIndex === i || preloadAll ? "auto" : "none"}
            className="absolute h-full w-full object-cover object-center transition-opacity ease-out"
            style={{
              opacity: activeIndex === i ? 1 : 0,
              transitionDuration: `${CROSSFADE_MS}ms`,
            }}
            src={item.video}
            onEnded={() => {
              setActiveIndex((prev) => (prev + 1) % HERO_ITEMS.length);
            }}
          />
        ))}
      </div>

      {/* Content area */}
      <div className="mt-28 h-[calc(100%-(var(--spacing)*28))] xl:mt-32 xl:h-[calc(100%-(var(--spacing)*32))] relative">
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

      {/* Chat bubbles — anchored directly to the hero bottom so the stack is
          always 10px above the section edge regardless of viewport. The outer
          wrapper centers a max-w[1160px] track that mirrors the content area's
          horizontal padding; the inner stack right-aligns within that track.
          pointer-events-none keeps the Learn more button clickable. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[10px] flex justify-center">
        <div className="relative w-full max-w-[1160px] px-5 md:px-7 lg:px-10 xl:pl-6">
          <div className="ml-auto flex w-full flex-col gap-2 md:w-[min(88%,454px)] md:pr-2">
            {scenario.bubbles.slice(0, visibleCount).map((bubble, i) => (
              <div
                key={`${activeIndex}-${i}`}
                className="overflow-hidden animate-[chatFadeIn_0.45s_ease-out_forwards]"
              >
                {bubble.type === "user" && (
                  <UserBubble name={(bubble as { name: string; avatar: string; text: string }).name} avatar={(bubble as { name: string; avatar: string; text: string }).avatar} text={bubble.text!} headerRef={headerRef} blurBg={blurBg} />
                )}
                {bubble.type === "agent" && (
                  <AgentBubble text={bubble.text!} agentName={(bubble as { agentName?: string }).agentName} headerRef={headerRef} blurBg={blurBg} />
                )}
                {bubble.type === "confirm" && (
                  <ConfirmBubble text={bubble.text!} title={(bubble as { title?: string }).title} variant={(bubble as { variant?: string }).variant} headerRef={headerRef} blurBg={blurBg} />
                )}
                {bubble.type === "picker" && (
                  <PickerBubble headerRef={headerRef} blurBg={blurBg} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
