'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTabsContext } from '@radix-ui/react-tabs';

type Tab = {
  id: string;
  title: string;
};

export function AnimatedTabs({ tabs }: { tabs: Tab[] }) {
  const tabsContext = useTabsContext();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  if (!tabsContext || !tabsContext.value) {
    console.warn('AnimatedTabs must be used within a Tabs component from Radix UI');
    return null;
  }
  
  const activeTab = tabsContext.value;

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseLeave={() => setHoveredTab(null)}
    >
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => tabsContext.onValueChange?.(tab.id)}
          onMouseEnter={() => setHoveredTab(tab.id)}
          className={cn(
            'relative z-10 px-4 py-2 text-sm font-medium transition-colors',
            activeTab === tab.id
              ? 'text-white'
              : 'text-muted-foreground hover:text-white'
          )}
        >
          {hoveredTab === tab.id && (
            <motion.div
              layoutId="hover-glow"
              className="absolute inset-0 -z-10 rounded-md bg-primary/20"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 -z-10 rounded-md bg-primary"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          {tab.title}
        </button>
      ))}
    </div>
  );
}
