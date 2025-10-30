'use client';

import { motion } from 'framer-motion';
import { standardDeliverables } from '@/data/services-data';
import { FileText, Package, Code, BarChart3, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

const deliverableCategories = [
	{ 
		icon: FileText, 
		label: 'Reports', 
		color: 'text-blue-400',
		bgColor: 'bg-blue-500/10',
		borderColor: 'border-blue-500/20',
		items: [
			'Assessment reports (executive summary + detailed findings)',
			'Security policy templates & governance docs',
			'Signed reports and acceptance documents'
		]
	},
	{ 
		icon: Package, 
		label: 'Artefacts', 
		color: 'text-emerald-400',
		bgColor: 'bg-emerald-500/10',
		borderColor: 'border-emerald-500/20',
		items: [
			'Model artifacts (training code, weights, evaluation notebooks)',
			'Playbooks & runbooks (incident response, on-call)',
			'Training materials & recordings'
		]
	},
	{ 
		icon: Code, 
		label: 'Code', 
		color: 'text-purple-400',
		bgColor: 'bg-purple-500/10',
		borderColor: 'border-purple-500/20',
		items: [
			'Code repositories & container images',
			'APIs & SDKs for product consumption',
			'IaC templates (Terraform, CloudFormation)'
		]
	},
	{ 
		icon: BarChart3, 
		label: 'Dashboards', 
		color: 'text-orange-400',
		bgColor: 'bg-orange-500/10',
		borderColor: 'border-orange-500/20',
		items: [
			'Dashboards & monitoring (Grafana/Kibana/BI)',
			'Architecture diagrams (context, deployment, data flow)',
			'Compliance mappings and audit evidence packages'
		]
	},
	{ 
		icon: BookOpen, 
		label: 'Documentation', 
		color: 'text-cyan-400',
		bgColor: 'bg-cyan-500/10',
		borderColor: 'border-cyan-500/20',
		items: [
			'Remediation roadmaps & prioritized tickets'
		]
	},
];

export function DeliverablesSection() {
	return (
		<section className="py-24 sm:py-32 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
			{/* Subtle background pattern */}
			<div className="absolute inset-0 opacity-[0.02]">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:24px_24px]" />
			</div>
			
			{/* Floating geometric shapes */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{Array.from({ length: 8 }).map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-white/10 rounded-full"
						style={{
							left: `${10 + i * 12}%`,
							top: `${20 + (i % 3) * 25}%`,
						}}
						animate={{
							y: [0, -20, 0],
							opacity: [0.1, 0.3, 0.1],
						}}
						transition={{
							duration: 4 + i * 0.5,
							repeat: Infinity,
							delay: i * 0.3,
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
					className="text-center mb-20"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
						<div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
						<span className="text-sm font-medium text-muted-foreground">Comprehensive Deliverables</span>
					</div>
					
					<h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
						Standard Deliverables & Artefacts
					</h2>
					
					<p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
						Comprehensive documentation and implementation artifacts delivered across all engagements, 
						ensuring complete transparency and professional excellence
					</p>
				</motion.div>

				{/* Categories Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-16">
					{deliverableCategories.map((category, index) => {
						const Icon = category.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className="group"
							>
								<div className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${category.bgColor} ${category.borderColor} hover:shadow-lg hover:shadow-white/5`}>
									{/* Icon */}
									<div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/5 mb-3 sm:mb-4 group-hover:bg-white/10 transition-colors duration-300">
										<Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${category.color}`} />
									</div>
									
									{/* Label */}
									<h3 className="text-base sm:text-lg font-semibold text-white">{category.label}</h3>
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* Detailed Deliverables */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="space-y-8"
				>
					{deliverableCategories.map((category, categoryIndex) => {
						const Icon = category.icon;
						return (
							<motion.div
								key={categoryIndex}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
								className="group"
							>
								{/* Category Header */}
								<div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
									<div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${category.bgColor} ${category.borderColor} border`}>
										<Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${category.color}`} />
									</div>
									<div>
										<h3 className="text-xl sm:text-2xl font-bold text-white">{category.label}</h3>
										<p className="text-sm sm:text-base text-muted-foreground">Professional {category.label.toLowerCase()} delivered with precision</p>
									</div>
								</div>

								{/* Items Grid */}
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
									{category.items.map((item, itemIndex) => (
										<motion.div
											key={itemIndex}
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
											className="group/item"
										>
											<div className="relative p-4 sm:p-5 rounded-lg sm:rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 hover:shadow-sm">
												<div className="flex items-start gap-2 sm:gap-3">
													<div className="flex-shrink-0 mt-0.5 sm:mt-1">
														<CheckCircle2 className={`w-3 h-3 sm:w-4 sm:h-4 ${category.color} opacity-60`} />
													</div>
													<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed group-hover/item:text-white/90 transition-colors duration-200">
														{item}
													</p>
												</div>
												
												{/* Subtle hover effect */}
												<div className={`absolute inset-0 rounded-lg sm:rounded-xl ${category.bgColor} opacity-0 group-hover/item:opacity-10 transition-opacity duration-300 -z-10`} />
											</div>
										</motion.div>
									))}
								</div>
							</motion.div>
						);
					})}
				</motion.div>

				{/* Bottom CTA */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.6 }}
					className="text-center mt-12 sm:mt-16"
				>
					<div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300 cursor-pointer group">
						<span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-white transition-colors">
							View detailed specifications
						</span>
						<ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-white transition-colors" />
					</div>
				</motion.div>
			</div>
		</section>
	);
}

