'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState, useCallback, memo } from 'react';

interface HeroButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

export const HeroButton = memo(function HeroButton({ href, children, variant = 'primary', icon }: HeroButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleHoverStart = useCallback(() => setIsHovered(true), []);
  const handleHoverEnd = useCallback(() => setIsHovered(false), []);

  if (variant === 'primary') {
    return (
      <motion.div
        className="relative group"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ willChange: 'transform' }}
      >
        {/* Animated background gradient */}
        <Link
          href={href}
          onMouseMove={handleMouseMove}
          className="relative overflow-hidden rounded-2xl px-10 py-6 text-lg font-bold text-white 
                     bg-gradient-to-r from-primary via-blue-500 to-cyan-500
                     shadow-[0_0_40px_rgba(59,130,246,0.5),0_4px_20px_rgba(0,0,0,0.2)]
                     border border-white/20
                     transition-all duration-500
                     flex items-center justify-center gap-3
                     group/button
                     hover:shadow-[0_0_60px_rgba(59,130,246,0.8),0_8px_30px_rgba(6,182,212,0.4)]
                     hover:border-white/40
                     hover:scale-[1.02]
                     active:scale-[0.98]"
        >
          {/* Animated shimmer sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: isHovered ? ['-200%', '200%'] : '-200%',
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: 'linear',
            }}
            style={{ willChange: 'transform' }}
          />

          {/* Mouse-following spotlight */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.4), transparent 60%)`,
            }}
          />

          {/* Pulsing inner glow */}
          <motion.div
            className="absolute inset-2 rounded-xl opacity-0 group-hover/button:opacity-50 transition-opacity duration-500"
            animate={{
              opacity: isHovered ? [0.3, 0.6, 0.3] : 0,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: 'easeInOut',
            }}
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)',
              willChange: 'opacity'
            }}
          />

          {/* Content */}
          <span className="relative z-10 flex items-center gap-3">
            {children}
            <motion.div
              animate={{
                x: isHovered ? [0, 4, 0] : 0,
              }}
              transition={{
                duration: 1.5,
                repeat: isHovered ? Infinity : 0,
                ease: 'easeInOut',
              }}
              style={{ willChange: 'transform' }}
            >
              {icon || <ArrowRight className="w-5 h-5" />}
            </motion.div>
          </span>

          {/* Outer glow ring */}
          <motion.div
            className="absolute -inset-1 rounded-2xl opacity-0 group-hover/button:opacity-100 pointer-events-none"
            animate={{
              boxShadow: isHovered
                ? [
                    '0 0 30px rgba(59,130,246,0.6), 0 0 60px rgba(6,182,212,0.4)',
                    '0 0 50px rgba(59,130,246,0.8), 0 0 90px rgba(6,182,212,0.6)',
                    '0 0 30px rgba(59,130,246,0.6), 0 0 60px rgba(6,182,212,0.4)',
                  ]
                : '0 0 0px rgba(59,130,246,0)',
            }}
            transition={{
              duration: 2.5,
              repeat: isHovered ? Infinity : 0,
              ease: 'easeInOut',
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(6,182,212,0.3))',
              filter: 'blur(12px)',
              willChange: 'box-shadow'
            }}
          />
        </Link>

        {/* Floating particles effect on hover - positioned outside button */}
        {isHovered && (
          <>
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const distance = 90;
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{
                    x: '-50%',
                    y: '-50%',
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: `calc(-50% + ${Math.cos(angle) * distance}px)`,
                    y: `calc(-50% + ${Math.sin(angle) * distance}px)`,
                    opacity: [0, 1, 0.9, 0],
                    scale: [0, 1.8, 1.2, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.12,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              );
            })}
          </>
        )}
      </motion.div>
    );
  }

  // Secondary button with glassmorphism effect
  return (
    <motion.div
      className="relative group"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ willChange: 'transform' }}
    >
      <Link
        href={href}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden rounded-2xl px-10 py-6 text-lg font-bold
                   bg-gradient-to-br from-background/70 via-background/50 to-background/70
                   backdrop-blur-2xl
                   border-2 border-primary/40
                   shadow-[0_10px_40px_rgba(0,0,0,0.15),0_0_20px_rgba(59,130,246,0.1)]
                   text-foreground
                   transition-all duration-500
                   flex items-center justify-center gap-3
                   group/button
                   hover:border-primary/70
                   hover:bg-gradient-to-br hover:from-background/90 hover:via-background/70 hover:to-background/90
                   hover:shadow-[0_15px_60px_rgba(59,130,246,0.3),0_0_30px_rgba(6,182,212,0.2)]
                   hover:scale-[1.02]
                   active:scale-[0.98]"
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.2), transparent 50%)`,
          }}
        />

        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover/button:opacity-100"
          animate={{
            x: isHovered ? ['-100%', '200%'] : '-100%',
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear',
          }}
          style={{ willChange: 'transform' }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-3">
          {children}
          {icon && (
            <motion.div
              animate={{
                rotate: isHovered ? [0, 15, -15, 0] : 0,
                scale: isHovered ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 1,
                repeat: isHovered ? Infinity : 0,
                ease: 'easeInOut',
              }}
              style={{ willChange: 'transform' }}
            >
              {icon}
            </motion.div>
          )}
        </span>

        {/* Outer glow on hover */}
        <motion.div
          className="absolute -inset-2 rounded-2xl blur-2xl opacity-0 group-hover/button:opacity-70 transition-opacity duration-500 -z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.5), rgba(6,182,212,0.5))',
            willChange: 'transform, opacity'
          }}
          animate={{
            opacity: isHovered ? [0.4, 0.8, 0.4] : 0,
            scale: isHovered ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 2.5,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />

        {/* Inner highlight shine */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full rounded-2xl opacity-0 group-hover/button:opacity-30 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
          }}
        />

        {/* Animated border glow */}
        <motion.div
          className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover/button:opacity-100 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.4), rgba(6,182,212,0.4))',
            filter: 'blur(8px)',
            willChange: 'opacity'
          }}
          animate={{
            opacity: isHovered ? [0.4, 0.7, 0.4] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      </Link>

      {/* Floating sparkles on hover */}
      {isHovered && (
        <>
          {[...Array(6)].map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const distance = 70;
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)] pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{
                  x: '-50%',
                  y: '-50%',
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  x: `calc(-50% + ${Math.cos(angle) * distance}px)`,
                  y: `calc(-50% + ${Math.sin(angle) * distance}px)`,
                  opacity: [0, 0.9, 0.7, 0],
                  scale: [0, 1.5, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            );
          })}
        </>
      )}
    </motion.div>
  );
});

