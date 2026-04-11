import {
  TrendingUp,
  MessageSquare,
  AlertCircle,
  Navigation,
  Settings2,
  BookOpen,
  FlaskConical,
  RefreshCw,
  LayoutGrid,
  Bell,
  Settings,
  Clock,
} from "lucide-react";

const SIDEBAR = [
  {
    group: "Review",
    items: [
      { label: "Insights", icon: TrendingUp, active: true },
      { label: "Conversations", icon: MessageSquare, active: false },
      { label: "Issues", icon: AlertCircle, active: false },
    ],
  },
  {
    group: "Customize",
    items: [
      { label: "Journeys", icon: Navigation, active: false },
      { label: "Configuration", icon: Settings2, active: false },
      { label: "Knowledge", icon: BookOpen, active: false },
      { label: "Simulations", icon: FlaskConical, active: false },
    ],
  },
];

const TOP_TOPICS = [
  { label: "New return policy",  value: "5,560", change: "+19%", up: true,  points: "0,22 8,20 16,17 24,13 32,9 40,6 48,3" },
  { label: "Shipping delays",    value: "8,728", change: "-15%", up: false, points: "0,3 8,5 16,8 24,11 32,15 40,18 48,22" },
  { label: "Price matching",     value: "8,579", change: "+11%", up: true,  points: "0,20 8,17 16,16 24,12 32,9 40,7 48,4" },
  { label: "Restock alerts",     value: "5,999", change: "+22%", up: true,  points: "0,22 8,19 16,15 24,11 32,7 40,4 48,2" },
  { label: "Loyalty program",    value: "2,255", change: "+12%", up: true,  points: "0,18 8,16 16,14 24,11 32,9 40,7 48,5" },
];

function Sparkline({ points, up }: { points: string; up: boolean }) {
  const color = up ? "#22c55e" : "#ef4444";
  return (
    <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
      <polyline
        points={points}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";

export default function DashboardMockup() {
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
      className="card-glass rounded-2xl overflow-hidden text-[13px]"
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
      <div className="flex">
        {/* ── Sidebar ── */}
        <aside className="hidden md:flex flex-col w-44 border-r border-white/60 py-5 flex-shrink-0">
          {/* Logo */}
          <div className="flex items-center gap-2 px-4 mb-5">
            <div className="w-6 h-6 rounded-md bg-sierra-text-dark flex items-center justify-center">
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
                <circle cx="8" cy="8" r="2" fill="white"/>
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-sierra-text-dark tracking-wide uppercase">
              Pair
            </span>
          </div>

          {SIDEBAR.map((group) => (
            <div key={group.group} className="mb-4">
              <p className="px-4 text-[10px] font-medium text-sierra-gray/60 uppercase tracking-wider mb-1">
                {group.group}
              </p>
              {group.items.map(({ label, icon: Icon, active }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 px-4 py-1.5 mx-2 rounded-md text-[11px] cursor-pointer transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-sierra-gray hover:text-sierra-text hover:bg-gray-50"
                  }`}
                >
                  <Icon size={12} strokeWidth={active ? 2 : 1.5} />
                  {label}
                </div>
              ))}
            </div>
          ))}
        </aside>

        {/* ── Main content ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Query */}
          <div className="px-6 pt-5 pb-3 border-b border-white/60">
            <p className="text-[13px] text-sierra-text">
              What are the main reasons for higher customer satisfaction scores?
            </p>
          </div>

          <div className="flex-1 px-6 py-4">
            {/* Summary */}
            <p className="text-[11px] font-medium text-sierra-text mb-0.5">Summary</p>
            <p className="text-[11px] text-sierra-gray/70 mb-5 leading-4">
              Customer satisfaction is rising this week, mainly due to a new return policy and a decrease in shipping delays.
            </p>

            {/* Two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: chart */}
              <div>
                <p className="text-[11px] text-sierra-gray mb-1">Total Conversations</p>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-[28px] font-light tracking-tight text-sierra-text-dark leading-none">
                    88,&thinsp;412
                  </span>
                  <span className="text-[11px] text-green-500 font-medium">+138%</span>
                </div>
                {/* Area chart */}
                <svg viewBox="0 0 280 72" className="w-full h-16" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Area fill */}
                  <path
                    d="M0,68 C20,67 40,65 60,62 C80,59 100,54 120,48 C140,42 160,34 180,26 C200,18 220,12 240,8 C255,5 268,4 280,3 L280,72 L0,72 Z"
                    fill="url(#areaGrad)"
                  />
                  {/* Line */}
                  <path
                    d="M0,68 C20,67 40,65 60,62 C80,59 100,54 120,48 C140,42 160,34 180,26 C200,18 220,12 240,8 C255,5 268,4 280,3"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Right: top topics */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] text-sierra-gray">Top Topics</p>
                  <span className="text-[10px] text-sierra-gray flex items-center gap-0.5">
                    Last 24h <span className="text-[8px]">▲</span>
                  </span>
                </div>
                <div className="space-y-2.5">
                  {TOP_TOPICS.map((t) => (
                    <div key={t.label} className="flex items-center gap-2">
                      <span className="text-[11px] text-sierra-text flex-1 truncate min-w-0">
                        {t.label}
                      </span>
                      <span className="text-[11px] text-green-500 font-medium w-10 text-right flex-shrink-0">
                        {t.value}
                      </span>
                      <span
                        className={`text-[10px] w-8 text-right flex-shrink-0 ${
                          t.up ? "text-green-500" : "text-red-400"
                        }`}
                      >
                        {t.change}
                      </span>
                      <div className="flex-shrink-0">
                        <Sparkline points={t.points} up={t.up} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="px-6 py-3 border-t border-white/60 flex items-center gap-2">
            <span className="text-[11px] text-sierra-gray/40 flex-1">
              Ask a follow-up question
            </span>
            <div className="flex items-center gap-3 text-sierra-gray/40">
              <Clock size={13} />
              <RefreshCw size={13} />
              <LayoutGrid size={13} />
              <MessageSquare size={13} />
              <Bell size={13} />
              <Settings size={13} />
            </div>
            <button className="ml-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors px-3.5 py-1.5 text-[11px] text-white font-medium">
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
