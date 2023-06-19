// const path = require('path')

/** @type {import('next').NextConfig} */
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
  swcMinify: true,
  transpilePackages: ["@mui/system", "@mui/material", "@mui/icons-material"],
  modularizeImports: {
    "@mui/material/?(((\\w*)?/?)*)": {
      transform: "@mui/material/{{ matches.[1] }}/{{member}}",
    },
    "@mui/icons-material/?(((\\w*)?/?)*)": {
      transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
    },
  },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
  // webpack(config, { dev, isServer }) {
  //   if (dev && !isServer) {
  //     const originalEntry = config.entry
  //     config.entry = async () => {
  //       const wdrPath = path.resolve(__dirname, './scripts/wdyr.ts')
  //       const entries = await originalEntry()

  //       if (entries['main.js'] && !entries['main.js'].includes(wdrPath)) {
  //         entries['main.js'].push(wdrPath)
  //       }
  //       return entries
  //     }
  //   }

  //   return config
  // },
}

module.exports = nextConfig

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true'
// })

// module.exports = withBundleAnalyzer(nextConfig)
