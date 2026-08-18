import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sites serves local assets directly from the edge worker. Keeping Next.js
    // image optimization disabled avoids a duplicate runtime fetch while
    // preserving responsive sizing, lazy loading, and reserved layout space.
    unoptimized: true,
  },
};

export default nextConfig;
