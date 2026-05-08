"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { INSIGHTS_CARDS } from "@/lib/constants";
import { TrendingUp } from "lucide-react";

const IMAGES = [
  {
    src: "/insights/ask.png",
    alt: "Report asking 'What made 12,000 customers ask for a real person?' and listing 'Order stuck in customs' as the top reason from 400,000 conversations last month.",
  },
  {
    src: "/insights/stats.png",
    alt: "Data cards displaying a 92% CSAT score with an upward trending line graph and a partial bar chart for total conversations.",
  },
  {
    src: "https://cdn.sanity.io/images/ca4jck6w/production/c4bba54619014da58a35f8420cb88858d84cd710-1064x1064.png",
    alt: "Two agent chat bubbles addressing Scott: 'Hey Scott, how can I help?' and 'Hello Scott, how are you this evening?'",
  },
  {
    src: "https://cdn.sanity.io/images/ca4jck6w/production/d7e6b71857f0b2480f4c7672aedb06d4950333c3-1064x1064.png",
    alt: "Agent reasoning panel listing Supervisors, Decisions, and Responses, each marked complete with a green checkmark.",
  },
];

const GAP = 16; // mx-2 per side = 16px gap between cards

export default function InsightsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Current snapped index
  const [index, setIndex] = useState(0);
  // Live drag offset added on top of the snapped position
  const [dragDelta, setDragDelta] = useState(0);
  // Container width for center-snapping
  const [containerWidth, setContainerWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [animOffsetState, setAnimOffsetState] = useState(0);
  const [cardWidth, setCardWidth] = useState(300);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const didDrag = useRef(false);
  const animOffset = useRef(0); // snapped base offset (mirrors index)
  const lastX = useRef(0);
  const lastTime = useRef(0);

  const cardCount = INSIGHTS_CARDS.length;

  // Compute card width based on container
  const getCardWidth = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 300;
    const w = el.getBoundingClientRect().width;
    if (w >= 1280) return (w - GAP * 3) / 4; // xl: 4 cards
    if (w >= 768)  return (w - GAP) / 2;      // md: 2 cards
    return w * 0.86;                           // mobile: 86%
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
    const next = offsetForIndex(clamped);
    animOffset.current = next;
    setAnimOffsetState(next);
    setDragDelta(0);
  }, [maxIndex, offsetForIndex]);

  // Mouse handlers
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setDragging(true);
    didDrag.current = false;
    startX.current = e.pageX;
    lastX.current = e.pageX;
    lastTime.current = Date.now();
    startOffset.current = animOffset.current;
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.pageX - startX.current;
    if (Math.abs(dx) > 4) didDrag.current = true;
    lastX.current = e.pageX;
    lastTime.current = Date.now();
    setDragDelta(-dx);
  }, []);

  const onMouseUp = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDragging(false);
    const dx = e.pageX - startX.current;
    const timeDelta = Math.max(Date.now() - lastTime.current, 16);
    const velocity = (lastX.current - e.pageX) / timeDelta;

    // Threshold: 25px or velocity > 0.5px/ms
    const threshold = 25;
    const shouldMove = Math.abs(dx) > threshold || Math.abs(velocity) > 0.5;

    if (shouldMove) {
      goTo(dx < 0 ? index + 1 : index - 1);
    } else {
      goTo(index);
    }
  }, [index, goTo]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    setDragging(true);
    didDrag.current = false;
    startX.current = e.touches[0].pageX;
    lastX.current = e.touches[0].pageX;
    lastTime.current = Date.now();
    startOffset.current = animOffset.current;
  };

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].pageX - startX.current;
    if (Math.abs(dx) > 4) didDrag.current = true;
    lastX.current = e.touches[0].pageX;
    lastTime.current = Date.now();
    setDragDelta(-dx);
  }, []);

  const onTouchEnd = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDragging(false);
    const dx = e.changedTouches[0].pageX - startX.current;
    const timeDelta = Math.max(Date.now() - lastTime.current, 16);
    const velocity = (lastX.current - e.changedTouches[0].pageX) / timeDelta;

    // Threshold: 25px or velocity > 0.5px/ms
    const threshold = 25;
    const shouldMove = Math.abs(dx) > threshold || Math.abs(velocity) > 0.5;

    if (shouldMove) {
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

  // Re-snap on resize + track container width for centering
  useEffect(() => {
    const handler = () => {
      const clamped = Math.max(0, Math.min(index, maxIndex()));
      const next = offsetForIndex(clamped);
      animOffset.current = next;
      setAnimOffsetState(next);
      setIndex(clamped);
      setDragDelta(0);
      setCardWidth(getCardWidth());
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [index, maxIndex, offsetForIndex, getCardWidth]);

  // Measure container width on mount to ensure proper centering
  useEffect(() => {
    if (containerRef.current) {
      const observer = new ResizeObserver(() => {
        if (containerRef.current) {
          const width = containerRef.current.getBoundingClientRect().width;
          setContainerWidth(width);
        }
      });

      observer.observe(containerRef.current);

      // Trigger initial measurement
      const width = containerRef.current.getBoundingClientRect().width;
      if (width > 0) {
        setContainerWidth(width);
      }

      return () => observer.disconnect();
    }
  }, []);

  const isMobileView = containerWidth > 0 && containerWidth < 768;
  const centerOffset = containerWidth > 0 && isMobileView
    ? Math.max(12, (containerWidth - cardWidth) / 2 - 20)
    : 0;
  const translateX = -(animOffsetState + (dragging ? dragDelta : 0)) + centerOffset;
  const isTransitioning = !dragging;

  return (
    <section className="bg-white pt-10 pb-16 md:pt-12 md:pb-20 xl:pt-16 xl:pb-24 overflow-hidden">
      <Container>
        <div className="text-center mb-8 md:mb-20">
          <h3 className="text-headline-xl font-normal text-sierra-text-dark mb-3 text-balance">
            Better, every day.
          </h3>
          <Link
            href="/product/insights"
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-transparent px-4 py-2.5 mt-1 mb-2 md:mb-16 text-[12px] font-normal text-sierra-text-dark cursor-pointer transition-colors hover:border-blue-400/40 hover:bg-blue-50/40"
          >
            <TrendingUp size={11} />
            Insights
          </Link>
        </div>
      </Container>

      {/* Carousel */}
      <div ref={containerRef} className="relative overflow-hidden px-3 lg:px-4">
        {/* Left padding aligns with Container */}
        <div
          ref={trackRef}
          className={`flex gap-0 select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: isTransitioning ? "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
            paddingLeft: 0,
            paddingRight: 0,
          }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          {INSIGHTS_CARDS.map((card, i) => (
            <div
              key={card.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${cardCount}`}
              className="relative min-w-0 mx-2 flex flex-[0_0_86%] items-stretch justify-stretch first:ml-0 last:mr-0 md:flex-[0_0_calc(50%-8px)] xl:flex-[0_0_calc(25%-12px)]"
            >
              <article className="group flex w-full flex-col gap-4">
                <figure className="relative aspect-[10/9] w-full shrink-0 grow overflow-hidden rounded-3xl bg-[#eff3fb]">
                  <Image
                    src={IMAGES[i].src}
                    alt={IMAGES[i].alt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 86vw"
                    className="object-cover pointer-events-none scale-[1.08]"
                    draggable={false}
                  />
                </figure>
                <div className="flex h-full flex-col gap-2 md:pr-2">
                  <h3 className="text-sm font-normal text-sierra-text-dark">{card.title}</h3>
                  <p className="max-w-[50ch] text-lg font-normal text-gray-500 leading-7">{card.description}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
