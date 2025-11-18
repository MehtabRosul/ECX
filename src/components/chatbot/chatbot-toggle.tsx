'use client';

import { useChat } from '@/context/chat-context';
import { Bot, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type ChatbotToggleProps = {
  enabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export function ChatbotToggle({ enabled = true, onClick, className }: ChatbotToggleProps) {
  const { isOpen, toggleChat } = useChat();
  const [hasActivated, setHasActivated] = useState(false);
  const [glowActive, setGlowActive] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setHasActivated(false);
      setGlowActive(false);
      return;
    }

    if (!hasActivated) {
      setHasActivated(true);
      setGlowActive(true);
      const timeout = setTimeout(() => setGlowActive(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [enabled, hasActivated]);

  const handleClick = () => {
    if (!enabled) return;
    if (onClick) {
      onClick();
      return;
    }
    toggleChat();
  };

  return (
    <div
      className={cn(
        "relative rounded-lg p-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 via-blue-500 to-purple-500 group",
        enabled ? "animate-cyra-gradient" : "opacity-80",
        glowActive && enabled ? "shadow-[0_0_25px_rgba(129,140,248,0.6)]" : "",
        className
      )}
    >
      {glowActive && enabled && (
        <span className="pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500/50 via-indigo-500/50 to-blue-500/50 blur-xl opacity-70 animate-pulse" />
      )}
      <button
        onClick={handleClick}
        disabled={!enabled}
        className={cn(
          "relative w-full px-4 py-2 text-sm font-semibold rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden",
          enabled
            ? "bg-background/80 text-foreground hover:bg-background/90 hover:scale-[1.02]"
            : "bg-background/50 text-foreground/60 cursor-not-allowed border border-white/10",
          glowActive && enabled ? "shadow-[0_0_30px_rgba(129,140,248,0.45)]" : ""
        )}
        aria-disabled={!enabled}
      >
        {enabled && (
          <>
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/30 via-indigo-400/30 to-blue-400/30 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10" />
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="absolute inset-0 rounded-lg ring-2 ring-primary/0 group-hover:ring-primary/50 group-hover:ring-4 transition-all duration-300" />
          </>
        )}
        <div className="relative z-10">
          <Bot
            className={cn(
              "w-4 h-4 transition-all duration-200 text-primary",
              isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100",
              enabled ? "group-hover:scale-110" : ""
            )}
          />
          <X
            className={cn(
              "w-4 h-4 absolute top-0 left-0 transition-all duration-200 text-primary",
              isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0",
              enabled ? "group-hover:scale-110" : ""
            )}
          />
        </div>
        <span className={cn("relative z-10 transition-colors duration-300", enabled ? "group-hover:text-primary" : "text-foreground/70")}>
          Cyra
        </span>
      </button>
    </div>
  );
}
