import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Mock data (development only)
      { protocol: "https", hostname: "picsum.photos" },
      // Production: Cloudflare R2 public bucket
      { protocol: "https", hostname: "*.r2.dev" },
      { protocol: "https", hostname: "*.r2.cloudflarestorage.com" },
      // Supabase storage fallback
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
