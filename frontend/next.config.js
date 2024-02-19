/**
 * @type {import('next').NextConfig}
 */
const { i18n } = require('./next-i18next.config');
const { URL } = require('url');

// const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
module.exports = {
  reactStrictMode: true,
  // pwa: {
  //   dest: 'public',
  //   disable: process.env.NODE_ENV === 'development',
  //   runtimeCaching,
  // },
  i18n,
  images: {
    domains: [
      'localhost',
      new URL(process.env.NEXT_PUBLIC_Images_API_ENDPOINT).hostname,
    ],
  },
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
};
