'use client';

import { useEffect, useRef, memo, useCallback, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  color: string;
  trail: Array<{ x: number; y: number; opacity: number }>;
}

interface CursorPosition {
  x: number;
  y: number;
}

function RndCursorParticlesBackgroundComponent({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const cursorRef = useRef<CursorPosition>({ x: -1000, y: -1000 });
  const cursorTargetRef = useRef<CursorPosition>({ x: -1000, y: -1000 });
  const isActiveRef = useRef(true);
  const mouseRadiusRef = useRef(150); // Interaction radius
  const [mounted, setMounted] = useState(false);
  const dprRef = useRef<number>(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);

  // Particle colors matching R&D theme (primary, emerald, cyan)
  const colors = [
    'rgba(59, 130, 246, 0.6)',   // primary blue
    'rgba(16, 185, 129, 0.6)',   // emerald
    'rgba(6, 182, 212, 0.6)',    // cyan
    'rgba(99, 102, 241, 0.5)',   // indigo
    'rgba(139, 92, 246, 0.5)',   // purple
  ];

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Optimized particle count - more particles for richer effect
    const particleCount = Math.min(120, Math.floor((canvas.width * canvas.height) / 15000));
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.4 + 0.3,
        baseOpacity: Math.random() * 0.4 + 0.3,
        color,
        trail: [],
      });
    }
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    
    const widthCss = canvas.parentElement.offsetWidth;
    const heightCss = canvas.parentElement.offsetHeight;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    dprRef.current = dpr;
    
    // Set canvas backing store size using DPR for crisp coordinates
    const width = Math.floor(widthCss * dpr);
    const height = Math.floor(heightCss * dpr);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = widthCss + 'px';
      canvas.style.height = heightCss + 'px';
      initParticles();
    }
  }, [initParticles]);

  // Handle cursor movement
  useEffect(() => {
    const toCanvasCoords = (clientX: number, clientY: number) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const dpr = dprRef.current;
      cursorTargetRef.current = {
        x: (clientX - rect.left) * dpr,
        y: (clientY - rect.top) * dpr,
      };
    };
    const handlePointerMove = (e: PointerEvent) => toCanvasCoords(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) toCanvasCoords(t.clientX, t.clientY);
    };

    const handleMouseLeave = () => {
      // Smoothly fade out cursor position when mouse leaves
      cursorTargetRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'medium'; // Optimized for performance

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    let lastTs = performance.now();
    const animate = () => {
      if (!isActiveRef.current || !ctx || !canvas) return;
      const now = performance.now();
      const dt = Math.min((now - lastTs) / 1000, 0.033); // clamp to ~30fps step
      lastTs = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      // Smoothly follow target cursor for stable yet responsive motion (critical damping-ish)
      cursorRef.current.x += (cursorTargetRef.current.x - cursorRef.current.x) * 0.35;
      cursorRef.current.y += (cursorTargetRef.current.y - cursorRef.current.y) * 0.35;
      const cursor = cursorRef.current;
      const mouseRadius = mouseRadiusRef.current;
      const particleCount = particles.length;

      // Update and draw particles
      ctx.save();
      
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        // Base organic drift (field + per-particle phase)
        const phase = (i * 12.9898) % 1000;
        const t = now * 0.001 + phase;
        const fieldX = Math.sin((p.y + t * 60) * 0.004) * 0.3;
        const fieldY = Math.cos((p.x - t * 40) * 0.004) * 0.3;
        p.vx += fieldX * dt;
        p.vy += fieldY * dt;

        // Calculate distance to cursor
        const dx = cursor.x - p.x;
        const dy = cursor.y - p.y;
        const distSq = dx * dx + dy * dy;
        const distance = Math.sqrt(distSq);
        
        // Cursor interaction - repel particles with force
        if (distance < mouseRadius && cursor.x > 0 && cursor.y > 0) {
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          
          // Repel particles from cursor
          const repelForce = (0.35 * force * force); // quadratic falloff for accuracy near cursor
          p.vx -= Math.cos(angle) * repelForce;
          p.vy -= Math.sin(angle) * repelForce;
          
          // Increase opacity when near cursor
          p.opacity = Math.min(1, p.baseOpacity + force * 0.4);
          
          // Increase size slightly when near cursor
          const dynamicSize = p.size * (1 + force * 0.3);
          
          // Draw glow effect around cursor
          if (distance < mouseRadius * 0.5) {
            const glowOpacity = (1 - distance / (mouseRadius * 0.5)) * 0.2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, dynamicSize * 3, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, dynamicSize * 3);
            gradient.addColorStop(0, p.color.replace('0.6', '0.8').replace('0.5', '0.7'));
            gradient.addColorStop(1, p.color.replace('0.6', '0').replace('0.5', '0'));
            ctx.fillStyle = gradient;
            ctx.fill();
          }
        } else {
          // Gradually return to base opacity
          p.opacity += (p.baseOpacity - p.opacity) * 0.1;
        }

        // Apply velocity with damping and integrate
        p.vx *= 0.985;
        p.vy *= 0.985;
        
        // Update position
        p.x += p.vx * (1 + dt * 30);
        p.y += p.vy * (1 + dt * 30);

        // Wrap around edges
        if (p.x < 0) {
          p.x = canvas.width;
          p.vx *= 0.5;
        } else if (p.x > canvas.width) {
          p.x = 0;
          p.vx *= 0.5;
        }
        if (p.y < 0) {
          p.y = canvas.height;
          p.vy *= 0.5;
        } else if (p.y > canvas.height) {
          p.y = 0;
          p.vy *= 0.5;
        }

        // Add to trail (for future trail effects)
        p.trail.push({ x: p.x, y: p.y, opacity: p.opacity });
        if (p.trail.length > 3) {
          p.trail.shift();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace('0.6', p.opacity.toString()).replace('0.5', p.opacity.toString()).replace('0.4', p.opacity.toString());
        ctx.fill();
        
        // Draw inner glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace('0.6', (p.opacity * 1.5).toString()).replace('0.5', (p.opacity * 1.5).toString());
        ctx.fill();
      }

      // Draw connections between nearby particles (optimized batching)
      ctx.lineWidth = 0.8;
      
      // Batch connection drawing for better performance
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < 16000) { // 125px connection distance
            const distance = Math.sqrt(distSq);
            const opacity = (1 - distance / 125) * 0.15;
            
            // Use simple stroke for better performance (skip gradient)
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      // Draw cursor interaction zone (subtle)
      if (cursor.x > 0 && cursor.y > 0) {
        const gradient = ctx.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, mouseRadius);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.05)');
        gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.03)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, mouseRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    window.addEventListener('resize', handleResize, { passive: true });

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
  }, [resize, initParticles, mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 -z-10 ${className}`}
      style={{ 
        width: '100%', 
        height: '100%', 
        willChange: 'contents',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        contain: 'layout style paint'
      }}
    />
  );
}

export const RndCursorParticlesBackground = memo(RndCursorParticlesBackgroundComponent);

