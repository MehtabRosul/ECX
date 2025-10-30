'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
	Link as LinkIcon, 
	Sparkles, 
	ShieldCheck, 
	FileCheck, 
	Building2,
	ChevronRight,
	BadgeCheck,
	Rocket,
	TrendingUp
} from 'lucide-react';
import { ShineBorder } from '@/components/ui/shine-border';

interface Offering {
	id: string;
	title: string;
	icon: React.ElementType;
	gradient: string;
	description: string;
	highlights: string[];
	buttonText: string;
	href: string;
}

const offerings: Offering[] = [
	{
		id: 'web3-blockchain',
		title: 'Web3 & Blockchain',
		icon: LinkIcon,
		gradient: 'from-amber-500 via-orange-500 to-red-500',
		description: 'Smart contract development, DApps, tokenomics, and blockchain security audits',
		highlights: [
			'Smart contract development & auditing',
			'Decentralized Applications (DApps)',
			'Tokenomics design & implementation',
			'Blockchain security audits',
			'DeFi protocol security'
		],
		buttonText: 'Request Web3 & Blockchain Service',
		href: '/contact?service=web3-blockchain'
	},
	{
		id: 'innovative-products',
		title: 'Innovative Products',
		icon: Sparkles,
		gradient: 'from-purple-500 via-pink-500 to-rose-500',
		description: 'Production-ready security products including Defenza and Deepfake Detection',
		highlights: [
			'Defenza — Cross-platform digital threat companion',
			'Deepfake Detection API & browser integration',
			'Research-backed detection engines',
			'Real-time threat intelligence',
			'Privacy-preserving analytics'
		],
		buttonText: 'Request Product Demo',
		href: '/contact?service=products'
	},
	{
		id: 'caas-cybersecurity',
		title: 'Cybersecurity as a Service (CSaaS)',
		icon: ShieldCheck,
		gradient: 'from-blue-500 via-cyan-500 to-teal-500',
		description: 'Packaged, subscription-based security bundles for SMBs with managed protection',
		highlights: [
			'Managed vulnerability scanning',
			'Endpoint protection tiers',
			'24/7 security monitoring',
			'Awareness training included',
			'Flexible subscription models'
		],
		buttonText: 'Request CSaaS Service',
		href: '/contact?service=caas'
	},
	{
		id: 'compliance-advisory',
		title: 'Compliance & Data Protection Advisory',
		icon: FileCheck,
		gradient: 'from-green-500 via-emerald-500 to-teal-500',
		description: 'ISO/NIST/GDPR advisory, compliance mapping, and audit readiness services',
		highlights: [
			'ISO/NIST/GDPR compliance advisory',
			'Audit-ready artifact preparation',
			'Compliance gap analysis',
			'Evidence mapping documentation',
			'Regulatory change management'
		],
		buttonText: 'Request Compliance Advisory',
		href: '/contact?service=compliance'
	},
	{
		id: 'industry-solutions',
		title: 'Industry-Focused Solutions',
		icon: Building2,
		gradient: 'from-indigo-500 via-purple-500 to-pink-500',
		description: 'Verticalized solutions for Logistics, EdTech, Healthcare, eCommerce, and more',
		highlights: [
			'Logistics & Supply Chain Security',
			'EdTech Platform Protection',
			'Healthcare Compliance & Privacy',
			'eCommerce Fraud Prevention',
			'Manufacturing IoT Security'
		],
		buttonText: 'Request Industry Solution',
		href: '/contact?service=industry'
	}
];

export function AdditionalOfferings() {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<section className="py-20 sm:py-32 relative overflow-hidden">
			{/* Animated wavy grid background */}
			<div className="absolute inset-0 opacity-30">
				<svg className="absolute inset-0 w-full h-full">
					<defs>
						<pattern id="wavy-grid" width="60" height="60" patternUnits="userSpaceOnUse">
							<path
								d="M0 30 Q15 20 30 30 T60 30"
								fill="none"
								stroke="currentColor"
								strokeWidth="0.5"
								className="text-primary"
							/>
							<path
								d="M30 0 L30 60"
								fill="none"
								stroke="currentColor"
								strokeWidth="0.5"
								className="text-primary"
							/>
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#wavy-grid)">
						<animateTransform
							attributeName="transform"
							type="translate"
							values="0 0;10 10"
							dur="20s"
							repeatCount="indefinite"
						/>
					</rect>
				</svg>
			</div>
			{/* Floating gradient blobs */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
				<div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
			</div>

			<div className="container relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-2 mb-4">
						<Rocket className="w-5 h-5 text-primary" />
						<span className="text-sm font-semibold text-primary uppercase tracking-wide">Additional Offerings</span>
					</div>
					<h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
						Specialized Solutions & Products
					</h2>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
						Comprehensive offerings beyond our core domains — from Web3 innovation to managed security services and industry-specific solutions
					</p>
				</motion.div>

				{/* Consistent Grid Layout - All 5 cards same design */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
					{offerings.map((offering, index) => (
						<motion.div
							key={offering.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
							className="lg:col-span-1"
						>
							<ShineBorder className="h-full">
								<div className="relative bg-surface-1 border border-white/5 rounded-2xl p-6 h-full overflow-hidden group cursor-pointer">
									{/* Gradient Background based on offering */}
									<motion.div
										className={`absolute inset-0 bg-gradient-to-br ${offering.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
										animate={{ opacity: hoveredIndex === index ? 0.1 : 0 }}
									/>

									<div className="relative z-10 h-full flex flex-col">
										{/* Icon and Title */}
										<div className="flex items-start gap-3 mb-4">
											<motion.div
												whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
												transition={{ duration: 0.5 }}
											>
												<div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${offering.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
													{(() => {
														const Icon = offering.icon;
														return <Icon className="w-6 h-6 text-white" />;
													})()}
												</div>
											</motion.div>
										</div>

										<h3 className="text-lg font-bold mb-3 text-high group-hover:text-primary transition-colors">
											{offering.title}
										</h3>

										<p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-grow">
											{offering.description}
										</p>

										{/* Highlights List */}
										<div className="space-y-2.5 mb-6">
											{offering.highlights.slice(0, 4).map((item, i) => (
												<div key={i} className="flex items-start gap-2">
													<div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-br ${offering.gradient}`} />
													<span className="text-xs text-muted-foreground leading-relaxed">{item}</span>
												</div>
											))}
										</div>

										{/* Call to Action - Matching style from domain sections */}
										<motion.a
											href={offering.href}
											onClick={(e) => e.stopPropagation()}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-high bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 rounded-lg transition-all relative group/btn-req mt-auto shadow-sm hover:shadow-md"
										>
											<span>{offering.buttonText}</span>
											<motion.div
												animate={{ x: [0, 4, 0] }}
												transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
											>
												<ChevronRight className="w-4 h-4 rotate-[-90deg]" />
											</motion.div>
											{/* Hover glow */}
											<div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover/btn-req:opacity-100 transition-opacity -z-10" />
										</motion.a>
									</div>

									{/* Decorative background element */}
									<div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br ${offering.gradient} opacity-0 group-hover:opacity-5 rounded-full blur-3xl transition-opacity duration-500`} />
								</div>
							</ShineBorder>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

