'use client';
import React, { useRef, useEffect, useState, memo, useMemo } from 'react';

interface FadeContentProps {
  children: React.ReactNode;
  blur?: boolean;
  duration?: number;
  easing?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
}

const FadeContent = memo(function FadeContent({
  children,
  blur = false,
  duration = 1000,
  easing = 'ease-out',
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  className = ''
}: FadeContentProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    let timeoutId: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(currentRef);
          timeoutId = setTimeout(() => {
            setInView(true);
          }, delay);
        }
      },
      { threshold, rootMargin: '50px' }
    );

    observer.observe(currentRef);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay]);

  const style = useMemo(() => ({
    opacity: inView ? 1 : initialOpacity,
    transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
    transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}${blur ? `, filter ${duration}ms ${easing}` : ''}`,
    filter: blur ? (inView ? 'blur(0px)' : 'blur(10px)') : 'none',
    willChange: inView ? 'auto' : 'opacity, transform, filter',
  }), [inView, initialOpacity, duration, easing, blur]);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
});

export default FadeContent;
