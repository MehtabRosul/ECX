'use client';

import { motion } from 'framer-motion';
import { faqs } from '@/data/services-data';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQSection() {
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
	const [meshBlobs, setMeshBlobs] = useState<Array<{
		size: number;
		left: number;
		top: number;
		duration: number;
		delay: number;
		opacity: number;
	}>>([]);

	useEffect(() => {
		// Generate mesh blobs only on client side to prevent hydration mismatch
		const blobs = Array.from({ length: 15 }).map(() => ({
			size: Math.random() * 60 + 30,
			left: Math.random() * 100,
			top: Math.random() * 100,
			duration: 20 + Math.random() * 20,
			delay: Math.random() * 5,
			opacity: Math.random() * 0.2 + 0.1,
		}));
		setMeshBlobs(blobs);
	}, []);

	return (
		<section className="py-20 sm:py-32 relative overflow-hidden">
			{/* Animated mesh gradient */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
				{meshBlobs.map((blob, i) => (
					<div
						key={i}
						className="absolute rounded-full mesh-blob"
						style={{
							width: `${blob.size}px`,
							height: `${blob.size}px`,
							left: `${blob.left}%`,
							top: `${blob.top}%`,
							background: `radial-gradient(circle, rgba(72, 150, 189, ${blob.opacity}), transparent)`,
							filter: 'blur(20px)',
							animationDuration: `${blob.duration}s`,
							animationDelay: `${blob.delay}s`,
							animationTimingFunction: 'ease-in-out',
							animationIterationCount: 'infinite',
						}}
					/>
				))}
			</div>
			<style jsx global>{`
				@keyframes meshMove {
					0%, 100% {
						transform: translate(0, 0) rotate(0deg);
					}
					33% {
						transform: translate(30px, -20px) rotate(120deg);
					}
					66% {
						transform: translate(-20px, 30px) rotate(240deg);
					}
				}
				.mesh-blob {
					animation-name: meshMove;
				}
			`}</style>
			<div className="container relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
						Frequently Asked Questions
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Common questions about our engagement process and deliverables
					</p>
				</motion.div>

				<div className="max-w-3xl mx-auto space-y-4">
					{faqs.map((faq, index) => {
						const isExpanded = expandedIndex === index;

						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
							>
								<div className="bg-surface-1 border border-white/5 rounded-xl overflow-hidden">
									<button
										onClick={() => setExpandedIndex(isExpanded ? null : index)}
										className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
									>
										<span className="font-semibold text-high pr-8">{faq.q}</span>
										<ChevronDown
											className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
												isExpanded ? 'rotate-180' : ''
											}`}
										/>
									</button>
									<motion.div
										initial={false}
										animate={{
											height: isExpanded ? 'auto' : 0,
											opacity: isExpanded ? 1 : 0,
										}}
										transition={{ duration: 0.3 }}
										className="overflow-hidden"
									>
										<div className="px-6 pb-4 text-muted-foreground">
											{faq.a}
										</div>
									</motion.div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

