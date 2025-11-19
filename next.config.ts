import type {NextConfig} from 'next';
import fs from 'fs';
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Performance optimizations for memory usage
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'react-hook-form',
      'framer-motion',
      '@radix-ui/react-*',
      '@react-three/*',
      'three'
    ],
    webpackBuildWorker: true,
    cpus: Math.min(2, require('os').cpus().length - 1), // Limit CPU usage
    memoryBasedWorkersCount: true, // Adjust worker count based on available memory
  },
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Enable React strict mode for better performance in development
  reactStrictMode: true,
  // Enable compression
  compress: true,
  // Configure webpack for better performance
  webpack: (config, { dev, isServer }) => {
    // Improve build performance and reduce memory usage (only when config file is resolvable)
    if (fs.existsSync(__filename)) {
      config.cache = {
        type: 'filesystem',
        version: '1.0',
        buildDependencies: {
          config: [__filename],
        },
      };
    }
    
    // Reduce memory usage
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              chunks: 'all',
            },
            three: {
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              name: 'three',
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            firebase: {
              test: /[\\/]node_modules[\\/](firebase)[\\/]/,
              name: 'firebase',
              chunks: 'all',
              priority: 15,
              enforce: true,
            },
          },
        },
      };
    }
    
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);