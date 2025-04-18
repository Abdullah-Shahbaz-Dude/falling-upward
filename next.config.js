/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Disable the experimental stuff that could be causing issues
  transpilePackages: ['jsonwebtoken', 'jose'],
  // Skip typechecking to speed up builds and avoid issues
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;
