import { useEffect, useRef, useState } from 'react';
import { useSmoothAnimation } from './useSmoothAnimation';

interface UseAnimatedCounterProps {
  end: number;
  duration?: number;
  start?: number;
  isVisible: boolean;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function useAnimatedCounter({
  end,
  duration = 2000,
  start = 0,
  isVisible,
  suffix = '',
  prefix = '',
  decimals = 0
}: UseAnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(`${prefix}${start}${suffix}`);
  const { prefersReducedMotion } = useSmoothAnimation();
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const lastEmittedRef = useRef<number>(start);

  useEffect(() => {
    if (!isVisible) {
      lastEmittedRef.current = start;
      setDisplayValue(`${prefix}${start}${suffix}`);
      return;
    }

    if (prefersReducedMotion) {
      setDisplayValue(`${prefix}${end}${suffix}`);
      return;
    }

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Use easeOutBack for a subtle bounce effect at the end
      const easeOutBack = (t: number) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      };
      const easedProgress = easeOutBack(progress);

      const currentCount = start + (end - start) * easedProgress;

      // Format the display value
      let formattedValue: string;
      if (decimals > 0) {
        formattedValue = currentCount.toFixed(decimals);
      } else {
        // Only emit when integer value changes to avoid extra renders
        const floored = Math.floor(currentCount);
        if (floored === Math.floor(lastEmittedRef.current)) {
          frameRef.current = requestAnimationFrame(animate);
          return;
        }
        lastEmittedRef.current = floored;
        formattedValue = String(floored);
      }

      // Add commas for thousands
      if (formattedValue.includes('.')) {
        const [integer, decimal] = formattedValue.split('.');
        formattedValue = `${parseInt(integer).toLocaleString()}.${decimal}`;
      } else {
        formattedValue = parseInt(formattedValue).toLocaleString();
      }

      setDisplayValue(`${prefix}${formattedValue}${suffix}`);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration, start, isVisible, suffix, prefix, decimals, prefersReducedMotion]);

  return { displayValue };
}

// Helper function to parse metric values
export function parseMetricValue(value: string): { number: number; suffix: string; prefix: string } {
  const cleanValue = value.replace(/[^\d.,]/g, '');
  const number = parseFloat(cleanValue.replace(',', ''));
  
  if (value.includes('K')) {
    return { number: number * 1000, suffix: 'K', prefix: '' };
  } else if (value.includes('M')) {
    return { number: number * 1000000, suffix: 'M', prefix: '' };
  } else if (value.includes('ms')) {
    return { number: number, suffix: 'ms', prefix: '' };
  } else if (value.includes('+')) {
    return { number: number, suffix: '+', prefix: '' };
  } else {
    return { number: number, suffix: '', prefix: '' };
  }
}
