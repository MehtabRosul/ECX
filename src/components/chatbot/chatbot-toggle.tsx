'use client';

import { useChat } from '@/context/chat-context';
import { Bot, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';

export function ChatbotToggle() {
  const { isOpen, toggleChat } = useChat();

  return (
    <div 
        className="group relative flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#2B8DBE1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#2B8DBE3f] cursor-pointer"
        onClick={toggleChat}
    >
      <span
        className={cn(
          "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 bg-[length:300%_100%] p-[1px]"
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
        }}
      />
      <div className="flex items-center gap-2">
         <span className="relative h-4 w-4">
            <Bot
            className={cn(
                'w-4 h-4 text-primary transition-transform duration-300 ease-in-out',
                isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
            )}
            />
            <X
            className={cn(
                'w-4 h-4 text-primary absolute top-0 left-0 transition-transform duration-300 ease-in-out',
                isOpen ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
            )}
            />
        </span>
        <AnimatedGradientText className="text-sm font-medium">
             AI Assistant
        </AnimatedGradientText>
      </div>
    </div>
  );
}
