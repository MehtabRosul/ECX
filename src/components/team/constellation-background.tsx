'use client';

import React, { useEffect, useRef, useMemo } from 'react';

type Star = {
	x: number;
	y: number;
	z: number;
	r: number;
	tx: number;
	color: string;
	speed: number;
	twinkleSpeed: number;
	twinklePhase: number;
	sizeVariation: number;
	baseRadius: number;
};

type Connection = {
	a: number;
	b: number;
	alpha: number;
};

export const TeamConstellationBackground: React.FC<{ className?: string }> = React.memo(({ className = '' }) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const raf = useRef<number | null>(null);
	const resizeObs = useRef<ResizeObserver | null>(null);
	const lastShootingStar = useRef<number>(0);
	const isVisibleRef = useRef<boolean>(true);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const starsRef = useRef<Star[]>([]);
	const connectionsRef = useRef<Connection[]>([]);
	const lastFrameTime = useRef<number>(0);
	const frameSkip = useRef<number>(0);
	const performanceMetrics = useRef({ frameTime: 16, particleCount: 600 });
	const visibleStarsRef = useRef<number[]>([]);
	const lodBucketsRef = useRef<{ near: number[]; mid: number[]; far: number[] }>({ near: [], mid: [], far: [] });

	// Expanded bright random palette with maximum variations
	const PALETTE = useMemo(() => {
		const colors: string[] = [];
		// Generate bright random white/blue/cyan variations with high opacity
		for (let i = 0; i < 30; i++) {
			// Much brighter base - 0.7 to 1.0 brightness
			const brightness = 0.7 + Math.random() * 0.3;
			// More varied color tints - white, blue, cyan, purple
			const colorType = Math.random();
			let r, g, b;
			
			if (colorType < 0.4) {
				// Pure white/blue-white
				r = 255 * brightness;
				g = 255 * brightness;
				b = 255 * (brightness + Math.random() * 0.2);
			} else if (colorType < 0.7) {
				// Cyan tint
				r = 255 * (brightness * 0.9);
				g = 255 * brightness;
				b = 255 * brightness;
			} else if (colorType < 0.85) {
				// Blue tint
				r = 255 * (brightness * 0.85);
				g = 255 * (brightness * 0.9);
				b = 255 * brightness;
			} else {
				// Purple/blue mix
				r = 255 * (brightness * 0.95);
				g = 255 * (brightness * 0.85);
				b = 255 * brightness;
			}
			
			// High opacity - 0.6 to 1.0 for brightness
			const opacity = 0.6 + Math.random() * 0.4;
			colors.push(`rgba(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)},${opacity})`);
		}
		return colors;
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d', { 
			alpha: false, 
			desynchronized: true,
			willReadFrequently: false,
			powerPreference: 'low-power',
			antialias: false
		}) as CanvasRenderingContext2D | null;
		if (!ctx) return;

		let w = 0;
		let h = 0;
		let lastTs = performance.now();
		let frameCount = 0;
		let frameTimeSum = 0;
		let frameTimeCount = 0;

		const CELL_SIZE = 140;

		// Optimized particle count for 120fps+ performance
		function seed() {
			const baseCount = Math.floor((w * h) / 3500);
			const heroAreaHeight = Math.min(h * 0.85, 800);
			const heroAreaParticles = Math.floor((w * heroAreaHeight) / 2000);
			const count = Math.max(600, Math.min(1000, baseCount + heroAreaParticles));
			const stars: Star[] = [];
			
			stars.length = count;
			
			let randomSeed = Math.random() * 10000;
			const random = () => {
				randomSeed = (randomSeed * 9301 + 49297) % 233280;
				return randomSeed / 233280;
			};
			
			const heroYMax = Math.min(h * 0.85, 800);
			let heroParticleCount = 0;
			const targetHeroParticles = Math.floor(count * 0.45);
			
			for (let i = 0; i < count; i++) {
				const depth = 0.1 + random() * 1.4;
				const baseR = 0.5 + random() * 1.8;
				const speed = 0.6 + random() * 0.8;
				const twinkleSpeed = 0.0003 + random() * 0.003;
				const twinklePhase = random() * Math.PI * 2;
				const sizeVariation = 0.2 + random() * 0.7;
				const brightnessMultiplier = 0.8 + random() * 0.4;
				
				let x: number, y: number;
				if (heroParticleCount < targetHeroParticles && random() < 0.6) {
					const clusterX = random() * w;
					const clusterY = random() * heroYMax;
					const spread = 100 + random() * 150;
					x = Math.max(0, Math.min(w, clusterX + (random() - 0.5) * spread));
					y = Math.max(0, Math.min(heroYMax, clusterY + (random() - 0.5) * spread));
					heroParticleCount++;
				} else {
					const clusterX = random() * w;
					const clusterY = heroYMax + random() * (h - heroYMax);
					const spread = 150 + random() * 200;
					x = Math.max(0, Math.min(w, clusterX + (random() - 0.5) * spread));
					y = Math.max(heroYMax * 0.5, Math.min(h, clusterY + (random() - 0.5) * spread));
				}
				
				const colorIndex = Math.floor(random() * PALETTE.length);
				const baseColor = PALETTE[colorIndex];
				
				const colorMatch = baseColor.match(/rgba?\((\d+),(\d+),(\d+),([\d.]+)\)/);
				if (colorMatch) {
					const r = Math.min(255, Math.floor(parseInt(colorMatch[1]) * brightnessMultiplier));
					const g = Math.min(255, Math.floor(parseInt(colorMatch[2]) * brightnessMultiplier));
					const b = Math.min(255, Math.floor(parseInt(colorMatch[3]) * brightnessMultiplier));
					const a = Math.min(1, parseFloat(colorMatch[4]) * (0.9 + random() * 0.2));
					
					stars[i] = {
						x: x,
						y: y,
						z: depth,
						r: baseR * (1.1 - depth * 0.1),
						baseRadius: baseR,
						tx: random() * 2000,
						color: `rgba(${r},${g},${b},${a})`,
						speed: speed,
						twinkleSpeed: twinkleSpeed,
						twinklePhase: twinklePhase,
						sizeVariation: sizeVariation
					};
				} else {
					stars[i] = {
						x: x,
						y: y,
						z: depth,
						r: baseR * (1.1 - depth * 0.1),
						baseRadius: baseR,
						tx: random() * 2000,
						color: baseColor,
						speed: speed,
						twinkleSpeed: twinkleSpeed,
						twinklePhase: twinklePhase,
						sizeVariation: sizeVariation
					};
				}
			}

			// Optimized spatial grid
			const grid = new Map<string, number[]>();
			const keyFor = (x: number, y: number) => `${Math.floor(x / CELL_SIZE)}|${Math.floor(y / CELL_SIZE)}`;
			
			for (let i = 0; i < stars.length; i++) {
				const s = stars[i];
				const k = keyFor(s.x, s.y);
				if (!grid.has(k)) grid.set(k, []);
				grid.get(k)!.push(i);
			}

			const maxDist = CELL_SIZE * 0.9;
			const maxDist2 = maxDist * maxDist;
			const connections: Connection[] = [];
			const maxConnectionsPerStar = 2;

			const connectionSampleRate = Math.max(1, Math.floor(stars.length / 400));
			
			for (let index = 0; index < stars.length; index += connectionSampleRate) {
				const s = stars[index];
				const cx = Math.floor(s.x / CELL_SIZE);
				const cy = Math.floor(s.y / CELL_SIZE);
				
				const neighbors = grid.get(`${cx}|${cy}`);
				if (!neighbors) continue;
				
				const connectionCandidates: Array<{ idx: number; dist2: number }> = [];
				
				for (const idx of neighbors) {
					if (idx <= index || idx % connectionSampleRate !== 0) continue;
					const other = stars[idx];
					const dx = s.x - other.x;
					const dy = s.y - other.y;
					const d2 = dx * dx + dy * dy;
					if (d2 < maxDist2) {
						connectionCandidates.push({ idx, dist2: d2 });
					}
				}

				if (connectionCandidates.length > 0) {
					connectionCandidates.sort((a, b) => a.dist2 - b.dist2);
					const candidate = connectionCandidates[0];
					const weight = 0.04 * (1 - candidate.dist2 / maxDist2);
					if (weight > 0.008) {
						connections.push({ a: index, b: candidate.idx, alpha: weight });
					}
				}
			}

			starsRef.current = stars;
			connectionsRef.current = connections;
			performanceMetrics.current.particleCount = count;
		}

		function resize() {
			if (!canvas || !ctx) return;
			const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
			const { clientWidth, clientHeight } = canvas;
			w = clientWidth;
			h = clientHeight;
			canvas.width = clientWidth * ratio;
			canvas.height = clientHeight * ratio;
			ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
			seed();
		}

		// Optimized draw function
		function draw(ts: number) {
			if (!ctx) return;
			
			if (!isVisibleRef.current) {
				raf.current = requestAnimationFrame(draw);
				return;
			}

			const frameStart = performance.now();
			const delta = Math.min(ts - lastTs, 32);
			lastTs = ts;
			frameCount++;

			const avgFrameTime = performanceMetrics.current.frameTime;
			if (avgFrameTime > 12 && frameSkip.current % 3 === 0) {
				frameSkip.current++;
				raf.current = requestAnimationFrame(draw);
				return;
			}
			frameSkip.current++;

			const stars = starsRef.current;
			const connections = connectionsRef.current;

			// Clear
			ctx.fillStyle = '#000';
			ctx.fillRect(0, 0, w, h);

			// Pre-calculate visible stars with LOD
			const margin = 80;
			visibleStarsRef.current = [];
			lodBucketsRef.current = { near: [], mid: [], far: [] };
			
			for (let i = 0; i < stars.length; i++) {
				const s = stars[i];
				if (s.x >= -margin && s.x <= w + margin && s.y >= -margin && s.y <= h + margin) {
					visibleStarsRef.current.push(i);
					if (s.z > 0.8) lodBucketsRef.current.near.push(i);
					else if (s.z > 0.5) lodBucketsRef.current.mid.push(i);
					else lodBucketsRef.current.far.push(i);
				}
			}

			// Batch star updates
			ctx.save();
			const speedMultiplier = delta / 16.67;
			const visibleIndices = visibleStarsRef.current;
			
			for (let j = 0; j < visibleIndices.length; j++) {
				const i = visibleIndices[j];
				const s = stars[i];
				s.x += 0.015 * (1.4 - s.z) * s.speed * speedMultiplier;
				if (s.x > w + 20) s.x = -20;
				if (s.x < -20) s.x = w + 20;
			}

			// Far stars: batched
			if (lodBucketsRef.current.far.length > 0) {
				ctx.fillStyle = 'rgba(255,255,255,0.5)';
				ctx.beginPath();
				for (let j = 0; j < lodBucketsRef.current.far.length; j++) {
					const i = lodBucketsRef.current.far[j];
					const s = stars[i];
					ctx.moveTo(s.x + s.baseRadius * 0.6, s.y);
					ctx.arc(s.x, s.y, s.baseRadius * 0.6, 0, Math.PI * 2);
				}
				ctx.fill();
			}

			// Mid stars: batched by color
			const midStarsByColor = new Map<string, number[]>();
			for (let j = 0; j < lodBucketsRef.current.mid.length; j++) {
				const i = lodBucketsRef.current.mid[j];
				const s = stars[i];
				if (!midStarsByColor.has(s.color)) {
					midStarsByColor.set(s.color, []);
				}
				midStarsByColor.get(s.color)!.push(i);
			}

			midStarsByColor.forEach((indices, color) => {
				ctx.fillStyle = color;
				ctx.beginPath();
				for (let j = 0; j < indices.length; j++) {
					const i = indices[j];
					const s = stars[i];
					const tw = 0.75 + 0.3 * Math.abs(Math.sin((ts + s.tx) * s.twinkleSpeed + s.twinklePhase));
					const radius = s.baseRadius * tw * 0.85;
					ctx.moveTo(s.x + radius, s.y);
					ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
				}
				ctx.fill();
			});

			// Near stars: full detail
			const nearStarsByColor = new Map<string, number[]>();
			for (let j = 0; j < lodBucketsRef.current.near.length; j++) {
				const i = lodBucketsRef.current.near[j];
				const s = stars[i];
				if (!nearStarsByColor.has(s.color)) {
					nearStarsByColor.set(s.color, []);
				}
				nearStarsByColor.get(s.color)!.push(i);
			}

			nearStarsByColor.forEach((indices, color) => {
				ctx.fillStyle = color;
				for (let j = 0; j < indices.length; j++) {
					const i = indices[j];
					const s = stars[i];
					const tw = 0.6 + s.sizeVariation * Math.abs(Math.sin((ts + s.tx) * s.twinkleSpeed + s.twinklePhase));
					const radius = Math.max(0.5, s.baseRadius * tw * 1.1);
					ctx.beginPath();
					ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
					ctx.fill();
				}
			});
			ctx.restore();

			// Connection rendering
			ctx.save();
			ctx.lineWidth = 0.6;
			ctx.strokeStyle = 'rgba(255,255,255,0.65)';
			
			const visibleSet = new Set(visibleStarsRef.current);
			for (let i = 0; i < connections.length; i++) {
				const conn = connections[i];
				if (!visibleSet.has(conn.a) || !visibleSet.has(conn.b)) continue;
				
				const a = stars[conn.a];
				const b = stars[conn.b];
				if (!a || !b) continue;

				if ((a.x < -margin || a.x > w + margin) && (b.x < -margin || b.x > w + margin)) continue;

				ctx.globalAlpha = conn.alpha;
				ctx.beginPath();
				ctx.moveTo(a.x, a.y);
				ctx.lineTo(b.x, b.y);
				ctx.stroke();
			}
			ctx.restore();
			ctx.globalAlpha = 1;

			// Shooting star
			if (frameCount - lastShootingStar.current > 500 && Math.random() < 0.03) {
				lastShootingStar.current = frameCount;
				const y = Math.random() * h * 0.7;
				const x = Math.random() * w * 0.8;
				const len = 90 + Math.random() * 50;
				const angle = (-Math.PI / 4) * (0.8 + Math.random() * 0.4);
				const vx = Math.cos(angle);
				const vy = Math.sin(angle);
				const grad = ctx.createLinearGradient(x, y, x + vx * len, y + vy * len);
				grad.addColorStop(0, 'rgba(255,255,255,0.18)');
				grad.addColorStop(1, 'rgba(255,255,255,0)');
				ctx.strokeStyle = grad;
				ctx.lineWidth = 1.2;
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.lineTo(x + vx * len, y + vy * len);
				ctx.stroke();
			}

			// Performance monitoring
			const frameTime = performance.now() - frameStart;
			frameTimeSum += frameTime;
			frameTimeCount++;
			if (frameTimeCount >= 30) {
				performanceMetrics.current.frameTime = frameTimeSum / frameTimeCount;
				frameTimeSum = 0;
				frameTimeCount = 0;
			}

			raf.current = requestAnimationFrame(draw);
		}

		// Intersection Observer to pause when not visible
		const observer = new IntersectionObserver(
			(entries) => {
				isVisibleRef.current = entries[0]?.isIntersecting ?? true;
				if (!isVisibleRef.current && raf.current) {
					cancelAnimationFrame(raf.current);
					raf.current = null;
				} else if (isVisibleRef.current && !raf.current) {
					raf.current = requestAnimationFrame(draw);
				}
			},
			{ threshold: 0, rootMargin: '50px' }
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		resize();
		raf.current = requestAnimationFrame(draw);
		
		let resizeTimeout: NodeJS.Timeout;
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(resize, 200);
		};
		
		resizeObs.current = new ResizeObserver(handleResize);
		resizeObs.current.observe(canvas);
		window.addEventListener('resize', handleResize, { passive: true });

		return () => {
			if (raf.current) cancelAnimationFrame(raf.current);
			resizeObs.current?.disconnect();
			observer.disconnect();
			window.removeEventListener('resize', handleResize);
			clearTimeout(resizeTimeout);
		};
	}, [PALETTE]);

	return (
		<div ref={containerRef} className={`absolute inset-0 ${className}`} style={{ zIndex: 0 }}>
			<canvas 
				ref={canvasRef} 
				className="absolute inset-0 w-full h-full opacity-50" 
				style={{ willChange: 'auto', transform: 'translateZ(0)', zIndex: 0 }}
			/>
		</div>
	);
});
TeamConstellationBackground.displayName = 'TeamConstellationBackground';

