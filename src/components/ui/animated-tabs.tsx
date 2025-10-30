'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Tab = {
  id: string;
  title: string;
};

export function AnimatedTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
}: {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div
      className={cn("relative grid w-full items-center", className)}
      onMouseLeave={() => setHoveredTab(null)}
      style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          onMouseEnter={() => setHoveredTab(tab.id)}
          className={cn(
            "relative z-10 px-4 py-2 text-sm font-medium transition-colors text-center",
            activeTab === tab.id
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {hoveredTab === tab.id && (
            <motion.span
              layoutId="hover-glow"
              className="absolute inset-0 -z-10 rounded-md bg-white/5"
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
            />
          )}
          {activeTab === tab.id && (
             <motion.div
              layoutId="active-pill"
              className="absolute inset-0 -z-10 rounded-md bg-primary/10"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          {tab.title}
        </button>
      ))}
    </div>
  );
}