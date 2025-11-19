#!/usr/bin/env node

// Performance monitoring script for Next.js application
const { execSync, spawn } = require('child_process');
const os = require('os');
const fs = require('fs');

console.log('🔍 Performance Monitor Script');
console.log('==========================\n');

// Function to get memory usage
function getMemoryUsage() {
  const usage = process.memoryUsage();
  return {
    rss: Math.round(usage.rss / 1024 / 1024), // MB
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024), // MB
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024), // MB
    external: Math.round(usage.external / 1024 / 1024), // MB
  };
}

// Function to get CPU usage
function getCPUUsage() {
  const cpus = os.cpus();
  let totalIdle = 0, totalTick = 0;
  
  cpus.forEach(cpu => {
    for (const type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  });
  
  return {
    idle: totalIdle / cpus.length,
    total: totalTick / cpus.length
  };
}

// Monitor memory and CPU usage
console.log('📊 Monitoring System Resources...\n');

// Initial readings
const initialMemory = getMemoryUsage();
const initialCPU = getCPUUsage();

console.log(`Initial Memory Usage:`);
console.log(`  RSS: ${initialMemory.rss} MB`);
console.log(`  Heap Total: ${initialMemory.heapTotal} MB`);
console.log(`  Heap Used: ${initialMemory.heapUsed} MB`);
console.log(`  External: ${initialMemory.external} MB\n`);

console.log(`System Information:`);
console.log(`  Total Memory: ${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB`);
console.log(`  Free Memory: ${Math.round(os.freemem() / (1024 * 1024 * 1024))} GB`);
console.log(`  CPU Cores: ${os.cpus().length}\n`);

// Check for large dependencies that might cause memory issues
console.log('📦 Checking for Large Dependencies...\n');

try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  // Dependencies known to be memory intensive
  const memoryIntensiveDeps = [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    'framer-motion',
    'firebase',
    'recharts',
    'gsap'
  ];
  
  const foundDeps = memoryIntensiveDeps.filter(dep => dependencies[dep]);
  
  if (foundDeps.length > 0) {
    console.log('⚠️  Memory-intensive dependencies detected:');
    foundDeps.forEach(dep => {
      console.log(`  - ${dep}@${dependencies[dep]}`);
    });
    console.log('\n💡 Optimization Tips:');
    console.log('  1. Use dynamic imports for heavy components');
    console.log('  2. Implement code splitting for Three.js components');
    console.log('  3. Consider using React.lazy for non-critical components');
    console.log('  4. Optimize animations and WebGL rendering');
  } else {
    console.log('✅ No memory-intensive dependencies detected');
  }
} catch (error) {
  console.log('⚠️  Could not analyze dependencies:', error.message);
}

console.log('\n⚡ Performance Recommendations:');
console.log('  1. Use NODE_OPTIONS=--max-old-space-size=4096 for builds');
console.log('  2. Limit concurrent requests with concurrentFeatures setting');
console.log('  3. Use code splitting for large libraries');
console.log('  4. Implement lazy loading for heavy components');
console.log('  5. Monitor memory usage during development');

console.log('\n✅ Performance monitoring completed!');