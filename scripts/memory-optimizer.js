#!/usr/bin/env node

// Memory optimization script for Next.js application
const { execSync } = require('child_process');
const os = require('os');
const fs = require('fs');

console.log('🔧 Memory Optimization Script');
console.log('============================\n');

// Get system information
const totalMemory = Math.round(os.totalmem() / (1024 * 1024 * 1024));
const freeMemory = Math.round(os.freemem() / (1024 * 1024 * 1024));
const usedMemory = totalMemory - freeMemory;
const cpuCount = os.cpus().length;

console.log(`System Information:`);
console.log(`  Total Memory: ${totalMemory} GB`);
console.log(`  Free Memory: ${freeMemory} GB`);
console.log(`  Used Memory: ${usedMemory} GB`);
console.log(`  CPU Cores: ${cpuCount}\n`);

// Suggest memory optimization based on system resources
const suggestedMemory = Math.min(4096, Math.max(2048, freeMemory * 256)); // in MB
console.log(`Suggested Node.js Memory Limit: ${suggestedMemory} MB\n`);

// Clean cache directories to free up memory
console.log('🧹 Cleaning cache directories...');
try {
  if (fs.existsSync('.next')) {
    execSync('npx rimraf .next', { stdio: 'inherit' });
    console.log('  ✓ Cleaned .next directory');
  }
  
  if (fs.existsSync('node_modules/.cache')) {
    execSync('npx rimraf node_modules/.cache', { stdio: 'inherit' });
    console.log('  ✓ Cleaned node_modules/.cache directory');
  }
  
  console.log('  ✓ Cache cleaning completed\n');
} catch (error) {
  console.log('  ⚠️  Cache cleaning failed:', error.message);
}

// Suggest environment variables for memory optimization
console.log('💡 Recommended Environment Variables:');
console.log(`  NODE_OPTIONS=--max-old-space-size=${suggestedMemory}`);
console.log(`  NEXT_TURBOPACK_CONCURRENCY=${Math.min(4, cpuCount)}`);
console.log(`  NEXT_TURBOPACK_MEMORY_LIMIT=${suggestedMemory}\n`);

// Suggest package.json script updates
console.log('📝 Recommended package.json script updates:');
console.log('  "dev": "node --max-old-space-size=4096 next dev --turbopack -p 9002"');
console.log('  "build": "cross-env NODE_ENV=production NODE_OPTIONS=--max-old-space-size=4096 next build"');
console.log('  "start": "cross-env NODE_OPTIONS=--max-old-space-size=4096 next start"\n');

console.log('✅ Memory optimization suggestions completed!');
console.log('Run this script before starting your development server for best results.');