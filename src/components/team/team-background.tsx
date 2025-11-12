'use client';

import React, { useEffect, useRef } from 'react';

type Particle = {
	cx: number;
	cy: number;
	radius: number;
	angle: number;
	speed: number;
	size: number;
	h: number;
	s: number;
	l: number;
	alpha: number;
	layer: number;
};

const COLOR_BANDS = [
	{ h: 280, s: 92, l: 68 }, // vivid violet
	{ h: 330, s: 88, l: 70 }, // neon magenta
	{ h: 25, s: 90, l: 64 },  // ember orange
	{ h: 150, s: 85, l: 62 }  // aurora green
];

function createParticles(count: number, width: number, height: number) {
	const particles: Particle[] = [];
	const cx = width / 2;
	const cy = height / 2;
	for (let i = 0; i < count; i++) {
		const layer = i % 4;
		const band = COLOR_BANDS[layer % COLOR_BANDS.length];
		const ringOffset = Math.sin(i * 0.6) * 20;
		const radius =
			Math.min(width, height) * (0.25 + layer * 0.07) +
			Math.random() * 42 +
			ringOffset;
		const angle = Math.random() * Math.PI * 2;
		const speed = (0.00018 + Math.random() * 0.00038) * (layer + 1) * (Math.random() > 0.45 ? 1 : -1);
		const size = 1.2 + Math.random() * (layer === 0 ? 3.2 : 2.2);
		const alpha = 0.12 + Math.random() * 0.28;
		particles.push({
			cx,
			cy,
			radius,
			angle,
			speed,
			size,
			h: band.h + Math.random() * 14 - 7,
			s: band.s + Math.random() * 6 - 3,
			l: band.l + Math.random() * 6 - 3,
			alpha,
			layer
		});
	}
	return particles;
}

export const TeamBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const resizeObserver = useRef<ResizeObserver | null>(null);
	const animationRef = useRef<number | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let particles = createParticles(420, canvas.clientWidth, canvas.clientHeight);

		const draw = (timestamp: number) => {
			if (!canvas || !ctx) return;
			const { width, height } = canvas;
			ctx.clearRect(0, 0, width, height);

			// base gradient wash
			ctx.fillStyle = 'rgba(0,0,0,0.94)';
			ctx.fillRect(0, 0, width, height);

			// dynamic shimmering orbits
			ctx.save();
			ctx.globalCompositeOperation = 'lighter';

			for (const p of particles) {
				const swirl = Math.sin(timestamp * 0.00018 + p.radius * 0.004);
				const eccentricity = 0.86 + 0.08 * Math.sin(timestamp * 0.00022 + p.layer);
				const pulse = 1 + Math.sin(timestamp * 0.0011 * (p.radius * 0.00065)) * (0.07 + p.layer * 0.01);
				const x = p.cx + Math.cos(p.angle) * p.radius;
				const y = p.cy + Math.sin(p.angle) * p.radius * eccentricity + swirl * 12;

				const tail = p.size * (21 + p.layer * 6);
				const trailGradient = ctx.createRadialGradient(x, y, 0, x, y, tail);
				trailGradient.addColorStop(0, `hsla(${p.h}, ${p.s}%, ${p.l + 6}%, ${p.alpha * 1.4})`);
				trailGradient.addColorStop(0.32, `hsla(${p.h}, ${p.s + 6}%, ${p.l}%, ${p.alpha})`);
				trailGradient.addColorStop(1, 'rgba(0,0,0,0)');

				ctx.beginPath();
				ctx.fillStyle = trailGradient;
				ctx.arc(x, y, p.size * pulse, 0, Math.PI * 2);
				ctx.fill();

				p.angle += p.speed;
			}

			ctx.restore();

			// accent rings to create structured pattern
			ctx.save();
			ctx.globalCompositeOperation = 'lighter';
			ctx.strokeStyle = 'rgba(255,255,255,0.04)';
			for (let i = 0; i < 5; i++) {
				const radius = Math.min(width, height) * (0.24 + i * 0.09);
				ctx.beginPath();
				ctx.ellipse(width / 2, height / 2, radius, radius * (0.84 + i * 0.015), Math.sin(timestamp * 0.0003 + i), 0, Math.PI * 2);
				ctx.stroke();
			}
			ctx.restore();

			animationRef.current = requestAnimationFrame(draw);
		};

		const updateCanvasSize = () => {
			if (!canvas) return;
			const ratio = window.devicePixelRatio || 1;
			const { clientWidth, clientHeight } = canvas;
			canvas.width = clientWidth * ratio;
			canvas.height = clientHeight * ratio;
			ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
			particles = createParticles(420, canvas.width, canvas.height);
		};

		updateCanvasSize();
		animationRef.current = requestAnimationFrame(draw);

		resizeObserver.current = new ResizeObserver(() => {
			updateCanvasSize();
		});
		resizeObserver.current.observe(canvas);

		return () => {
			if (animationRef.current) cancelAnimationFrame(animationRef.current);
			resizeObserver.current?.disconnect();
		};
	}, []);

	return (
		<div className={`absolute inset-0 overflow-hidden ${className}`}>
			<div
				className="absolute inset-0"
				style={{
					background: 'linear-gradient(160deg, rgba(0,0,0,0.85), rgba(0,0,0,0.70))'
				}}
			/>
			<canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />
			<div className="absolute inset-0"
				style={{
					boxShadow: 'inset 0 0 220px rgba(0,0,0,0.85)'
				}}
			/>
		</div>
	);
};


