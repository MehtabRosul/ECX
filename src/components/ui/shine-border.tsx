"use client";

import React, { memo, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface ShineBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string[];
  borderWidth?: number;
  duration?: number;
}

export const ShineBorder = memo(function ShineBorder({
  children,
  className,
  color = ['#2B8DBE', '#4896BD', '#2B8DBE'],
  borderWidth = 1,
  duration = 7,
}: ShineBorderProps) {
  const borderStyle = useMemo(() => ({
    '--border-width': `${borderWidth}px`,
    '--border-radius': 'var(--radius)',
    '--shine-duration': `${duration}s`,
    '--shine-gradient': `linear-gradient(90deg, transparent, ${color[0]}, ${color[1]}, ${color[2]}, transparent)`,
  } as React.CSSProperties), [borderWidth, duration, color]);

  return (
    <div style={borderStyle} className={cn('relative rounded-[var(--border-radius)] transform-gpu', className)}>
      <div className="absolute inset-0 rounded-[var(--border-radius)] bg-[var(--shine-gradient)] bg-[length:250%_100%] animate-shine will-change-transform" />
      <div className="relative z-10 h-full w-full rounded-[var(--border-radius)]">
        {children}
      </div>
    </div>
  );
});
