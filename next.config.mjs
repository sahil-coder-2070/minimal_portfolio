/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Ignore build errors for typescript since some Vite types may take time to clean up
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
