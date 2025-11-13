'use client';

import React, { memo, useCallback, useRef, useEffect, useMemo } from 'react';
import { Facebook, Instagram, Twitter, Github, Mail, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChromaItem {
	image: string;
	title: string;
	subtitle: string;
	handle?: string;
	location?: string;
	borderColor?: string;
	gradient?: string;
	url?: string;
	pillar?: string;
	description?: string;
	social?: {
		facebook?: string;
		instagram?: string;
		twitter?: string;
		linkedin?: string;
		github?: string;
		email?: string;
	};
}

export interface ChromaGridProps {
	items?: ChromaItem[];
	className?: string;
}

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.02,
			delayChildren: 0.01
		}
	}
};

const cardVariants = {
	hidden: { opacity: 1, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
	}
};

const fallbackItems: ChromaItem[] = [
	{
		image: 'https://i.pravatar.cc/512?img=8',
		title: 'Alex Rivera',
		subtitle: 'Full Stack Developer',
		handle: '@alexrivera',
		borderColor: '#4F46E5',
		gradient: 'linear-gradient(135deg, rgba(79,70,229,0.35), rgba(15,23,42,0.9))',
		pillar: 'Systems'
	},
	{
		image: 'https://i.pravatar.cc/512?img=11',
		title: 'Jordan Chen',
		subtitle: 'DevOps Engineer',
		handle: '@jordanchen',
		borderColor: '#10B981',
		gradient: 'linear-gradient(130deg, rgba(16,185,129,0.35), rgba(15,23,42,0.9))',
		pillar: 'Infrastructure'
	},
	{
		image: 'https://i.pravatar.cc/512?img=3',
		title: 'Morgan Blake',
		subtitle: 'UI/UX Designer',
		handle: '@morganblake',
		borderColor: '#F59E0B',
		gradient: 'linear-gradient(140deg, rgba(245,158,11,0.35), rgba(15,23,42,0.9))',
		pillar: 'Experience'
	},
	{
		image: 'https://i.pravatar.cc/512?img=16',
		title: 'Casey Park',
		subtitle: 'Data Scientist',
		handle: '@caseypark',
		borderColor: '#EF4444',
		gradient: 'linear-gradient(140deg, rgba(239,68,68,0.35), rgba(15,23,42,0.9))',
		pillar: 'Research'
	},
	{
		image: 'https://i.pravatar.cc/512?img=25',
		title: 'Sam Kim',
		subtitle: 'Mobile Developer',
		handle: '@thesamkim',
		borderColor: '#8B5CF6',
		gradient: 'linear-gradient(135deg, rgba(139,92,246,0.35), rgba(15,23,42,0.9))',
		pillar: 'Product'
	},
	{
		image: 'https://i.pravatar.cc/512?img=60',
		title: 'Tyler Rodriguez',
		subtitle: 'Cloud Architect',
		handle: '@tylerrod',
		borderColor: '#06B6D4',
		gradient: 'linear-gradient(138deg, rgba(6,182,212,0.35), rgba(15,23,42,0.9))',
		pillar: 'Cloud'
	}
];

const surfaceVariants = [
	'linear-gradient(120deg, rgba(59,130,246,0.12), transparent)',
	'linear-gradient(110deg, rgba(236,72,153,0.12), transparent)',
	'linear-gradient(100deg, rgba(14,165,233,0.12), transparent)',
	'linear-gradient(130deg, rgba(34,197,94,0.12), transparent)'
];

const gridClassName =
	'grid w-full gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr place-items-stretch';

const CardOverlay = memo(({ accent }: { accent: string }) => {
	return (
		<>
			{/* Subtle top glow */}
			<div
				className="absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 pointer-events-none"
				style={{
					background: `radial-gradient(circle at 50% 0%, ${accent}25, transparent 50%)`,
					transition: 'opacity 0.15s ease-out'
				}}
			/>
			{/* Accent gradient overlay */}
			<div
				className="absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 pointer-events-none"
				style={{
					background: `linear-gradient(135deg, ${accent}15, transparent 60%)`,
					transition: 'opacity 0.15s ease-out'
				}}
			/>
		</>
	);
});
CardOverlay.displayName = 'CardOverlay';

