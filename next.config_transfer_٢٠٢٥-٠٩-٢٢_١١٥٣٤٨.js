/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['sample-videos.com'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;