"use client";

import { usePathname } from "next/navigation";

const LIGHT_BG_ROUTES = ["/learn-more"];

export default function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const useLightBg = LIGHT_BG_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(`${route}/`)
  );

  return (
    <main className={`flex-1 ${useLightBg ? "bg-[#f6f5f3]" : "bg-white"}`}>
      {children}
    </main>
  );
}
