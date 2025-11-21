'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useContext, useState, useEffect } from 'react';
import { CookieContext } from '@/contexts/CookieContext';
import { useAuth } from '@/contexts/AuthContext';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CookieSettingsButton() {
  const context = useContext(CookieContext);
  const { user, loading: authLoading } = useAuth();
  const [visible, setVisible] = useState(true);
  const [hasFadedOut, setHasFadedOut] = useState(false);
  
  // Don't render if context is not available
  if (!context) return null;

  const { openPreferences, consentGiven } = context;

  // Continuously monitor auth state and update visibility
  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return;

    // If user is logged in, fade out after 10 seconds
    if (user && consentGiven) {
      if (!hasFadedOut) {
        const timer = setTimeout(() => {
          setVisible(false);
          setHasFadedOut(true);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
      }
    }

    // If user is not logged in, always show the button (no fade out)
    if (!user && consentGiven) {
      setVisible(true);
      setHasFadedOut(false);
    }
  }, [user, authLoading, consentGiven, hasFadedOut]);

  // Reset fade-out state when auth state changes or page refreshes
  useEffect(() => {
    if (consentGiven) {
      // Reset visibility when user state changes
      setHasFadedOut(false);
      setVisible(true);
    }
  }, [user, consentGiven]);

  if (!consentGiven) return null;

  // If auth is still loading, don't show yet
  if (authLoading) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-button"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ 
            duration: 0.3,
            exit: { duration: 0.5, ease: "easeInOut" }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9997] xl:bottom-24"
        >
          <Button
            onClick={openPreferences}
            size="icon"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all group"
            aria-label="Cookie Settings"
          >
            <Cookie className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-cyan-400 rounded-full animate-pulse" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

