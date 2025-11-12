'use client';

import React, { useState, useEffect, useRef, useMemo, useDeferredValue, startTransition } from 'react';
import ChromaGrid, { ChromaItem } from '@/components/team/chroma-grid';
import { useInView } from 'framer-motion';
import { TeamConstellationBackground } from '@/components/team/constellation-background';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { 
	Users, 
	Briefcase, 
	GraduationCap, 
	TrendingUp, 
	Sparkles, 
	ArrowDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sectionIcons = {
	executive: Briefcase,
	tech: TrendingUp,
	interns: GraduationCap,
	marketing: TrendingUp
};

const sectionColors = {
	executive: 'from-blue-500 via-cyan-500 to-blue-600',
	tech: 'from-purple-500 via-pink-500 to-purple-600',
	interns: 'from-emerald-500 via-teal-500 to-emerald-600',
	marketing: 'from-orange-500 via-amber-500 to-orange-600'
};

// Memoized sticky nav - only shows after scrolling past hero section
const StickyNav = React.memo(({ sections, activeSection }: { sections: Array<{ id: string; label: string; icon: any }>; activeSection: string }) => {
	const [isVisible, setIsVisible] = useState(false);
	const navRef = useRef<HTMLElement>(null);

	// Use IntersectionObserver to detect when hero section is scrolled past
	useEffect(() => {
		const heroSentinel = document.getElementById('team-hero-sentinel');
		if (!heroSentinel) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				// Nav should be visible when hero is NOT intersecting (scrolled past)
				setIsVisible(!entry.isIntersecting);
			},
			{ 
				threshold: 0,
				rootMargin: '-20% 0px 0px 0px' // Trigger when hero is 20% scrolled out
			}
		);

		observer.observe(heroSentinel);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<nav
			ref={navRef}
			className={cn(
				"fixed top-20 left-1/2 -translate-x-1/2 z-50 hidden lg:block transition-opacity duration-300",
				isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
			)}
			style={{ transform: 'translateZ(0)', willChange: 'opacity' }}
		>
			<div className="flex items-center gap-2 px-4 py-3 rounded-full border border-white/10 bg-black/90 shadow-2xl">
				{sections.map((section) => {
					const Icon = section.icon;
					const isActive = activeSection === section.id;
					return (
						<a
							key={section.id}
							href={`#${section.id}`}
							className={cn(
								'relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
								isActive
									? 'text-white'
									: 'text-muted-foreground hover:text-white'
							)}
						>
							{isActive && (
								<div
									className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30"
								/>
							)}
							<Icon className={cn('w-4 h-4 transition-transform duration-200', isActive && 'scale-110')} />
							<span className="relative z-10">{section.label}</span>
						</a>
					);
				})}
			</div>
		</nav>
	);
});
StickyNav.displayName = 'StickyNav';

