"use client";

import { useId, useState } from "react";
import Container from "@/components/layout/Container";
import { VALUES } from "@/lib/about-content";

export default function ValuesAccordion() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
  const baseId = useId();

  const toggle = (i: number) =>
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section className="py-section bg-white">
      <Container narrow>
        <div className="grid grid-cols-12 gap-4">
          <ul className="col-span-12 xl:col-span-8 xl:col-start-3 flex flex-col gap-1">
            {VALUES.map((value, i) => {
              const open = openIndices.has(i);
              const Icon = value.icon;
              const panelId = `${baseId}-panel-${i}`;
              return (
                <li
                  key={value.label}
                  className={[
                    "rounded-2xl",
                    "motion-safe:transition-[color,background-color]",
                    "duration-300 ease-out",
                    open
                      ? "bg-pair-blue-dark text-white"
                      : "bg-[#f6f5f3] text-sierra-text-dark hover:bg-[#eeebe6]",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    className={[
                      "w-full text-left p-6 rounded-2xl",
                      "flex items-center justify-between gap-3",
                      "focus-visible:outline-2 focus-visible:outline-offset-2",
                      "focus-visible:outline-pair-blue",
                      "cursor-pointer",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        className="h-6 w-6 shrink-0"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span className="text-body-md font-medium">
                        {value.label}
                      </span>
                    </span>
                    <span
                      className="relative h-5 w-5 shrink-0"
                      aria-hidden="true"
                    >
                      <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-current" />
                      <span
                        className={`absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 origin-center rounded-full bg-current motion-safe:transition-transform duration-300 ease-out ${
                          open ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-label={value.label}
                    data-open={open}
                    className="accordion-panel px-6"
                  >
                    <div>
                      <p className="max-w-[75ch] pb-6 text-body-sm text-white/85">
                        {value.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
