/** @type {import('next').NextConfig} */
const TerserPlugin =require('terser-webpack-plugin');

const nextConfig = {
  reactStrictMode: true,
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
        },
      }),
    ],
  },
}

module.exports = nextConfig
