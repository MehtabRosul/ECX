'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCookieConsent } from '@/contexts/CookieContext';
import { Shield, Settings, ChevronRight, X, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { CookieContext } from '@/contexts/CookieContext';

export function CookieConsentBanner() {
  const context = useContext(CookieContext);
  
  // Don't render if context is not available
  if (!context) return null;

  const { showBanner, acceptAll, rejectAll, openPreferences } = context;

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop - Lighter on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 sm:bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 200
            }}
            className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-4"
          >
            <div className="container max-w-5xl mx-auto">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-primary/20 bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-xl shadow-2xl">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-cyan-500/10 to-purple-500/10 opacity-50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_50%)]" />
                
                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-xl sm:rounded-2xl"
                  animate={{
                    background: [
                      'linear-gradient(90deg, rgba(59,130,246,0.3) 0%, rgba(139,92,246,0.3) 100%)',
                      'linear-gradient(180deg, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.3) 100%)',
                      'linear-gradient(270deg, rgba(59,130,246,0.3) 0%, rgba(139,92,246,0.3) 100%)',
                      'linear-gradient(360deg, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.3) 100%)',
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '1px',
                  }}
                />

                <div className="relative p-3 sm:p-4 md:p-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    {/* Icon and Content - Compact */}
                    <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                        className="flex-shrink-0"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/30 blur-lg rounded-lg" />
                          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg">
                            <Cookie className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                        </div>
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-white mb-1 flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                          <span className="truncate">We Value Your Privacy</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                          We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                          By clicking "Accept All", you consent to our use of cookies.
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons - Compact */}
                    <div className="flex flex-row items-center gap-2 sm:gap-2.5 w-full sm:w-auto flex-shrink-0">
                      {/* Mobile: Customize on left side, Reject and Accept All on right */}
                      {/* Desktop: Reject, Customize (middle), Accept All */}
                      <Button
                        onClick={openPreferences}
                        variant="ghost"
                        size="sm"
                        className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all flex items-center gap-1.5 flex-shrink-0 order-first sm:order-none"
                      >
                        <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Customize</span>
                      </Button>
                      
                      <div className="flex items-center gap-2 sm:gap-2.5 flex-1 sm:flex-initial sm:ml-auto">
                        <Button
                          onClick={rejectAll}
                          variant="outline"
                          size="sm"
                          className="h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500 transition-all flex-shrink-0 flex-1 sm:flex-initial"
                        >
                          Reject
                        </Button>
                        
                        <Button
                          onClick={acceptAll}
                          size="sm"
                          className="h-8 sm:h-9 px-2 sm:px-4 text-xs sm:text-sm bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center gap-1 sm:gap-1.5 group flex-shrink-0 flex-1 sm:flex-initial"
                        >
                          <span>Accept All</span>
                          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Learn More Link - Compact */}
                  <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-slate-700/50">
                    <a
                      href="/legal#cookies"
                      className="text-[10px] sm:text-xs text-slate-400 hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      Learn more about our cookie policy
                      <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

