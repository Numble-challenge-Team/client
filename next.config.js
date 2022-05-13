/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['oz-s3-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
