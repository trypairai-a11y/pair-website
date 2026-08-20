"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Hero items: video + paired chat scenario                           */
/* ------------------------------------------------------------------ */

const HERO_ITEMS = [
  {
    video: "/hero/Timeline 2.opt.mp4",
    poster: "/hero/posters/Timeline 2.jpg",
    bubbles: [
      { type: "user", name: "Maryam", avatar: "/photos/headshots/spiral-1.png", text: "My WiFi keeps dropping." },
      { type: "agent", text: "Hi Maryam! That's frustrating. I've reset it remotely. Your WiFi should be steady again within minutes." },
      { type: "confirm", variant: "wifi", title: "Home_Network_5GHz", text: "Connected" },
    ],
  },
  {
    video: "/hero/Timeline 3.opt.mp4",
    poster: "/hero/posters/Timeline 3.jpg",
    bubbles: [
      { type: "user", name: "Faisal", avatar: "/photos/headshots/spiral-3.png", text: "Same suite next week?" },
      { type: "agent", text: "Done. Oct 15-17 at Four Seasons. Sea view. Confirmation sent." },
      { type: "confirm", text: "Booked." },
    ],
  },
  {
    video: "/hero/Timeline 1.opt.mp4",
    poster: "/hero/posters/Timeline 1.jpg",
    bubbles: [
      { type: "user", name: "Danah", avatar: "/photos/headshots/spiral-5.png", text: "Any appointments today?" },
      { type: "agent", text: "8:00, 8:30, 9:30, or 10:00. Which works?" },
      { type: "confirm", text: "Booked for 9:30." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Bubble wrapper: painted translucent fill over the hero video        */
/* ------------------------------------------------------------------ */

function GlassBubble({ className, children }: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden w-full max-w-[280px] rounded-2xl text-white md:w-[75vw] md:max-w-[334px] ${className ?? ""}`}
    >
      {/* Glass. Nothing animates opacity, size or filter on this element or any
          ancestor of it: that is what forced a re-raster and let you watch the
          blur resolve. Motion is transform only, on the column. */}
      <div
        className="absolute inset-0 pointer-events-none backdrop-blur-xl"
        style={{ background: "rgba(16, 16, 18, 0.30)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          padding: "2px",
          background: "linear-gradient(rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.04) 100%)",
          WebkitMask: "conic-gradient(#000 0 0) content-box, conic-gradient(#000 0 0)",
          mask: "conic-gradient(#000 0 0) content-box, conic-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

const isArabic = (text: string) => /[؀-ۿ]/.test(text);
const arabicFont = (text: string) => (isArabic(text) ? { fontFamily: "var(--font-almarai)" } : undefined);

function UserBubble({ name, avatar, text }: { name: string; avatar: string; text: string }) {
  return (
    <GlassBubble className="p-3.5 md:p-4">
      <div className="flex flex-col gap-1.5 md:gap-2">
        <div className="flex items-center gap-1.5 text-[11px] text-white/80 md:gap-2 md:text-[12px]">
          <figure className="relative aspect-square size-3.5 overflow-hidden rounded-full md:size-4">
            <Image src={avatar} alt={name} fill sizes="20px" className="object-cover" />
          </figure>
          <span style={arabicFont(name)}>{name}</span>
        </div>
        <div dir="auto" className="text-[13px] md:text-[14px] font-normal text-white leading-snug" style={arabicFont(text)}>{text}</div>
      </div>
    </GlassBubble>
  );
}

function AgentBubble({ text, agentName }: { text: string; agentName?: string }) {
  return (
    <GlassBubble className="p-3.5 md:p-4">
      <div className="hero-chat-content flex flex-col gap-1.5 md:gap-2">
        <div className="flex items-center gap-1.5 text-[11px] text-white/80 md:gap-2 md:text-[12px]">
          <figure className="relative aspect-square size-3.5 overflow-hidden md:size-4">
            <Image src="/branding/pair-icon-white.png" alt="Pair" width={20} height={20} className="block h-auto w-full object-cover" />
          </figure>
          <span>{agentName ?? "Pair Agent"}</span>
        </div>
        <div dir="auto" className="text-[13px] md:text-[14px] font-normal text-white leading-snug" style={arabicFont(text)}>{text}</div>
      </div>
    </GlassBubble>
  );
}

function ConfirmBubble({ text, title, variant }: { text: string; title?: string; variant?: string }) {
  if (variant === "wifi") {
    return (
      <GlassBubble className="px-3.5 py-3 md:px-4 md:py-3">
        <div className="flex items-center gap-2.5 md:gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#34C759] md:size-9">
            <svg viewBox="0 0 24 24" fill="none" className="size-4 text-white md:size-5">
              <path d="M2.5 9.5C5.2 7 8.5 5.5 12 5.5s6.8 1.5 9.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5.5 12.5C7.4 10.9 9.6 10 12 10s4.6.9 6.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8.5 15.5C9.5 14.7 10.7 14.2 12 14.2s2.5.5 3.5 1.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="18.5" r="1.3" fill="currentColor"/>
            </svg>
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[13px] md:text-[14px] font-medium text-white truncate" style={arabicFont(title ?? "")}>{title}</span>
            <span className="flex items-center gap-1.5 text-[11px] text-white/80 md:text-[12px]">
              <span style={arabicFont(text)}>{text}</span>
              <svg viewBox="0 0 16 16" fill="none" className="size-3 text-white/70 md:size-3.5">
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
    <GlassBubble className="px-4 py-3 md:px-4 md:py-3">
      <div className="flex items-center justify-between gap-3">
        <span dir="auto" className="text-[13px] md:text-[13px] font-medium text-white" style={arabicFont(text)}>{text}</span>
        <svg viewBox="0 0 16 16" fill="none" className="size-4 md:size-4 text-pair-blue">
          <circle cx="8" cy="8" r="7" fill="currentColor"/>
          <path d="M5.5 8l2 2 3-3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </GlassBubble>
  );
}

function TypingBubble() {
  return (
    <GlassBubble className="px-4 py-3.5 md:px-4 md:py-4">
      <div className="flex items-center gap-1.5" aria-label="Pair Agent is typing">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="hero-typing-dot block size-1.5 rounded-full bg-white/85"
            style={{ animationDelay: `${i * 160}ms` }}
          />
        ))}
      </div>
    </GlassBubble>
  );
}

function PickerBubble() {
  return (
    <GlassBubble className="p-4">
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

const CROSSFADE_MS = 500;
const EXIT_MS = 160;
const RISE_MS = 520;
const FIRST_BUBBLE_MS = 250;
const BUBBLE_GAP_MS = 1400;
const TYPING_LEAD_MS = 700;

export default function HeroDynamic() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [typingIndex, setTypingIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement | null>(null);
  const prevHeight = useRef(0);
  // Initial paint only downloads the active clip; inactive clips warm up
  // shortly after so they're ready by the time crossfade fires.
  const [preloadAll, setPreloadAll] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setPreloadAll(true), 1000);
    return () => clearTimeout(id);
  }, []);

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
  }, [activeIndex]);

  // The rendered scenario lags activeIndex by one exit beat, so the outgoing
  // bubbles fade out over the video crossfade instead of blinking away.
  useEffect(() => {
    if (displayIndex === activeIndex) return;
    setLeaving(true);
    const id = window.setTimeout(() => {
      setDisplayIndex(activeIndex);
      setLeaving(false);
    }, EXIT_MS);
    return () => clearTimeout(id);
  }, [activeIndex, displayIndex]);

  // Reveal bubbles one at a time, with the agent "typing" just before it answers
  useEffect(() => {
    if (leaving) return;
    setVisibleCount(0);
    setTypingIndex(-1);
    const bubbles = HERO_ITEMS[displayIndex].bubbles;
    const ids: number[] = [];
    bubbles.forEach((bubble, i) => {
      const at = FIRST_BUBBLE_MS + i * BUBBLE_GAP_MS;
      if (bubble.type === "agent") {
        // Reveal the row early holding the typing dots, then swap in the text.
        const typingAt = Math.max(0, at - TYPING_LEAD_MS);
        ids.push(window.setTimeout(() => {
          setTypingIndex(i);
          setVisibleCount((c) => Math.max(c, i + 1));
        }, typingAt));
      }
      ids.push(window.setTimeout(() => {
        setTypingIndex((t) => (t === i ? -1 : t));
        setVisibleCount((c) => Math.max(c, i + 1));
      }, at));
    });
    return () => ids.forEach((id) => clearTimeout(id));
  }, [displayIndex, leaving]);

  // The column is bottom anchored and clipped, so a new row lands below the
  // visible edge. Shift the column down by the height it just gained, then
  // release it: the stack rises as one and the new bubble is fully rendered
  // before it clears the edge. Transform only, so the glass behind each
  // bubble is never re-rasterised and never resolves in view.
  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el || leaving) return;
    const h = el.offsetHeight;
    const delta = h - prevHeight.current;
    prevHeight.current = h;
    if (delta <= 0) return;
    el.style.transition = "none";
    el.style.transform = `translateY(${delta}px)`;
    void el.offsetHeight;
    el.style.transition = `transform ${RISE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    el.style.transform = "translateY(0)";
  }, [visibleCount, typingIndex, displayIndex, leaving]);

  // A scenario change slides the column out through the clip and back in.
  // Never a fade: opacity below 1 would drop the blur on the way out.
  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;
    // Leaving is not animated: the bubbles just go. Sliding the column out
    // read as the stack falling away, which was more noticeable than the swap.
    prevHeight.current = 0;
    el.style.transition = "none";
    el.style.transform = "translateY(0)";
  }, [leaving]);

  const scenario = HERO_ITEMS[displayIndex];

  return (
    <>
      {/* Background videos: one element per clip, all preloaded so swaps
          never wait on a decoder. The active clip plays from 0; ended clips
          stay on their last frame while opacity crossfades. */}
      <div className="absolute inset-0 z-0">
        {HERO_ITEMS.map((item, i) => (
          <video
            key={item.video}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            muted
            playsInline
            preload={activeIndex === i || preloadAll ? "auto" : "none"}
            poster={item.poster}
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

      {/* Chat bubbles — anchored to the hero bottom. pointer-events-none keeps
          the Learn more button (rendered by the server shell) clickable. */}
      {/* Chat column, matching sierra.ai's hero: a fixed-height, bottom-anchored
          stack pinned to the right of the 1160px container and clipped
          vertically, so each new bubble pushes the older ones up and out. */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="relative mx-auto h-full w-full max-w-[1160px] px-1 md:px-3 lg:px-6">
          <div className="absolute bottom-0 left-0 w-full min-[600px]:right-0 min-[600px]:bottom-0 min-[600px]:left-auto min-[600px]:w-auto">
            <div className="flex w-full flex-col justify-end overflow-y-clip p-4 min-[600px]:w-[454px] md:h-[386px] xl:pb-8">
              <div ref={listRef} className="flex w-full flex-col will-change-transform">
            {(leaving ? [] : scenario.bubbles.slice(0, visibleCount)).map((bubble, i) => (
              <div
                key={`${displayIndex}-${i}`}
                className={`hero-chat-slot flex ${
                  bubble.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {bubble.type === "user" && (
                  <UserBubble name={(bubble as { name: string; avatar: string; text: string }).name} avatar={(bubble as { name: string; avatar: string; text: string }).avatar} text={bubble.text!} />
                )}
                {bubble.type === "agent" && (
                  typingIndex === i && !leaving
                    ? <TypingBubble />
                    : <AgentBubble text={bubble.text!} agentName={(bubble as { agentName?: string }).agentName} />
                )}
                {bubble.type === "confirm" && (
                  <ConfirmBubble text={bubble.text!} title={(bubble as { title?: string }).title} variant={(bubble as { variant?: string }).variant} />
                )}
                {bubble.type === "picker" && (
                  <PickerBubble />
                )}
              </div>
            ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
