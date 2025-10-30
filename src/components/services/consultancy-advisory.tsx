'use client';

import { motion } from 'framer-motion';
import { Brain, Target, Users, Shield, ArrowRight, TrendingUp } from 'lucide-react';

const consultancyServices = [
	{
		icon: Brain,
		title: 'Strategic Technology Planning',
		description: 'Comprehensive technology roadmaps aligned with business objectives',
		color: 'from-purple-500 to-pink-500'
	},
	{
		icon: Shield,
		title: 'Cybersecurity Advisory',
		description: 'Expert guidance on security posture enhancement and risk mitigation',
		color: 'from-blue-500 to-cyan-500'
	},
	{
		icon: Target,
		title: 'AI & ML Strategy',
		description: 'Intelligent automation strategies and machine learning roadmaps',
		color: 'from-green-500 to-emerald-500'
	},
	{
		icon: Users,
		title: 'Change Management',
		description: 'Structured approach to technology adoption and transformation',
		color: 'from-amber-500 to-orange-500'
	}
];

export function ConsultancyAdvisorySection() {
	return (
		<section className="py-24 sm:py-32 relative overflow-hidden bg-gradient-to-b from-background via-background/98 to-background">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{/* Floating geometric shapes */}
				{Array.from({ length: 15 }).map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-2 h-2 bg-white/5 rounded-full"
						style={{
							left: `${10 + i * 6}%`,
							top: `${15 + (i % 3) * 25}%`,
						}}
						animate={{
							y: [0, -20, 0],
							opacity: [0.05, 0.2, 0.05],
							scale: [1, 1.2, 1],
						}}
						transition={{
							duration: 8 + i * 0.5,
							repeat: Infinity,
							delay: i * 0.3,
						}}
					/>
				))}
				
				{/* Animated lines */}
				{Array.from({ length: 3 }).map((_, i) => (
					<motion.div
						key={`line-${i}`}
						className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
						style={{ top: `${30 + i * 20}%` }}
						animate={{
							opacity: [0, 1, 0],
							x: [-100, 100, -100],
						}}
						transition={{
							duration: 6 + i * 2,
							repeat: Infinity,
							delay: i * 2,
						}}
					/>
				))}
			</div>

			<div className="container relative z-10">
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 hover:bg-white/10 transition-colors duration-300">
						<div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
						<span className="text-sm font-medium text-muted-foreground">Strategic Excellence</span>
					</div>
					
					<h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
						Consultancy & Strategic Advisory
					</h2>
					
					<p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
						Guiding organizations through secure, intelligent, and future-ready transformation
					</p>

					{/* Introduction */}
					<div className="max-w-4xl mx-auto">
						<motion.div
							whileHover={{ scale: 1.02 }}
							className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-12 relative overflow-hidden group hover:border-white/10 transition-all duration-500"
						>
							{/* Animated background gradient */}
							<div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] via-transparent to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							
							<div className="relative z-10">
								<p className="text-lg text-muted-foreground leading-relaxed mb-4">
									At EncryptArx, consultancy is not a separate offering — it's the foundation of how we engage. 
									We collaborate with businesses to evaluate systems, strategize transformation, and implement 
									sustainable, secure, and scalable digital frameworks.
								</p>
								<p className="text-base text-muted-foreground leading-relaxed">
									Our consultancy division merges deep technical knowledge with strategic foresight to ensure 
									every decision aligns with your business goals and drives measurable outcomes.
								</p>
							</div>
						</motion.div>
					</div>
				</motion.div>

				{/* Consultancy Services */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="mb-16"
				>
					<h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
						Strategic Advisory Services
					</h3>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{consultancyServices.map((service, index) => {
							const Icon = service.icon;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									whileHover={{ y: -8, scale: 1.02 }}
									className="group"
								>
									<div className="h-full p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-white/5">
										{/* Icon with attractive gradient colors */}
										<div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
											<Icon className="w-6 h-6 text-white" />
										</div>
										
										{/* Title */}
										<h4 className="text-lg font-semibold text-white mb-3 group-hover:text-white transition-colors">
											{service.title}
										</h4>
										
										{/* Description */}
										<p className="text-sm text-muted-foreground leading-relaxed group-hover:text-white/80 transition-colors duration-300">
											{service.description}
										</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</motion.div>

				{/* Value Proposition */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="text-center"
				>
					<div className="max-w-3xl mx-auto">
						<motion.div
							whileHover={{ scale: 1.02 }}
							className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-12 relative overflow-hidden group hover:border-white/10 transition-all duration-500"
						>
							{/* Animated background elements */}
							<div className="absolute top-4 right-4 w-24 h-24 bg-white/[0.01] rounded-full blur-xl group-hover:bg-white/[0.03] transition-colors duration-500" />
							<div className="absolute bottom-4 left-4 w-32 h-32 bg-white/[0.01] rounded-full blur-xl group-hover:bg-white/[0.03] transition-colors duration-500" />
							
							<div className="relative z-10">
								<div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
									<TrendingUp className="w-8 h-8 text-white" />
								</div>
								
								<h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
									Transformative Outcomes
								</h3>
								
								<p className="text-lg text-muted-foreground leading-relaxed mb-6">
									Our consultancy approach delivers measurable business value through strategic technology 
									alignment, risk mitigation, and sustainable growth frameworks.
								</p>
								
								{/* Attractive Schedule Strategic Consultation button with unique hover effect */}
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 cursor-pointer group/btn shadow-lg hover:shadow-cyan-500/30 relative overflow-hidden"
								>
									{/* Animated shine effect on hover */}
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" 
										style={{ transform: 'translateX(-100%)', animation: 'shine 1.5s infinite' }} />
									
									<span className="text-sm font-medium relative z-10">Schedule Strategic Consultation</span>
									<motion.div
										animate={{ x: [0, 4, 0] }}
										transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
									>
										<ArrowRight className="w-4 h-4 relative z-10" />
									</motion.div>
									
									{/* Add the shine animation style */}
									<style jsx>{`
										@keyframes shine {
											0% { transform: translateX(-100%); }
											20% { transform: translateX(100%); }
											100% { transform: translateX(100%); }
										}
									`}</style>
								</motion.div>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}