// Memoized hero section - optimized with CSS animations and advanced performance
const HeroSection = React.memo(() => {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: '-100px' });

	return (
		<header
			ref={ref}
			className="relative overflow-hidden z-10 min-h-[85vh] flex items-center"
			style={{
				contain: 'layout style paint',
				willChange: 'contents',
				transform: 'translateZ(0)',
				backfaceVisibility: 'hidden'
			}}
		>
			{/* Enhanced gradient orbs - using CSS animations for performance */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div
					className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/12 to-cyan-500/12 blur-3xl"
					style={{
						animation: isInView ? 'float-orb 20s ease-in-out infinite' : 'none',
						willChange: 'transform',
						transform: 'translateZ(0)'
					}}
				/>
				<div
					className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/12 to-pink-500/12 blur-3xl"
					style={{
						animation: isInView ? 'float-orb-reverse 24s ease-in-out infinite 1s' : 'none',
						willChange: 'transform',
						transform: 'translateZ(0)'
					}}
				/>
			</div>

			<div className="container relative z-10 py-20">
				<div
					className={cn(
						"max-w-4xl transition-opacity duration-700",
						isInView ? "opacity-100" : "opacity-0"
					)}
					style={{ transform: 'translateZ(0)' }}
				>
					<div
						className={cn(
							"inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6 transition-opacity duration-500",
							isInView ? "opacity-100" : "opacity-0"
						)}
						style={{ transitionDelay: '200ms' }}
					>
						<Sparkles className="w-4 h-4 text-primary" />
						<span className="text-sm font-medium">The Collective Intelligence</span>
					</div>

					<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
						<span className="block">The Team</span>
						<span className="block">
							<AnimatedGradientText
								fromColor="#3b82f6"
								toColor="#8b5cf6"
								className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
							>
								Behind EncryptArx
							</AnimatedGradientText>
						</span>
					</h1>

					<p
						className={cn(
							"text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed transition-opacity duration-600",
							isInView ? "opacity-100" : "opacity-0"
						)}
						style={{ transitionDelay: '400ms' }}
					>
						Clusters over titles. We assemble small, accountable units across{' '}
						<span className="text-white font-medium">cryptography</span>,{' '}
						<span className="text-white font-medium">ML</span>,{' '}
						<span className="text-white font-medium">systems</span> and{' '}
						<span className="text-white font-medium">product</span> to ship measurable outcomes.
					</p>

					<div
						className={cn(
							"flex flex-wrap gap-6 mb-10 transition-opacity duration-600",
							isInView ? "opacity-100" : "opacity-0"
						)}
						style={{ transitionDelay: '600ms' }}
					>
						{[
							{ label: 'Team Members', value: '18+' },
							{ label: 'Clusters', value: '4' },
							{ label: 'Countries', value: '12+' }
						].map((stat, i) => (
							<div key={i} className="flex flex-col">
								<div className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
									{stat.value}
								</div>
								<div className="text-sm text-muted-foreground">{stat.label}</div>
							</div>
						))}
					</div>

					<div
						className={cn(
							"flex items-center gap-2 text-sm text-muted-foreground transition-opacity duration-600",
							isInView ? "opacity-100" : "opacity-0"
						)}
						style={{ transitionDelay: '800ms' }}
					>
						<span>Explore the team</span>
						<div className="animate-bounce">
							<ArrowDown className="w-4 h-4" />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
});
HeroSection.displayName = 'HeroSection';

// Memoized section component - optimized with CSS transitions and advanced performance
const Section = React.memo(({
	id,
	title,
	subtitle,
	items,
	icon: Icon,
	colorClass
}: {
	id: string;
	title: string;
	subtitle?: string;
	items: ChromaItem[];
	icon: any;
	colorClass: string;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: '-100px' });

	return (
		<section
			id={id}
			className="relative py-20 sm:py-28 overflow-hidden"
			style={{
				contain: 'layout style paint',
				contentVisibility: 'auto',
				containIntrinsicSize: 'auto 600px',
				willChange: 'scroll-position',
				transform: 'translateZ(0)',
				position: 'relative',
				zIndex: 10
			}}
		>
			<div className="container relative z-10">
				<div
					ref={ref}
					className={cn(
						"mb-12 sm:mb-16 transition-opacity duration-700",
						isInView ? "opacity-100" : "opacity-0"
					)}
					style={{ transform: 'translateZ(0)' }}
				>
					<div className="flex items-start gap-4 mb-6">
						<div
							className={cn(
								'p-4 rounded-2xl bg-gradient-to-br border border-white/10',
								colorClass,
								'bg-opacity-10 transition-all duration-500',
								isInView ? 'scale-100 rotate-0' : 'scale-0 rotate-[-180deg]'
							)}
							style={{ transitionDelay: '200ms' }}
						>
							<Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
						</div>
						<div className="flex-1">
							<div className="flex items-center gap-3 mb-2">
								<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
									{title}
								</h2>
								<div
									className={cn(
										"h-px flex-1 bg-gradient-to-r from-white/20 to-transparent transition-all duration-600",
										isInView ? "w-full" : "w-0"
									)}
									style={{ transitionDelay: '400ms' }}
								/>
							</div>
							{subtitle && (
								<p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
									{subtitle}
								</p>
							)}
						</div>
					</div>

					<div
						className={cn(
							"inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium transition-opacity duration-500",
							isInView ? "opacity-100" : "opacity-0"
						)}
						style={{ transitionDelay: '300ms' }}
					>
						<Users className="w-3 h-3" />
						<span>{items.length} {items.length === 1 ? 'member' : 'members'}</span>
					</div>
				</div>

				<div
					className="relative"
					style={{ position: 'relative', zIndex: 50, minHeight: '500px' }}
				>
					<ChromaGrid items={items} />
				</div>
			</div>
		</section>
	);
});
Section.displayName = 'Section';

