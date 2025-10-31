'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function ProductsBackgroundVisualization({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const snowCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Subtle randomized snowfall
  useEffect(() => {
    const canvas = snowCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Flake = { x: number; y: number; r: number; vx: number; vy: number; drift: number };
    const flakes: Flake[] = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.15,
      vy: Math.random() * 0.4 + 0.25,
      drift: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = 'white';
      flakes.forEach(f => {
        f.drift += 0.01 + Math.random() * 0.005;
        f.x += f.vx + Math.sin(f.drift) * 0.2;
        f.y += f.vy;
        if (f.y > canvas.height + 5) {
          f.y = -5;
          f.x = Math.random() * canvas.width;
        }
        if (f.x > canvas.width + 5) f.x = -5;
        if (f.x < -5) f.x = canvas.width + 5;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Animated Grid Pattern - Wavey */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridWave 14s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Animated Dot Grid Pattern - Wavey */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.4) 1.5px, transparent 0)',
            backgroundSize: '40px 40px',
            animation: 'dotsWave 16s ease-in-out infinite alternate',
          }}
        />
        {/* Secondary layer with phase offset for richer motion */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.25) 1px, transparent 0)',
            backgroundSize: '52px 52px',
            animation: 'dotsWave 22s ease-in-out infinite alternate',
            animationDelay: '3s',
          }}
        />
      </div>

      {/* Breathing gradient blobs (subtle, moving positions) */}
      <motion.div
        className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(59,130,246,0.25), transparent 60%)'
        }}
        animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0], scale: [1, 1.06, 0.96, 1], opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 right-0 w-[460px] h-[460px] rounded-full"
        style={{
          background: 'radial-gradient(circle at 60% 50%, rgba(139,92,246,0.22), transparent 60%)'
        }}
        animate={{ x: [0, -35, 20, 0], y: [0, 20, -18, 0], scale: [1, 1.08, 0.94, 1], opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(6,182,212,0.18), transparent 60%)'
        }}
        animate={{ x: [0, 28, -22, 0], y: [0, -18, 22, 0], scale: [1, 1.1, 0.92, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Animated gradient mesh overlay - Breathing */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(at 50% 50%, rgba(6, 182, 212, 0.25) 0%, transparent 50%)
          `,
        }}
        animate={{ opacity: [0.55, 0.85, 0.55] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle snowfall overlay */}
      <canvas ref={snowCanvasRef} className="absolute inset-0" style={{ opacity: 0.4 }} />

      {/* Rotating gradient border removed per request */}
    </div>
  );
}
