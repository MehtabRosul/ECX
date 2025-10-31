'use client';

import { useEffect, useRef } from 'react';

export function AboutParticlesBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Base Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      color: string;
      opacity: number;
      baseOpacity: number;
      behavior: number;
      angle: number;
      speed: number;
      orbitRadius: number;
      orbitCenterX: number;
      orbitCenterY: number;
      pulseSpeed: number;
      sineOffset: number;

      constructor(behaviorType: number) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseRadius = Math.random() * 2.5 + 0.5;
        this.radius = this.baseRadius;
        this.baseOpacity = Math.random() * 0.6 + 0.4;
        this.opacity = this.baseOpacity;
        this.behavior = behaviorType;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 1 + 0.5;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.sineOffset = Math.random() * Math.PI * 2;
        
        // Different behaviors
        if (this.behavior === 0) {
          // Type 0: Fast moving particles
          this.vx = (Math.random() - 0.5) * 2;
          this.vy = (Math.random() - 0.5) * 2;
          this.speed = Math.random() * 1.5 + 1;
        } else if (this.behavior === 1) {
          // Type 1: Slow drifting particles
          this.vx = (Math.random() - 0.5) * 0.3;
          this.vy = (Math.random() - 0.5) * 0.3;
          this.speed = Math.random() * 0.5 + 0.2;
        } else if (this.behavior === 2) {
          // Type 2: Vertical movers
          this.vx = (Math.random() - 0.5) * 0.2;
          this.vy = (Math.random() - 0.5) * 1.5;
          this.speed = Math.random() * 1 + 0.5;
        } else if (this.behavior === 3) {
          // Type 3: Horizontal movers
          this.vx = (Math.random() - 0.5) * 1.5;
          this.vy = (Math.random() - 0.5) * 0.2;
          this.speed = Math.random() * 1 + 0.5;
        } else if (this.behavior === 4) {
          // Type 4: Orbital particles (move in circles)
          this.orbitCenterX = this.x;
          this.orbitCenterY = this.y;
          this.orbitRadius = Math.random() * 50 + 30;
          this.angle = Math.random() * Math.PI * 2;
          this.vx = 0;
          this.vy = 0;
        } else if (this.behavior === 5) {
          // Type 5: Pulsing particles (stay in place but pulse)
          this.vx = (Math.random() - 0.5) * 0.1;
          this.vy = (Math.random() - 0.5) * 0.1;
          this.speed = 0.1;
        } else {
          // Type 6+: Random direction with varying speeds
          const direction = Math.random() * Math.PI * 2;
          this.speed = Math.random() * 1.2 + 0.3;
          this.vx = Math.cos(direction) * this.speed;
          this.vy = Math.sin(direction) * this.speed;
        }

        // Set color based on behavior type
        const colors = [
          'rgba(59, 130, 246, 0.8)', // Blue - fast
          'rgba(43, 141, 190, 0.6)', // Cyan - slow
          'rgba(103, 232, 249, 0.7)', // Light cyan - vertical
          'rgba(34, 211, 238, 0.7)', // Sky blue - horizontal
          'rgba(94, 234, 212, 0.6)', // Teal - orbital
          'rgba(45, 212, 191, 0.8)', // Emerald - pulsing
          'rgba(59, 130, 246, 0.5)', // Blue - random
        ];
        this.color = colors[this.behavior % colors.length];
      }

      update(deltaTime: number) {
        time += deltaTime;

        if (this.behavior === 4) {
          // Orbital behavior
          this.angle += this.speed * 0.01;
          this.x = this.orbitCenterX + Math.cos(this.angle) * this.orbitRadius;
          this.y = this.orbitCenterY + Math.sin(this.angle) * this.orbitRadius;
          
          // Slow drift of orbit center
          this.orbitCenterX += (Math.random() - 0.5) * 0.1;
          this.orbitCenterY += (Math.random() - 0.5) * 0.1;
        } else if (this.behavior === 5) {
          // Pulsing behavior
          const pulseAmount = Math.sin(time * 2 + this.sineOffset) * Math.min(this.baseRadius * 0.8, 1);
          this.radius = Math.max(0.5, this.baseRadius + pulseAmount);
          this.opacity = Math.max(0.1, Math.min(1, this.baseOpacity + Math.sin(time * 2 + this.sineOffset) * 0.3));
          this.x += this.vx;
          this.y += this.vy;
        } else {
          // Normal movement
          this.x += this.vx;
          this.y += this.vy;
          
          // Add some pulsing for variety
          if (this.behavior === 0 || this.behavior === 6) {
            const pulseAmount = Math.sin(time * 3 + this.sineOffset) * Math.min(this.baseRadius * 0.5, 0.8);
            this.radius = Math.max(0.5, this.baseRadius + pulseAmount);
          } else {
            this.radius = this.baseRadius;
          }
        }
        
        // Ensure radius is always positive
        this.radius = Math.max(0.5, this.radius);

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Bounce behavior for some types
        if (this.behavior === 2 || this.behavior === 3) {
          if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
          if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Extract RGB values and apply current opacity
        const rgbMatch = this.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (rgbMatch) {
          const r = rgbMatch[1];
          const g = rgbMatch[2];
          const b = rgbMatch[3];
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
        } else {
          ctx.fillStyle = this.color;
        }
        ctx.fill();
      }
    }

    // Create more particles with different behaviors
    const particleCount = Math.floor((canvas.width * canvas.height) / 8000); // More particles
    
    // Create particles with different behavior types
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      // Distribute behavior types
      const behaviorType = i % 7; // 7 different behavior types
      particles.push(new Particle(behaviorType));
    }

    let lastTime = 0;
    // Animation loop
    const animate = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1); // Cap delta time
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(deltaTime);
        particle.draw();
      });

      // Draw connections between nearby particles
      const connectionDistance = 150; // Increased connection distance
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Draw line if particles are close
          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(43, 141, 190, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}
