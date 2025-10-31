"use client";

import { useEffect, useRef } from "react";

export function AboutShootingStars({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Star = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      len: number;
      life: number;
      maxLife: number;
      width: number;
      hue: number;
    };

    const stars: Star[] = [];

    const spawnStar = () => {
      // Spawn from any edge, travel towards a random interior target
      const edge = Math.floor(Math.random() * 4); // 0=top,1=right,2=bottom,3=left
      let x = 0, y = 0;
      const margin = 20;
      if (edge === 0) { // top
        x = Math.random() * canvas.width;
        y = -margin;
      } else if (edge === 1) { // right
        x = canvas.width + margin;
        y = Math.random() * canvas.height;
      } else if (edge === 2) { // bottom
        x = Math.random() * canvas.width;
        y = canvas.height + margin;
      } else { // left
        x = -margin;
        y = Math.random() * canvas.height;
      }

      // Random interior target point for direction
      const tx = Math.random() * canvas.width;
      const ty = Math.random() * canvas.height;
      const dx = tx - x;
      const dy = ty - y;
      const dist = Math.hypot(dx, dy) || 1;
      const speed = 4 + Math.random() * 3; // 4-7 px/frame
      const vx = (dx / dist) * speed;
      const vy = (dy / dist) * speed;

      const len = 60 + Math.random() * 80;
      const width = 1 + Math.random() * 1.5;
      const life = 0;
      const maxLife = 60 + Math.floor(Math.random() * 40);
      const hue = 200 + Math.floor(Math.random() * 50);
      stars.push({ x, y, vx, vy, len, life, maxLife, width, hue });
    };

    // Spawn every 1.5–3.5s randomly, max 3 simultaneous
    let spawnTimeout: number;
    const scheduleSpawn = () => {
      const delay = 1500 + Math.random() * 2000;
      spawnTimeout = window.setTimeout(() => {
        if (stars.length < 3) spawnStar();
        scheduleSpawn();
      }, delay) as unknown as number;
    };
    scheduleSpawn();

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw existing stars
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;

        // gradient trail
        const tx = s.x - s.vx * (s.len / (Math.hypot(s.vx, s.vy)));
        const ty = s.y - s.vy * (s.len / (Math.hypot(s.vx, s.vy)));
        const grad = ctx.createLinearGradient(s.x, s.y, tx, ty);
        grad.addColorStop(0, `hsla(${s.hue}, 80%, 70%, 0.9)`);
        grad.addColorStop(0.4, `hsla(${s.hue}, 80%, 60%, 0.5)`);
        grad.addColorStop(1, `hsla(${s.hue}, 80%, 60%, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();

        // remove if out of bounds or life over
        if (s.life > s.maxLife || s.x > canvas.width + 100 || s.y > canvas.height + 100) {
          stars.splice(i, 1);
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (spawnTimeout) clearTimeout(spawnTimeout);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
