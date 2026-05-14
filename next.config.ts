import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2400],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    qualities: [60, 75, 85],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    // Per-icon barrel transforms; without this, lucide-react bundles its
    // entire icon set instead of just the named imports.
    optimizePackageImports: ["motion", "lucide-react"],
  },
};

export default nextConfig;
