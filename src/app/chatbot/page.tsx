'use client';

import { useChat } from '@/context/chat-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, ArrowLeft, Loader } from 'lucide-react';
import { useEffect, useRef, useState, FormEvent } from 'react';
import { intelligentChatbotRAG } from '@/ai/flows/intelligent-chatbot-rag';
import { cn } from '@/lib/utils';
import { ShineBorder } from '@/components/ui/shine-border';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const LightRays = dynamic(() => import('@/components/ui/light-rays'), {
  ssr: false,
});


export default function ChatbotPage() {
  const { isOpen, toggleChat, history, addMessage } = useChat();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Trigger opening animation
    const timer = setTimeout(() => {
      setIsOpening(false);
    }, 50); // Small delay to ensure smooth animation
    return () => clearTimeout(timer);
  }, []);

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

  const handleBackClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      window.history.back();
    }, 300); // Match the animation duration
  };

  return (
    <div className={`min-h-screen bg-black relative overflow-hidden transition-all duration-300 ease-in-out ${
      isClosing ? 'transform -translate-x-full' : 
      isOpening ? 'transform translate-x-full' : 
      'transform translate-x-0'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-60" />
        <div className="absolute inset-0">
          <LightRays
            raysColor="hsl(210, 100%, 50%)"
            lightSpread={0.6}
            raysSpeed={1.2}
            rayLength={2.5}
            noiseAmount={0.3}
          />
        </div>
        {/* Random size blue bubbles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => {
            const bubbleSizes = [
              { size: 'w-4 h-4', opacity: 'opacity-60' },
              { size: 'w-6 h-6', opacity: 'opacity-40' },
              { size: 'w-8 h-8', opacity: 'opacity-50' },
              { size: 'w-12 h-12', opacity: 'opacity-30' },
              { size: 'w-16 h-16', opacity: 'opacity-25' },
              { size: 'w-20 h-20', opacity: 'opacity-20' },
              { size: 'w-24 h-24', opacity: 'opacity-15' },
              { size: 'w-32 h-32', opacity: 'opacity-10' }
            ];
            const bubblePositions = [
              { left: '5%', top: '10%', delay: '0s', duration: '3s' },
              { left: '15%', top: '25%', delay: '0.5s', duration: '4s' },
              { left: '25%', top: '40%', delay: '1s', duration: '2.5s' },
              { left: '35%', top: '55%', delay: '1.5s', duration: '3.5s' },
              { left: '45%', top: '70%', delay: '2s', duration: '2.8s' },
              { left: '55%', top: '85%', delay: '0.3s', duration: '3.2s' },
              { left: '65%', top: '15%', delay: '1.2s', duration: '2.2s' },
              { left: '75%', top: '30%', delay: '0.8s', duration: '3.8s' },
              { left: '85%', top: '45%', delay: '2.2s', duration: '2.6s' },
              { left: '95%', top: '60%', delay: '0.7s', duration: '3.1s' },
              { left: '10%', top: '75%', delay: '1.8s', duration: '2.9s' },
              { left: '20%', top: '90%', delay: '0.2s', duration: '3.4s' },
              { left: '30%', top: '5%', delay: '1.3s', duration: '2.7s' },
              { left: '40%', top: '20%', delay: '0.9s', duration: '3.6s' },
              { left: '50%', top: '35%', delay: '2.1s', duration: '2.4s' },
              { left: '60%', top: '50%', delay: '0.6s', duration: '3.3s' },
              { left: '70%', top: '65%', delay: '1.7s', duration: '2.8s' },
              { left: '80%', top: '80%', delay: '0.4s', duration: '3.7s' },
              { left: '90%', top: '95%', delay: '1.6s', duration: '2.3s' },
              { left: '8%', top: '50%', delay: '0.1s', duration: '3.9s' },
              { left: '18%', top: '65%', delay: '1.4s', duration: '2.1s' },
              { left: '28%', top: '80%', delay: '2.3s', duration: '3.5s' },
              { left: '38%', top: '95%', delay: '0.9s', duration: '2.6s' },
              { left: '48%', top: '10%', delay: '1.1s', duration: '3.2s' },
              { left: '58%', top: '25%', delay: '0.3s', duration: '2.9s' }
            ];
            const size = bubbleSizes[i % bubbleSizes.length];
            const pos = bubblePositions[i % bubblePositions.length];
            return (
              <div
                key={i}
                className={`absolute ${size.size} bg-blue-400 rounded-full animate-bounce ${size.opacity}`}
                style={{
                  left: pos.left,
                  top: pos.top,
                  animationDelay: pos.delay,
                  animationDuration: pos.duration,
                }}
              />
            );
          })}
        </div>
        {/* Large floating bubbles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => {
            const largeBubblePositions = [
              { left: '10%', top: '20%', delay: '0s', duration: '6s', size: 'w-40 h-40' },
              { left: '70%', top: '30%', delay: '1s', duration: '8s', size: 'w-32 h-32' },
              { left: '30%', top: '60%', delay: '2s', duration: '7s', size: 'w-48 h-48' },
              { left: '80%', top: '70%', delay: '0.5s', duration: '5s', size: 'w-36 h-36' },
              { left: '5%', top: '80%', delay: '1.5s', duration: '9s', size: 'w-44 h-44' },
              { left: '60%', top: '10%', delay: '3s', duration: '6.5s', size: 'w-28 h-28' },
              { left: '90%', top: '50%', delay: '1.2s', duration: '7.5s', size: 'w-52 h-52' },
              { left: '40%', top: '90%', delay: '2.5s', duration: '8.5s', size: 'w-38 h-38' }
            ];
            const pos = largeBubblePositions[i];
            return (
              <div
                key={i}
                className={`absolute ${pos.size} bg-blue-500/30 rounded-full animate-pulse blur-sm`}
                style={{
                  left: pos.left,
                  top: pos.top,
                  animationDelay: pos.delay,
                  animationDuration: pos.duration,
                }}
              />
            );
          })}
        </div>
        {/* Moving gradient lines */}
        <div className="absolute inset-0">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-pulse" style={{ top: '20%', animationDuration: '4s' }} />
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-pulse" style={{ top: '60%', animationDuration: '6s', animationDelay: '2s' }} />
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-600/25 to-transparent animate-pulse" style={{ top: '80%', animationDuration: '5s', animationDelay: '1s' }} />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-blue-500/20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-start">
            <button 
              onClick={handleBackClick}
              className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Chatbot Interface */}
      <div className="h-[calc(100vh-80px)] flex flex-col">
        <div className="flex-1 flex flex-col max-w-full mx-auto w-full relative">
          <ShineBorder
            className="flex-1 mx-2 my-2 bg-black/40 backdrop-blur-xl border border-blue-500/30"
            color={['#3B82F6', '#1D4ED8', '#3B82F6']}
          >
            <div className="relative w-full h-full flex flex-col">
              {/* Animated Background inside chat */}
              <div className="absolute inset-0 -z-10">
                {/* Truly random floating bubbles */}
                {[...Array(30)].map((_, i) => {
                  // Generate truly random positions and sizes
                  const randomSizes = [
                    { size: 'w-4 h-4', opacity: 'opacity-[0.03]' },
                    { size: 'w-6 h-6', opacity: 'opacity-[0.025]' },
                    { size: 'w-8 h-8', opacity: 'opacity-[0.02]' },
                    { size: 'w-10 h-10', opacity: 'opacity-[0.015]' },
                    { size: 'w-12 h-12', opacity: 'opacity-[0.012]' },
                    { size: 'w-14 h-14', opacity: 'opacity-[0.01]' },
                    { size: 'w-16 h-16', opacity: 'opacity-[0.008]' },
                    { size: 'w-18 h-18', opacity: 'opacity-[0.006]' },
                    { size: 'w-20 h-20', opacity: 'opacity-[0.005]' },
                    { size: 'w-24 h-24', opacity: 'opacity-[0.003]' }
                  ];
                  
                  // Truly random positions across the entire screen
                  const randomPositions = [
                    { left: '3%', top: '7%', delay: '0s', duration: '6s' },
                    { left: '12%', top: '23%', delay: '0.3s', duration: '7s' },
                    { left: '28%', top: '41%', delay: '1.2s', duration: '5s' },
                    { left: '45%', top: '19%', delay: '0.8s', duration: '8s' },
                    { left: '67%', top: '35%', delay: '2.1s', duration: '6.5s' },
                    { left: '83%', top: '52%', delay: '0.5s', duration: '7.2s' },
                    { left: '91%', top: '78%', delay: '1.7s', duration: '5.8s' },
                    { left: '76%', top: '89%', delay: '0.9s', duration: '6.8s' },
                    { left: '54%', top: '94%', delay: '2.3s', duration: '7.5s' },
                    { left: '31%', top: '87%', delay: '0.4s', duration: '5.2s' },
                    { left: '8%', top: '73%', delay: '1.6s', duration: '8.1s' },
                    { left: '19%', top: '56%', delay: '0.7s', duration: '6.3s' },
                    { left: '37%', top: '38%', delay: '2.5s', duration: '7.8s' },
                    { left: '59%', top: '14%', delay: '0.2s', duration: '5.9s' },
                    { left: '72%', top: '6%', delay: '1.4s', duration: '6.7s' },
                    { left: '89%', top: '29%', delay: '0.6s', duration: '8.3s' },
                    { left: '95%', top: '67%', delay: '2.0s', duration: '5.4s' },
                    { left: '78%', top: '84%', delay: '1.1s', duration: '7.1s' },
                    { left: '52%', top: '76%', delay: '0.3s', duration: '6.2s' },
                    { left: '24%', top: '62%', delay: '1.8s', duration: '8.7s' },
                    { left: '6%', top: '41%', delay: '0.9s', duration: '5.6s' },
                    { left: '15%', top: '12%', delay: '2.4s', duration: '7.3s' },
                    { left: '41%', top: '4%', delay: '0.1s', duration: '6.9s' },
                    { left: '63%', top: '26%', delay: '1.5s', duration: '5.7s' },
                    { left: '86%', top: '43%', delay: '0.8s', duration: '8.4s' },
                    { left: '97%', top: '71%', delay: '2.2s', duration: '6.1s' },
                    { left: '71%', top: '95%', delay: '0.5s', duration: '7.6s' },
                    { left: '43%', top: '88%', delay: '1.9s', duration: '5.3s' },
                    { left: '17%', top: '69%', delay: '0.7s', duration: '8.9s' },
                    { left: '9%', top: '34%', delay: '1.3s', duration: '6.4s' }
                  ];
                  
                  const size = randomSizes[i % randomSizes.length];
                  const pos = randomPositions[i % randomPositions.length];
                  
                  return (
                    <div
                      key={i}
                      className={`absolute ${size.size} bg-blue-400 rounded-full animate-pulse ${size.opacity}`}
                      style={{
                        left: pos.left,
                        top: pos.top,
                        animationDelay: pos.delay,
                        animationDuration: pos.duration,
                      }}
                    />
                  );
                })}
                
                {/* Large floating orbs with truly random movement */}
                {[...Array(8)].map((_, i) => {
                  const largeOrbPositions = [
                    { left: '7%', top: '15%', delay: '0s', duration: '12s', size: 'w-32 h-32' },
                    { left: '73%', top: '28%', delay: '1.5s', duration: '15s', size: 'w-28 h-28' },
                    { left: '35%', top: '65%', delay: '3s', duration: '11s', size: 'w-36 h-36' },
                    { left: '82%', top: '78%', delay: '0.8s', duration: '13s', size: 'w-30 h-30' },
                    { left: '13%', top: '85%', delay: '2.2s', duration: '16s', size: 'w-34 h-34' },
                    { left: '58%', top: '12%', delay: '4s', duration: '10s', size: 'w-26 h-26' },
                    { left: '91%', top: '45%', delay: '1.2s', duration: '14s', size: 'w-38 h-38' },
                    { left: '42%', top: '92%', delay: '2.8s', duration: '17s', size: 'w-32 h-32' }
                  ];
                  const pos = largeOrbPositions[i];
                  return (
                    <div
                      key={i}
                      className={`absolute ${pos.size} bg-blue-500/10 rounded-full animate-pulse blur-sm opacity-[0.008]`}
                      style={{
                        left: pos.left,
                        top: pos.top,
                        animationDelay: pos.delay,
                        animationDuration: pos.duration,
                      }}
                    />
                  );
                })}
              </div>
              
              {/* Chat Header */}
              <div className="p-4 border-b border-blue-500/20 flex justify-center items-center relative z-10">
                <h3 className="font-bold flex items-center gap-2 text-white">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-blue-400" />
                  </div>
                    Cyra
                  </h3>
                </div>
                
                {/* Chat Messages */}
              <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4 relative z-10">
                {history.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Bot className="w-8 h-8 text-blue-400" />
                      </div>
                      <p className="text-gray-400 text-sm">Hello! I'm Cyra, your AI assistant. How can I help you today?</p>
                    </div>
                  </div>
                )}
                
                  {history.map((msg, index) => (
                    <div
                      key={index}
                      className={cn(
                      'flex items-start gap-3 animate-in slide-in-from-bottom-2 duration-300',
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {msg.role === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-blue-400" />
                        </div>
                      )}
                      <div
                        className={cn(
                        'p-3 rounded-2xl max-w-[85%] shadow-lg',
                          msg.role === 'user'
                          ? 'bg-blue-500 text-white rounded-br-md'
                          : 'bg-gray-800/80 text-white border border-gray-700/50 rounded-bl-md'
                        )}
                      >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                      {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-gray-300" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                  <div className="flex items-start gap-3 justify-start animate-in slide-in-from-bottom-2 duration-300">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-blue-400" />
                      </div>
                    <div className="p-3 rounded-2xl bg-gray-800/80 border border-gray-700/50 flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-sm text-gray-400">AI is thinking...</span>
                      </div>
                    </div>
                  )}
                </div>
                
              {/* Mobile Input Form */}
              <div className="p-6 border-t border-blue-500/20 bg-black/40 relative z-10">
                <form onSubmit={handleSubmit} className="flex gap-3">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                    className="flex-1 bg-gray-800/80 border-gray-700/50 text-white placeholder:text-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20"
                      disabled={isTyping}
                    />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isTyping}
                    className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                  >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
            </div>
          </ShineBorder>
        </div>
      </div>
    </div>
  );
}
