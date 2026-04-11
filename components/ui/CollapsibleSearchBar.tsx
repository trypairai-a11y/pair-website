"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

export default function CollapsibleSearchBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Calculate animation progress based on scroll position
  // Progress goes from 0 at top to 1 when search bar should be fully collapsed
  useEffect(() => {
    const onScroll = () => {
      // Trigger animation between y: 0 and y: 400
      const y = window.scrollY;
      const progress = Math.min(y / 400, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Calculate transform values
  const scale = 1 - scrollProgress * 0.6; // Scales from 1 to 0.4
  const opacity = 1 - scrollProgress * 0.3; // Fades slightly
  const translateY = scrollProgress * -120; // Moves up

  return (
    <>
      {/* Large search bar in hero section */}
      <div
        ref={containerRef}
        className="absolute top-0 left-0 right-0 z-30 pt-32 pointer-events-none"
        style={{
          transform: `translateY(${translateY}px)`,
          transition: "none",
        }}
      >
        <div className="mx-auto w-full max-w-[800px] px-6 lg:px-10 pointer-events-auto">
          <div
            style={{
              transform: `scale(${scale})`,
              opacity,
              transformOrigin: "center top",
              transition: "none",
            }}
          >
            <div className="relative w-full">
              <input
                ref={searchRef}
                type="text"
                placeholder="Ask a follow-up question"
                className="w-full px-6 py-4 bg-white/95 backdrop-blur-sm rounded-full text-sierra-text placeholder-sierra-gray/70 outline-none focus:ring-2 focus:ring-sierra-green focus:ring-offset-0 text-base shadow-lg"
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-sierra-green hover:bg-sierra-green-dark text-white rounded-full p-2.5 transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Compact search bar that appears in navbar when scrolled */}
      <div
        className="fixed top-16 left-0 right-0 z-40 px-6 lg:px-10 py-2 pointer-events-none"
        style={{
          opacity: Math.min(scrollProgress * 2, 1),
          transition: "opacity 0.2s ease-out",
        }}
      >
        <div className="mx-auto w-full max-w-7xl pointer-events-auto">
          <div className="relative max-w-xs">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sierra-text placeholder-sierra-gray/70 outline-none focus:ring-2 focus:ring-sierra-green focus:ring-offset-0 text-sm shadow-sm"
            />
            <button
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-sierra-green hover:bg-sierra-green-dark text-white rounded-full p-1.5 transition-colors"
              aria-label="Search"
            >
              <Search size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
