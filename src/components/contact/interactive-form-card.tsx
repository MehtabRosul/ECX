'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, FileText, Handshake, UserPlus, Calendar, Newspaper, DollarSign, Quote } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState, useCallback, useMemo, memo } from 'react';

interface FormCardProps {
  title: string;
  description: string;
  href: string;
  delay?: number;
  gradient?: string;
  icon?: React.ElementType;
}

const iconMap: Record<string, React.ElementType> = {
  'Contact Us': FileText,
  'RFP': FileText,
  'Partner': Handshake,
  'Contributor': UserPlus,
  'Trial': Calendar,
  'Press': Newspaper,
  'Event': Calendar,
  'Quote': DollarSign,
};

const gradientMap: Record<string, string> = {
  'Contact Us': 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
  'RFP': 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
  'Partner': 'from-amber-500/20 via-orange-500/20 to-red-500/20',
  'Contributor': 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
  'Trial': 'from-indigo-500/20 via-purple-500/20 to-pink-500/20',
  'Press': 'from-rose-500/20 via-pink-500/20 to-purple-500/20',
  'Event': 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
  'Quote': 'from-emerald-500/20 via-green-500/20 to-cyan-500/20',
};

function InteractiveFormCardComponent({ title, description, href, delay = 0, gradient, icon }: FormCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Optimized spring configuration for better performance
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const Icon = useMemo(() => icon || iconMap[title] || FileText, [icon, title]);
  const cardGradient = useMemo(() => gradient || gradientMap[title] || 'from-gray-500/20 via-slate-500/20 to-zinc-500/20', [gradient, title]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      className="group relative"
    >
      <Link
        href={href}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="block relative h-full"
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
          className="relative h-full rounded-2xl border border-white/10 bg-surface-2/50 backdrop-blur-xl overflow-hidden p-6 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/20"
        >
          {/* Animated gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${cardGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:via-primary/10 group-hover:to-primary/20 blur-2xl transition-all duration-500" />
          
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-sm" 
                 style={{ 
                   backgroundSize: '200% 100%',
                   animation: isHovered ? 'shimmer 2s linear infinite' : 'none',
                 }} 
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Icon */}
            <div className="mb-4">
              <motion.div
                animate={isHovered ? { 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                } : {}}
                transition={{ duration: 0.5 }}
                className="inline-flex p-3 rounded-xl bg-primary/10 border border-primary/20"
              >
                <Icon className="w-6 h-6 text-primary" />
              </motion.div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 flex-grow">
              {description}
            </p>

            {/* CTA Arrow */}
            <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all duration-300">
              <span className="text-sm font-medium">Open form</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
            initial={{ x: '-100%' }}
            animate={isHovered ? {
              x: ['-100%', '200%'],
            } : { x: '-100%' }}
            transition={{ 
              duration: 0.8, 
              repeat: isHovered ? Infinity : 0, 
              repeatDelay: 1,
              ease: 'easeInOut'
            }}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

export const InteractiveFormCard = memo(InteractiveFormCardComponent);

