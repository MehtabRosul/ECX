'use client';

import { useChat } from '@/context/chat-context';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Bot, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ChatbotToggle() {
  const { isOpen, toggleChat } = useChat();

  return (
    <ShimmerButton
      onClick={toggleChat}
      className="relative w-12 h-12 rounded-full"
      background="hsl(var(--primary))"
      shimmerColor="hsl(var(--primary-foreground))"
    >
      <Bot
        className={cn(
          'w-6 h-6 text-primary-foreground transition-transform duration-300 ease-in-out',
          isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        )}
      />
      <X
        className={cn(
          'w-6 h-6 text-primary-foreground absolute transition-transform duration-300 ease-in-out',
          isOpen ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        )}
      />
      <span className="sr-only">Toggle Chat</span>
    </ShimmerButton>
  );
}
