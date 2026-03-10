import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix workspace root detection - prevent Next.js from using parent lockfiles
  turbopack: {
    root: process.cwd(),
  },
  // Allow any custom domain to reach the app
  // In production, configure your reverse proxy (Railway, Vercel, etc.)
  // to route the custom domain to this app
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
        ],
      },
    ];
  },
  // Allow images from any domain for product images
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
