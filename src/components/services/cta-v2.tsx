'use client';

import { motion } from 'framer-motion';
import { GradientButton } from '@/components/ui/gradient-button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const benefits = [
	'Enterprise-grade security frameworks & compliance',
	'24/7 dedicated support & monitoring',
	'Comprehensive reporting & analytics',
	'Continuous threat intelligence & updates',
	'Research-backed solutions',
	'Customized security roadmaps & implementation',
];

export function ServicesCTA() {
	return (
		<section className="py-20 sm:py-32 relative overflow-hidden">
			{/* Animated gradient waves */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<svg className="absolute inset-0 w-full h-full">
					<defs>
						<linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="rgba(43, 141, 190, 0.1)" />
							<stop offset="50%" stopColor="rgba(72, 150, 189, 0.1)" />
							<stop offset="100%" stopColor="rgba(244, 164, 96, 0.1)" />
						</linearGradient>
					</defs>
					<path
						d="M0,50 Q250,100 500,50 T1000,50 T1500,50 T2000,50"
						stroke="url(#waveGradient)"
						strokeWidth="2"
						fill="none"
						className="animate-wave"
					>
						<animateTransform
							attributeName="transform"
							type="translateX"
							values="0;100;-100;0"
							dur="15s"
							repeatCount="indefinite"
						/>
					</path>
					<path
						d="M0,100 Q200,150 400,100 T800,100 T1200,100 T1600,100"
						stroke="url(#waveGradient)"
						strokeWidth="2"
						fill="none"
						className="animate-wave"
					>
						<animateTransform
							attributeName="transform"
							type="translateX"
							values="0;-150;150;0"
							dur="20s"
							repeatCount="indefinite"
						/>
					</path>
				</svg>
			</div>
			<div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
			<div className="absolute inset-0 bg-dot-pattern opacity-20" />

			<div className="container relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="max-w-4xl mx-auto"
				>
					<div className="bg-surface-1 border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
						{/* Animated gradient background */}
						<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
						
						{/* Animated gradient borders */}
						<div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-sm" />
						<div className="absolute inset-[1px] rounded-3xl bg-surface-1" />
						
						{/* Floating gradient orbs */}
						<div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" />
						<div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-purple-400/15 to-blue-400/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }} />
						
						{/* Decorative elements */}
						<div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
						<div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />

						<div className="relative z-10 text-center">
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}
							>
								<h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
									Ready to Transform Your Security Posture?
								</h2>
								<p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
									Start with a discovery call to align on objectives, collect artifacts, and receive a tailored Statement of Work.
								</p>
							</motion.div>

							{/* Benefits list */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
							>
								{benefits.map((benefit, index) => (
									<motion.div
										key={benefit}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
										className="flex items-center gap-3 text-left group/item"
									>
										<div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:from-blue-500/30 group-hover/item:to-purple-500/30 transition-all duration-300">
											<CheckCircle2 className="w-5 h-5 text-blue-400 group-hover/item:text-purple-400 transition-colors duration-300" />
										</div>
										<span className="text-muted-foreground group-hover/item:text-white transition-colors duration-300">{benefit}</span>
									</motion.div>
								))}
							</motion.div>

							{/* CTA Buttons */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.4 }}
								className="flex flex-col sm:flex-row items-center justify-center gap-4"
							>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="w-full sm:w-auto"
								>
									<GradientButton asChild size="lg" className="w-full sm:w-auto">
										<a href="/contact">
											<span>Request Assessment</span>
											<ArrowRight className="ml-2 w-5 h-5" />
										</a>
									</GradientButton>
								</motion.div>
								<motion.a
									href="/contact"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="inline-flex items-center px-6 py-3 border border-white/10 hover:border-gradient-to-r hover:from-blue-500/30 hover:via-purple-500/30 hover:to-pink-500/30 rounded-lg font-medium text-high hover:text-white transition-all duration-300 w-full sm:w-auto justify-center relative overflow-hidden group/btn"
								>
									<div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
									<span className="relative z-10">Schedule Discovery Call</span>
								</motion.a>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

