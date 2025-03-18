import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
        pathname: "*/**",
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
