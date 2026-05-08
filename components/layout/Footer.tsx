import Link from "next/link";
import PairLogo from "@/components/icons/PairLogo";
import { LinkedInIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { FOOTER_COLUMNS, LEGAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[#f6f5f3]">
      <div className="mx-auto w-full max-w-[1160px] px-6 lg:px-8 flex flex-col gap-12 md:gap-14">
        {/* Top section: Logo + Link columns */}
        <div className="grid grid-cols-12 gap-x-8 gap-y-10 pt-8 md:pt-12 xl:pt-14">
          {/* Logo */}
          <div className="col-span-12 md:col-span-4">
            <Link aria-label="Homepage" href="/" className="block place-self-start">
              <PairLogo color="#4d98e2" className="h-5" />
            </Link>
          </div>

          {/* Link columns - 3 side-by-side columns */}
          <div className="col-span-12 grid grid-cols-3 gap-x-8 gap-y-10 md:col-span-8">
            {FOOTER_COLUMNS.map((col) => (
              <Link
                key={col.heading}
                href={col.href}
                className="text-[12px] font-medium text-gray-600 transition-colors hover:text-[#4d98e2]"
              >
                {col.heading}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mb-8 flex flex-col justify-between gap-8 text-[11px] font-light text-gray-500 md:flex-row md:items-end md:pb-8">
          <div className="flex w-full flex-col gap-6">
            {/* Legal links row */}
            <div className="flex w-full items-center gap-4">
              <div className="hidden md:block font-normal">&copy; 2026 Pair</div>
              <nav>
                <ul className="flex items-center gap-8">
                  {LEGAL_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-normal transition-colors hover:text-[#4d98e2]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Copyright (mobile) + Social icons */}
          <div className="flex items-center justify-between">
            <div className="md:hidden font-normal">&copy; 2026 Pair</div>
            <div className="flex items-center justify-end gap-3">
              <a
                href="https://www.linkedin.com/company/105122522"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex w-4 items-center justify-center text-gray-500 transition-colors hover:text-[#4d98e2] h-4"
              >
                <LinkedInIcon className="h-full w-full" />
              </a>
              <a
                href="https://www.instagram.com/trypair/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex w-4 items-center justify-center text-gray-500 transition-colors hover:text-[#4d98e2] h-4"
              >
                <InstagramIcon className="h-full w-full" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
