"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PairLogo from "@/components/icons/PairLogo";
import { NAV_LINKS } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LIGHT_BG_ROUTES = ["/learn-more"];
const ALWAYS_DARK_ROUTES = ["/customers", "/product", "/about"];

function AnimatedMenuIcon({ open, size = 24, className = "" }: { open: boolean; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" className={className}>
      <line
        x1="2" y1="7" x2="22" y2="7"
        style={{
          transformOrigin: "12px 7px",
          transition: "transform 0.3s ease-in-out",
          transform: open ? "translateY(5px) rotate(45deg)" : "translateY(0) rotate(0deg)",
        }}
      />
      <line
        x1="2" y1="17" x2="22" y2="17"
        style={{
          transformOrigin: "12px 17px",
          transition: "transform 0.3s ease-in-out",
          transform: open ? "translateY(-5px) rotate(-45deg)" : "translateY(0) rotate(0deg)",
        }}
      />
    </svg>
  );
}

type DropdownItem = { label: string; href: string; description: string };
const DROPDOWN_DATA: Record<string, DropdownItem[]> = {};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [navHovered, setNavHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const forceLight = LIGHT_BG_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(`${route}/`)
  );
  const alwaysDark = ALWAYS_DARK_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(`${route}/`)
  );
  const onLearnMore = pathname === "/learn-more";
  const ctaLabel = onLearnMore ? "Discover more" : "Learn more";

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      setScrolled(y > 10);

      if (Math.abs(delta) < 3) {
        lastScrollY.current = y;
        return;
      }

      if (delta > 0 && y > 10) {
        setVisible(false);
        setActiveDropdown(null);
      } else if (delta < 0) {
        setVisible(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A new page always starts with the nav shown.
  useEffect(() => {
    setVisible(true);
    lastScrollY.current = typeof window !== "undefined" ? window.scrollY : 0;
  }, [pathname]);

  const openDropdown = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const darkTheme = forceLight || alwaysDark || scrolled || mobileOpen || activeDropdown !== null || (navHovered && canHover);
  const navBg = forceLight ? "bg-[#f6f5f3]" : "bg-white";

  return (
    <>
    {/* Top-edge hover zone: brings the nav back without needing to scroll up.
        Pointer devices only, and it never sits above the open nav. */}
    {canHover && !visible && !mobileOpen && (
      <div
        aria-hidden
        onMouseEnter={() => setVisible(true)}
        className="fixed inset-x-0 top-0 z-40 h-5"
      />
    )}
    <header
      onMouseEnter={() => setNavHovered(true)}
      onMouseLeave={() => setNavHovered(false)}
      className={`left-0 right-0 z-50 transition-all duration-300 ${
        mobileOpen
          ? `fixed top-0 ${navBg}`
          : scrolled
            ? `fixed top-0 ${navBg} ${visible ? "translate-y-0" : "-translate-y-full"}`
            : darkTheme
              ? `fixed top-0 ${navBg} ${visible ? "translate-y-0" : "-translate-y-full"}`
              : `fixed top-0 bg-transparent ${visible ? "translate-y-0" : "-translate-y-full"}`
      }`}
    >
      <nav className="relative mx-auto flex max-w-[1160px] items-center justify-between px-7 py-4 lg:px-10 xl:pt-4 xl:pb-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <PairLogo color={darkTheme ? "#4d98e2" : "white"} sizeClass="h-6 sm:h-5" />
        </Link>

        {/* Desktop nav links - shown inline at xl, hidden below in favor of burger */}
        <div
          className={`hidden xl:flex items-center gap-1 transition-opacity duration-300`}
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
              <Link
                href={link.href}
                className={`flex items-center rounded-full px-4 py-3 text-xs xl:text-sm font-normal transition-colors ${
                  activeDropdown === link.label
                    ? "bg-sierra-green/15 text-[#4d98e2]"
                    : darkTheme
                      ? "text-sierra-gray hover:text-[#4d98e2] hover:bg-sierra-green/15"
                      : "text-white/90 hover:text-[#4d98e2] hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>

              {/* Dropdown panel - Sierra-style 2-column grid with heading + description */}
              {link.hasDropdown &&
                activeDropdown === link.label &&
                DROPDOWN_DATA[link.label] && (
                  <div
                    className="hidden xl:block absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-sierra-divider rounded-2xl p-4 w-[620px] animate-in fade-in slide-in-from-top-1 duration-150"
                    onMouseEnter={() => openDropdown(link.label)}
                    onMouseLeave={closeDropdown}
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {DROPDOWN_DATA[link.label].map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block rounded-xl px-4 py-3 hover:bg-gray-100 transition-colors"
                        >
                          <div className="text-sm font-medium text-sierra-text-dark">{item.label}</div>
                          <div className="mt-1 text-xs text-sierra-gray leading-snug">{item.description}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>

        {/* Desktop CTA buttons - shown at xl alongside inline nav */}
        <div className="hidden xl:flex items-center gap-2">
          <Link
            href={onLearnMore ? "/product" : "/learn-more"}
            className={`inline-flex items-center gap-1 justify-center rounded-full h-9 px-5 text-[12px] font-medium leading-4 transition-colors ${
              darkTheme
                ? "bg-sierra-green text-white hover:bg-sierra-green-light"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            style={
              darkTheme
                ? undefined
                : { WebkitBackdropFilter: "blur(100px)", backdropFilter: "blur(100px)" }
            }
          >
            {ctaLabel}
          </Link>
          {/* Burger: hidden when scrolled, also hidden on xl (full nav shown instead) */}
          <button
            className={`p-1 transition-colors xl:hidden ${
              scrolled && !mobileOpen ? "hidden" : ""
            } ${mobileOpen || darkTheme ? "text-sierra-gray hover:text-sierra-text-dark" : "text-white/90 hover:text-gray-300"}`}
            aria-label="Menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => { setMobileOpen(!mobileOpen); if (mobileOpen) setMobileSubmenu(null); }}
          >
            <AnimatedMenuIcon open={mobileOpen} size={24} />
          </button>
        </div>

        {/* Menu button + Learn more - shown below xl; xl uses inline nav + Learn more above */}
        <div className="flex items-center gap-3 md:gap-5 xl:hidden">
          <Link
            href={onLearnMore ? "/product" : "/learn-more"}
            className={`inline-flex items-center gap-1 rounded-full h-8 px-3 text-[11px] sm:text-[12px] font-medium leading-4 transition-colors ${
              darkTheme
                ? "bg-sierra-green text-white hover:bg-sierra-green-light"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            style={
              darkTheme
                ? undefined
                : { WebkitBackdropFilter: "blur(100px)", backdropFilter: "blur(100px)" }
            }
          >
            {ctaLabel}
          </Link>
          <button
            className="p-1 group"
            onClick={() => { setMobileOpen(!mobileOpen); if (mobileOpen) setMobileSubmenu(null); }}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <AnimatedMenuIcon
              open={mobileOpen}
              size={22}
              className={`transition-colors ${scrolled || mobileOpen || darkTheme ? "text-sierra-gray group-hover:text-sierra-text-dark" : "text-white/90 group-hover:text-gray-300"}`}
            />
          </button>
        </div>
      </nav>

    </header>

    {/* Full-screen mobile menu overlay - rendered below the navbar */}
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!mobileOpen}
      className={`fixed inset-0 z-40 ${navBg} flex flex-col transition-opacity duration-300 overflow-hidden ${
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
                  className="group flex items-center justify-between px-6 py-4 text-[19.5px] font-normal text-gray-500 hover:text-sierra-green transition-colors w-full text-left"
                  onClick={() => setMobileSubmenu(link.label)}
                >
                  {link.label}
                  <ChevronRight size={20} strokeWidth={1.5} className="text-black group-hover:text-sierra-green transition-colors" />
                </button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group flex items-center justify-between px-6 py-4 text-[19.5px] font-normal text-gray-500 hover:text-sierra-green transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
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
          <div className="flex-1 flex flex-col overflow-y-auto mt-6 md:mt-10 md:gap-2">
            {mobileSubmenu && DROPDOWN_DATA[mobileSubmenu]?.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-6 py-4 text-[20px] md:text-[22px] font-normal text-gray-500 hover:text-sierra-green transition-colors md:text-center"
                onClick={() => { setMobileOpen(false); setMobileSubmenu(null); }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
