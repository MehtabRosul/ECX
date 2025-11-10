'use client';

import { useEffect, useRef } from 'react';

export function CareersParticlesBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<any[]>([]);
  const flowFieldRef = useRef<number[][]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let time = 0;
    let animationId: number;
    let canvasWidth = 0;
    let canvasHeight = 0;

    // Set canvas size with high DPI support
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Limit DPR for performance
      const rect = canvas.getBoundingClientRect();
      canvasWidth = rect.width || window.innerWidth;
      canvasHeight = rect.height || window.innerHeight;
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      ctx.scale(dpr, dpr);
      
      // Optimize canvas rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // Initialize flow field
      initFlowField();
    };

    // Create smooth flow field for organic particle movement
    const initFlowField = () => {
      const cols = Math.floor(canvasWidth / 50);
      const rows = Math.floor(canvasHeight / 50);
      flowFieldRef.current = [];
      
      for (let y = 0; y <= rows; y++) {
        flowFieldRef.current[y] = [];
        for (let x = 0; x <= cols; x++) {
          // Create smooth, organic flow patterns
          const angle = Math.sin(x * 0.1) * Math.cos(y * 0.1) * Math.PI * 2;
          flowFieldRef.current[y][x] = angle;
        }
      }
    };

    // Professional particle class with smooth, elegant movement
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseRadius: number;
      radius: number;
      opacity: number;
      baseOpacity: number;
      color: string;
      colorIndex: number;
      life: number;
      maxLife: number;
      speed: number;
      angle: number;
      angleVelocity: number;
      pulseOffset: number;
      orbitRadius: number;
      orbitAngle: number;
      orbitSpeed: number;

      constructor(width: number, height: number) {
        // Random starting position with more variation
        this.x = Math.random() * width + (Math.random() - 0.5) * 100;
        this.y = Math.random() * height + (Math.random() - 0.5) * 100;
        
        // More varied particle sizes - smaller range for more particles
        this.baseRadius = Math.random() * 1.5 + 0.5; // 0.5-2.0
        this.radius = this.baseRadius;
        
        // More varied opacity
        this.baseOpacity = Math.random() * 0.6 + 0.3; // 0.3-0.9
        this.opacity = this.baseOpacity;
        
        // Extended color palette with more random variation
        const colors = [
          { r: 59, g: 130, b: 246 },   // Soft Blue
          { r: 16, g: 185, b: 129 },   // Emerald
          { r: 139, g: 92, b: 246 },   // Purple
          { r: 236, g: 72, b: 153 },   // Pink
          { r: 34, g: 211, b: 238 },   // Cyan
          { r: 251, g: 146, b: 60 },   // Orange
          { r: 99, g: 102, b: 241 },   // Indigo
          { r: 245, g: 158, b: 11 },   // Amber
          { r: 239, g: 68, b: 68 },    // Red
          { r: 168, g: 85, b: 247 },   // Violet
        ];
        this.colorIndex = Math.floor(Math.random() * colors.length);
        const baseColor = colors[this.colorIndex];
        // Add random color variation for more randomness
        const colorVariation = (Math.random() - 0.5) * 30;
        const r = Math.max(0, Math.min(255, baseColor.r + colorVariation));
        const g = Math.max(0, Math.min(255, baseColor.g + colorVariation));
        const b = Math.max(0, Math.min(255, baseColor.b + colorVariation));
        this.color = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, `;
        
        // More varied life cycle
        this.maxLife = 150 + Math.random() * 400;
        this.life = Math.random() * this.maxLife;
        
        // More varied movement properties
        this.speed = Math.random() * 1.2 + 0.2; // 0.2-1.4
        this.angle = Math.random() * Math.PI * 2;
        this.angleVelocity = (Math.random() - 0.5) * 0.05; // More variation
        
        // Initial velocity from angle with random boost
        const speedBoost = 0.5 + Math.random() * 1.5;
        this.vx = Math.cos(this.angle) * this.speed * speedBoost;
        this.vy = Math.sin(this.angle) * this.speed * speedBoost;
        
        // Pulse animation with more variation
        this.pulseOffset = Math.random() * Math.PI * 2;
        
        // More particles with orbital motion - increased chance
        if (Math.random() < 0.5) {
          this.orbitRadius = Math.random() * 50 + 15;
          this.orbitAngle = Math.random() * Math.PI * 2;
          this.orbitSpeed = (Math.random() - 0.5) * 0.02; // More variation
        } else {
          this.orbitRadius = 0;
          this.orbitAngle = 0;
          this.orbitSpeed = 0;
        }
      }

      update(deltaTime: number, width: number, height: number, mouse: { x: number; y: number }) {
        time += deltaTime;
        this.life += deltaTime * 60;

        // Random velocity changes for more chaos
        if (Math.random() < 0.02) {
          this.vx += (Math.random() - 0.5) * 0.3;
          this.vy += (Math.random() - 0.5) * 0.3;
        }

        // Flow field influence with more randomness
        const gridX = Math.floor(this.x / 50);
        const gridY = Math.floor(this.y / 50);
        
        if (flowFieldRef.current[gridY] && flowFieldRef.current[gridY][gridX] !== undefined) {
          const flowAngle = flowFieldRef.current[gridY][gridX] + time * (0.3 + Math.random() * 0.4);
          const flowStrength = 0.08 + Math.random() * 0.08; // More variation
          this.vx += Math.cos(flowAngle) * flowStrength * deltaTime * 60;
          this.vy += Math.sin(flowAngle) * flowStrength * deltaTime * 60;
        }

        // Mouse interaction - variable attraction distance and strength
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120 + Math.random() * 80; // Variable interaction distance
        
        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * (0.015 + Math.random() * 0.015);
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }

        // Variable velocity damping for more randomness
        const damping = 0.96 + Math.random() * 0.03;
        this.vx *= damping;
        this.vy *= damping;
        
        // Variable velocity limit
        const maxVel = 1.5 + Math.random() * 1.5;
        const vel = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (vel > maxVel) {
          this.vx = (this.vx / vel) * maxVel;
          this.vy = (this.vy / vel) * maxVel;
        }

        // Update position with random jitter
        const jitter = Math.random() < 0.1 ? (Math.random() - 0.5) * 0.2 : 0;
        this.x += (this.vx + jitter) * deltaTime * 60;
        this.y += (this.vy + jitter) * deltaTime * 60;

        // More varied orbital motion
        if (this.orbitRadius > 0) {
          this.orbitAngle += this.orbitSpeed * deltaTime * 60;
          const orbitInfluence = 0.0005 + Math.random() * 0.0015;
          this.x += Math.cos(this.orbitAngle) * this.orbitRadius * orbitInfluence;
          this.y += Math.sin(this.orbitAngle) * this.orbitRadius * orbitInfluence;
        }

        // More random angle rotation
        this.angle += this.angleVelocity * deltaTime * 60;
        
        // Variable velocity from angle
        const angleInfluence = 0.008 + Math.random() * 0.012;
        this.vx += Math.cos(this.angle) * angleInfluence * deltaTime * 60;
        this.vy += Math.sin(this.angle) * angleInfluence * deltaTime * 60;

        // Boundary wrapping with random repositioning
        if (this.x < -20) {
          this.x = width + Math.random() * 20;
          this.y = Math.random() * height;
          // Random velocity on wrap
          this.vx = Math.cos(Math.random() * Math.PI * 2) * this.speed;
          this.vy = Math.sin(Math.random() * Math.PI * 2) * this.speed;
        } else if (this.x > width + 20) {
          this.x = -Math.random() * 20;
          this.y = Math.random() * height;
          this.vx = Math.cos(Math.random() * Math.PI * 2) * this.speed;
          this.vy = Math.sin(Math.random() * Math.PI * 2) * this.speed;
        }
        
        if (this.y < -20) {
          this.y = height + Math.random() * 20;
          this.x = Math.random() * width;
          this.vx = Math.cos(Math.random() * Math.PI * 2) * this.speed;
          this.vy = Math.sin(Math.random() * Math.PI * 2) * this.speed;
        } else if (this.y > height + 20) {
          this.y = -Math.random() * 20;
          this.x = Math.random() * width;
          this.vx = Math.cos(Math.random() * Math.PI * 2) * this.speed;
          this.vy = Math.sin(Math.random() * Math.PI * 2) * this.speed;
        }

        // More varied pulse animation
        const pulseSpeed = 1.2 + Math.random() * 1.0;
        const pulseAmplitude = 0.1 + Math.random() * 0.2;
        const pulse = Math.sin(time * pulseSpeed + this.pulseOffset) * pulseAmplitude + 1;
        this.radius = Math.max(0.3, this.baseRadius * pulse);
        
        // More varied opacity pulse
        const opacityPulseSpeed = 0.6 + Math.random() * 0.8;
        const opacityPulseAmplitude = 0.08 + Math.random() * 0.15;
        const opacityPulse = Math.sin(time * opacityPulseSpeed + this.pulseOffset) * opacityPulseAmplitude + 1;
        this.opacity = this.baseOpacity * opacityPulse;
        this.opacity = Math.max(0.15, Math.min(0.95, this.opacity));

        // Regenerate particle after life cycle with random properties
        if (this.life > this.maxLife) {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.life = 0;
          this.speed = Math.random() * 1.2 + 0.2;
          this.angle = Math.random() * Math.PI * 2;
          this.vx = Math.cos(this.angle) * this.speed;
          this.vy = Math.sin(this.angle) * this.speed;
          this.pulseOffset = Math.random() * Math.PI * 2;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Skip if invalid
        if (this.radius <= 0 || !isFinite(this.radius) || !isFinite(this.x) || !isFinite(this.y)) {
          return;
        }

        // Create smooth gradient for particle glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 2.5
        );
        
        const colorStr = `${this.color}${this.opacity})`;
        const colorStrMid = `${this.color}${this.opacity * 0.4})`;
        const colorStrOut = `${this.color}0)`;
        
        gradient.addColorStop(0, colorStr);
        gradient.addColorStop(0.5, colorStrMid);
        gradient.addColorStop(1, colorStrOut);

        // Draw particle with smooth glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = colorStr;
        ctx.fill();
      }
    }

    // Initialize particles with performance optimization
    const initParticles = () => {
      particlesRef.current = [];
      // Adaptive particle count based on screen size and performance
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth < 1024;
      const baseCount = isMobile ? 150 : isTablet ? 300 : 500;
      const particleCount = Math.min(baseCount, Math.floor((canvasWidth * canvasHeight) / (isMobile ? 5000 : 3000)));
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(canvasWidth, canvasHeight));
      }
    };

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    // Update flow field over time with more randomness
    const updateFlowField = () => {
      if (flowFieldRef.current.length === 0) return;
      
      const cols = flowFieldRef.current[0].length;
      const rows = flowFieldRef.current.length;
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // More random flow field animation
          const variation = Math.sin(time * (0.2 + Math.random() * 0.3) + x * 0.1 + y * 0.1) * (0.008 + Math.random() * 0.012);
          flowFieldRef.current[y][x] += variation;
        }
      }
    };

    // Mouse tracking with throttling for performance
    let mouseMoveTimeout: NodeJS.Timeout | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseMoveTimeout) return;
      
      mouseMoveTimeout = setTimeout(() => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        mouseMoveTimeout = null;
      }, 16); // ~60fps throttling
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Animation loop with performance optimizations
    let lastTime = 0;
    let frameCount = 0;
    const animate = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      frameCount++;

      // Clear canvas efficiently
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Update flow field less frequently for performance
      if (frameCount % 2 === 0) {
        updateFlowField();
      }

      // Batch update and draw particles for better performance
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.update(deltaTime, canvasWidth, canvasHeight, mouseRef.current);
        particle.draw(ctx);
      }

      animationId = requestAnimationFrame(animate);
    };

    // Initialize on mount
    resizeCanvas();
    initParticles();

    // Setup event listeners
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    animate(0);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mouseMoveTimeout) {
        clearTimeout(mouseMoveTimeout);
      }
    };
  }, []);

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          background: 'transparent',
          willChange: 'contents',
          transform: 'translateZ(0)' // GPU acceleration
        }}
      />
    </div>
  );
}
