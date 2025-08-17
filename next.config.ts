import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://assets.tcgdex.net/**')],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/page/1',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
