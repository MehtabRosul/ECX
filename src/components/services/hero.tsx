'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ShineBorder } from '@/components/ui/shine-border';
import { GradientButton } from '@/components/ui/gradient-button';
import { ArrowRight, Shield, Sparkles } from 'lucide-react';

export function ServicesHero() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<section className="relative py-20 sm:py-32 md:py-40 overflow-hidden">
			{/* Animated gradient orbs */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
					animate={{
						x: [0, 50, 0],
						y: [0, -50, 0],
						scale: [1, 1.2, 1],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						repeatType: 'reverse',
					}}
				/>
				<motion.div
					className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px]"
					animate={{
						x: [0, -50, 0],
						y: [0, 50, 0],
						scale: [1, 1.1, 1],
					}}
					transition={{
						duration: 25,
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
						transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
						className="mb-6 inline-flex items-center gap-2"
					>
						<ShineBorder className="px-4 py-2">
							<div className="flex items-center gap-2 text-sm font-medium text-primary">
								<Sparkles className="w-4 h-4" />
								Our Services
							</div>
						</ShineBorder>
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
						className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
					>
						Enterprise Security
						<br />
						<span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
							Redefined
						</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
						className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
					>
						From zero-trust architecture to AI-driven threat detection. We deliver comprehensive security solutions that protect your assets, ensure compliance, and future-proof your infrastructure.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
						className="flex flex-col sm:flex-row items-center justify-center gap-4"
					>
						<GradientButton asChild size="lg" className="group">
							<a href="/contact">
								<span>Request Assessment</span>
								<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</a>
						</GradientButton>
						<a
							href="#services-grid"
							className="inline-flex items-center text-sm font-medium text-primary hover:text-accent transition-colors group"
						>
							<Shield className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
							Explore Services
						</a>
					</motion.div>

					{/* Trust Indicators */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
						className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8"
					>
						{[{ label: '500+', desc: 'Projects' }, { label: '50+', desc: 'Clients' }, { label: '99.9%', desc: 'Uptime' }, { label: '24/7', desc: 'Support' }].map((stat, i) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
								className="text-center"
							>
								<div className="text-3xl sm:text-4xl font-bold text-high">{stat.label}</div>
								<div className="text-sm text-muted-foreground mt-1">{stat.desc}</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}


