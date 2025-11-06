'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GradientButton } from '@/components/ui/gradient-button';
import { ArrowRight, Shield, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export function ServicesHero() {
	const dotsRef = useRef<HTMLDivElement>(null);
	const isMobile = useIsMobile();

	useEffect(() => {
		// Wait for DOM to be ready
		const initDots = () => {
			const container = document.getElementById('animated-dots');
			if (!container) {
				// Retry if container not found yet
				requestAnimationFrame(initDots);
				return;
			}

			// Clear any existing dots
			container.innerHTML = '';

		// Create enhanced animated dot pattern (reduced on mobile for performance)
		const dotCount = isMobile ? 80 : 200;
		for (let i = 0; i < dotCount; i++) {
			const dot = document.createElement('div');
			const size = Math.random() * 8 + 3;
			const left = Math.random() * 100;
			const top = Math.random() * 100;
			const delay = Math.random() * 15;
			const duration = 15 + Math.random() * 25;
			const color = Math.random() > 0.5 ? '#2b8dbe' : '#4896bd';

			dot.style.cssText = `
				position: absolute;
				width: ${size}px;
				height: ${size}px;
				left: ${left}%;
				top: ${top}%;
				background: radial-gradient(circle, ${color} 0%, transparent 70%);
				box-shadow: 0 0 ${size * 2}px ${color}40;
				border-radius: 50%;
				opacity: 0.4;
				animation: floatDot ${duration}s ease-in-out infinite;
				animation-delay: ${delay}s;
				will-change: transform, opacity;
			`;

			container.appendChild(dot);
		}

		// Add CSS for float animation (only if not already added)
		if (!document.getElementById('float-dot-animation-style')) {
			const style = document.createElement('style');
			style.id = 'float-dot-animation-style';
			style.textContent = `
				@keyframes floatDot {
					0%, 100% {
						transform: translate(0, 0) scale(1);
						opacity: 0.4;
					}
					25% {
						transform: translate(30px, -40px) scale(1.3);
						opacity: 0.7;
					}
					50% {
						transform: translate(-15px, -80px) scale(0.8);
						opacity: 0.4;
					}
					75% {
						transform: translate(-40px, -30px) scale(1.2);
						opacity: 0.6;
					}
				}
			`;
			document.head.appendChild(style);
		}
		};

		// Initialize with a small delay to ensure DOM is ready
		const timeoutId = setTimeout(() => {
			initDots();
		}, 0);

		return () => {
			clearTimeout(timeoutId);
			const container = document.getElementById('animated-dots');
			if (container) {
				container.innerHTML = '';
			}
		};
	}, [isMobile]);

	return (
		<section className="relative py-20 sm:py-32 md:py-40 overflow-hidden">
			{/* Background Effects */}
			<div ref={dotsRef} />
			
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] will-change-transform"
					animate={{
						x: [0, 100, 0],
						y: [0, -100, 0],
						scale: [1, 1.3, 1],
					}}
					transition={{
						duration: 25,
						repeat: Infinity,
						repeatType: 'reverse',
					}}
				/>
				<motion.div
					className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] will-change-transform"
					animate={{
						x: [0, -100, 0],
						y: [0, 100, 0],
						scale: [1, 1.2, 1],
					}}
					transition={{
						duration: 30,
						repeat: Infinity,
						repeatType: 'reverse',
					}}
				/>
			</div>

			<div className="container relative z-10">
				<div className="max-w-4xl mx-auto text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="mb-6 inline-flex items-center gap-2"
					>
						<Sparkles className="w-5 h-5 text-primary" />
						<span className="text-sm font-medium text-primary uppercase tracking-wide">Our Services</span>
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
					>
						Enterprise Security
						<br />
						<span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
							Services & Solutions
						</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
					>
						EncryptArx delivers end-to-end engineering, research-backed solutions, and operationalized security. We assess, design, deliver, and operationalize your infrastructure.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="flex flex-col sm:flex-row items-center justify-center gap-4"
					>
						<GradientButton asChild size="lg">
							<a href="/contact">
								<span>Request Assessment</span>
								<ArrowRight className="ml-2 w-5 h-5" />
							</a>
						</GradientButton>
						<a
							href="#services"
							className="inline-flex items-center text-sm font-medium text-primary hover:text-accent transition-colors"
						>
							<Shield className="mr-2 w-4 h-4" />
							Explore All Services
						</a>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

