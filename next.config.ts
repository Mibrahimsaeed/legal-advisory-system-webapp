import type { NextConfig } from "next";

// Server-only: BASE_URL has no NEXT_PUBLIC_ prefix, so it never reaches the browser bundle.
const backendUrl = process.env.BASE_URL;

const nextConfig: NextConfig = {
  async rewrites() {
    if (!backendUrl) {
      console.warn("BASE_URL is not set in .env.local; /api requests will not reach the backend.");
      return [];
    }
    return [{ source: "/api/:path*", destination: `${backendUrl}/:path*` }];
  },
};

export default nextConfig;
