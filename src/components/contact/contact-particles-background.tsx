'use client';

import { useEffect, useRef, memo, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

function ContactParticlesBackgroundComponent({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const isActiveRef = useRef(true);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Optimized particle count calculation - reduced for better performance
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 20000));
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }, []);

  // Optimized resize handler with debouncing
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    
    const width = canvas.parentElement.offsetWidth;
    const height = canvas.parentElement.offsetHeight;
    
    // Only resize if dimensions actually changed
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      initParticles();
    }
  }, [initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Optimize canvas rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'low';

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    const animate = () => {
      if (!isActiveRef.current || !ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const particleCount = particles.length;

      // Optimize particle rendering - batch operations
      ctx.save();
      
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        else if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        else if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(43, 141, 190, ${p.opacity})`;
        ctx.fill();
      }

      // Optimize connection drawing - reduce calculations
      ctx.strokeStyle = 'rgba(43, 141, 190, 0.2)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        
        // Only check nearby particles (optimized radius)
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          
          // Use squared distance to avoid sqrt calculation until needed
          const distSq = dx * dx + dy * dy;
          
          if (distSq < 14400) { // 120^2
            const distance = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(43, 141, 190, ${(1 - distance / 120) * 0.2})`;
            ctx.stroke();
          }
        }
      }
      
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    window.addEventListener('resize', handleResize, { passive: true });

    // Pause animation when tab is not visible
    const handleVisibilityChange = () => {
      isActiveRef.current = !document.hidden;
      if (isActiveRef.current && !animationFrameRef.current) {
        animate();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(resizeTimer);
      isActiveRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resize, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 ${className}`}
      style={{ width: '100%', height: '100%', willChange: 'transform' }}
    />
  );
}

export const ContactParticlesBackground = memo(ContactParticlesBackgroundComponent);


