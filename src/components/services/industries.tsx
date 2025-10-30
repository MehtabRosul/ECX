'use client';

import { motion } from 'framer-motion';
import { Building2, Heart, CreditCard, Plane, ShoppingBag, GraduationCap } from 'lucide-react';
import Link from 'next/link';

const industries = [
	{ name: 'Finance', icon: CreditCard, href: '/clients?industry=Finance' },
	{ name: 'Healthcare', icon: Heart, href: '/clients?industry=Healthcare' },
	{ name: 'Logistics', icon: Plane, href: '/clients?industry=Logistics' },
	{ name: 'E-commerce', icon: ShoppingBag, href: '/clients?industry=E-commerce' },
	{ name: 'Education', icon: GraduationCap, href: '/clients?industry=Education' },
	{ name: 'Enterprise', icon: Building2, href: '/clients?industry=Enterprise' },
];

export function IndustriesSection() {
	return (
		<section className="py-20 sm:py-32 relative">
			<div className="container">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
						Trusted Across Industries
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						We serve organizations across multiple sectors with tailored security solutions
					</p>
				</motion.div>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
					{industries.map((industry, index) => {
						const Icon = industry.icon;

						return (
							<Link key={industry.name} href={industry.href}>
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: index * 0.1 }}
									whileHover={{ scale: 1.05, y: -5 }}
									whileTap={{ scale: 0.95 }}
									className="group relative p-6 bg-surface-1 border border-white/5 rounded-2xl hover:border-primary/30 transition-all cursor-pointer overflow-hidden"
								>
									{/* Hover glow effect */}
									<motion.div
										className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"
										layout
									/>

									<div className="relative z-10 flex flex-col items-center text-center">
										<motion.div
											className="mb-3 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
											whileHover={{ rotate: [0, -10, 10, 0] }}
											transition={{ duration: 0.5 }}
										>
											<Icon className="w-6 h-6 text-primary" />
										</motion.div>
										<span className="text-sm font-medium text-high group-hover:text-primary transition-colors">
											{industry.name}
										</span>
									</div>
								</motion.div>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}


