/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './src/theme/'), './node_modules/'],
  },
  images: {
    domains: ['http2.mlstatic.com'],
  },
}
