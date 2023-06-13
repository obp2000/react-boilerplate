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
  // reactStrictMode: false,
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
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
}

module.exports = nextConfig

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true'
// })

// module.exports = withBundleAnalyzer(nextConfig)

// module.exports = {
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.js$/,
//       use: {
//         loader: '@swc/loader',
//         options: {
//           jsc: {
//             parser: {
//               syntax: 'ecmascript',
//               jsx: true
//             },
//             transform: {
//               react: true
//             }
//           }
//         }
//       }
//     });
//     return config;
//   }
// }