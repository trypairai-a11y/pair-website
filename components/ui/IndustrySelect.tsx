"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, CircleCheck } from "lucide-react";

export default function IndustrySelect({
  id,
  name,
  options,
  placeholder = "Select your industry",
  ariaLabelledBy,
  onValueChange,
}: {
  id?: string;
  name: string;
  options: string[];
  placeholder?: string;
  ariaLabelledBy?: string;
  onValueChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative w-full">
      <input type="hidden" name={name} value={selected ?? ""} />

      <button
        id={id ?? name}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={ariaLabelledBy}
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between gap-6 rounded-lg md:rounded-md border bg-white px-4 py-3 md:py-4 text-[14px] md:text-[16px] transition-colors ${
          open
            ? "border-sierra-text-dark text-gray-900"
            : "border-sierra-gray/20 hover:border-sierra-gray/40"
        }`}
      >
        <span className={selected ? "text-sierra-text" : "text-sierra-gray/70"}>
          {selected ?? placeholder}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={2.5}
          className={`text-sierra-gray transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 bottom-full z-10 mb-2 overflow-hidden rounded-xl bg-white shadow-[0_0_12px_rgba(0,0,0,0.08)]">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setSelected(option);
                onValueChange?.(option);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-4 py-5 text-[15px] font-normal transition-colors ${
                option === selected
                  ? "bg-green-50 text-green-800"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>{option}</span>
              {option === selected && (
                <CircleCheck size={20} className="text-green-700" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
