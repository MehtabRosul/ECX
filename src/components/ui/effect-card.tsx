'use client';
import React, { useRef, useState, MouseEvent } from 'react';
import { cn } from '@/lib/utils';

const ParallaxTilt = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { offsetWidth: width, offsetHeight: height } = ref.current;
    const { clientX, clientY } = e;
    
    const x = (clientX - ref.current.offsetLeft - width / 2) / width;
    const y = (clientY - ref.current.offsetTop - height / 2) / height;
    setCoords({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={cn('perspective-1000', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="transform-style-3d h-full w-full transition-transform duration-500 ease-out"
        style={{
          transform: isHovering
            ? `translateX(${coords.x * 20}px) translateY(${coords.y * 20}px) rotateX(${-coords.y * 20}deg) rotateY(${coords.x * 20}deg)`
            : 'translateX(0) translateY(0) rotateX(0) rotateY(0)',
        }}
      >
        {children}
      </div>
    </div>
  );
};


export const EffectCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <ParallaxTilt>
      <div className="group relative h-full min-h-[20rem] w-full transform-style-3d rounded-xl border border-white/10 bg-surface-2 [box-shadow:0_0_0_1px_rgba(255,255,255,0.08)_inset,0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="absolute inset-0 rounded-xl bg-dot-pattern opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div
          className="absolute inset-0 h-full w-full rounded-xl opacity-0 [background-image:radial-gradient(ellipse_at_center,rgba(43,141,190,0.25)_0%,transparent_60%)] transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="relative h-full w-full">
          {children}
        </div>
      </div>
    </ParallaxTilt>
  );
};
