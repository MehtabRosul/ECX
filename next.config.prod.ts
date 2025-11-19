import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* Production config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Production performance optimizations
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
    cpus: Math.min(4, require('os').cpus().length - 1), // Limit CPU usage
    memoryBasedWorkersCount: true, // Adjust worker count based on available memory
  },
  
  // Bundle optimization
  modularizeImports: {
    '@radix-ui/react-*': {
      transform: '@radix-ui/react-{{member}}',
      preventFullImport: true,
    },
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
      skipDefaultConversion: true,
    },
  },
  
  // Image optimization for production
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
    minimumCacheTTL: 86400, // 24 hours
    formats: ['image/avif', 'image/webp'],
  },
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Enable compression
  compress: true,
  
  // Optimize fonts
  optimizeFonts: true,
  
  // Enable server actions
  serverActions: {
    bodySizeLimit: '2mb',
  },
  
  // Production webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Improve build performance
    config.cache = {
      type: 'filesystem',
      version: '1.0',
      buildDependencies: {
        config: [__filename],
      },
    };
    
    // Production-specific optimizations
    if (!dev) {
      // Reduce bundle size by excluding unnecessary modules
      config.resolve.alias = {
        ...config.resolve.alias,
        three: 'three/src/Three.js',
      };
      
      // Optimize build for production
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
  
  // Production-specific settings
  poweredByHeader: false,
  generateEtags: true,
  swcMinify: true,
};

export default withBundleAnalyzerConfig(nextConfig);