"use client";

import { useState } from "react";
import PairLogo from "@/components/icons/PairLogo";
import { LinkedInIcon, InstagramIcon, XIcon } from "@/components/icons/SocialIcons";
import { FOOTER_COLUMNS, LEGAL_LINKS } from "@/lib/constants";
import { ChevronDown, ChevronUp, CircleCheck } from "lucide-react";

const LOCALE_OPTIONS = [
  { label: "United Kingdom", language: "English", isArabic: false },
  { label: "\u0627\u0644\u0643\u0648\u064A\u062A", language: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", isArabic: true },
  { label: "United States", language: "English", isArabic: false },
];

export default function Footer() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(2); // United States (English)

  return (
    <footer className="bg-[#f6f5f3]">
      <div className="mx-auto max-w-7xl px-6 pt-0 pb-8 lg:px-8">
        {/* Logo */}
        <div className="mb-6">
          <PairLogo color="#4d98e2" />
        </div>

        {/* Link columns: 2-column grid */}
        <div className="grid grid-cols-2 gap-y-10 gap-x-8">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[11px] font-medium text-sierra-text-dark mb-4">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[11px] font-medium text-gray-500 hover:text-sierra-green transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Language selector */}
        <div className="relative mt-12">
          {/* Dropdown menu (opens above the button) */}
          {open && (
            <div className="absolute bottom-full left-0 right-0 mb-2 rounded-xl bg-white shadow-[0_0_12px_rgba(0,0,0,0.08)] overflow-hidden">
              {LOCALE_OPTIONS.map((option, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelected(i);
                    setOpen(false);
                  }}
                  dir="ltr"
                  className={`flex w-full items-center justify-between px-4 py-3 text-sm transition-colors ${
                    option.isArabic ? "font-[family-name:var(--font-almarai)]" : ""
                  } ${
                    i === selected
                      ? "bg-green-50 text-green-800"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>
                    {option.label} &nbsp;{option.isArabic && "\u00A0"}<span className="font-semibold">({option.language})</span>
                  </span>
                  {i === selected && (
                    <CircleCheck size={20} className="text-green-700" />
                  )}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setOpen(!open)}
            className={`flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-sm text-gray-500 ${open ? "ring-[1.5px] ring-inset ring-gray-400" : ""}`}
          >
            <span>
              {LOCALE_OPTIONS[selected].label} &nbsp;
              <span className="font-semibold">({LOCALE_OPTIONS[selected].language})</span>
            </span>
            {open ? (
              <ChevronUp size={16} strokeWidth={2.5} className="-ml-8" />
            ) : (
              <ChevronDown size={16} strokeWidth={2.5} className="-ml-8" />
            )}
          </button>
        </div>

        {/* Legal links */}
        <div className="mt-8 flex flex-wrap items-center gap-4 text-[10px] text-gray-500 font-medium">
          {LEGAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-sierra-green transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright + Social icons */}
        <div className="mt-10 flex items-center justify-between">
          <span className="text-[10px] font-medium text-gray-500">&copy; 2026 Pair</span>
          <div className="flex items-center gap-4 text-gray-500">
            <a
              href="https://www.linkedin.com/company/sierra"
              aria-label="LinkedIn"
              className="hover:text-sierra-green transition-colors"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/pairplatform"
              aria-label="Instagram"
              className="hover:text-sierra-green transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/pairplatform"
              aria-label="X"
              className="hover:text-sierra-green transition-colors"
            >
              <XIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
