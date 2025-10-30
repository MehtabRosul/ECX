'use client';

import { motion } from 'framer-motion';
import React from 'react';

type RevealProps = {
  className?: string;
  children: React.ReactNode;
};

export function Reveal({ className, children }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}



