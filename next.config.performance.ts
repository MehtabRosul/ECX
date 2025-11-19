import type { NextConfig } from 'next';

// Performance-focused Next.js configuration
const performanceConfig: NextConfig = {
  // Reduce bundle size
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
  },
  
  // Modularize imports to reduce bundle size
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
  
  // Optimize webpack build
  webpack: (config, { dev, isServer }) => {
    // Improve build performance
    config.cache = {
      type: 'filesystem',
      version: '1.0',
      buildDependencies: {
        config: [__filename],
      },
    };
    
    // Reduce bundle size for production
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            three: {
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              name: 'three',
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
  },
};

export default performanceConfig;