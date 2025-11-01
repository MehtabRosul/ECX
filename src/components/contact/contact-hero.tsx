'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useMemo, memo, useCallback } from 'react';

const contactMethods = [
    {
      icon: Mail,
      label: 'Email Us',
      value: 'support@encryptarx.com',
      color: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
      delay: 0,
    },
    {
      icon: Phone,
      label: 'Call Us',
      value: '+1 (555) 123-4567',
      color: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
      delay: 0.1,
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      value: 'Cuttack, Odisha, India',
      color: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
      delay: 0.2,
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon-Fri, 9AM-6PM IST',
      color: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
      delay: 0.3,
    },
];

const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
};

const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
};

// Mobile-specific card component - horizontal layout with touch-friendly design
const MobileContactMethodCard = memo(({ method, index }: { method: typeof contactMethods[0]; index: number }) => {
  const Icon = method.icon;
  
  const handleAction = useCallback(() => {
    if (method.label === 'Email Us') {
      window.location.href = `mailto:${method.value}`;
    } else if (method.label === 'Call Us') {
      window.location.href = `tel:${method.value.replace(/\s/g, '')}`;
    }
  }, [method]);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.6 + method.delay,
        type: 'spring',
        stiffness: 200,
      }}
      className="group/item relative"
    >
      <motion.button
        onClick={handleAction}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-surface-2/90 via-surface-2/80 to-surface-2/90 backdrop-blur-xl border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 active:border-primary/60 active:scale-[0.97] shadow-lg shadow-primary/10 hover:shadow-primary/25 relative overflow-hidden"
      >
        {/* Animated background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
        
        {/* Icon Container - Larger for mobile with unique styling */}
        <div className="flex-shrink-0 relative z-10">
          <motion.div
            whileTap={{ scale: 0.9, rotate: -5 }}
            className="p-3.5 rounded-xl bg-gradient-to-br from-primary/40 via-primary/20 to-primary/10 border-2 border-primary/50 shadow-xl shadow-primary/20"
          >
            <Icon className="w-6 h-6 text-primary" strokeWidth={2.5} />
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="flex-1 text-left min-w-0 relative z-10">
          <h3 className="text-base font-bold text-foreground mb-0.5 group-hover/item:text-primary transition-colors duration-300">
            {method.label}
          </h3>
          <p className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors duration-300 truncate">
            {method.value}
          </p>
        </div>
        
        {/* Arrow indicator for mobile - always visible */}
        <div className="flex-shrink-0 text-primary opacity-60 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-300 relative z-10">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        
        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover/item:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
          }}
        />
      </motion.button>
    </motion.div>
  );
});
MobileContactMethodCard.displayName = 'MobileContactMethodCard';

// Desktop card component - original design
const DesktopContactMethodCard = memo(({ method, index }: { method: typeof contactMethods[0]; index: number }) => {
  const Icon = method.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.6 + method.delay,
        type: 'spring',
        stiffness: 200,
      }}
      className="group/item relative"
    >
      <div className="flex flex-col items-center text-center space-y-2 p-3 rounded-xl hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/30">
        {/* Icon */}
        <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 group-hover/item:scale-110 group-hover/item:border-primary/50 transition-all duration-300">
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </div>
        
        {/* Label */}
        <h3 className="text-sm md:text-base font-semibold text-foreground group-hover/item:text-primary transition-colors duration-300">
          {method.label}
        </h3>
        
        {/* Value */}
        <p className="text-xs md:text-sm text-muted-foreground group-hover/item:text-foreground transition-colors duration-300">
          {method.value}
        </p>
      </div>
    </motion.div>
  );
});
DesktopContactMethodCard.displayName = 'DesktopContactMethodCard';

function ContactHeroComponent() {
  const memoizedContactMethods = useMemo(() => contactMethods, []);

  return (
    <section className="relative w-full overflow-hidden pt-6 sm:pt-8 md:pt-12 lg:pt-16 pb-0">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        {/* Animated Orbs - Reduced size for mobile performance */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-[120px]"
          style={{ willChange: 'transform' }}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-accent/10 rounded-full blur-[140px]"
          style={{ willChange: 'transform' }}
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-cyan-500/5 rounded-full blur-[100px]"
          style={{ willChange: 'transform, opacity' }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 -z-10 bg-background bg-dot-pattern bg-repeat opacity-20 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)]" />
      
      {/* Transition Gradient - Bottom fade - Mobile optimized */}
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-b from-transparent via-background/50 to-background -z-10" />

      <div className="container relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-6xl">
          {/* Badge - Mobile optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-8 flex items-center justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 md:px-4 md:py-2 rounded-full bg-surface-2/50 backdrop-blur-xl border border-primary/20">
              <Send className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
              <span className="text-xs md:text-sm font-medium text-primary uppercase tracking-wider">
                Get In Touch
              </span>
            </div>
          </motion.div>

          {/* Main Heading - Mobile optimized sizing */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-center mb-6 md:mb-8"
          >
            <h1 className="font-headline text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4 md:mb-6">
              <motion.div
                variants={textVariants}
                className="block text-foreground"
              >
                {('Let\'s Secure Tomorrow').split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordVariants}
                    className="inline-block mr-2 md:mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
              <motion.div
                variants={textVariants}
                className="block mt-1 md:mt-2"
              >
                <span className="relative inline-block">
                  <motion.span
                    variants={textVariants}
                    className="relative z-10 bg-gradient-to-r from-primary via-cyan-400 via-blue-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x inline-block"
                  >
                    {('Together').split(' ').map((word, i) => (
                      <motion.span
                        key={i}
                        variants={wordVariants}
                        className="inline-block mr-2 md:mr-3"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-primary/20 blur-2xl -z-10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </span>
              </motion.div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2 md:px-0"
            >
              Reach out through any channel. Our team is ready to help you transform your security infrastructure.
            </motion.p>
          </motion.div>

          {/* Contact Methods - Mobile Design (Different Layout) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 md:mt-12"
          >
            {/* Mobile Version - Compact Stacked Cards */}
            <div className="md:hidden space-y-3">
              {memoizedContactMethods.map((method, index) => (
                <MobileContactMethodCard key={method.label} method={method} index={index} />
              ))}
            </div>

            {/* Desktop Version - Original Card Design */}
            <div className="hidden md:block relative rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-surface-2/80 via-surface-2/60 to-surface-2/80 backdrop-blur-2xl p-4 md:p-6 overflow-hidden shadow-2xl shadow-primary/20 hover:border-primary/50 hover:shadow-primary/30 transition-all duration-500">
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-blue-900/10 to-primary/10 opacity-50" />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 blur-2xl" />

              {/* Grid Layout for Contact Methods */}
              <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {memoizedContactMethods.map((method, index) => (
                  <DesktopContactMethodCard key={method.label} method={method} index={index} />
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export const ContactHero = memo(ContactHeroComponent);
