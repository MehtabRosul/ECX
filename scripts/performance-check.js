#!/usr/bin/env node

// Performance monitoring script for Next.js application
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Running Performance Analysis...\n');

// Check if required tools are installed
try {
  execSync('npx next --version', { stdio: 'pipe' });
} catch (error) {
  console.error('❌ Next.js is not installed properly');
  process.exit(1);
}

// Function to get directory size
function getDirectorySize(dirPath) {
  let size = 0;
  try {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        size += getDirectorySize(filePath);
      } else {
        size += stats.size;
      }
    }
  } catch (error) {
    // Ignore errors for non-existent directories
  }
  return size;
}

// Function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Check bundle sizes
console.log('📦 Bundle Size Analysis:');
const nextDirSize = getDirectorySize('.next');
console.log(`  .next directory: ${formatBytes(nextDirSize)}`);

const nodeModulesSize = getDirectorySize('node_modules');
console.log(`  node_modules: ${formatBytes(nodeModulesSize)}`);

// Check for large dependencies
console.log('\n🔍 Large Dependencies:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  // Sort dependencies by name for consistent output
  const sortedDeps = Object.entries(dependencies).sort(([a], [b]) => a.localeCompare(b));
  
  // Filter for potentially large dependencies
  const largeDeps = sortedDeps.filter(([name]) => 
    name.includes('three') || 
    name.includes('react-three') ||
    name.includes('firebase') ||
    name.includes('lottie') ||
    name.includes('gsap') ||
    name.includes('framer') ||
    name.includes('recharts')
  );
  
  largeDeps.forEach(([name, version]) => {
    console.log(`  ${name}@${version}`);
  });
} catch (error) {
  console.error('  Could not analyze dependencies:', error.message);
}

// Check build time
console.log('\n⚡ Build Performance:');
try {
  console.time('  Build Time');
  execSync('npx next build', { stdio: 'inherit' });
  console.timeEnd('  Build Time');
} catch (error) {
  console.error('  Build failed:', error.message);
}

// Check for optimization opportunities
console.log('\n💡 Optimization Suggestions:');

// Check if Three.js is being used but not optimized
const hasThreeInBundle = nextDirSize > 50 * 1024 * 1024; // 50MB threshold
if (hasThreeInBundle) {
  console.log('  ⚠️  Large bundle size detected. Consider code splitting for Three.js components');
  console.log('  📖 https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance');
}

// Check for unused dependencies
console.log('\n✅ Performance check complete!');
console.log('\n📊 To analyze bundle composition, run: npm run build:analyze');