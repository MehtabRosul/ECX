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
      className="relative px-4 py-2"
      background="radial-gradient(circle at 50% 50%, hsl(var(--primary)), #000)"
      shimmerColor="hsl(var(--primary) / 0.5)"
    >
      <div className="flex items-center gap-2">
        <span className="relative h-6 w-6">
            <Bot
            className={cn(
                'w-6 h-6 text-primary-foreground transition-transform duration-300 ease-in-out',
                isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
            )}
            />
            <X
            className={cn(
                'w-6 h-6 text-primary-foreground absolute top-0 left-0 transition-transform duration-300 ease-in-out',
                isOpen ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
            )}
            />
        </span>
        <span className="text-sm font-medium text-primary-foreground">AI Assistant</span>
      </div>
    </ShimmerButton>
  );
}
