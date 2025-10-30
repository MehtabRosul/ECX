'use client';

import { motion } from 'framer-motion';
import { Search, Rocket, Settings, TrendingUp } from 'lucide-react';
import { ShineBorder } from '@/components/ui/shine-border';
import { useEffect, useRef, useState } from 'react';

const steps = [
	{
		label: 'Assess',
		icon: Search,
		description: 'Comprehensive security evaluation and gap analysis',
		color: 'from-blue-500 to-cyan-500',
		delay: 0,
	},
	{
		label: 'Pilot',
		icon: Rocket,
		description: 'Proof-of-concept deployment with real-world scenarios',
		color: 'from-purple-500 to-pink-500',
		delay: 0.1,
	},
	{
		label: 'Deploy',
		icon: Settings,
		description: 'Full-scale implementation and integration',
		color: 'from-green-500 to-emerald-500',
		delay: 0.2,
	},
	{
		label: 'Operate',
		icon: TrendingUp,
		description: 'Continuous monitoring and optimization',
		color: 'from-amber-500 to-orange-500',
		delay: 0.3,
	},
];

export function EngagementModel() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [activeStep, setActiveStep] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveStep((prev) => (prev + 1) % steps.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className="py-20 sm:py-32 relative overflow-hidden">
			{/* Background pattern */}
			<div className="absolute inset-0 bg-dot-pattern opacity-30" />
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

			<div className="container relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
						How We Engage
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Our proven methodology from assessment to ongoing operation
					</p>
				</motion.div>

				<div ref={containerRef} className="relative">
					{/* Timeline line */}
					<div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden md:block" />

					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
						{steps.map((step, index) => {
							const Icon = step.icon;
							const isActive = activeStep === index;

							return (
								<motion.div
									key={step.label}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: step.delay }}
									onHoverStart={() => setActiveStep(index)}
									className="relative"
								>
									<ShineBorder
										className="h-full"
										color={isActive ? ['#2B8DBE', '#4896BD', '#2B8DBE'] : undefined}
									>
										<motion.div
											animate={isActive ? { scale: 1.05 } : { scale: 1 }}
											transition={{ type: 'spring', stiffness: 300, damping: 20 }}
											className="relative bg-surface-1 border border-white/5 rounded-2xl p-6 md:p-8 h-full flex flex-col items-center text-center group hover:border-primary/30 transition-colors overflow-hidden"
										>
											{/* Animated gradient background */}
											<motion.div
												className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity`}
												animate={isActive ? { opacity: 0.15 } : {}}
											/>

											{/* Step number */}
											<div className="absolute top-4 right-4">
												<motion.div
													className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary"
													animate={isActive ? { scale: 1.2 } : { scale: 1 }}
												>
													{index + 1}
												</motion.div>
											</div>

											{/* Icon */}
											<motion.div
												className="relative mb-4"
												animate={isActive ? { rotate: 360 } : { rotate: 0 }}
												transition={{ duration: 0.6 }}
											>
												<div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
													<Icon className="w-10 h-10 text-white" />
												</div>
											</motion.div>

											{/* Content */}
											<h3 className="text-2xl font-bold mb-2 text-high group-hover:text-primary transition-colors">
												{step.label}
											</h3>
											<p className="text-muted-foreground text-sm leading-relaxed">
												{step.description}
											</p>

											{/* Progress indicator */}
											<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent">
												<motion.div
													className="h-full bg-primary"
													initial={{ width: '0%' }}
													animate={isActive ? { width: '100%' } : { width: '0%' }}
													transition={{ duration: 0.5 }}
												/>
											</div>
										</motion.div>
									</ShineBorder>
								</motion.div>
							);
						})}
					</div>
				</div>

				{/* Call to action */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mt-16 text-center"
				>
					<p className="text-muted-foreground mb-4">
						Ready to start your security transformation?
					</p>
					<motion.a
						href="/contact"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
					>
						<span>Book a Consultation</span>
					</motion.a>
				</motion.div>
			</div>
		</section>
	);
}

