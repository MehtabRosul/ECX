import React from 'react';
import { cn } from '@/lib/utils';

interface NeonGradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NeonGradientCard({ 
  children, 
  className, 
  ...props 
}: NeonGradientCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-white/10 bg-gradient-to-br from-surface-2/50 to-surface-1/50 backdrop-blur-sm",
        "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-primary/10 before:to-accent/10 before:opacity-0 before:transition-opacity before:duration-300",
        "hover:before:opacity-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10",
        "transition-all duration-300",
        className
      )}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

