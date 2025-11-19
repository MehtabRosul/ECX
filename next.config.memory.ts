import type {NextConfig} from 'next';
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* Memory-optimized config options */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Memory optimization settings
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
  // Limit concurrent requests to reduce memory usage
  concurrentFeatures: 2,
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
  // Configure webpack for memory optimization
  webpack: (config, { dev, isServer }) => {
    // Improve build performance and reduce memory usage
    config.cache = {
      type: 'filesystem',
      version: '1.0',
      buildDependencies: {
        config: [__filename],
      },
    };
    
    // Reduce memory usage by limiting parallelism
    config.parallelism = 2;
    
    // Optimize for memory usage
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
              maxSize: 244000, // 244 KB
            },
            three: {
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              name: 'three',
              chunks: 'all',
              priority: 20,
              enforce: true,
              maxSize: 244000, // 244 KB
            },
            firebase: {
              test: /[\\/]node_modules[\\/](firebase)[\\/]/,
              name: 'firebase',
              chunks: 'all',
              priority: 15,
              enforce: true,
              maxSize: 244000, // 244 KB
            },
          },
        },
      };
    }
    
    return config;
  },
  // Optimize for memory usage
  swcMinify: true,
  // Server components optimization
  serverComponents: {
    externalPackages: [
      'three',
      '@react-three/fiber',
      '@react-three/drei'
    ]
  }
};

export default withBundleAnalyzer(nextConfig);