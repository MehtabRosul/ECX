'use client';

import { useEffect, useRef } from 'react';

export function LibraryParticlesBackground({ className = "" }: { className?: string }) {
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

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvasWidth = rect.width || window.innerWidth;
      canvasHeight = rect.height || window.innerHeight;
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      ctx.scale(dpr, dpr);
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      initFlowField();
    };

    const initFlowField = () => {
      const cols = Math.floor(canvasWidth / 50);
      const rows = Math.floor(canvasHeight / 50);
      flowFieldRef.current = [];
      
      for (let y = 0; y <= rows; y++) {
        flowFieldRef.current[y] = [];
        for (let x = 0; x <= cols; x++) {
          const angle = Math.sin(x * 0.08) * Math.cos(y * 0.08) * Math.PI * 2;
          flowFieldRef.current[y][x] = angle;
        }
      }
    };

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
      life: number;
      maxLife: number;
      speed: number;
      angle: number;
      pulseOffset: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseRadius = Math.random() * 1.2 + 0.4;
        this.radius = this.baseRadius;
        this.baseOpacity = Math.random() * 0.5 + 0.2;
        this.opacity = this.baseOpacity;
        
        const colors = [
          { r: 59, g: 130, b: 246 },
          { r: 139, g: 92, b: 246 },
          { r: 34, g: 211, b: 238 },
          { r: 236, g: 72, b: 153 },
          { r: 16, g: 185, b: 129 },
        ];
        const baseColor = colors[Math.floor(Math.random() * colors.length)];
        const colorVariation = (Math.random() - 0.5) * 25;
        const r = Math.max(0, Math.min(255, baseColor.r + colorVariation));
        const g = Math.max(0, Math.min(255, baseColor.g + colorVariation));
        const b = Math.max(0, Math.min(255, baseColor.b + colorVariation));
        this.color = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, `;
        
        this.maxLife = 200 + Math.random() * 300;
        this.life = Math.random() * this.maxLife;
        this.speed = Math.random() * 1.0 + 0.2;
        this.angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(deltaTime: number, width: number, height: number, mouse: { x: number; y: number }) {
        time += deltaTime;
        this.life += deltaTime * 60;

        if (Math.random() < 0.02) {
          this.vx += (Math.random() - 0.5) * 0.2;
          this.vy += (Math.random() - 0.5) * 0.2;
        }

        const gridX = Math.floor(this.x / 50);
        const gridY = Math.floor(this.y / 50);
        
        if (flowFieldRef.current[gridY] && flowFieldRef.current[gridY][gridX] !== undefined) {
          const flowAngle = flowFieldRef.current[gridY][gridX] + time * 0.25;
          const flowStrength = 0.06;
          this.vx += Math.cos(flowAngle) * flowStrength * deltaTime * 60;
          this.vy += Math.sin(flowAngle) * flowStrength * deltaTime * 60;
        }

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 100;
        
        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 0.01;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }

        this.vx *= 0.97;
        this.vy *= 0.97;
        
        const maxVel = 1.2;
        const vel = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (vel > maxVel) {
          this.vx = (this.vx / vel) * maxVel;
          this.vy = (this.vy / vel) * maxVel;
        }

        this.x += this.vx * deltaTime * 60;
        this.y += this.vy * deltaTime * 60;

        if (this.x < -20) {
          this.x = width + 20;
          this.y = Math.random() * height;
        } else if (this.x > width + 20) {
          this.x = -20;
          this.y = Math.random() * height;
        }
        
        if (this.y < -20) {
          this.y = height + 20;
          this.x = Math.random() * width;
        } else if (this.y > height + 20) {
          this.y = -20;
          this.x = Math.random() * width;
        }

        const pulse = Math.sin(time * 1.0 + this.pulseOffset) * 0.15 + 1;
        this.radius = Math.max(0.3, this.baseRadius * pulse);
        
        const opacityPulse = Math.sin(time * 0.6 + this.pulseOffset) * 0.1 + 1;
        this.opacity = this.baseOpacity * opacityPulse;
        this.opacity = Math.max(0.1, Math.min(0.8, this.opacity));

        if (this.life > this.maxLife) {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.life = 0;
          this.speed = Math.random() * 1.0 + 0.2;
          this.angle = Math.random() * Math.PI * 2;
          this.vx = Math.cos(this.angle) * this.speed;
          this.vy = Math.sin(this.angle) * this.speed;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.radius <= 0 || !isFinite(this.radius) || !isFinite(this.x) || !isFinite(this.y)) {
          return;
        }

        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 2.5
        );
        
        const colorStr = `${this.color}${this.opacity})`;
        const colorStrMid = `${this.color}${this.opacity * 0.3})`;
        const colorStrOut = `${this.color}0)`;
        
        gradient.addColorStop(0, colorStr);
        gradient.addColorStop(0.5, colorStrMid);
        gradient.addColorStop(1, colorStrOut);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = colorStr;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particlesRef.current = [];
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth < 1024;
      const baseCount = isMobile ? 120 : isTablet ? 250 : 400;
      const particleCount = Math.min(baseCount, Math.floor((canvasWidth * canvasHeight) / (isMobile ? 6000 : 3500)));
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(canvasWidth, canvasHeight));
      }
    };

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    const updateFlowField = () => {
      if (flowFieldRef.current.length === 0) return;
      
      const cols = flowFieldRef.current[0].length;
      const rows = flowFieldRef.current.length;
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const variation = Math.sin(time * 0.2 + x * 0.08 + y * 0.08) * 0.01;
          flowFieldRef.current[y][x] += variation;
        }
      }
    };

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
      }, 16);
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    let lastTime = 0;
    let frameCount = 0;
    const animate = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      frameCount++;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      if (frameCount % 2 === 0) {
        updateFlowField();
      }

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.update(deltaTime, canvasWidth, canvasHeight, mouseRef.current);
        particle.draw(ctx);
      }

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    animate(0);

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
          transform: 'translateZ(0)'
        }}
      />
    </div>
  );
}

