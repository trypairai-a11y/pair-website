"use client";

import { useRef, useEffect, useState } from "react";

export default function AnalyticsInsightCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative w-full max-w-[500px] mx-auto select-none pointer-events-none"
      style={{
        animation: isInView ? "fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" : "none",
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
      {/* Card */}
      <div className="card-glass rounded-2xl overflow-hidden">
        {/* Question header */}
        <div className="px-6 pt-5 pb-4 border-b border-white/60">
          <p className="text-[15px] text-gray-800 leading-snug">
            What are the main reasons for higher customer satisfaction scores?
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {/* Summary */}
          <p className="text-[13px] font-semibold text-gray-900 mb-1">Summary</p>
          <p className="text-[13px] text-gray-500 leading-relaxed mb-5">
            Customer satisfaction is rising this week, mainly due to a new return policy and a decrease in
            shipping delays.
          </p>

          {/* Total Conversations */}
          <p className="text-[12px] text-gray-400 mb-1">Total Conversations</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[32px] font-light text-gray-900 tracking-tight">88,412</span>
            <span className="text-[13px] font-medium text-green-500">+138%</span>
          </div>

          {/* Area chart */}
          <div className="w-full mb-5" style={{ height: 80 }}>
            <svg viewBox="0 0 460 80" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path
                d="M0,72 C40,70 80,68 120,62 C160,56 200,48 240,40 C280,32 320,20 360,12 C400,6 430,4 460,2 L460,80 L0,80 Z"
                fill="url(#areaGrad)"
              />
              <path
                d="M0,72 C40,70 80,68 120,62 C160,56 200,48 240,40 C280,32 320,20 360,12 C400,6 430,4 460,2"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Top Topics */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] text-gray-400">Top Topics</span>
            <span className="text-[12px] text-gray-400">Last 24h ▲</span>
          </div>

          <div className="space-y-4">
            {[
              { label: "New return policy", count: "5,560", change: "+19%", trend: "up" },
              { label: "Shipping delays", count: "8,728", change: "-15%", trend: "down" },
              { label: "Price matching", count: "8,579", change: "+11%", trend: "up" },
              { label: "Restock alerts", count: "5,999", change: "+22%", trend: "up" },
              { label: "Loyalty program", count: "2,255", change: "+12%", trend: "up" },
            ].map(({ label, count, change, trend }) => (
              <div key={label} className="flex items-center">
                <span className="text-[14px] text-gray-800 flex-1">{label}</span>
                <span className="text-[13px] text-green-500 w-14 text-right">{count}</span>
                <span
                  className={`text-[12px] w-10 text-right ml-2 ${
                    trend === "down" ? "text-red-400" : "text-green-500"
                  }`}
                >
                  {change}
                </span>
                <div className="ml-3 w-12 h-6">
                  <Sparkline up={trend === "up"} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-6 py-3 border-t border-white/60 flex items-center gap-3">
          <span className="text-[13px] text-gray-400 flex-1">Ask a follow-up question</span>
          <div className="flex items-center gap-3 text-gray-400">
            <ClockIcon />
            <RefreshIcon />
            <GridIcon />
            <ChatIcon />
            <BellIcon />
            <GearIcon />
          </div>
          <div className="ml-1 bg-blue-500 text-white text-[13px] font-medium px-4 py-1.5 rounded-lg">
            Ask
          </div>
        </div>
      </div>

      {/* Fade-out overlay covering bottom 25% */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "25%",
          background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.72) 100%)",
        }}
      />
    </div>
  );
}

function Sparkline({ up }: { up: boolean }) {
  const color = up ? "#22c55e" : "#f87171";
  const path = up
    ? "M0,16 C4,14 8,10 12,8 C16,6 20,4 24,2 C28,0 32,1 36,0"
    : "M0,0 C4,2 8,6 12,8 C16,10 20,14 24,14 C28,14 32,15 36,16";

  return (
    <svg viewBox="0 0 36 16" className="w-full h-full" preserveAspectRatio="none">
      <path d={path} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 4v6h6" />
      <path d="M23 20v-6h-6" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
