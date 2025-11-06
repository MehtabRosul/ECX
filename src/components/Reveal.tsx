'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

type RevealProps = {
  className?: string;
  children: React.ReactNode;
};

export function Reveal({ className, children }: RevealProps) {
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render immediately without animation on first mount to prevent blocking
  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      {...(isMobile
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 } })}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}



