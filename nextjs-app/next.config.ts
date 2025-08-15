import type { NextConfig } from "next";
//Config for custom port.
const nextConfig: NextConfig = {
  /* config options here */
    env: {
    CUSTOM_PORT: '3001',
  },
};

export default nextConfig;
