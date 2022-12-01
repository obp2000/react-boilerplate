/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: ['127.0.0.1'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    appDir: true,
  },
  reactStrictMode: false
}

module.exports = nextConfig