const Card = memo<{ item: ChromaItem; index: number }>(({ item, index }) => {
	const accent = item.borderColor ?? '#3B82F6';
	const cardRef = useRef<HTMLElement>(null);
	const rafId = useRef<number | null>(null);
	const rectRef = useRef<DOMRect | null>(null);
	const lastUpdateTime = useRef<number>(0);
	const isHovering = useRef<boolean>(false);

	const handleSocialClick = useCallback((url: string, e: React.MouseEvent) => {
		e.stopPropagation();
		window.open(url, '_blank', 'noopener,noreferrer');
	}, []);

	const handlePortfolioClick = useCallback((e: React.MouseEvent) => {
		if (item.url) {
			e.stopPropagation();
			window.open(item.url, '_blank', 'noopener,noreferrer');
		}
	}, [item.url]);

	// Optimized mouse tracking with throttling and cached rect
	const updateMousePosition = useCallback((clientX: number, clientY: number) => {
		if (!cardRef.current || !isHovering.current) return;
		
		const now = performance.now();
		// Throttle to max 60fps (16.67ms between updates)
		if (now - lastUpdateTime.current < 16.67) return;
		lastUpdateTime.current = now;

		// Cache rect and only recalculate when null (first time or after leave)
		if (!rectRef.current) {
			rectRef.current = cardRef.current.getBoundingClientRect();
		}

		const rect = rectRef.current;
		const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
		const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
		
		// Direct style update for better performance
		cardRef.current.style.setProperty('--mouse-x', `${x}%`);
		cardRef.current.style.setProperty('--mouse-y', `${y}%`);
	}, []);

	// Optimized hover handler with RAF batching
	const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
		if (!cardRef.current || !isHovering.current) return;
		
		// Cancel previous frame if pending
		if (rafId.current) {
			cancelAnimationFrame(rafId.current);
		}

		// Batch updates in RAF for smooth 60fps
		rafId.current = requestAnimationFrame(() => {
			updateMousePosition(e.clientX, e.clientY);
		});
	}, [updateMousePosition]);

	const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
		isHovering.current = true;
		if (cardRef.current) {
			// Reset rect cache on enter
			rectRef.current = null;
			cardRef.current.style.boxShadow = `0 30px 80px -20px ${accent}90, 0 0 40px ${accent}40`;
			updateMousePosition(e.clientX, e.clientY);
		}
	}, [accent, updateMousePosition]);

	const handleMouseLeave = useCallback(() => {
		isHovering.current = false;
		rectRef.current = null;
		if (rafId.current) {
			cancelAnimationFrame(rafId.current);
			rafId.current = null;
		}
		if (cardRef.current) {
			cardRef.current.style.boxShadow = `0 20px 50px -30px ${accent}60`;
		}
	}, [accent]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (rafId.current) {
				cancelAnimationFrame(rafId.current);
			}
		};
	}, []);

	return (
		<article
			ref={cardRef}
			className={cn(
				'group relative isolate flex flex-col rounded-[20px] bg-slate-800/90 backdrop-blur-sm',
				'overflow-hidden h-full w-full',
				'hover:-translate-y-2 hover:scale-[1.02]'
			)}
			style={{
				boxShadow: `0 20px 50px -30px ${accent}60`,
				contain: 'layout style paint',
				transform: 'translateZ(0)',
				transition: 'transform 0.12s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.12s cubic-bezier(0.4, 0, 0.2, 1)',
				willChange: 'transform, box-shadow',
				zIndex: 50,
				position: 'relative',
				opacity: 1,
				display: 'flex',
				visibility: 'visible',
				backgroundColor: '#1e293b',
				backfaceVisibility: 'hidden',
				WebkitBackfaceVisibility: 'hidden',
				perspective: '1000px'
			}}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<CardOverlay accent={accent} />

			{/* Animated gradient glow on hover - optimized */}
			<div
				className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 pointer-events-none"
				style={{
					background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accent}30, transparent 70%)`,
					transition: 'opacity 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
					willChange: 'opacity, background-position',
					transform: 'translateZ(0)',
					contain: 'layout style paint'
				}}
			/>

			{/* Shimmer effect - optimized */}
			<div
				className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden"
				style={{
					background: `linear-gradient(110deg, transparent 30%, ${accent}20 50%, transparent 70%)`,
					backgroundSize: '200% 100%',
					animation: 'card-shimmer 2s infinite',
					transition: 'opacity 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
					willChange: 'opacity, background-position',
					transform: 'translateZ(0)'
				}}
			/>

			<div className="relative z-10 flex flex-1 flex-col p-4 sm:p-5 gap-3">
				<header className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.25em] text-slate-400">
					<span className="flex items-center gap-1.5">
						<span
							className="inline-block h-1.5 w-1.5 rounded-full transition-all duration-100 ease-out group-hover:scale-125 group-hover:shadow-[0_0_8px_currentColor]"
							style={{ background: accent, willChange: 'transform' }}
						/>
						<span className="transition-all duration-100 ease-out group-hover:text-slate-300">{item.pillar ?? 'Cohort'}</span>
					</span>
					<span className="transition-all duration-100 ease-out group-hover:text-white group-hover:font-semibold">{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
				</header>

				<div 
					className={cn(
						"relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-transparent group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]",
						item.url && "cursor-pointer"
					)}
					onClick={handlePortfolioClick}
				>
					<div
						className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-60 transition-opacity duration-100 ease-out group-hover:opacity-30 z-10"
						style={{ willChange: 'opacity' }}
					/>
					<img
						src={item.image}
						alt={item.title}
						loading="lazy"
						decoding="async"
						fetchPriority="low"
						className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-115 relative z-0"
						style={{ 
							transform: 'translateZ(0)',
							willChange: 'transform'
						}}
					/>
					{/* Image glow overlay */}
					<div
						className="absolute inset-0 opacity-0 transition-opacity duration-100 ease-out group-hover:opacity-100 pointer-events-none z-20"
						style={{
							background: `radial-gradient(circle at center, ${accent}20, transparent 70%)`,
							willChange: 'opacity',
							transform: 'translateZ(0)'
						}}
					/>
					{/* Portfolio indicator overlay */}
					{item.url && (
						<div className="absolute top-2 right-2 z-30 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
							<span className="text-xs text-white font-medium">Portfolio</span>
						</div>
					)}
				</div>

				<div className="space-y-2">
					<div className="flex items-center justify-between gap-3">
						<div>
							<h3 className="text-lg font-semibold tracking-tight text-white transition-all duration-100 ease-out group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">{item.title}</h3>
							<p className="text-xs text-slate-300/90 transition-all duration-100 ease-out group-hover:text-slate-100">{item.subtitle}</p>
						</div>
					</div>
					{item.location && (
						<p className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-slate-400 transition-all duration-100 ease-out group-hover:text-slate-200">{item.location}</p>
					)}
				</div>

				{/* Social Media Icons - Email is always shown */}
				<div className="flex items-center justify-center gap-2 mt-auto pt-2 flex-wrap">
					{item.social?.linkedin && (
						<button
							onClick={(e) => handleSocialClick(item.social!.linkedin!, e)}
							className="p-2 rounded-full border border-white/10 bg-white/[0.05] hover:bg-blue-600/20 hover:border-blue-500/40 transition-all duration-150 text-slate-300 hover:text-white hover:scale-110"
							style={{ willChange: 'transform', transform: 'translateZ(0)' }}
							aria-label="LinkedIn"
						>
							<Linkedin className="size-4" />
						</button>
					)}
					{item.social?.facebook && (
						<button
							onClick={(e) => handleSocialClick(item.social!.facebook!, e)}
							className="p-2 rounded-full border border-white/10 bg-white/[0.05] hover:bg-blue-500/20 hover:border-blue-400/40 transition-all duration-150 text-slate-300 hover:text-white hover:scale-110"
							style={{ willChange: 'transform', transform: 'translateZ(0)' }}
							aria-label="Facebook"
						>
							<Facebook className="size-4" />
						</button>
					)}
					{item.social?.instagram && (
						<button
							onClick={(e) => handleSocialClick(item.social!.instagram!, e)}
							className="p-2 rounded-full border border-white/10 bg-white/[0.05] hover:bg-pink-500/20 hover:border-pink-400/40 transition-all duration-150 text-slate-300 hover:text-white hover:scale-110"
							style={{ willChange: 'transform', transform: 'translateZ(0)' }}
							aria-label="Instagram"
						>
							<Instagram className="size-4" />
						</button>
					)}
					{item.social?.twitter && (
						<button
							onClick={(e) => handleSocialClick(item.social!.twitter!, e)}
							className="p-2 rounded-full border border-white/10 bg-white/[0.05] hover:bg-cyan-500/20 hover:border-cyan-400/40 transition-all duration-150 text-slate-300 hover:text-white hover:scale-110"
							style={{ willChange: 'transform', transform: 'translateZ(0)' }}
							aria-label="Twitter"
						>
							<Twitter className="size-4" />
						</button>
					)}
					{item.social?.github && (
						<button
							onClick={(e) => handleSocialClick(item.social!.github!, e)}
							className="p-2 rounded-full border border-white/10 bg-white/[0.05] hover:bg-slate-600/20 hover:border-slate-400/40 transition-all duration-150 text-slate-300 hover:text-white hover:scale-110"
							style={{ willChange: 'transform', transform: 'translateZ(0)' }}
							aria-label="GitHub"
						>
							<Github className="size-4" />
						</button>
					)}
					{/* Email is always shown - everyone must have email */}
					<button
						onClick={(e) => handleSocialClick(`mailto:${item.social?.email || `${item.title.toLowerCase().replace(/\s+/g, '.')}@encryptarx.com`}`, e)}
						className="p-2 rounded-full border border-white/10 bg-white/[0.05] hover:bg-red-500/20 hover:border-red-400/40 transition-all duration-150 text-slate-300 hover:text-white hover:scale-110"
						style={{ willChange: 'transform', transform: 'translateZ(0)' }}
						aria-label="Email"
					>
						<Mail className="size-4" />
					</button>
				</div>

				<div className="flex flex-wrap gap-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-slate-400">
					<span className="rounded-full px-2 py-0.5 bg-white/[0.05] backdrop-blur-sm transition-all duration-100 ease-out group-hover:bg-white/[0.12] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:text-white">
						{item.pillar ?? 'Cluster'}
					</span>
				</div>
			</div>
		</article>
	);
});
Card.displayName = 'Card';

const ChromaGrid: React.FC<ChromaGridProps> = memo(({ items, className = '' }) => {
	const data = useMemo(() => items?.length ? items : fallbackItems, [items]);

	return (
		<div
			className={cn(gridClassName, className)}
			style={{ 
				contain: 'layout style paint',
				willChange: 'contents',
				transform: 'translateZ(0)',
				position: 'relative',
				zIndex: 50,
				display: 'grid',
				opacity: 1,
				visibility: 'visible',
				backfaceVisibility: 'hidden',
				WebkitBackfaceVisibility: 'hidden',
				contentVisibility: 'auto',
				containIntrinsicSize: 'auto 500px'
			}}
		>
			{data.map((item: ChromaItem, index: number) => (
				<Card key={`${item.title}-${index}`} item={item} index={index} />
			))}
		</div>
	);
}, (prevProps, nextProps) => {
	// Custom comparison for better memoization
	return prevProps.items === nextProps.items && prevProps.className === nextProps.className;
});
ChromaGrid.displayName = 'ChromaGrid';

export default ChromaGrid;
