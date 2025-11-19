import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Development config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Development performance optimizations
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
    serverComponentsExternalPackages: [
      'three',
      '@react-three/fiber',
      '@react-three/drei'
    ],
    cpus: Math.min(2, require('os').cpus().length - 1), // Limit CPU usage in dev
    memoryBasedWorkersCount: true,
  },
  
  // Development image optimization
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
    minimumCacheTTL: 60,
  },
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Enable compression
  compress: true,
  
  // Development webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Improve build performance in development
    config.cache = {
      type: 'filesystem',
      version: '1.0-dev',
      buildDependencies: {
        config: [__filename],
      },
    };
    
    // Development-specific optimizations
    if (dev) {
      // Optimize for faster hot reloading
      config.resolve.alias = {
        ...config.resolve.alias,
        three: 'three/src/Three.js',
      };
      
      // Reduce build time in development
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
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
          },
        },
      };
    }
    
    return config;
  },
  
  // Development-specific settings
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;