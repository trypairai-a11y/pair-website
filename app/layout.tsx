import type { Metadata } from "next";
import { Almarai, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Main from "@/components/layout/Main";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";

const sfProDisplay = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_TAGLINE} | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "AI agents",
    "customer experience",
    "voice AI",
    "agent OS",
    "customer support automation",
    "Pair",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: { default: `${SITE_TAGLINE} | ${SITE_NAME}`, template: `%s | ${SITE_NAME}` },
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: { default: `${SITE_TAGLINE} | ${SITE_NAME}`, template: `%s | ${SITE_NAME}` },
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("antialiased", almarai.variable, sfProDisplay.variable, "font-sans")}>
      <body className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}
