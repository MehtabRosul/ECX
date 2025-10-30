'use client';

import { Shield, Activity, Globe, Users, Zap, Clock } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useSmoothAnimation } from '@/hooks/useSmoothAnimation';
import { useAnimatedCounter, parseMetricValue } from '@/hooks/useAnimatedCounter';

const features = [
    {
      icon: Shield,
      value: '128+',
      title: 'Security Assessments',
      subtitle: 'Audits Completed',
      change: '+24%',
      trend: 'up',
      description: 'Comprehensive security evaluations and vulnerability assessments conducted across enterprise systems, ensuring robust protection against emerging cyber threats.'
    },
    {
      icon: Activity,
      value: '1.2M',
      title: 'Events Analyzed',
      subtitle: 'Threat Detection',
      change: '+18%',
      trend: 'up',
      description: 'Real-time monitoring and analysis of security events, leveraging advanced AI algorithms to detect and prevent potential security breaches before they impact operations.'
    },
    {
      icon: Globe,
      value: '54K',
      title: 'Across Platforms',
      subtitle: 'Active Deployments',
      change: '+42%',
      trend: 'up',
      description: 'Global infrastructure deployments spanning multiple cloud platforms and on-premises environments, providing seamless security coverage worldwide.'
    },
    {
      icon: Activity,
      value: '42',
      title: 'Published',
      subtitle: 'Research Papers',
      change: '+8',
      trend: 'up',
      description: 'Cutting-edge research contributions to cybersecurity and AI/ML fields, published in top-tier conferences and journals, advancing industry knowledge and best practices.'
    },
    {
      icon: Users,
      value: '180+',
      title: 'Global Reach',
      subtitle: 'Enterprise Clients',
      change: '+15%',
      trend: 'up',
      description: 'Trusted by leading enterprises worldwide, providing comprehensive security solutions and strategic consulting to organizations across diverse industries and sectors.'
    },
    {
      icon: Zap,
      value: '28ms',
      title: 'Avg API Latency',
      subtitle: 'Response Time',
      change: '+8%',
      trend: 'up',
      description: 'Ultra-fast API response times ensuring real-time security monitoring and threat detection capabilities, maintaining optimal performance for critical security operations.'
    }
]

// Helper functions for animation configuration
const getAnimationConfig = (config: any) => config;
const getTransitionConfig = (config: any) => config;

// Optimized animation presets for mobile performance
const animationPresets = {
  card: {
    initial: { opacity: 0, y: 40, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { 
      type: "spring", 
      stiffness: 120, 
      damping: 25, 
      mass: 0.6,
      duration: 0.6
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 30,
      mass: 0.4
    }
  },
  mobile: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  graph: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { 
      pathLength: { 
        type: "spring", 
        stiffness: 50, 
        damping: 15,
        duration: 2.5
      },
      opacity: { duration: 0.3 }
    }
  }
};

// Animated metric value component
const AnimatedMetricValue = ({ value, isVisible, delay = 0 }: { value: string, isVisible: boolean, delay?: number }) => {
  const { number, suffix, prefix } = parseMetricValue(value);
  const { displayValue } = useAnimatedCounter({
    end: number,
    start: 0,
    duration: 2500,
    isVisible,
    suffix,
    prefix,
    decimals: value.includes('ms') ? 0 : 0
  });

  return (
    <span
      className="text-3xl font-bold text-primary mb-1"
      style={{ 
        fontVariantNumeric: 'tabular-nums',
        filter: 'drop-shadow(0 0 8px rgba(43, 141, 190, 0.3))'
      }}
    >
      {displayValue}
    </span>
  );
};

// Animated change indicator component
const AnimatedChangeIndicator = ({ change, isVisible, delay = 0 }: { change: string, isVisible: boolean, delay?: number }) => {
  const { number, suffix, prefix } = parseMetricValue(change);
  const { displayValue } = useAnimatedCounter({
    end: number,
    start: 0,
    duration: 1800,
    isVisible,
    suffix,
    prefix,
    decimals: 0
  });

  return (
    <span 
      className="text-sm font-semibold px-2 py-1 rounded-full text-green-400 bg-green-400/10"
      style={{ 
        fontVariantNumeric: 'tabular-nums'
      }}
    >
      {displayValue}
    </span>
  );
};

