
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Logo = ({ className }: { className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      aria-label="EncryptArx Homepage" 
      className={cn(
        "group relative flex items-center cursor-pointer transition-all duration-300",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ECX Logo SVG */}
      <div className="relative mr-4">
        {/* Glow effect */}
        <div className={cn(
          "absolute inset-0 rounded-lg transition-all duration-300",
          "bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20",
          "opacity-0 blur-md scale-110",
          isHovered && "opacity-100"
        )} />
        
        {/* Logo container */}
        <div className="relative flex h-16 w-16 items-center justify-center transition-all duration-300">
          <Image
            src="/ecx-logo.svg"
            alt="ECX Logo"
            width={64}
            height={64}
            className={cn(
              "transition-all duration-300",
              isHovered && "scale-110"
            )}
            priority
          />
        </div>
      </div>

      {/* Company name */}
      <div className="relative">
        <span 
          className={cn(
            "text-2xl tracking-tight transition-all duration-300",
            "encryptarx-gradient-text"
          )}
          style={{ 
            WebkitTextFillColor: 'transparent',
            color: 'transparent'
          }}
        >
          EncryptArx
        </span>
        
        {/* Subtle underline */}
        <div className={cn(
          "absolute bottom-0 left-0 h-px bg-primary transition-all duration-300",
          "w-0 group-hover:w-full"
        )} />
      </div>
    </div>
  );
};

export default Logo;
