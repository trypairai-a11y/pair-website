"use client";

import { useState, useEffect, useRef } from "react";
import PairLogo from "@/components/icons/PairLogo";
import { NAV_LINKS, FOOTER_COLUMNS } from "@/lib/constants";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

function AnimatedMenuIcon({ open, size = 24, className = "" }: { open: boolean; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <line
        x1="2" y1="8" x2="22" y2="8"
        style={{
          transformOrigin: "12px 8px",
          transition: "transform 0.3s ease-in-out",
          transform: open ? "translateY(4px) rotate(45deg)" : "translateY(0) rotate(0deg)",
        }}
      />
      <line
        x1="2" y1="16" x2="22" y2="16"
        style={{
          transformOrigin: "12px 16px",
          transition: "transform 0.3s ease-in-out",
          transform: open ? "translateY(-4px) rotate(-45deg)" : "translateY(0) rotate(0deg)",
        }}
      />
    </svg>
  );
}

const DROPDOWN_DATA: Record<string, { heading: string; links: { label: string; href: string }[] }[]> = {
  Product: [FOOTER_COLUMNS[0]],
  Industries: [FOOTER_COLUMNS[1]],
  Company: [FOOTER_COLUMNS[3]],
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const isScrolled = y > 60;
      setScrolled(isScrolled);

      if (isScrolled) {
        // Show navbar when scrolling up, hide when scrolling down
        setVisible(y < lastScrollY.current || y <= 60);
      } else {
        setVisible(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDropdown = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
    <header
      className={`left-0 right-0 z-50 transition-all duration-300 ${
        mobileOpen
          ? "fixed top-0 bg-white"
          : scrolled
            ? `fixed top-0 bg-white ${visible ? "translate-y-0" : "-translate-y-full"}`
            : "absolute top-0 bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 lg:px-10">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <PairLogo color={scrolled || mobileOpen ? "#4d98e2" : "white"} />
        </a>

        {/* Desktop nav links - visible when scrolled */}
        <div
          className={`hidden lg:flex items-center gap-1 transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() =>
                link.hasDropdown ? openDropdown(link.label) : undefined
              }
              onMouseLeave={closeDropdown}
            >
              <a
                href={link.href}
                className="flex items-center gap-1 rounded-full px-4 py-2 text-xs font-normal text-sierra-gray hover:text-sierra-text-dark transition-colors"
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${
                      activeDropdown === link.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </a>

              {/* Dropdown panel */}
              {link.hasDropdown &&
                activeDropdown === link.label &&
                DROPDOWN_DATA[link.label] && (
                  <div
                    className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-sierra-divider/50 py-4 px-5 min-w-[220px] animate-in fade-in"
                    onMouseEnter={() => openDropdown(link.label)}
                    onMouseLeave={closeDropdown}
                  >
                    {DROPDOWN_DATA[link.label].map((col) => (
                      <div key={col.heading}>
                        <ul className="flex flex-col gap-1">
                          {col.links.map((item) => (
                            <li key={item.label}>
                              <a
                                href={item.href}
                                className="block rounded-lg px-3 py-2 text-sm text-sierra-text hover:text-sierra-text-dark hover:bg-sierra-bg transition-colors"
                              >
                                {item.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>

        {/* Desktop CTA buttons */}
        <div className="hidden lg:flex items-center gap-5">
          {scrolled || mobileOpen ? (
            <a
              href="/learn-more"
              className="rounded-full px-2.5 py-2 text-[10px] font-medium transition-colors md:px-3 md:py-2.5 md:text-[11px] bg-sierra-green text-white hover:bg-sierra-green-light"
            >
              Learn more
            </a>
          ) : (
            <a
              href="/learn-more"
              className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-[100px] text-white h-10 px-4 text-[12px] hover:bg-white/20 transition-colors"
            >
              Learn more
            </a>
          )}
          {scrolled && !mobileOpen ? (
            <a
              href="/login"
              className="text-sm font-normal text-sierra-gray hover:text-sierra-text-dark transition-colors"
            >
              Sign in
            </a>
          ) : (
            <button
              className={`p-1 transition-colors ${mobileOpen ? "text-sierra-text" : "text-white/90"}`}
              aria-label="Menu"
              onClick={() => { setMobileOpen(!mobileOpen); if (mobileOpen) setMobileSubmenu(null); }}
            >
              <AnimatedMenuIcon open={mobileOpen} size={24} />
            </button>
          )}
        </div>

        {/* Mobile menu button + Learn more */}
        <div className="lg:hidden flex items-center gap-5">
          <a
            href="/learn-more"
            className={`inline-flex items-center rounded-full py-2 px-3 text-[10px] font-medium transition-colors ${
              scrolled || mobileOpen
                ? "bg-sierra-green text-white hover:bg-sierra-green-light"
                : "bg-white/10 backdrop-blur-[100px] text-white hover:bg-white/20"
            }`}
          >
            Learn more
          </a>
          <button
            className="p-1"
            onClick={() => { setMobileOpen(!mobileOpen); if (mobileOpen) setMobileSubmenu(null); }}
            aria-label="Toggle menu"
          >
            <AnimatedMenuIcon
              open={mobileOpen}
              size={24}
              className={`transition-colors ${scrolled || mobileOpen ? "text-sierra-text" : "text-white/90"}`}
            />
          </button>
        </div>
      </nav>

    </header>

    {/* Full-screen mobile menu overlay - rendered below the navbar */}
    <div
      className={`fixed inset-0 z-40 bg-white flex flex-col transition-opacity duration-300 overflow-hidden ${
        mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Spacer to push content below the navbar */}
      <div className="h-16 shrink-0" />

      {/* Sliding container */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Main nav panel */}
        <div
          className={`absolute inset-0 flex flex-col transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] ${mobileSubmenu ? "pointer-events-none" : ""}`}
          style={{
            transform: mobileSubmenu ? "translateX(-100px)" : "translateX(0)",
            opacity: mobileSubmenu ? 0 : 1,
            filter: mobileSubmenu ? "blur(2px)" : "blur(0px)",
          }}
        >
          <div className="flex-1 flex flex-col mt-4 overflow-y-auto">
            {NAV_LINKS.map((link) => (
              link.hasDropdown && DROPDOWN_DATA[link.label] ? (
                <button
                  key={link.label}
                  className="group flex items-center justify-between px-6 py-4 text-[21px] font-normal text-gray-500 hover:text-sierra-green transition-colors w-full text-left"
                  onClick={() => setMobileSubmenu(link.label)}
                >
                  {link.label}
                  <ChevronRight size={19} strokeWidth={1.5} className="text-black group-hover:text-sierra-green transition-colors" />
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center justify-between px-6 py-4 text-[21px] font-normal text-gray-500 hover:text-sierra-green transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Sign in */}
          <div className="px-6 pb-10 pt-4">
            <a
              href="/login"
              className="block w-full text-center rounded-full bg-gray-100 py-4 text-base font-medium text-gray-600 hover:bg-gray-200 transition-colors"
            >
              Sign in
            </a>
          </div>
        </div>

        {/* Submenu panel */}
        <div
          className={`absolute inset-0 flex flex-col transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] ${mobileSubmenu ? "" : "pointer-events-none"}`}
          style={{
            transform: mobileSubmenu ? "translateX(0)" : "translateX(33%)",
            opacity: mobileSubmenu ? 1 : 0,
            filter: mobileSubmenu ? "blur(0px)" : "blur(2px)",
          }}
        >
          {/* Submenu header with back button and title */}
          <div className="flex items-center px-6 py-4 mt-2">
            <button
              onClick={() => setMobileSubmenu(null)}
              className="p-1 -ml-1 text-gray-500 hover:text-sierra-green transition-colors"
              aria-label="Back"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <span className="flex-1 text-center text-[18px] font-normal text-gray-500 pr-6">
              {mobileSubmenu}
            </span>
          </div>

          {/* Submenu links */}
          <div className="flex-1 flex flex-col overflow-y-auto mt-6">
            {mobileSubmenu && DROPDOWN_DATA[mobileSubmenu]?.map((col) =>
              col.links.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-6 py-4 text-[20px] font-normal text-gray-500 hover:text-sierra-green transition-colors"
                  onClick={() => { setMobileOpen(false); setMobileSubmenu(null); }}
                >
                  {item.label}
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
