import { useEffect, useState } from 'react';

/**
 * Custom hook for smooth animations with reduced motion support
 */
export function useSmoothAnimation() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getAnimationConfig = (baseConfig: any) => {
    if (prefersReducedMotion) {
      return {
        ...baseConfig,
        duration: 0.01,
        type: 'tween',
        ease: 'linear'
      };
    }
    return baseConfig;
  };

  const getTransitionConfig = (baseConfig: any) => {
    if (prefersReducedMotion) {
      return {
        ...baseConfig,
        duration: 0.01,
        ease: 'linear'
      };
    }
    return baseConfig;
  };

  return {
    prefersReducedMotion,
    getAnimationConfig,
    getTransitionConfig
  };
}

/**
 * Hook for optimized intersection observer with smooth animations
 */
export function useSmoothInView(options: IntersectionObserverInit = {}) {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.3,
    rootMargin: '-50px',
    ...options
  };

  const ref = (node: HTMLElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      defaultOptions
    );

    observer.observe(node);
    return () => observer.disconnect();
  };

  return { ref, isInView, hasAnimated };
}
