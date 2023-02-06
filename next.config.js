/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/du9yvygkg/image/upload/**',
      },
    ],
  },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
  experimental: {
    appDir: true,
  },
  reactStrictMode: false
}

module.exports = nextConfig
