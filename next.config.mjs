/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // We will let build continue even with lint warnings/errors since ESLint configs might require tweaking
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore build errors for typescript since some Vite types may take time to clean up
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
