"use client";

import { useState } from "react";
import { Play, Plus, X } from "lucide-react";

export default function GradientCard({
  title,
  description,
  gradient,
  children,
  fillContent = false,
  backgroundContent = false,
}: {
  title: string;
  description: string;
  gradient: string;
  children?: React.ReactNode | ((props: { paused: boolean }) => React.ReactNode);
  fillContent?: boolean;
  backgroundContent?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const resolvedChildren = typeof children === "function" ? children({ paused: !isPlaying }) : children;

  return (
    <div
      className="group relative rounded-[1.1rem] flex flex-col min-h-[560px] md:min-h-[580px] xl:min-h-[580px] overflow-hidden cursor-pointer"
      style={{ background: gradient }}
      onClick={() => setIsPlaying((p) => !p)}
    >
      {backgroundContent && (
        <div className={`absolute inset-0 w-full h-full ${isExpanded ? "hidden md:block" : "block"}`}>
          {resolvedChildren}
        </div>
      )}

      <h3 className={`text-[16px] leading-6 font-medium text-white mb-4 md:mb-6 relative z-10 ${fillContent ? "px-9 pt-9" : "pt-9 pl-9 pr-14 pb-2 md:pb-9"}`}>
        {title}
      </h3>

      {!backgroundContent && (
        <div className={`flex-1 flex ${fillContent ? "items-stretch justify-stretch" : "items-center justify-center"}${!isPlaying ? " card-paused" : ""} ${isExpanded ? "hidden md:flex" : "flex"}`}>
          {resolvedChildren}
        </div>
      )}

      <p className={`text-[15px] leading-6 font-normal text-white ${fillContent ? "px-9 pb-9" : "px-9 pb-9 pr-14 md:pr-9"} relative z-10 md:mt-auto ${isExpanded ? "block" : "hidden md:block"}`}>
        {description}
      </p>

      {isExpanded && <div className="flex-1 md:hidden" />}

      <button
        onClick={(e) => { e.stopPropagation(); setIsPlaying((p) => !p); }}
        className={`absolute w-11 h-11 rounded-full bg-white/90 hover:bg-white transition-opacity shadow-sm md:opacity-0 md:group-hover:opacity-100 items-center justify-center z-50 ${fillContent ? "top-7 right-7" : "top-6 right-6"} ${isExpanded ? "hidden md:flex" : "flex"}`}
        aria-label={isPlaying ? "Pause animation" : "Play animation"}
      >
        {isPlaying
          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-800"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
          : <Play size={16} className="text-gray-800 fill-gray-800" />
        }
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); setIsExpanded((ex) => !ex); }}
        className={`md:hidden absolute w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center z-50 ${fillContent ? "bottom-7 right-7" : "bottom-6 right-6"}`}
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
