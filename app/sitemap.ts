import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const STATIC_ROUTES = [
  "",
  "/about",
  "/blog",
  "/careers",
  "/events",
  "/resources",
  "/customers",
  "/customers/boutiqaat",
  "/customers/cck",
  "/customers/cinescape",
  "/customers/flare-fitness",
  "/customers/flash",
  "/customers/ktech",
  "/customers/macro",
  "/customers/provin",
  "/customers/yaqoub-al-sanea",
  "/customers/yiswa",
  "/industries",
  "/industries/financial-services",
  "/industries/media",
  "/industries/retail",
  "/industries/technology",
  "/industries/telecommunications",
  "/industries/travel-transportation-hospitality",
  "/learn-more",
  "/modern-slavery-statement",
  "/privacy-policy",
  "/product",
  "/product/agent-sdk",
  "/product/agent-studio",
  "/product/insights",
  "/product/live-assist",
  "/product/meet-your-agent",
  "/product/the-brain",
  "/product/trust-and-reliability",
  "/product/voice",
  "/terms-and-conditions",
];

const BLOG_SLUGS = [
  "introducing-pair-agent-os-2",
  "boutiqaat-customer-story",
  "future-of-voice-ai",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const blogEntries = BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticEntries, ...blogEntries];
}
