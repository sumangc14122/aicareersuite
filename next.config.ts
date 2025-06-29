import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "p7knseaeeo3aikuf.public.blob.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "airesumepro.app",
          },
        ],
        destination: "https://topairesume.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
