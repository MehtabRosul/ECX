'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

interface ChatContextType {
  isOpen: boolean;
  toggleChat: () => void;
  history: Message[];
  addMessage: (message: Message) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<Message[]>([
    {
        role: 'bot',
        content: "Hello! I'm Cyra, your AI assistant. How can I help you today?"
    }
  ]);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const addMessage = useCallback((message: Message) => {
    setHistory(prev => [...prev, message]);
  }, []);

  return (
    <ChatContext.Provider value={{ isOpen, toggleChat, history, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
