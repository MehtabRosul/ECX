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

  // Render immediately with content visible to prevent blank space
  if (!isMounted) {
    return <div className={className} style={{ opacity: 1 }}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, y: 0 }}
      {...(isMobile
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 } })}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}



