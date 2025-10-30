'use client';

import { motion } from 'framer-motion';
import { crossCuttingCapabilities } from '@/data/services-data';
import { Link as LinkIcon, Eye, TrendingUp, GitBranch, Network, Shield, ArrowRight, Cloud, BarChart3, Lightbulb, Leaf, Server, Zap } from 'lucide-react';
import { useState, useMemo } from 'react';

const capabilityIcons = [LinkIcon, Eye, TrendingUp, GitBranch, Network, Shield, Cloud, BarChart3, Lightbulb, Leaf, Server, Zap];

// Single blue color scheme for consistency
const blueColorScheme = {
	primary: '#2B8DBE',
	secondary: '#4896BD',
	gradient: 'from-blue-500 to-blue-600',
	accent: 'from-blue-500/20 to-blue-600/10',
	glow: 'shadow-blue-500/50'
};

export function CrossCuttingSection() {
	const [hoveredCard, setHoveredCard] = useState<number | null>(null);

	// Memoize background elements for performance
	const backgroundElements = useMemo(() => ({
		orbs: [
			{ id: 'orb-1', top: '25%', left: '25%', size: '24rem', delay: 0 },
			{ id: 'orb-2', top: '50%', right: '25%', size: '20rem', delay: 1 },
			{ id: 'orb-3', bottom: '25%', left: '50%', size: '18rem', delay: 2 },
		]
	}), []);

	return (
		<section className="py-24 sm:py-32 relative overflow-hidden">
			{/* Simplified Background for Performance */}
			<div className="absolute inset-0">
				{/* Reduced number of gradient orbs */}
				{backgroundElements.orbs.map((orb) => (
					<motion.div
						key={orb.id}
						className="absolute rounded-full bg-blue-500/10 blur-3xl"
						style={{
							top: orb.top,
							left: orb.left,
							right: orb.right,
							bottom: orb.bottom,
							width: orb.size,
							height: orb.size,
						}}
						animate={{
							scale: [1, 1.1, 1],
							opacity: [0.1, 0.2, 0.1],
						}}
						transition={{
							duration: 8,
							delay: orb.delay,
							repeat: Infinity,
							ease: "easeInOut"
						}}
					/>
				))}
				
				{/* Simplified grid pattern */}
				<div className="absolute inset-0 opacity-5">
					<div className="w-full h-full" style={{
						backgroundImage: 'radial-gradient(circle at 15px 15px, rgba(255,255,255,0.1) 1px, transparent 0)',
						backgroundSize: '40px 40px'
					}} />
				</div>
			</div>

			<div className="container relative z-10">
				{/* Simplified Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.1 }}
					transition={{ duration: 0.4 }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
						<div className="w-2 h-2 rounded-full bg-primary" />
						<span className="text-sm font-semibold text-primary">Cross-Cutting Excellence</span>
					</div>
					
					<h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
						Cross-Cutting
						<span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
							Capabilities
						</span>
					</h2>
					
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						Integrated capabilities that transcend service boundaries, delivering seamless solutions across all domains
					</p>
				</motion.div>

				{/* Advanced Interactive Grid - Updated to 4x2 layout */}
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{crossCuttingCapabilities.map((capability, index) => {
							const Icon = capabilityIcons[index];
							const isHovered = hoveredCard === index;

							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.1 }}
									transition={{ duration: 0.3, delay: index * 0.05 }}
									onHoverStart={() => setHoveredCard(index)}
									onHoverEnd={() => setHoveredCard(null)}
									className="relative group cursor-pointer"
								>
									<div className="relative bg-surface-1 border border-white/5 rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-200">
										{/* Icon */}
										<div className="relative mb-4">
											<div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${blueColorScheme.gradient} flex items-center justify-center shadow-lg`}>
												<Icon className="w-8 h-8 text-white" />
											</div>
										</div>

										{/* Content */}
										<div className="space-y-3">
											<h3 className="text-xl font-bold text-high group-hover:text-primary transition-colors duration-200">
												{capability.title}
											</h3>
											
											<p className="text-muted-foreground leading-relaxed">
												{capability.description}
											</p>

											{/* Simple interactive element */}
											<div className="flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
												<span>Learn More</span>
												<ArrowRight className="w-4 h-4" />
											</div>
										</div>

										{/* Simple progress indicator */}
										<div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 rounded-b-2xl">
											<motion.div
												className={`h-full bg-gradient-to-r ${blueColorScheme.gradient}`}
												initial={false}
												animate={{ 
													width: isHovered ? '100%' : '0%' 
												}}
												transition={{ 
													duration: 0.3,
													ease: "easeInOut"
												}}
											/>
										</div>
									</div>
								</motion.div>
							);
						})}
					</div>

					{/* Simple Call to Action - Moved down with additional margin */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.1 }}
						transition={{ duration: 0.4, delay: 0.1 }}
						className="text-center mt-16"
					>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-primary hover:shadow-lg hover:shadow-primary/50 transition-all duration-200 group cursor-pointer"
						>
							<span>Explore All Capabilities</span>
							<motion.div
								animate={{ x: [0, 4, 0] }}
								transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
							>
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</motion.div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}