'use client';

import { useChat } from '@/context/chat-context';
import { Button } from '@/components/ui/button';
import { Bot, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ChatbotToggle() {
  const { isOpen, toggleChat } = useChat();

  return (
    <Button
      onClick={toggleChat}
      variant="ghost"
      size="icon"
      className="relative w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 group"
    >
      <Bot
        className={cn(
          "w-6 h-6 text-primary transition-transform duration-300 ease-in-out",
          isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"
        )}
      />
      <X
         className={cn(
          "w-6 h-6 text-primary absolute transition-transform duration-300 ease-in-out",
          isOpen ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        )}
      />
      <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-primary/80"></span>
      </span>
      <span className="sr-only">Toggle Chat</span>
    </Button>
  );
}
