'use client';

import { cn } from '@/lib/utils';
import React, { forwardRef, type ComponentProps, type ReactNode } from 'react';

interface AnimatedGradientTextProps extends ComponentProps<'span'> {
  children: ReactNode;
  color?: 'primary' | 'secondary';
  fromColor?: string;
  toColor?: string;
}

const AnimatedGradientText = forwardRef<
  HTMLSpanElement,
  AnimatedGradientTextProps
>(
  (
    { children, className, color = 'primary', fromColor, toColor, ...props },
    ref,
  ) => {
    return (
      <span
        className={cn(
          'animate-gradient bg-gradient-to-r bg-[length:200%_100%] bg-clip-text text-transparent',
          color === 'primary' &&
            'from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.5)]',
          color === 'secondary' &&
            'from-[hsl(var(--muted))] to-[hsl(var(--muted-foreground))]',
          className,
        )}
        ref={ref}
        style={
          fromColor && toColor
            ? {
                '--gradient-from': fromColor,
                '--gradient-to': toColor,
              }
            : undefined
        }
        {...props}
      >
        {children}
      </span>
    );
  },
);

AnimatedGradientText.displayName = 'AnimatedGradientText';

export { AnimatedGradientText };
