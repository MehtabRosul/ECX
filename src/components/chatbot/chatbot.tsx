'use client';

import { useChat } from '@/context/chat-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, X, Loader } from 'lucide-react';
import { useEffect, useRef, useState, FormEvent, RefObject } from 'react';
import { intelligentChatbotRAG } from '@/ai/flows/intelligent-chatbot-rag';
import { cn } from '@/lib/utils';
import { ShineBorder } from '../ui/shine-border';
import dynamic from 'next/dynamic';

const LightRays = dynamic(() => import('@/components/ui/light-rays'), {
  ssr: false,
});

const useDraggable = (ref: RefObject<HTMLElement>, handleRef: RefObject<HTMLElement>) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Set initial position once the component mounts on the client
        setPosition({ x: window.innerWidth - 420, y: 90 });

        const handleMouseDown = (e: MouseEvent) => {
            if (handleRef.current && handleRef.current.contains(e.target as Node)) {
                isDragging.current = true;
                const rect = ref.current?.getBoundingClientRect();
                if (rect) {
                    offset.current = {
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                    };
                }
                document.body.style.userSelect = 'none';
            }
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            document.body.style.userSelect = '';
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            setPosition({
                x: e.clientX - offset.current.x,
                y: e.clientY - offset.current.y,
            });
        };
        
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [ref, handleRef]);

    return position;
};


export function Chatbot() {
  const { isOpen, toggleChat, history, addMessage } = useChat();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const position = useDraggable(draggableRef, handleRef);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    addMessage(userMessage);
    setInput('');
    setIsTyping(true);

    try {
      const result = await intelligentChatbotRAG({ query: input });
      const botMessage = { role: 'bot' as const, content: result.answer };
      addMessage(botMessage);
    } catch (error) {
      console.error('Error with chatbot:', error);
      const errorMessage = { role: 'bot' as const, content: 'Sorry, something went wrong. Please try again.' };
      addMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={draggableRef}
      className="fixed z-50 shadow-2xl rounded-lg"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        right: 'auto',
        bottom: 'auto',
       }}
    >
      <ShineBorder
        className="w-[400px] h-[600px] bg-background/80 backdrop-blur-xl"
        color={['#2B8DBE', '#4896BD', '#2B8DBE']}
      >
        <div className="relative w-full h-full">
            <div className="absolute inset-0 -z-10">
                <LightRays
                    raysColor="hsl(var(--primary))"
                    lightSpread={0.3}
                    raysSpeed={1.0}
                    rayLength={1.5}
                    noiseAmount={0.1}
                />
            </div>
            <Card className="w-full h-full flex flex-col bg-transparent border-0 shadow-none">
            <div ref={handleRef} className="p-4 border-b border-border/40 flex justify-between items-center cursor-move">
                <h3 className="font-bold flex items-center gap-2"><Bot className="w-5 h-5 text-primary" /> AI Assistant</h3>
                <Button variant="ghost" size="icon" onClick={toggleChat}>
                <X className="w-4 h-4" />
                </Button>
            </div>
            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                {history.map((msg, index) => (
                <div
                    key={index}
                    className={cn(
                    'flex items-start gap-3',
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                >
                    {msg.role === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-primary" />
                    </div>
                    )}
                    <div
                    className={cn(
                        'p-3 rounded-lg max-w-[80%]',
                        msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                    >
                    <p className="text-sm">{msg.content}</p>
                    </div>
                    {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                    )}
                </div>
                ))}
                {isTyping && (
                <div className="flex items-start gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div className="p-3 rounded-lg bg-muted flex items-center space-x-1">
                        <Loader className="w-4 h-4 animate-spin text-muted-foreground"/>
                        <span className="text-sm text-muted-foreground">AI is thinking...</span>
                    </div>
                </div>
                )}
            </div>
            <div className="p-4 border-t border-border/40">
                <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1"
                    disabled={isTyping}
                />
                <Button type="submit" size="icon" disabled={isTyping}>
                    <Send className="w-4 h-4" />
                </Button>
                </form>
            </div>
            </Card>
        </div>
      </ShineBorder>
    </div>
  );
}
