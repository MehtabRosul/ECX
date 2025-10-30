'use client';

import { motion } from 'framer-motion';
import { GradientButton } from '@/components/ui/gradient-button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const benefits = [
	'ISO-27001 aligned security practices',
	'24/7 dedicated support',
	'Comprehensive reporting & analytics',
	'Continuous threat monitoring',
];

export function ServicesCTA() {
	return (
		<section className="py-20 sm:py-32 relative overflow-hidden">
			{/* Animated gradient background */}
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
					<div className="bg-surface-1 border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
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
									Ready to Secure Your Enterprise?
								</h2>
								<p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
									Get a comprehensive security assessment tailored to your specific needs and challenges.
								</p>
							</motion.div>

							{/* Benefits list */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
							>
								{benefits.map((benefit, index) => (
									<motion.div
										key={benefit}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
										className="flex items-center gap-3 text-left"
									>
										<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
											<CheckCircle2 className="w-5 h-5 text-primary" />
										</div>
										<span className="text-muted-foreground">{benefit}</span>
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
								<GradientButton asChild size="lg" className="w-full sm:w-auto">
									<a href="/contact">
										<span>Request Assessment</span>
										<ArrowRight className="ml-2 w-5 h-5" />
									</a>
								</GradientButton>
								<a
									href="/contact"
									className="inline-flex items-center px-6 py-3 border border-white/10 hover:border-primary/30 rounded-lg font-medium text-high hover:text-primary transition-colors w-full sm:w-auto justify-center"
								>
									Schedule a Call
								</a>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}


