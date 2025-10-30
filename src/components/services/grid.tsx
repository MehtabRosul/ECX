'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { EffectCard } from '@/components/ui/effect-card';
import { 
	Shield, 
	Brain, 
	Link as LinkIcon, 
	Cloud, 
	Code2, 
	Network, 
	Rocket,
	ArrowRight,
	Check
} from 'lucide-react';
import { ShineBorder } from '@/components/ui/shine-border';
import Link from 'next/link';

interface Service {
	name: string;
	slug: string;
	icon: React.ElementType;
	description: string;
	features: string[];
	color: string;
}

const services: Service[] = [
	{
		name: "Cybersecurity",
		slug: "cybersecurity",
		icon: Shield,
		description: "Comprehensive vulnerability assessments, penetration testing, security architecture reviews, and SOC enablement.",
		features: ["VAPT & Penetration Testing", "Security Architecture", "SOC Enablement", "EDR Integration"],
		color: "from-blue-500/20 to-blue-600/10",
	},
	{
		name: "AI/ML Security",
		slug: "ai-ml",
		icon: Brain,
		description: "ML model security audits, adversarial robustness testing, privacy-preserving AI, and MLOps security.",
		features: ["Model Audits", "Adversarial Testing", "Privacy-Preserving AI", "MLOps Security"],
		color: "from-purple-500/20 to-purple-600/10",
	},
	{
		name: "Web3/Blockchain",
		slug: "web3",
		icon: LinkIcon,
		description: "Smart contract audits, protocol security analysis, DeFi security, and blockchain infrastructure assessments.",
		features: ["Smart Contract Audits", "Protocol Analysis", "DeFi Security", "Blockchain Infrastructure"],
		color: "from-amber-500/20 to-amber-600/10",
	},
	{
		name: "Product Engineering",
		slug: "product-engineering",
		icon: Rocket,
		description: "Secure software development lifecycle, cryptographic engineering, secure APIs, and product hardening.",
		features: ["Secure SDLC", "Cryptographic Engineering", "Secure APIs", "Product Hardening"],
		color: "from-green-500/20 to-green-600/10",
	},
	{
		name: "Threat Intelligence",
		slug: "threat-intel",
		icon: Network,
		description: "Threat modeling, attack surface analysis, red team exercises, and proactive threat hunting.",
		features: ["Threat Modeling", "Attack Surface Analysis", "Red Team Exercises", "Threat Hunting"],
		color: "from-red-500/20 to-red-600/10",
	},
	{
		name: "Cloud Security",
		slug: "cloud-security",
		icon: Cloud,
		description: "Cloud architecture reviews, cloud-native security, compliance automation, and secure cloud migrations.",
		features: ["Cloud Architecture", "Cloud-Native Security", "Compliance Automation", "Secure Migration"],
		color: "from-cyan-500/20 to-cyan-600/10",
	},
];

export function ServicesGrid() {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<section id="services-grid" className="py-20 sm:py-32 relative">
			<div className="container">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
						Our Services
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						End-to-end security solutions tailored to your enterprise needs
					</p>
				</motion.div>

				<div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{services.map((service, index) => {
						const Icon = service.icon;
						const isHovered = hoveredIndex === index;

						return (
							<motion.div
								key={service.slug}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-100px" }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								onHoverStart={() => setHoveredIndex(index)}
								onHoverEnd={() => setHoveredIndex(null)}
							>
								<ShineBorder
									className="h-full"
									color={isHovered ? ['#2B8DBE', '#4896BD', '#2B8DBE'] : undefined}
								>
									<Link href={`/services/${service.slug}`} className="block h-full">
										<EffectCard>
											<div className="p-8 h-full flex flex-col group">
												{/* Icon with animated background */}
												<div className="relative mb-6">
													<div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl blur-xl`} />
													<motion.div
														whileHover={{ scale: 1.1, rotate: 5 }}
														transition={{ type: 'spring', stiffness: 300 }}
														className="relative w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-colors"
													>
														<Icon className="w-8 h-8 text-primary" />
													</motion.div>
												</div>

												{/* Content */}
												<h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
													{service.name}
												</h3>
												<p className="text-muted-foreground mb-6 flex-grow">
													{service.description}
												</p>

												{/* Features list */}
												<div className="space-y-3 mb-6">
													{service.features.slice(0, 3).map((feature, i) => (
														<motion.div
															key={feature}
															initial={{ opacity: 0, x: -10 }}
															whileInView={{ opacity: 1, x: 0 }}
															viewport={{ once: true }}
															transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
															className="flex items-center gap-2 text-sm"
														>
															<div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
																<Check className="w-3 h-3 text-primary" />
															</div>
															<span className="text-muted-foreground">{feature}</span>
														</motion.div>
													))}
												</div>

												{/* CTA */}
												<motion.div
													whileHover={{ x: 4 }}
													className="inline-flex items-center gap-2 text-sm font-medium text-primary group/cta mt-auto"
												>
													<span>Learn more</span>
													<ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
												</motion.div>

												{/* Hover glow effect */}
												<div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-xl -z-10`} />
											</div>
										</EffectCard>
									</Link>
								</ShineBorder>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}


