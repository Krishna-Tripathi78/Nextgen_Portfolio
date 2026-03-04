import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Disabled React Compiler for faster compilation
  // reactCompiler: true,

  experimental: {
    // Optimize package imports to reduce bundle size and compilation time
    optimizePackageImports: [
      '@radix-ui/react-dialog',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-tooltip',
      '@tabler/icons-react',
      'lucide-react',
      'recharts',
      '@sanity/icons',
    ],
  },
};

export default nextConfig;