// Description component to replace graphs
const MetricDescription = ({ description, isVisible, delay = 0 }: { description: string, isVisible: boolean, delay?: number }) => {
  return (
    <div className="mt-4">
      <p className="text-xs text-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export function Metrics() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(features.length).fill(false));
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { 
    once: true, 
    margin: "-50px",
    amount: 0.1 
  });

  // Detect mobile and force load
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsLoaded(true);
        // Force load cards immediately on mobile
        setTimeout(() => {
          setVisibleCards(new Array(features.length).fill(true));
        }, 100);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isInView && !isMobile) {
      // Desktop animations
      features.forEach((_, index) => {
        setTimeout(() => {
            setVisibleCards(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
          });
        }, index * 150);
      });
    }
  }, [isInView, isMobile]);

  return (
    <section className="py-12 sm:py-24 bg-surface-1">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-high sm:text-5xl mb-4">
            Proven Track Record
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Real-world impact across cybersecurity, AI/ML, and Web3 innovations
          </p>
        </div>
        
        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={isMobile ? { opacity: 0, y: 20 } : animationPresets.card.initial}
              animate={visibleCards[i] ? (isMobile ? { opacity: 1, y: 0 } : animationPresets.card.animate) : (isMobile ? { opacity: 0, y: 20 } : animationPresets.card.initial)}
              transition={isMobile ? 
                { duration: 0.3, ease: "easeOut", delay: i * 0.05 } :
                getAnimationConfig({
                  ...animationPresets.card.transition,
                  delay: i * 0.15
                })
              }
              whileHover={!isMobile ? getAnimationConfig({
                ...animationPresets.hover,
                boxShadow: '0 20px 40px rgba(43, 141, 190, 0.15), 0 8px 32px rgba(2,6,23,0.6)'
              }) : undefined}
              className="group relative bg-surface-2 rounded-xl p-6 shadow-soft border border-white/5 hover:border-primary/20 cursor-pointer"
              style={{ 
                willChange: 'transform, box-shadow',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
            >
              {/* Desktop-only hover effects */}
              {!isMobile && (
                <>
                  {/* Enhanced hover glow effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={getTransitionConfig({ duration: 0.3, ease: "easeOut" })}
                    style={{ willChange: 'opacity' }}
                  />
                  
                  {/* Background light effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    initial={{ 
                      opacity: 0,
                      background: 'radial-gradient(circle at 50% 50%, rgba(43, 141, 190, 0.1) 0%, transparent 70%)'
                    }}
                    whileHover={{ 
                      opacity: [0, 1, 0.8, 1],
                      background: [
                    'radial-gradient(circle at 50% 50%, rgba(43, 141, 190, 0.1) 0%, transparent 70%)',
                    'radial-gradient(circle at 50% 50%, rgba(43, 141, 190, 0.15) 0%, rgba(43, 141, 190, 0.05) 50%, transparent 70%)',
                    'radial-gradient(circle at 50% 50%, rgba(43, 141, 190, 0.12) 0%, rgba(43, 141, 190, 0.03) 50%, transparent 70%)',
                    'radial-gradient(circle at 50% 50%, rgba(43, 141, 190, 0.15) 0%, rgba(43, 141, 190, 0.05) 50%, transparent 70%)'
                  ]
                    }}
                    transition={getTransitionConfig({ 
                      duration: 0.4, 
                      ease: "easeOut",
                      background: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }
                    })}
                    style={{ willChange: 'opacity, background' }}
                  />
                  
                  {/* Animated light rays */}
                  <motion.div
                    className="absolute inset-0 rounded-xl overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={getTransitionConfig({ duration: 0.5, ease: "easeOut" })}
                    style={{ willChange: 'opacity' }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(45deg, transparent 30%, rgba(43, 141, 190, 0.1) 50%, transparent 70%)',
                        transform: 'translateX(-100%)'
                      }}
                      animate={{
                        transform: ['translateX(-100%)', 'translateX(100%)']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear"
                      }}
                    />
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(-45deg, transparent 30%, rgba(43, 141, 190, 0.08) 50%, transparent 70%)',
                        transform: 'translateX(100%)'
                      }}
                      animate={{
                        transform: ['translateX(100%)', 'translateX(-100%)']
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        delay: 0.5
                      }}
                    />
                  </motion.div>
                  
                  {/* Subtle border glow on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-primary/20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={getTransitionConfig({ duration: 0.4, ease: "easeOut" })}
                    style={{ willChange: 'opacity, transform' }}
                  />
                </>
              )}
              
              <div className="relative z-10">
                {/* Header with icon and change indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedChangeIndicator 
                    change={feature.change} 
                    isVisible={visibleCards[i]} 
                    delay={i * 0.15} 
                  />
                </div>

                {/* Main value */}
                <div className="mb-3">
                  <AnimatedMetricValue 
                    value={feature.value} 
                    isVisible={visibleCards[i]} 
                    delay={i * 0.15} 
                  />
                  <p className="text-sm text-high font-medium">{feature.title}</p>
                  <p className="text-xs text-muted">{feature.subtitle}</p>
                </div>

                {/* Metric description */}
                <MetricDescription 
                  description={feature.description} 
                  isVisible={visibleCards[i]} 
                  delay={i * 0.15} 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
