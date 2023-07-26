/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  minify: {
    terserOptions: {
      keep_classnames: true,
    },
  },
}