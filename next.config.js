/** @type {import('next').NextConfig} */
const path = require('path');
const runtimeCaching = require('next-pwa/cache');

const isDev = process.env.NODE_ENV !== 'production';
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // disable: !isDev,
  sw: '/sw.js',
  runtimeCaching,
  disableDevLogs: isDev,
  buildExcludes: [/app-build-manifest.json$/],
});
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['antd', 'lodash'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  compiler: {
    // removeConsole: false,
    // styledComponents: true,
  },
  experimental: {
    optimizePackageImports: ['antd'],
    serverActions: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    exclude: [
      // add buildExcludes here
      ({ asset }) => {
        if (
          asset.name.startsWith('server/') ||
          asset.name.match(/^((app-|^)build-manifest\.json|react-loadable-manifest\.json)$/)
        ) {
          return true;
        }
        if (isDev && !asset.name.startsWith('static/runtime/')) {
          return true;
        }
        return false;
      },
    ],
  },
  webpack(config, { isServer }) {
    if (isServer) {
      config.externals.push({ bufferutil: 'bufferutil', 'utf-8-validate': 'utf-8-validate' });
    }

    if (typeof nextRuntime === 'undefined') {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        // net: false,
        // tls: false,
        // process: false,
      };
    }
    config.externals = [...config.externals, 'canvas', 'jsdom'];
    return config;
  },
};

module.exports = withPWA(nextConfig);
