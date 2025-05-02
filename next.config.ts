import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://assets.coingecko.com/**')],
  }
};

export default nextConfig;
