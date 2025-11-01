'use client';

import { motion } from 'framer-motion';
import { servicesData } from '@/data/services-data';
import { useState, useEffect } from 'react';
import { ChevronDown, CheckCircle2, Brain, Shield, Settings, Cloud } from 'lucide-react';
import { ShineBorder } from '@/components/ui/shine-border';
import { useIsMobile } from '@/hooks/use-mobile';

const domainIcons = {
	'ai-ml': Brain,
	'cybersecurity': Shield,
	'tech-solutions': Settings,
	'cloud-services': Cloud,
};

const domainColors = {
	'ai-ml': 'from-purple-500 to-pink-500',
	'cybersecurity': 'from-blue-500 to-cyan-500',
	'tech-solutions': 'from-green-500 to-emerald-500',
	'cloud-services': 'from-cyan-500 to-blue-500',
};

const domainGradients = {
	'ai-ml': 'from-purple-500/20 to-pink-500/10',
	'cybersecurity': 'from-blue-500/20 to-cyan-500/10',
	'tech-solutions': 'from-green-500/20 to-emerald-500/10',
	'cloud-services': 'from-cyan-500/20 to-blue-500/10',
};

export function DomainSections() {
	const isMobile = useIsMobile();
	const [expandedDomains, setExpandedDomains] = useState<Set<string>>(new Set(['cybersecurity']));
	const [backgroundElements, setBackgroundElements] = useState<{
		hexagons: Array<{
			delay: number;
			duration: number;
			size: number;
			left: number;
			top: number;
		}>;
		particles: Array<{
			delay: number;
			duration: number;
			size: number;
			left: number;
			top: number;
			color: string;
		}>;
	}>({ hexagons: [], particles: [] });

	useEffect(() => {
		// Generate hexagons
		const hexagonCount = isMobile ? 8 : 15;
		const hexagons = Array.from({ length: hexagonCount }).map((_, i) => ({
			delay: i * 0.5,
			duration: 8 + Math.random() * 8,
			size: 80 + Math.random() * 100,
			left: Math.random() * 100,
			top: Math.random() * 100,
		}));

		// Generate particles
		const colors = [
			'rgba(43, 141, 190, 0.6)',
			'rgba(72, 150, 189, 0.6)',
			'rgba(244, 164, 96, 0.6)',
		];
		const particleCount = isMobile ? 12 : 25;
		const particles = Array.from({ length: particleCount }).map((_, i) => ({
			delay: i * 0.3,
			duration: 6 + Math.random() * 6,
			size: 4 + Math.random() * 6,
			left: Math.random() * 100,
			top: Math.random() * 100,
			color: colors[Math.floor(Math.random() * colors.length)],
		}));

		setBackgroundElements({ hexagons, particles });
	}, [isMobile]);

	const toggleDomain = (id: string) => {
		const newSet = new Set(expandedDomains);
		if (newSet.has(id)) {
			newSet.delete(id);
		} else {
			newSet.add(id);
		}
		setExpandedDomains(newSet);
	};

	return (
		<section id="services" className="py-20 sm:py-32 relative overflow-hidden">
			{/* Dynamic animated background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{/* Floating hexagon shapes */}
				{backgroundElements.hexagons.map((hex, i) => (
					<div
						key={`hex-${i}`}
						className="absolute"
						style={{
							left: `${hex.left}%`,
							top: `${hex.top}%`,
							width: `${hex.size}px`,
							height: `${hex.size}px`,
							border: '2px solid',
							borderColor: 'rgba(43, 141, 190, 0.3)',
							clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
							animationDuration: `${hex.duration}s`,
							animationDelay: `${hex.delay}s`,
							animationTimingFunction: 'ease-in-out',
							animationIterationCount: 'infinite',
							animationName: 'floatHex',
							willChange: 'transform, opacity',
						}}
					/>
				))}
				
				{/* Glowing particles */}
				{backgroundElements.particles.map((particle, i) => (
					<div
						key={`particle-${i}`}
						className="absolute rounded-full"
						style={{
							left: `${particle.left}%`,
							top: `${particle.top}%`,
							width: `${particle.size}px`,
							height: `${particle.size}px`,
							background: particle.color,
							boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
							animationDuration: `${particle.duration}s`,
							animationDelay: `${particle.delay}s`,
							animationTimingFunction: 'ease-in-out',
							animationIterationCount: 'infinite',
							animationName: 'glowPulse',
							willChange: 'transform, opacity',
						}}
					/>
				))}
			</div>
			
			<style jsx global>{`
				@keyframes floatHex {
					0%, 100% {
						transform: translate(0, 0) rotate(0deg) scale(1);
						opacity: 0.3;
					}
					50% {
						transform: translate(30px, -50px) rotate(180deg) scale(1.2);
						opacity: 0.6;
					}
				}
				
				@keyframes glowPulse {
					0%, 100% {
						transform: translate(0, 0) scale(1);
						opacity: 0.4;
					}
					50% {
						transform: translate(20px, -30px) scale(1.5);
						opacity: 1;
					}
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
						Core Service Domains
					</h2>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
						Four comprehensive domains spanning AI/ML, Cybersecurity, Tech Solutions, and Cloud Services
					</p>
				</motion.div>

				<div className="space-y-8">
					{servicesData.map((domain, domainIndex) => {
						const isExpanded = expandedDomains.has(domain.id);

						return (
							<motion.div
								key={domain.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: domainIndex * 0.1 }}
							>
								<ShineBorder className="overflow-hidden">
									<div className="bg-surface-1/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden group relative">
										{/* Animated gradient background - only on hover, not when expanded */}
										<motion.div
											className={`absolute inset-0 bg-gradient-to-br ${domainGradients[domain.id as keyof typeof domainGradients]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
										/>

										{/* Domain Header */}
										<div
											className={
												`w-full px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between relative z-10 group/btn gap-4 sm:gap-0`
											}
										>
											<div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 text-center sm:text-left">
												<div className="self-center sm:self-auto">
													<div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${domainColors[domain.id as keyof typeof domainColors]} p-4 flex items-center justify-center shadow-none`}>
														{(() => {
															const Icon = domainIcons[domain.id as keyof typeof domainIcons];
															return <Icon className="w-8 h-8 text-white" />;
														})()}
													</div>
												</div>
												<div className="flex-1">
													<h3 className="text-xl sm:text-2xl font-bold text-high group-hover/btn:text-primary transition-colors leading-snug">{domain.name}</h3>
													<p className="text-sm sm:text-base text-muted-foreground mt-1 leading-relaxed">{domain.summary}</p>
												</div>
											</div>
											<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
												<a
													href={`/contact?service=${domain.id}`}
													onClick={(e) => e.stopPropagation()}
													className="w-full sm:w-auto px-4 py-3 text-base font-semibold text-white bg-transparent border border-primary hover:bg-primary/10 rounded-xl transition-all text-center flex items-center justify-center gap-2"
													style={{ boxShadow: 'none' }}
												>
													Request {domain.name} Service
													<span className="text-lg ml-1">&rarr;</span>
												</a>
												<button
													onClick={() => toggleDomain(domain.id)}
													className="w-full sm:w-auto p-2 hover:bg-white/5 rounded-lg transition-colors flex justify-center"
												>
													<motion.div
														animate={{ rotate: isExpanded ? 180 : 0 }}
														transition={{ duration: 0.3 }}
													>
														<ChevronDown className="w-6 h-6 text-muted-foreground" />
													</motion.div>
												</button>
											</div>
										</div>

										{/* Domain Content */}
										<motion.div
											initial={false}
											animate={{
												height: isExpanded ? 'auto' : 0,
												opacity: isExpanded ? 1 : 0,
											}}
											transition={{ duration: 0.4 }}
											className="overflow-hidden"
										>
											<div className="px-8 pb-8">
												<p className="text-muted-foreground mb-8">{domain.purpose}</p>

												{/* Purpose Statement */}
												<div className="mb-8 p-6 bg-gradient-to-br from-primary/10 to-transparent rounded-xl border border-primary/20">
													<h4 className="font-semibold mb-2">Purpose</h4>
													<p className="text-sm text-muted-foreground">{domain.purpose}</p>
												</div>

												{/* Sub-Services */}
												<div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
													{domain.subServices.map((subService, subIndex) => (
														<motion.div
															key={subService.id}
															initial={{ opacity: 0, y: 20 }}
															animate={{ opacity: 1, y: 0 }}
															transition={{ duration: 0.4, delay: subIndex * 0.1 }}
															whileHover={{ y: -5, scale: 1.02 }}
															className="bg-surface-2/50 border border-white/5 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 relative group/sub overflow-hidden"
														>
															{/* Hover glow effect */}
															<motion.div
																className={`absolute inset-0 bg-gradient-to-br ${domainGradients[domain.id as keyof typeof domainGradients]} opacity-0 group-hover/sub:opacity-100 transition-opacity duration-500 -z-10`}
															/>

															<h4 className="text-lg font-bold mb-3 group-hover/sub:text-primary transition-colors">{subService.title}</h4>
															<p className="text-sm text-muted-foreground mb-4">{subService.description}</p>

															{/* Deliverables */}
															<div className="mb-4">
																<h5 className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
																	Key Deliverables
																</h5>
																<ul className="space-y-2">
																	{subService.deliverables.slice(0, 4).map((item, i) => (
																		<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
																			<CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
																			<span>{item}</span>
																		</li>
																	))}
																</ul>
															</div>

															{/* Success Criteria */}
															<div>
																<h5 className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
																	Success Metrics
																</h5>
																<div className="space-y-1">
																	{subService.successCriteria.slice(0, 2).map((criteria, i) => (
																		<div key={i} className="text-xs text-muted-foreground">
																			• {criteria}
																		</div>
																	))}
																</div>
															</div>
														</motion.div>
													))}
												</div>
											</div>
										</motion.div>
									</div>
								</ShineBorder>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

