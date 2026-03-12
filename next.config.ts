import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // CRITICAL for Netlify
  },
};

export default nextConfig;
