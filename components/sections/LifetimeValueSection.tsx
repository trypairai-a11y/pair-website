"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Container from "@/components/layout/Container";

type Card = {
  label: string;
  body: string;
  rtl?: boolean;
};

const CARDS: Card[] = [
  {
    label: "AI AGENT",
    body: "Danah. Your usual order, same card, same address. Send it?",
  },
  {
    label: "TOMORROW",
    body: "Personal Trainer with Yousef.\n10:00 AM. Pair confirmed.",
  },
  {
    label: "DELIVERY",
    body: "12 min away. Driver Ahmed.\nPlate 48392.",
  },
  {
    label: "RESOLVED",
    body: "29 KD duplicate charge refunded.\n3 minutes.",
  },
  {
    label: "الوكيل",
    body: "أوردرك طلع من المخزن أمس يا محمد. يوصلك اليوم قبل 6.",
    rtl: true,
  },
  {
    label: "RESTORED",
    body: "Router reset remotely. Back online in 90 seconds.",
  },
];

const arabicFontStack = {
  fontFamily:
    "var(--font-almarai), Inter, 'Noto Sans Arabic', -apple-system, sans-serif",
};

function useMediaQuery(query: string) {
  const subscribe = (cb: () => void) => {
    if (typeof window === "undefined") return () => {};
    const mq = window.matchMedia(query);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  };
  const getSnapshot = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false;
  const getServerSnapshot = () => false;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function LifetimeValueSection() {
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const cycleMs = isDesktop ? 4000 : 3000;

  const [slots, setSlots] = useState<[number, number]>([0, 1]);
  const [nextSlot, setNextSlot] = useState<0 | 1>(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlots((prev) => {
        const other = prev[1 - nextSlot];
        let candidate = (prev[nextSlot] + 2) % CARDS.length;
        if (candidate === other) candidate = (candidate + 1) % CARDS.length;
        const next: [number, number] = [prev[0], prev[1]];
        next[nextSlot] = candidate;
        return next;
      });
      setNextSlot((s) => (s === 0 ? 1 : 0));
    }, cycleMs);
    return () => clearInterval(id);
  }, [nextSlot, cycleMs]);

  const fadeDuration = reduced ? 0.2 : 0.6;

  const renderCard = (index: number) => {
    const card = CARDS[index];
    const lines = card.body.split("\n");
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: fadeDuration, ease: "easeOut" }}
        className="backdrop-blur-xl bg-white/[0.08] border border-white/10 rounded-3xl p-6 w-full max-w-[320px] shadow-2xl shadow-black/30"
      >
        <div
          className="text-[11px] uppercase tracking-[0.14em] text-white/60 mb-3"
          style={card.rtl ? arabicFontStack : undefined}
        >
          {card.label}
        </div>
        <div
          className="text-[15px] leading-relaxed text-white"
          dir={card.rtl ? "rtl" : "ltr"}
          style={card.rtl ? arabicFontStack : undefined}
        >
          {lines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderSlot = (cardIndex: number) => (
    <motion.div
      animate={reduced ? undefined : { y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="w-full max-w-[320px]"
    >
      <AnimatePresence mode="popLayout">{renderCard(cardIndex)}</AnimatePresence>
    </motion.div>
  );

  return (
    <section className="relative bg-neutral-900 py-32 overflow-hidden">
      <Container>
        <div className="mx-auto max-w-5xl flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white text-center mb-14 md:mb-20">
            Known, not numbered.
          </h2>

          <div
            aria-hidden="true"
            className="hidden md:block relative w-full h-[440px] mb-16"
          >
            <div className="absolute top-6 left-[8%]">{renderSlot(slots[0])}</div>
            <div className="absolute bottom-6 right-[8%]">
              {renderSlot(slots[1])}
            </div>
          </div>

          <div
            aria-hidden="true"
            className="md:hidden flex flex-col items-center gap-4 w-full mb-12"
          >
            {renderSlot(slots[0])}
            {renderSlot(slots[1])}
          </div>

          <p className="max-w-2xl mx-auto text-center text-white/60 text-lg">
            Your customers don&apos;t start from scratch. Neither does Pair.
          </p>
        </div>
      </Container>
    </section>
  );
}
