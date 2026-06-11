import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.6", // another device on the same network
    "192.168.1.*", // any device on the local network
  ],
};

export default nextConfig;