export default function TeamPage() {
	const [activeSection, setActiveSection] = useState('executive');
	const deferredActiveSection = useDeferredValue(activeSection);
	const sectionsRef = useRef([
		{ id: 'executive', label: 'Executive', icon: sectionIcons.executive },
		{ id: 'tech', label: 'Tech', icon: sectionIcons.tech },
		{ id: 'marketing', label: 'Marketing & Sales', icon: sectionIcons.marketing },
		{ id: 'interns', label: 'Interns', icon: sectionIcons.interns }
	]);

	// Advanced scroll spy with optimized intersection observer and passive listeners
	useEffect(() => {
		const sections = sectionsRef.current;
		const sectionElements = sections.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
		
		if (sectionElements.length === 0) return;

		let rafId: number | null = null;
		let lastActiveId = sections[0].id;
		let ticking = false;

		// Use IntersectionObserver with optimized options
		const observerOptions: IntersectionObserverInit = {
			root: null,
			rootMargin: '-20% 0px -50% 0px',
			threshold: [0, 0.1, 0.5]
		};

		const updateActiveSection = () => {
			// Find the most visible section using getBoundingClientRect (cached)
			let maxRatio = 0;
			let activeId = lastActiveId;
			const viewportMiddle = window.innerHeight * 0.3;

			sectionElements.forEach((el) => {
				const rect = el.getBoundingClientRect();
				const elementMiddle = rect.top + rect.height / 2;
				const distance = Math.abs(elementMiddle - viewportMiddle);
				const visibility = Math.max(0, 1 - distance / (window.innerHeight * 0.6));
				
				if (visibility > maxRatio && rect.top < viewportMiddle + 200) {
					maxRatio = visibility;
					activeId = el.id;
				}
			});

			if (maxRatio > 0.1 && activeId !== lastActiveId) {
				lastActiveId = activeId;
				startTransition(() => {
					setActiveSection(activeId);
				});
			}
			ticking = false;
		};

		// Throttled scroll handler using RAF
		const handleScroll = () => {
			if (!ticking) {
				ticking = true;
				rafId = requestAnimationFrame(updateActiveSection);
			}
		};

		// Use IntersectionObserver as primary method
		const observer = new IntersectionObserver((entries) => {
			if (rafId) return;
			rafId = requestAnimationFrame(updateActiveSection);
		}, observerOptions);

		sectionElements.forEach(el => observer.observe(el));
		
		// Add passive scroll listener as fallback
		window.addEventListener('scroll', handleScroll, { passive: true, capture: false });
		
		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			observer.disconnect();
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	// Memoize team data to prevent recreation on every render
	const executive = useMemo<ChromaItem[]>(() => [
		{
			image: 'https://i.pravatar.cc/512?img=67',
			title: 'Elena Vargas',
			subtitle: 'Chief Executive Officer',
			handle: '@elena',
			borderColor: '#3B82F6',
			gradient: 'linear-gradient(145deg,#1f2937,#3B82F6)',
			pillar: 'Leadership Council',
			location: 'Lisbon, PT',
			description: 'Strategic visionary leading EncryptArx with 15+ years in cybersecurity and enterprise solutions.',
			url: 'https://elenavargas.dev',
			social: {
				linkedin: 'https://linkedin.com/in/elena-vargas',
				twitter: 'https://twitter.com/elena',
				email: 'elena.vargas@encryptarx.com'
			}
		},
		{
			image: 'https://i.pravatar.cc/512?img=32',
			title: 'Ravi Narayan',
			subtitle: 'Chief Technology Officer',
			handle: '@ravi',
			borderColor: '#10B981',
			gradient: 'linear-gradient(160deg,#0b1222,#10B981)',
			pillar: 'Strategy Forge',
			location: 'Bengaluru, IN',
			description: 'Architecting next-gen cryptographic systems with expertise in distributed systems and quantum computing.',
			social: {
				linkedin: 'https://linkedin.com/in/ravi-narayan',
				github: 'https://github.com/ravi',
				facebook: 'https://facebook.com/ravi',
				email: 'ravi.narayan@encryptarx.com'
			}
		},
		{
			image: 'https://i.pravatar.cc/512?img=14',
			title: 'Maya Petrov',
			subtitle: 'Chief Product Officer',
			handle: '@maya',
			borderColor: '#8B5CF6',
			gradient: 'linear-gradient(200deg,#0b1222,#8B5CF6)',
			pillar: 'Product Constellation',
			location: 'Tallinn, EE',
			description: 'Transforming complex security concepts into intuitive products that users love and trust.',
			url: 'https://mayapetrov.com',
			social: {
				linkedin: 'https://linkedin.com/in/maya-petrov',
				instagram: 'https://instagram.com/maya',
				twitter: 'https://twitter.com/maya',
				email: 'maya.petrov@encryptarx.com'
			}
		},
		{
			image: 'https://i.pravatar.cc/512?img=4',
			title: 'Jonah Price',
			subtitle: 'Chief Security Officer',
			handle: '@jonah',
			borderColor: '#06B6D4',
			gradient: 'linear-gradient(195deg,#0b1222,#06B6D4)',
			pillar: 'Zero Trust Guild',
			location: 'Austin, US',
			description: 'Building impenetrable security architectures with zero-trust principles and advanced threat detection.',
			social: {
				github: 'https://github.com/jonah',
				twitter: 'https://twitter.com/jonah',
				email: 'jonah.price@encryptarx.com'
			}
		},
		{
			image: 'https://i.pravatar.cc/512?img=18',
			title: 'Sofia Martins',
			subtitle: 'Head of Research',
			handle: '@sofia',
			borderColor: '#F59E0B',
			gradient: 'linear-gradient(220deg,#0b1222,#F59E0B)',
			pillar: 'Research Atlas',
			location: 'Porto, PT',
			description: 'Pioneering cryptographic research and pushing boundaries in post-quantum security solutions.',
			social: {
				linkedin: 'https://linkedin.com/in/sofia-martins',
				github: 'https://github.com/sofia',
				facebook: 'https://facebook.com/sofia',
				instagram: 'https://instagram.com/sofia',
				email: 'sofia.martins@encryptarx.com'
			}
		}
	], []);

	const tech = useMemo<ChromaItem[]>(() => [
		{
			image: 'https://i.pravatar.cc/512?img=26',
			title: 'Nina Park',
			subtitle: 'Lead Cryptographer',
			handle: '@ninap',
			borderColor: '#4F46E5',
			gradient: 'linear-gradient(145deg,#0b1222,#4F46E5)',
			pillar: 'Quantum Cell',
			location: 'Seoul, KR',
			description: 'Expert in quantum-resistant cryptography and advanced encryption protocols for next-generation security.',
			url: 'https://ninapark.dev',
			social: {
				linkedin: 'https://linkedin.com/in/nina-park',
				github: 'https://github.com/ninap',
				twitter: 'https://twitter.com/ninap',
				email: 'nina.park@encryptarx.com'
			}
		},
		{
			image: 'https://i.pravatar.cc/512?img=55',
			title: 'Omar Hussein',
			subtitle: 'Platform Engineer',
			handle: '@omar',
			borderColor: '#10B981',
			gradient: 'linear-gradient(180deg,#0b1222,#10B981)',
			pillar: 'Core Systems',
			location: 'Dubai, AE',
			description: 'Building scalable infrastructure and distributed systems that power our global security platform.',
			social: {
				github: 'https://github.com/omar',
				facebook: 'https://facebook.com/omar',
				email: 'omar.hussein@encryptarx.com'
			}
		},
		{
			image: 'https://i.pravatar.cc/512?img=31',
			title: 'Anya Roth',
			subtitle: 'ML Security',
			handle: '@anyar',
			borderColor: '#06B6D4',
			gradient: 'linear-gradient(165deg,#0b1222,#06B6D4)',
			pillar: 'Red Team Lab',
			location: 'Zurich, CH',
			description: 'Securing AI systems and developing machine learning defenses against adversarial attacks.',
			url: 'https://anyaroth.io',
			social: {
				linkedin: 'https://linkedin.com/in/anya-roth',
				instagram: 'https://instagram.com/anyar',
				email: 'anya.roth@encryptarx.com'
			}
		},
		{
			image: 'https://i.pravatar.cc/512?img=9',
			title: 'Lucas Weber',
			subtitle: 'Cloud Architect',
			handle: '@lucas',
			borderColor: '#22c55e',
			gradient: 'linear-gradient(195deg,#0b1222,#22c55e)',
			pillar: 'Edge Mesh',
			location: 'Berlin, DE',
			description: 'Designing resilient cloud architectures with edge computing for ultra-low latency security operations.',
			url: 'https://lucasweber.dev',
			social: {
				linkedin: 'https://linkedin.com/in/lucas-weber',
				twitter: 'https://twitter.com/lucas',
				github: 'https://github.com/lucas',
				facebook: 'https://facebook.com/lucas',
				email: 'lucas.weber@encryptarx.com'
			}
		},
		{
			image: 'https://i.pravatar.cc/512?img=29',
			title: 'Jia Li',
			subtitle: 'Zero-Trust Systems',
			handle: '@jiali',
			borderColor: '#8B5CF6',
			gradient: 'linear-gradient(225deg,#0b1222,#8B5CF6)',
			pillar: 'Identity Nexus',
			location: 'Singapore, SG',
			description: 'Implementing zero-trust architectures and identity management systems for enterprise security.',
			social: {
				github: 'https://github.com/jiali',
				twitter: 'https://twitter.com/jiali',
				email: 'jia.li@encryptarx.com'
			}
		},
		{
			image: 'https://i.pravatar.cc/512?img=33',
			title: 'Diego Ruiz',
			subtitle: 'DevSecOps',
			handle: '@diego',
			borderColor: '#ef4444',
			gradient: 'linear-gradient(135deg,#0b1222,#ef4444)',
			pillar: 'Automation Guild',
			location: 'Quito, EC',
			description: 'Automating security pipelines and integrating security into every stage of the development lifecycle.',
			social: {
				linkedin: 'https://linkedin.com/in/diego-ruiz',
				github: 'https://github.com/diego',
				instagram: 'https://instagram.com/diego',
				twitter: 'https://twitter.com/diego',
				email: 'diego.ruiz@encryptarx.com'
			}
		}
	], []);

	const marketing = useMemo<ChromaItem[]>(() => [
		{
			image: 'https://i.pravatar.cc/512?img=47',
			title: 'Priya Mehta',
			subtitle: 'Growth Marketing',
			handle: '@priya',
			borderColor: '#f472b6',
			gradient: 'linear-gradient(160deg,#0b1222,#f472b6)',
			pillar: 'Growth Studio',
			location: 'Toronto, CA',
			description: 'Driving user acquisition and growth through data-driven marketing strategies and innovative campaigns.',
			social: {
				instagram: 'https://instagram.com/priya',
				facebook: 'https://facebook.com/priya',
				email: 'priya.mehta@encryptarx.com'
			}
		},
		{
			image: 'https://i.pravatar.cc/512?img=52',
			title: 'Tom Becker',
			subtitle: 'Sales Engineering',
			handle: '@tom',
			borderColor: '#60a5fa',
			gradient: 'linear-gradient(220deg,#0b1222,#60a5fa)',
			pillar: 'Enterprise Desk',
			location: 'Munich, DE',
			description: 'Bridging technical excellence with business needs to deliver tailored security solutions for enterprises.',
			social: {
				linkedin: 'https://linkedin.com/in/tom-becker',
				twitter: 'https://twitter.com/tom',
				github: 'https://github.com/tom',
				email: 'tom.becker@encryptarx.com'
			}
		},
		{
			image: 'https://i.pravatar.cc/512?img=27',
			title: 'Amelia Wu',
			subtitle: 'Brand & Content',
			handle: '@amelia',
			borderColor: '#22d3ee',
			gradient: 'linear-gradient(145deg,#0b1222,#22d3ee)',
			pillar: 'Narrative Lab',
			location: 'Taipei, TW',
			description: 'Crafting compelling narratives and brand experiences that communicate our security vision to the world.',
			url: 'https://ameliawu.design',
			social: {
				linkedin: 'https://linkedin.com/in/amelia-wu',
				instagram: 'https://instagram.com/amelia',
				twitter: 'https://twitter.com/amelia',
				facebook: 'https://facebook.com/amelia',
				email: 'amelia.wu@encryptarx.com'
			}
		},
		{
			image: 'https://i.pravatar.cc/512?img=39',
			title: 'Hugo Klein',
			subtitle: 'Enterprise Sales',
			handle: '@hugo',
			borderColor: '#fb923c',
			gradient: 'linear-gradient(200deg,#0b1222,#fb923c)',
			pillar: 'Field Ops',
			location: 'Amsterdam, NL',
			description: 'Building strategic partnerships and driving enterprise adoption of our security platform across Europe.',
			social: {
				linkedin: 'https://linkedin.com/in/hugo-klein',
				email: 'hugo.klein@encryptarx.com'
			}
		}
	], []);

	const interns = useMemo<ChromaItem[]>(() => [
		{
			image: 'https://i.pravatar.cc/512?img=21',
			title: 'Zoe Tran',
			subtitle: 'Research Intern',
			handle: '@zoe',
			borderColor: '#a78bfa',
			gradient: 'linear-gradient(160deg,#0b1222,#a78bfa)',
			pillar: 'Insights Pod',
			location: 'Hanoi, VN',
			description: 'Exploring cutting-edge cryptographic research and contributing to our next-generation security innovations.',
			social: {
				github: 'https://github.com/zoe',
				instagram: 'https://instagram.com/zoe',
				email: 'zoe.tran@encryptarx.com'
			}
		},
		{
			image: 'https://i.pravatar.cc/512?img=7',
			title: 'Mateo Diaz',
			subtitle: 'Frontend Intern',
			handle: '@mateo',
			borderColor: '#34d399',
			gradient: 'linear-gradient(225deg,#0b1222,#34d399)',
			pillar: 'Experience Pod',
			location: 'Bogotá, CO',
			description: 'Building beautiful and intuitive user interfaces that make complex security tools accessible to everyone.',
			url: 'https://mateodiaz.dev',
			social: {
				linkedin: 'https://linkedin.com/in/mateo-diaz',
				github: 'https://github.com/mateo',
				twitter: 'https://twitter.com/mateo',
				facebook: 'https://facebook.com/mateo',
				email: 'mateo.diaz@encryptarx.com'
			}
		},
		{
			image: 'https://i.pravatar.cc/512?img=44',
			title: 'Hana Sato',
			subtitle: 'Data Intern',
			handle: '@hana',
			borderColor: '#38bdf8',
			gradient: 'linear-gradient(135deg,#0b1222,#38bdf8)',
			pillar: 'Data Pod',
			location: 'Kyoto, JP',
			description: 'Analyzing security patterns and helping build data-driven insights for threat detection and prevention.',
			social: {
				linkedin: 'https://linkedin.com/in/hana-sato',
				twitter: 'https://twitter.com/hana',
				email: 'hana.sato@encryptarx.com'
			}
		}
	], []);

	return (
		<div 
			className="bg-surface-1 relative overflow-hidden min-h-screen"
			style={{ 
				contain: 'layout style paint',
				willChange: 'scroll-position',
				transform: 'translateZ(0)'
			}}
		>
			<div id="team-hero-sentinel" className="absolute top-[85vh] left-0 w-full h-1 z-0" />
			<TeamConstellationBackground className="pointer-events-none z-0" />
			<StickyNav sections={sectionsRef.current} activeSection={deferredActiveSection} />
			<HeroSection />
			<Section
				id="executive"
				title="Executive Leadership"
				subtitle="Strategic visionaries driving EncryptArx forward"
				items={executive}
				icon={sectionIcons.executive}
				colorClass={sectionColors.executive}
			/>
			<Section
				id="tech"
				title="Technical Excellence"
				subtitle="Building the future of cryptographic security"
				items={tech}
				icon={sectionIcons.tech}
				colorClass={sectionColors.tech}
			/>
			<Section
				id="marketing"
				title="Marketing & Sales"
				subtitle="Connecting our technology with the world"
				items={marketing}
				icon={sectionIcons.marketing}
				colorClass={sectionColors.marketing}
			/>
			<Section
				id="interns"
				title="Emerging Talent"
				subtitle="The next generation of security innovators"
				items={interns}
				icon={sectionIcons.interns}
				colorClass={sectionColors.interns}
			/>
		</div>
	);
}
