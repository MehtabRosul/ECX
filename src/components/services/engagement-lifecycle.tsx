'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { engagementSteps } from '@/data/services-data';
import { Search, Rocket, Settings, TrendingUp, RefreshCw, ArrowRight, CheckCircle2, Clock, Users, Target, Zap, TestTube, Monitor } from 'lucide-react';
import { ShineBorder } from '@/components/ui/shine-border';
import { useState, useEffect, useRef } from 'react';

const icons = [Search, Rocket, Settings, TestTube, TrendingUp];
const stepIcons = [Target, Clock, Users, Zap, CheckCircle2];
const colors = [
	{ primary: '#3B82F6', secondary: '#06B6D4', gradient: 'from-blue-500 to-cyan-500' },
	{ primary: '#8B5CF6', secondary: '#EC4899', gradient: 'from-purple-500 to-pink-500' },
	{ primary: '#10B981', secondary: '#059669', gradient: 'from-green-500 to-emerald-500' },
	{ primary: '#F59E0B', secondary: '#EA580C', gradient: 'from-amber-500 to-orange-500' },
	{ primary: '#06B6D4', secondary: '#3B82F6', gradient: 'from-cyan-500 to-blue-500' },
];

export function EngagementLifecycle() {
	const [activeStep, setActiveStep] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const [geometricShapes, setGeometricShapes] = useState<Array<{
		size: number;
		left: number;
		top: number;
		duration: number;
		delay: number;
	}>>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"]
	});

	const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
	const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

	useEffect(() => {
		// Generate geometric shapes with fixed values to prevent hydration mismatch
		const shapes = [
			{ size: 80, left: 10, top: 20, duration: 20, delay: 0 },
			{ size: 100, left: 30, top: 60, duration: 25, delay: 1 },
			{ size: 70, left: 60, top: 30, duration: 18, delay: 2 },
			{ size: 90, left: 80, top: 70, duration: 22, delay: 3 },
			{ size: 85, left: 20, top: 80, duration: 24, delay: 4 },
			{ size: 75, left: 70, top: 10, duration: 19, delay: 5 },
			{ size: 95, left: 40, top: 40, duration: 21, delay: 6 },
			{ size: 65, left: 90, top: 50, duration: 17, delay: 7 },
			{ size: 88, left: 15, top: 50, duration: 23, delay: 8 },
			{ size: 72, left: 55, top: 80, duration: 20, delay: 9 },
			{ size: 82, left: 25, top: 10, duration: 26, delay: 10 },
			{ size: 78, left: 85, top: 25, duration: 16, delay: 11 },
		];
		setGeometricShapes(shapes);
	}, []);

	useEffect(() => {
		if (!isAutoPlaying) return;
		
		const interval = setInterval(() => {
			setActiveStep((prev) => (prev + 1) % engagementSteps.length);
		}, 4000);
		return () => clearInterval(interval);
	}, [isAutoPlaying]);

	const handleStepClick = (index: number) => {
		setActiveStep(index);
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 10000);
	};

	return (
		<section ref={containerRef} className="py-32 sm:py-48 relative overflow-hidden">
			{/* Dynamic Background with Multiple Layers */}
			<div className="absolute inset-0">
				{/* Animated gradient mesh */}
				<motion.div 
					className="absolute inset-0 opacity-30"
					style={{ y }}
				>
					<div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
					<div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
					<div className="absolute bottom-0 left-1/2 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
				</motion.div>

				{/* Floating geometric shapes */}
				<div className="absolute inset-0 overflow-hidden">
					{geometricShapes.map((shape, i) => (
						<motion.div
							key={i}
							className="absolute rounded-full border border-white/10"
							style={{
								width: `${shape.size}px`,
								height: `${shape.size}px`,
								left: `${shape.left}%`,
								top: `${shape.top}%`,
							}}
							animate={{
								y: [0, -30, 0],
								x: [0, 20, 0],
								rotate: [0, 180, 360],
								scale: [1, 1.1, 1],
							}}
							transition={{
								duration: shape.duration,
								delay: shape.delay,
								repeat: Infinity,
								ease: "easeInOut"
							}}
						/>
					))}
				</div>

				{/* Animated grid pattern */}
				<div className="absolute inset-0 opacity-20">
					<svg className="w-full h-full">
						<defs>
							<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
								<path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#grid)">
							<animateTransform
								attributeName="transform"
								type="translate"
								values="0,0;40,40;0,0"
								dur="20s"
								repeatCount="indefinite"
							/>
						</rect>
					</svg>
				</div>
			</div>

			<div className="container relative z-10">
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center mb-20"
					style={{ opacity }}
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
						<div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
						<span className="text-sm font-medium text-primary">Methodology</span>
					</div>
					
					<h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
						Engagement
						<span className="block bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
							Lifecycle
						</span>
					</h2>
					
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						Our proven methodology from discovery to ongoing operations, designed to deliver exceptional results at every stage
					</p>
				</motion.div>

				{/* Interactive Timeline */}
				<div className="max-w-7xl mx-auto">
					{/* Progress Indicator - only for desktop/sm+ */}
					<div className="hidden sm:block">
						<div className="relative mb-16">
							<div className="grid grid-cols-5 gap-4 items-center">
								{engagementSteps.map((_, index) => (
									<button
										key={index}
										onClick={() => handleStepClick(index)}
										className={`relative z-10 w-12 h-12 rounded-full border-2 transition-all duration-500 mx-auto ${
											activeStep >= index
												? 'border-primary bg-primary text-white shadow-lg shadow-primary/50'
												: 'border-white/20 bg-surface-1 text-muted-foreground hover:border-primary/50'
										}`}
									>
										<motion.div
											className="w-full h-full rounded-full flex items-center justify-center font-bold"
											animate={activeStep === index ? { scale: [1, 1.2, 1] } : { scale: 1 }}
											transition={{ duration: 0.3 }}
										>
											{index + 1}
										</motion.div>
										
										{activeStep > index && (
											<motion.div
												className="absolute inset-0 rounded-full bg-primary"
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												transition={{ duration: 0.3 }}
											/>
										)}
									</button>
								))}
							</div>
							
							{/* Connecting Line */}
							<div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2">
								<motion.div
									className="h-full bg-gradient-to-r from-primary to-cyan-400"
									initial={{ width: '0%' }}
									animate={{ width: `${(activeStep / (engagementSteps.length - 1)) * 100}%` }}
									transition={{ duration: 0.8, ease: 'easeInOut' }}
								/>
							</div>
						</div>
					</div>

					{/* Step Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
						{engagementSteps.map((step, index) => {
							const Icon = icons[index];
							const StepIcon = stepIcons[index];
							const color = colors[index];
							const isActive = activeStep === index;
							const isCompleted = activeStep > index;

							return (
								<motion.div
									key={step.id}
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									onHoverStart={() => handleStepClick(index)}
									className="relative group cursor-pointer"
								>
									<ShineBorder 
										color={isActive ? [color.primary, color.secondary, color.primary] : undefined}
										className="h-full"
									>
										<motion.div
											animate={isActive ? { 
												scale: 1.05, 
												y: -10,
												boxShadow: `0 25px 50px -12px ${color.primary}40`
											} : { 
												scale: 1, 
												y: 0,
												boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
											}}
											transition={{ type: 'spring', stiffness: 300, damping: 30 }}
											className="relative bg-surface-1/80 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full overflow-hidden"
										>
											{/* Animated background gradient */}
											<motion.div
												className={`absolute inset-0 bg-gradient-to-br ${color.gradient} opacity-0`}
												animate={isActive ? { opacity: 0.1 } : { opacity: 0 }}
												transition={{ duration: 0.5 }}
											/>

											{/* Status indicator */}
											<div className="absolute top-6 right-6">
												<motion.div
													className={`w-8 h-8 rounded-full flex items-center justify-center ${
														isCompleted 
															? 'bg-green-500 text-white' 
															: isActive 
																? 'bg-primary text-white' 
																: 'bg-white/10 text-muted-foreground'
													}`}
													animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
													transition={{ duration: 0.5 }}
												>
													{isCompleted ? (
														<CheckCircle2 className="w-5 h-5" />
													) : (
														<StepIcon className="w-5 h-5" />
													)}
												</motion.div>
											</div>

											{/* Main icon */}
											<motion.div
												className="relative mb-6"
												animate={isActive ? { 
													rotate: [0, -10, 10, 0],
													scale: [1, 1.1, 1]
												} : { 
													rotate: 0,
													scale: 1
												}}
												transition={{ duration: 0.6 }}
											>
												<div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color.gradient} flex items-center justify-center shadow-xl relative overflow-hidden`}>
													<Icon className="w-10 h-10 text-white relative z-10" />
													
													{/* Animated shine effect */}
													<motion.div
														className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
														animate={isActive ? {
															x: ['-100%', '100%']
														} : {}}
														transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
													/>
												</div>
											</motion.div>

											{/* Content */}
											<div className="space-y-4">
												<h3 className="text-2xl font-bold text-high group-hover:text-primary transition-colors">
													{step.label}
												</h3>
												
												<p className="text-muted-foreground leading-relaxed">
													{step.description}
												</p>

												{/* Outputs section */}
												<div className="space-y-3">
													<div className="flex items-center gap-2 text-sm font-semibold text-primary">
														<Target className="w-4 h-4" />
														<span>Key Outputs</span>
													</div>
													
													<div className="space-y-2">
														{step.outputs.map((output, i) => (
															<motion.div
																key={i}
																className="flex items-start gap-3 text-sm text-muted-foreground"
																initial={{ opacity: 0, x: -10 }}
																animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
																transition={{ delay: i * 0.1 }}
															>
																<div className={`w-1.5 h-1.5 rounded-full mt-2 bg-gradient-to-r ${color.gradient} flex-shrink-0`} />
																<span>{output}</span>
															</motion.div>
														))}
													</div>
												</div>
											</div>

											{/* Progress indicator */}
											<div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
												<motion.div
													className={`h-full bg-gradient-to-r ${color.gradient}`}
													initial={{ width: '0%' }}
													animate={isActive ? { width: '100%' } : { width: '0%' }}
													transition={{ duration: 0.8 }}
												/>
											</div>

											{/* Hover effect overlay */}
											<motion.div
												className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
												initial={false}
											/>
										</motion.div>
									</ShineBorder>
								</motion.div>
							);
						})}
					</div>

					
				</div>
			</div>
		</section>
	);
}

