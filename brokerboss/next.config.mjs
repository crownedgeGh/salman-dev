import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ['192.168.0.3', '192.168.0.242', '192.168.0.*'],

  // Enable compression for all responses
  compress: true,

  // Image optimization — allow external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
    // Aggressive image caching
    minimumCacheTTL: 3600,
  },

  // HTTP caching headers for static assets
  async headers() {
    return [
      {
        // Cache all static files (JS, CSS, images) for 1 year
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache public assets for 7 days
        source: '/(.*)\\.(ico|png|jpg|jpeg|webp|svg|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
