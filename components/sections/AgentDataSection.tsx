"use client";

import { useRef, useState, useCallback, useEffect, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { AGENT_DATA_CARDS } from "@/lib/constants";
import { TrendingUp, LayoutGrid, Code } from "lucide-react";

export type PlatformCard = {
  title: string;
  description: string;
  mock?: ReactNode;
  image?: { src: string; alt: string };
};

const CARD_IMAGES = [
  {
    src: "/insights/agent-memory.png",
    alt: "Customer profile card showing Khalid Ali, member since 2021, with reason for calling: Activation and current sentiment: Positive.",
  },
  {
    src: "/insights/customer-data.png",
    alt: "A central database icon connected via dashed lines to logos of integrated business systems, including Odoo.",
  },
  {
    src: "/insights/recommendations.png",
    alt: "UI elements for a recommendation strategy named Cold Feet, with audience 'Left item in cart' and a list of outcomes.",
  },
  {
    src: "/insights/proactive-engagement.png",
    alt: "Chat about a new family movie, with the agent asking Danah if she's heard about the new Adam Sandler release.",
  },
];

/* ------------------------------------------------------------------ */
/*  Brain Icon                                                         */
/* ------------------------------------------------------------------ */

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 20.6333C12.7349 21.1252 13.6187 21.4121 14.5694 21.4121C16.6819 21.4121 18.4635 19.9959 19.0167 18.0612C20.3271 17.5238 21.25 16.2355 21.25 14.7316C21.25 13.725 20.8366 12.815 20.1703 12.1621C20.8366 11.5092 21.25 10.5992 21.25 9.59267C21.25 7.73764 19.8459 6.21057 18.0425 6.01631C17.5934 4.23258 15.9787 2.91211 14.0556 2.91211C13.3067 2.91211 12.6047 3.11231 12 3.4621M12 20.6333C11.2651 21.1252 10.3813 21.4121 9.43056 21.4121C7.31815 21.4121 5.5365 19.9959 4.98327 18.0612C3.67291 17.5238 2.75 16.2355 2.75 14.7316C2.75 13.725 3.16341 12.815 3.82969 12.1621C3.16341 11.5092 2.75 10.5992 2.75 9.59267C2.75 7.73764 4.15413 6.21057 5.95754 6.0163C6.40662 4.23258 8.02133 2.91211 9.94444 2.91211C10.6933 2.91211 11.3953 3.11231 12 3.4621M12 20.6333L12 3.4621M8.75 13.9121C10.5449 13.9121 12 15.3672 12 17.1621M15.25 10.4121C13.4551 10.4121 12 8.95703 12 7.16211" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const GAP = 16; // mx-2 per side = 16px gap between cards
const H_PAD = 40; // edge margin so content never touches the viewport border
const PEEK = 20; // reserved sliver so an off-screen card is always visible
const LEFT_PAD = 24; // left edge offset for the first card only

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

interface ButtonConfig {
  label: string;
  href: string;
  icon?: "trending" | "brain" | "studio" | "sdk";
}

export default function AgentDataSection({
  title = "Turn conversations into lasting relationships",
  buttons,
  buttonLabel,
  buttonHref,
  buttonIcon,
  cards,
}: {
  title?: string;
  buttons?: ButtonConfig[];
  buttonLabel?: string;
  buttonHref?: string;
  buttonIcon?: ButtonConfig["icon"];
  cards?: PlatformCard[];
}) {
  const cardList = cards ?? AGENT_DATA_CARDS;
  const defaultButtons: ButtonConfig[] = [
    { label: "Product", href: "/product", icon: "brain" },
  ];
  const buttonList = buttons || (buttonLabel ? [{ label: buttonLabel, href: buttonHref || "#", icon: buttonIcon || "trending" }] : defaultButtons);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const [cardWidth, setCardWidth] = useState(300);
  const [containerWidth, setContainerWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [animOffsetState, setAnimOffsetState] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const didDrag = useRef(false);
  const animOffset = useRef(0);

  const cardCount = cardList.length;

  const getCardWidth = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 300;
    const w = el.getBoundingClientRect().width;
    const avail = w - H_PAD * 2 - PEEK * 2;
    if (w >= 1280) return (avail - GAP * 3) / 4;
    if (w >= 768) return (avail - GAP) / 2;
    return avail;
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
    setDragging(false);
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
    setDragging(true);
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
    setDragging(false);
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

  const isMobileView = containerWidth > 0 && containerWidth < 768;
  const cpv = containerWidth >= 1280 ? 4 : containerWidth >= 768 ? 2 : 1;
  const groupWidth = cpv * cardWidth + (cpv - 1) * GAP;
  const edgeOffset = containerWidth > 0
    ? isMobileView
      ? (containerWidth - cardWidth) / 2
      : (containerWidth - groupWidth) / 2
    : LEFT_PAD;
  const translateX = -(animOffsetState + (dragging ? dragDelta : 0)) + edgeOffset;
  const isTransitioning = !dragging;

  return (
    <section className="relative bg-white pt-24 pb-16 md:pb-24 overflow-hidden" style={{ zIndex: 2 }}>
      <Container>
        <div className="text-center mb-8">
          <h3 className="text-headline-md font-normal text-sierra-text-dark mb-3 text-balance">
            {title}
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {buttonList.map((btn) => (
              <Link
                key={btn.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-transparent px-4 py-2.5 mt-1 mb-4 text-[12px] font-normal text-sierra-text-dark cursor-pointer transition-colors hover:border-blue-400/40 hover:bg-blue-50/40"
                href={btn.href}
              >
                {btn.icon === "trending" ? (
                  <TrendingUp size={11} />
                ) : btn.icon === "studio" ? (
                  <LayoutGrid size={11} />
                ) : btn.icon === "sdk" ? (
                  <Code size={11} />
                ) : (
                  <BrainIcon className="h-[11px] w-[11px]" />
                )}
                {btn.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>

      {/* Carousel */}
      <div ref={containerRef} className="relative overflow-hidden">
        <div
          ref={trackRef}
          className={`flex gap-0 select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: isTransitioning ? "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
            paddingLeft: 0,
            paddingRight: 0,
          }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          {cardList.map((card, i) => {
            const mock: ReactNode | undefined = "mock" in card ? (card as PlatformCard).mock : undefined;
            const image = (card as PlatformCard).image ?? CARD_IMAGES[i];
            return (
              <div
                key={card.title}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${cardCount}`}
                className="relative mx-2 flex items-stretch justify-stretch first:ml-0 last:mr-0"
                style={{ flex: `0 0 ${cardWidth}px` }}
              >
                <article className="group flex w-full flex-col gap-4">
                  <figure className="relative aspect-square w-full shrink-0 grow overflow-hidden rounded-2xl">
                    {mock ? (
                      mock
                    ) : (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 86vw"
                        className="object-cover pointer-events-none"
                        draggable={false}
                      />
                    )}
                  </figure>
                  <div className="flex h-full flex-col gap-2 md:pr-2">
                    <h3 className="flex w-full gap-2 text-sm font-normal text-sierra-text-dark items-center justify-start">{card.title}</h3>
                    <p className="max-w-[50ch] text-sm font-normal text-gray-500 leading-5">{card.description}</p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
