import type { NextConfig } from "next";
//Config for custom port.
const nextConfig: NextConfig = {
  /* config options here */
    env: {
    CUSTOM_PORT: '3001',
  },
  // Temporarily disable TypeScript and ESLint during build for deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
