'use client';

import { useChat } from '@/context/chat-context';
import { Bot, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function ChatbotToggle() {
  const { isOpen, toggleChat } = useChat();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={toggleChat}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
        "bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/30",
        "text-sm font-medium text-foreground/80 hover:text-foreground",
        isOpen && "bg-primary/10 border-primary/30 text-primary"
      )}
    >
      {/* Icon */}
      <div className="relative">
        <Bot
          className={cn(
            "w-4 h-4 transition-all duration-200",
            isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
          )}
        />
        <X
          className={cn(
            "w-4 h-4 absolute top-0 left-0 transition-all duration-200",
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
          )}
        />
      </div>
      
      {/* Text */}
      <span className="relative">
        AI Assistant
      </span>
      
      {/* Subtle underline */}
      <div className={cn(
        "absolute bottom-0 left-4 right-4 h-px bg-transparent transition-all duration-200",
        "group-hover:bg-primary/50",
        isOpen && "bg-primary/50"
      )} />
    </button>
  );
}
