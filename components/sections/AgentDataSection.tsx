"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { AGENT_DATA_CARDS } from "@/lib/constants";

const CARD_IMAGES = [
  {
    src: "https://cdn.sanity.io/images/ca4jck6w/production/650b75d2d192484c3026a33f09060d9f21df1d99-1064x1064.png",
    alt: "User profile for Jess Rivers (jess@acme.co), member since 2012, with reason for calling: Activation, and current sentiment: Positive.",
  },
  {
    src: "https://cdn.sanity.io/images/ca4jck6w/production/85aac2f7285f4c682f73b4673bc7146d12a64a34-1064x1064.png",
    alt: "A database icon connected to logos for Google Cloud, Databricks, Snowflake, Redis, and AWS.",
  },
  {
    src: "https://cdn.sanity.io/images/ca4jck6w/production/5d99406b2ec116d2787377d9bf5175e64d8228b5-1064x1064.png",
    alt: "UI elements for a churn prevention strategy, showing Audience: High churn risk (100k) and Outcomes: Lifetime value.",
  },
  {
    src: "https://cdn.sanity.io/images/ca4jck6w/production/8b5d37aacf4740c73bb351d8ed1fdebba1d92c03-1064x1064.png",
    alt: "Chat about activating a new iPhone 17S for a daughter, with an agent suggesting a family plan.",
  },
];

/* ------------------------------------------------------------------ */
/*  Bubble Heart Icon                                                  */
/* ------------------------------------------------------------------ */

function BubbleHeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3.75 3.91211H20.25V18.4121H15.0155L11.9979 20.9121L9.0155 18.4121H3.75V3.91211Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M15.2513 10.8297C15.2513 12.9069 12.2709 14.4422 12 14.4422C11.7291 14.4422 8.74869 12.9069 8.74869 10.8297C8.74869 9.38462 9.65183 8.66211 10.555 8.66211C11.4581 8.66211 12 9.204 12 9.204C12 9.204 12.5419 8.66211 13.445 8.66211C14.3482 8.66211 15.2513 9.38462 15.2513 10.8297Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const GAP = 16; // mx-2 per side = 16px gap between cards

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function AgentDataSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const didDrag = useRef(false);
  const animOffset = useRef(0);

  const cardCount = AGENT_DATA_CARDS.length;

  const getCardWidth = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 300;
    const w = el.getBoundingClientRect().width;
    if (w >= 1280) return (w - GAP * 3) / 4;
    if (w >= 768) return (w - GAP) / 2;
    return w * 0.86;
  }, []);

  const cardsPerView = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 1;
    const w = el.getBoundingClientRect().width;
    if (w >= 1280) return 4;
    if (w >= 768) return 2;
    return 1;
  }, []);

  const maxIndex = useCallback(() => Math.max(0, cardCount - cardsPerView()), [cardCount, cardsPerView]);

  const offsetForIndex = useCallback((i: number) => {
    const cw = getCardWidth();
    return i * (cw + GAP);
  }, [getCardWidth]);

  const goTo = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(i, maxIndex()));
    setIndex(clamped);
    animOffset.current = offsetForIndex(clamped);
    setDragDelta(0);
  }, [maxIndex, offsetForIndex]);

  // Mouse handlers
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    didDrag.current = false;
    startX.current = e.pageX;
    startOffset.current = animOffset.current;
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.pageX - startX.current;
    if (Math.abs(dx) > 4) didDrag.current = true;
    setDragDelta(-dx);
  }, []);

  const onMouseUp = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dx = e.pageX - startX.current;
    if (Math.abs(dx) > 40) {
      goTo(dx < 0 ? index + 1 : index - 1);
    } else {
      goTo(index);
    }
  }, [index, goTo]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    didDrag.current = false;
    startX.current = e.touches[0].pageX;
    startOffset.current = animOffset.current;
  };

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].pageX - startX.current;
    if (Math.abs(dx) > 4) didDrag.current = true;
    setDragDelta(-dx);
  }, []);

  const onTouchEnd = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dx = e.changedTouches[0].pageX - startX.current;
    if (Math.abs(dx) > 40) {
      goTo(dx < 0 ? index + 1 : index - 1);
    } else {
      goTo(index);
    }
  }, [index, goTo]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  // Re-snap on resize + track container width
  useEffect(() => {
    const handler = () => {
      const clamped = Math.max(0, Math.min(index, maxIndex()));
      animOffset.current = offsetForIndex(clamped);
      setIndex(clamped);
      setDragDelta(0);
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [index, maxIndex, offsetForIndex]);

  const centerOffset = containerWidth > 0 ? (containerWidth - getCardWidth()) / 2 : 0;
  const translateX = -(animOffset.current + (isDragging.current ? dragDelta : 0)) + centerOffset;
  const isTransitioning = !isDragging.current;

  const atStart = index === 0;
  const atEnd = index >= maxIndex();

  return (
    <section className="relative bg-white pt-20 pb-8 overflow-hidden" style={{ zIndex: 2 }}>
      <div className="mx-auto w-full max-w-[1160px] px-6">
        {/* Header */}
        <div className="grid grid-cols-12 gap-5 gap-y-3 px-4 md:gap-y-4 md:px-0 xl:gap-y-6 pb-8 md:pb-14">
          <h3 className="col-span-12 whitespace-pre-wrap text-black xl:col-span-8 text-center text-balance xl:col-start-3 text-2xl md:text-3xl lg:text-[2.5rem] font-normal leading-tight">
            Turn conversations into lasting relationships
          </h3>
          <div className="col-span-12 flex min-w-[170px] gap-2 pt-2 lg:pt-0 justify-center">
            <a
              className="inline-flex cursor-pointer items-center justify-between rounded-full border border-gray-200 bg-transparent text-gray-900 hover:bg-gray-50 transition-colors h-10 gap-1 px-4 text-sm flex-row-reverse"
              href="/blog/agent-data-platform"
            >
              Agent Data Platform
              <BubbleHeartIcon className="h-[1em] w-[1em]" />
            </a>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div ref={containerRef} className="relative overflow-hidden">
        <div
          ref={trackRef}
          className={`flex gap-0 select-none ${isDragging.current ? "cursor-grabbing" : "cursor-grab"}`}
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: isTransitioning ? "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
            paddingLeft: 0,
            paddingRight: 0,
          }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          {AGENT_DATA_CARDS.map((card, i) => (
            <div
              key={card.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${cardCount}`}
              className="relative min-w-0 mx-2 flex flex-[0_0_86%] items-stretch justify-stretch first:ml-0 last:mr-0 md:flex-[0_0_calc(50%-8px)] xl:flex-[0_0_calc(25%-12px)]"
            >
              <article className="group flex w-full flex-col gap-4">
                <figure className="relative aspect-square w-full shrink-0 grow overflow-hidden rounded-2xl">
                  <Image
                    src={CARD_IMAGES[i].src}
                    alt={CARD_IMAGES[i].alt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 86vw"
                    className="object-cover pointer-events-none"
                    draggable={false}
                  />
                </figure>
                <div className="flex h-full flex-col gap-2 md:pr-2">
                  <h3 className="text-sm font-medium text-gray-900">{card.title}</h3>
                  <p className="max-w-[50ch] text-xs font-medium text-gray-500 leading-5">{card.description}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next buttons -- visible on xl */}
      <Container>
        <div className="hidden xl:flex justify-end gap-1 mt-6">
          <button
            onClick={() => goTo(index - 1)}
            disabled={atStart}
            aria-label="Previous slide"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full backdrop-blur-[100px] transition-colors bg-gray-400/6 text-gray-400 hover:bg-gray-400/10 disabled:bg-gray-400/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 24 24" fill="none" className="rotate-90 h-4 w-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 9L12 17L4 9" />
            </svg>
          </button>
          <button
            onClick={() => goTo(index + 1)}
            disabled={atEnd}
            aria-label="Next slide"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full backdrop-blur-[100px] transition-colors bg-gray-400/6 text-gray-400 hover:bg-gray-400/10 disabled:bg-gray-400/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 24 24" fill="none" className="-rotate-90 h-4 w-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 9L12 17L4 9" />
            </svg>
          </button>
        </div>
      </Container>
    </section>
  );
}
