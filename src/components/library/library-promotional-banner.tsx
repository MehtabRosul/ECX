'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  TrendingUp, 
  Zap, 
  Star,
  Sparkles
} from 'lucide-react';
import { useMemo, useState, useRef, useEffect, memo } from 'react';
import type { LibraryItem } from './library-page-client';

interface LibraryPromotionalBannerProps {
  libraryItems: LibraryItem[];
}

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  gradient: string;
  glowColor: string;
  index: number;
  isVisible: boolean;
  isHovered?: boolean;
  onHover?: (hovered: boolean) => void;
}

// Compact rectangular stat card - static
const StatCard = memo(({ 
  label, 
  value, 
  icon: Icon, 
  gradient, 
  glowColor, 
  index,
  isVisible,
  isHovered,
  onHover
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: 0.1 + index * 0.08,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      className="relative"
    >
      {/* Card container */}
      <div className="relative h-[130px] md:h-[140px] w-full rounded-xl md:rounded-2xl border border-white/10 bg-gradient-to-br from-card/40 via-card/30 to-card/40 backdrop-blur-xl overflow-hidden shadow-lg shadow-black/5">
        {/* Static gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`} />

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-full" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
          {/* Icon */}
          <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-2.5 md:mb-3 shadow-lg`}>
            <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={2.5} />
          </div>

          {/* Value */}
          <div 
            className="text-xl md:text-2xl font-bold text-foreground mb-1"
            style={{
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {value}
          </div>

          {/* Label */}
          <div className="text-[11px] font-medium text-muted-foreground/80 uppercase tracking-wider">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

export function LibraryPromotionalBanner({ libraryItems }: LibraryPromotionalBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate impressive stats
  const stats = useMemo(() => {
    const totalItems = libraryItems.length;
    const totalViews = libraryItems.reduce((sum, item) => sum + item.views, 0);
    const totalDownloads = libraryItems.reduce((sum, item) => sum + item.downloads, 0);
    const avgRating = libraryItems.reduce((sum, item) => sum + item.rating, 0) / totalItems;

    return {
      totalItems,
      totalViews: Math.floor(totalViews / 1000) * 1000,
      totalDownloads: Math.floor(totalDownloads / 1000) * 1000,
      avgRating: avgRating.toFixed(1),
    };
  }, [libraryItems]);

  // Intersection observer for animations
  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve after first intersection for performance
          observer.unobserve(currentRef);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const statConfigs = useMemo(() => [
    { 
      label: 'Resources', 
      value: `${stats.totalItems}+`, 
      icon: BookOpen, 
      gradient: 'from-blue-500 via-cyan-500 to-blue-600',
      glowColor: 'rgba(59, 130, 246, 0.6)'
    },
    { 
      label: 'Views', 
      value: `${(stats.totalViews / 1000).toFixed(0)}K+`, 
      icon: TrendingUp, 
      gradient: 'from-emerald-500 via-green-500 to-emerald-600',
      glowColor: 'rgba(16, 185, 129, 0.6)'
    },
    { 
      label: 'Downloads', 
      value: `${(stats.totalDownloads / 1000).toFixed(0)}K+`, 
      icon: Zap, 
      gradient: 'from-purple-500 via-violet-500 to-purple-600',
      glowColor: 'rgba(139, 92, 246, 0.6)'
    },
    { 
      label: 'Rating', 
      value: `${stats.avgRating}★`, 
      icon: Star, 
      gradient: 'from-amber-500 via-orange-500 to-amber-600',
      glowColor: 'rgba(245, 158, 11, 0.6)'
    },
  ], [stats]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-8 md:py-12 overflow-hidden isolate"
    >
      {/* Sophisticated background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Animated mesh gradient background - Static on mobile */}
      <motion.div
        animate={{
          backgroundPosition: isMobile ? undefined : ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(at 20% 30%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
            radial-gradient(at 80% 70%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(34, 211, 238, 0.1) 0px, transparent 50%)
          `,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Floating orbs with unique movement - Reduced on mobile */}
      {[...Array(isMobile ? 2 : 6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [
              `${(i % 3) * 33}%`,
              `${((i % 3) * 33 + 15) % 100}%`,
              `${(i % 3) * 33}%`
            ],
            y: [
              `${(i % 2) * 50}%`,
              `${((i % 2) * 50 + 25) % 100}%`,
              `${(i % 2) * 50}%`
            ],
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
          className="absolute w-64 h-64 rounded-full blur-3xl pointer-events-none hidden md:block"
          style={{
            background: `radial-gradient(circle, ${
              ['rgba(59, 130, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(34, 211, 238, 0.3)', 'rgba(16, 185, 129, 0.3)', 'rgba(245, 158, 11, 0.3)', 'rgba(236, 72, 153, 0.3)'][i]
            }, transparent)`,
          }}
        />
      ))}

      {/* Main content container */}
      <div className="relative z-10 container mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Main card with glassmorphism */}
          <div className="relative rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-br from-card/50 via-card/30 to-card/50 backdrop-blur-2xl overflow-hidden p-4 md:p-5 lg:p-6 shadow-2xl">
            {/* Animated border glow - Static on mobile */}
              <motion.div
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-cyan-500/20 via-purple-500/20 to-primary/20 pointer-events-none md:opacity-30"
              style={{ 
                opacity: isMobile ? 0.2 : undefined
              }}
            />

            {/* Rotating radial light from center - Disabled on mobile */}
            <motion.div
                animate={{
                rotate: [0, 360],
                }}
                transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 pointer-events-none hidden md:block"
                style={{
                background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(59, 130, 246, 0.15) 60deg, rgba(139, 92, 246, 0.2) 120deg, rgba(34, 211, 238, 0.15) 180deg, transparent 240deg, rgba(16, 185, 129, 0.12) 300deg, transparent 360deg)',
                transformOrigin: 'center center',
              }}
            />

            {/* Expanding radial pulse from center - Disabled on mobile */}
            <motion.div
              animate={{
                scale: [0.8, 1.5, 0.8],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 pointer-events-none hidden md:block"
              style={{
                background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.15), transparent 70%)',
                transformOrigin: 'center center',
              }}
            />

            {/* Secondary expanding pulse - Disabled on mobile */}
            <motion.div
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
              className="absolute inset-0 pointer-events-none hidden md:block"
              style={{
                background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.18), rgba(16, 185, 129, 0.12), transparent 65%)',
                transformOrigin: 'center center',
              }}
            />

            {/* Diagonal light sweeps from corners - Disabled on mobile */}
                <motion.div
                  animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 pointer-events-none hidden md:block"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.12) 50%, transparent 70%)',
                width: '150%',
                height: '150%',
                left: '-25%',
                top: '-25%',
                transformOrigin: 'center center',
              }}
            />

            {/* Counter-rotating diagonal light - Disabled on mobile */}
                  <motion.div
                    animate={{
                rotate: [360, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: 'linear',
                delay: 1,
              }}
              className="absolute inset-0 pointer-events-none hidden md:block"
              style={{
                background: 'linear-gradient(-45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)',
                width: '150%',
                height: '150%',
                left: '-25%',
                top: '-25%',
                transformOrigin: 'center center',
              }}
            />

            {/* Pulsing corner lights - Disabled on mobile */}
            {[
              { position: 'top-0 left-0', color: 'rgba(59, 130, 246, 0.25)', delay: 0, borderRadius: '0 0 100% 0' },
              { position: 'top-0 right-0', color: 'rgba(139, 92, 246, 0.25)', delay: 1, borderRadius: '0 0 0 100%' },
              { position: 'bottom-0 left-0', color: 'rgba(34, 211, 238, 0.25)', delay: 2, borderRadius: '0 100% 0 0' },
              { position: 'bottom-0 right-0', color: 'rgba(16, 185, 129, 0.25)', delay: 3, borderRadius: '100% 0 0 0' },
            ].map((corner, i) => (
              <motion.div
                key={`corner-${i}`}
                  animate={{
                  scale: [0.8, 1.3, 0.8],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: corner.delay,
                }}
                className={`absolute ${corner.position} w-40 h-40 pointer-events-none hidden md:block`}
                style={{
                  background: `radial-gradient(circle, ${corner.color}, transparent)`,
                  borderRadius: corner.borderRadius,
                }}
              />
            ))}

            {/* Subtle grid pattern overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Content */}
            <div className="relative z-10 space-y-4 md:space-y-6">
              {/* Header section */}
              <div className="text-center space-y-3 md:space-y-4">
                {/* Icon - static */}
                <div className="inline-flex items-center justify-center">
                  <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary via-cyan-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <BookOpen className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Title with gradient text */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                >
                  <span className="bg-gradient-to-r from-primary via-cyan-400 via-purple-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto] md:animate-[shimmer_3s_ease-in-out_infinite]">
                  A Universe of Knowledge Awaits
                  </span>
                </motion.h2>

                {/* Description with animated highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-3"
                >
                  <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Explore{' '}
                    <motion.span
                      animate={isVisible && !isMobile ? {
                        color: ['rgb(59, 130, 246)', 'rgb(34, 211, 238)', 'rgb(59, 130, 246)'],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="font-bold text-primary"
                    >
                      {stats.totalItems}+
                    </motion.span>{' '}
                    curated resources ·{' '}
                    <motion.span
                      animate={isVisible && !isMobile ? {
                        color: ['rgb(16, 185, 129)', 'rgb(34, 211, 238)', 'rgb(16, 185, 129)'],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      className="font-bold text-emerald-500"
                    >
                      {stats.totalViews.toLocaleString()}+
                    </motion.span>{' '}
                    insights ·{' '}
                    <motion.span
                      animate={isVisible && !isMobile ? {
                        color: ['rgb(139, 92, 246)', 'rgb(236, 72, 153)', 'rgb(139, 92, 246)'],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      className="font-bold text-purple-500"
                    >
                      {stats.totalDownloads.toLocaleString()}+
                    </motion.span>{' '}
                    downloads
                  </p>
                  
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-sm md:text-base text-muted-foreground/80 max-w-xl mx-auto"
                  >
                    Dive deep into cutting-edge research, innovative case studies, insightful articles, and transformative industry solutions. Your journey to excellence starts here.
                </motion.p>
                </motion.div>
              </div>

              {/* Compact statistics cards grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
                {statConfigs.map((stat, index) => (
                  <StatCard
                      key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    icon={stat.icon}
                    gradient={stat.gradient}
                    glowColor={stat.glowColor}
                    index={index}
                    isVisible={isVisible}
                  />
                ))}
              </div>

              {/* Tagline and CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-center space-y-2 pt-1"
              >
                <motion.div
                  animate={isVisible && !isMobile ? {
                    opacity: [0.8, 1, 0.8],
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <p className="text-sm md:text-base font-semibold bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Discover. Learn. Transform.
                  </p>
                  <Sparkles className="w-4 h-4 text-primary" />
                </motion.div>
                
                <motion.p
                  animate={isVisible && !isMobile ? {
                    opacity: [0.6, 0.9, 0.6],
                  } : {}}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  className="text-xs md:text-sm text-muted-foreground/70 max-w-lg mx-auto"
                >
                  Join thousands of professionals, researchers, and innovators who trust our library for their knowledge journey
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}
