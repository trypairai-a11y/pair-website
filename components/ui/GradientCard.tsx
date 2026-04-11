"use client";

import { useState } from "react";
import { Pause, Play, Plus, X } from "lucide-react";

export default function GradientCard({
  title,
  description,
  gradient,
  children,
  fillContent = false,
}: {
  title: string;
  description: string;
  gradient: string;
  children?: React.ReactNode;
  fillContent?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="group relative rounded-[1.1rem] flex flex-col min-h-[740px] md:min-h-[860px] overflow-hidden"
      style={{ background: gradient }}
    >
      <h3 className={`text-[19px] leading-7 font-medium text-white mb-6 ${fillContent ? "px-6 pt-6" : "p-6 pr-12"}`}>
        {title}
      </h3>

      {isExpanded ? (
        <>
          <p className={`text-[15px] leading-6 font-semibold text-white/80 mb-4 ${fillContent ? "px-6" : ""}`}>
            {description}
          </p>
          <div className="flex-1" />
        </>
      ) : (
        <>
          <div className={`flex-1 flex ${fillContent ? "items-stretch justify-stretch" : "items-center justify-center"}${!isPlaying ? " card-paused" : ""}`}>
            {children}
          </div>
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className={`absolute w-11 h-11 rounded-full bg-white/90 hover:bg-white transition-all flex items-center justify-center shadow-sm opacity-100 group-hover:opacity-100 ${fillContent ? "top-6 right-6" : "top-5 right-5"}`}
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
          >
            {isPlaying
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-800"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
              : <Play size={16} className="text-gray-800 fill-gray-800" />
            }
          </button>
        </>
      )}

      <button
        onClick={() => setIsExpanded((e) => !e)}
        className={`absolute w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center ${fillContent ? "bottom-6 right-6" : "bottom-5 right-5"}`}
        aria-label={isExpanded ? "Collapse" : "Expand"}
      >
        {isExpanded
          ? <X size={18} className="text-white" />
          : <Plus size={18} className="text-white" />
        }
      </button>
    </div>
  );
}
