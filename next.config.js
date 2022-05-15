/** @type {import('next').NextConfig} */
const withInterceptStdout = require('next-intercept-stdout');

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['oz-s3-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
};

module.exports = withInterceptStdout(nextConfig, (text) => (text.includes('Duplicate atom key') ? '' : text));
