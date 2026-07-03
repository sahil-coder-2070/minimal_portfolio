/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cms.ramx.in',
      },
      {
        protocol: 'https',
        hostname: 'ramx.in',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
    ],
  },
  turbopack: {
    root: '/home/sahilcodex/Documents/portfolio/sahilcodex',
  },
};

export default nextConfig;
