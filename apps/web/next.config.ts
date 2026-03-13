import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ['@alat-resolve/db'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/agent/:path*',
        destination: `${process.env.NEXT_PUBLIC_AGENT_APP_URL || 'http://localhost:3001'}/agent/:path*`,
      },
    ];
  },
};

export default nextConfig;
