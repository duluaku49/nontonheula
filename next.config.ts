import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**.aoneroom.com" },
      { protocol: "https", hostname: "pbcdnw.aoneroom.com" },
      { protocol: "https", hostname: "macdn.aoneroom.com" },
      { protocol: "https", hostname: "image.tmdb.org" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
