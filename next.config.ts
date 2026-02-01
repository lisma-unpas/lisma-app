import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
        tls: false,
        net: false,
        dns: false,
        child_process: false,
      };
    }

    return config;
  },
  turbopack: {},
  compiler: {
    // Enable styled-components for better CSS-in-JS support
    styledComponents: true,
  },
  // Disable React's Strict Mode in development to prevent double rendering
  reactStrictMode: false,
};

export default nextConfig;
