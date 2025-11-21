'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { X, Sparkles, MessageCircle, Users, Briefcase, Zap } from 'lucide-react';

const CHECK_INTERVAL = 90000; // 1.5 minutes in milliseconds
const MAX_DISMISSALS = 3;
const STORAGE_KEY_DISMISSAL_COUNT = 'loginPromptDismissalCount';
const STORAGE_KEY_LAST_DISMISSAL_TIME = 'loginPromptLastDismissalTime';

export function LoginPromptNotification() {
  const { user, loading: authLoading } = useAuth();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Don't show on auth pages
  const isAuthPage = pathname?.startsWith('/auth');

  // Get dismissal count and last dismissal time
  const getDismissalCount = useCallback(() => {
    if (typeof window === 'undefined') return 0;
    const count = localStorage.getItem(STORAGE_KEY_DISMISSAL_COUNT);
    return count ? parseInt(count, 10) : 0;
  }, []);

  const getLastDismissalTime = useCallback(() => {
    if (typeof window === 'undefined') return null;
    const time = localStorage.getItem(STORAGE_KEY_LAST_DISMISSAL_TIME);
    return time ? parseInt(time, 10) : null;
  }, []);

  const incrementDismissalCount = useCallback(() => {
    if (typeof window === 'undefined') return;
    const currentCount = getDismissalCount();
    const newCount = currentCount + 1;
    localStorage.setItem(STORAGE_KEY_DISMISSAL_COUNT, newCount.toString());
    localStorage.setItem(STORAGE_KEY_LAST_DISMISSAL_TIME, Date.now().toString());
  }, [getDismissalCount]);

  const shouldShowNotification = useCallback(() => {
    const dismissalCount = getDismissalCount();
    
    // Don't show if dismissed 3 or more times
    if (dismissalCount >= MAX_DISMISSALS) {
      return false;
    }

    const lastDismissalTime = getLastDismissalTime();
    
    // If never dismissed, show it
    if (!lastDismissalTime) {
      return true;
    }

    // If dismissed, check if 1.5 minutes have passed
    const timeSinceDismissal = Date.now() - lastDismissalTime;
    return timeSinceDismissal >= CHECK_INTERVAL;
  }, [getDismissalCount, getLastDismissalTime]);

  // Initialize on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Periodic check for login status and dismissal count
  useEffect(() => {
    if (!mounted || authLoading || isAuthPage) return;

    // Don't show if user is logged in
    if (user) {
      setIsVisible(false);
      return;
    }

    // Check if notification should be shown
    const checkAndShow = () => {
      if (!user && shouldShowNotification()) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial delay before first check (wait 30 seconds after page load)
    const initialTimer = setTimeout(() => {
      checkAndShow();
    }, 30000); // 30 seconds initial delay

    // Then check every 1.5 minutes
    const interval = setInterval(() => {
      checkAndShow();
    }, CHECK_INTERVAL);

    // Also check immediately if enough time has passed since last dismissal
    const lastDismissalTime = getLastDismissalTime();
    if (lastDismissalTime) {
      const timeSinceDismissal = Date.now() - lastDismissalTime;
      const timeUntilNextShow = CHECK_INTERVAL - timeSinceDismissal;
      
      if (timeUntilNextShow > 0 && timeUntilNextShow < CHECK_INTERVAL) {
        // Schedule to show after remaining time
        const remainingTimer = setTimeout(() => {
          checkAndShow();
        }, timeUntilNextShow);
        
        return () => {
          clearTimeout(initialTimer);
          clearTimeout(remainingTimer);
          clearInterval(interval);
        };
      } else if (timeSinceDismissal >= CHECK_INTERVAL) {
        // Enough time has passed, show immediately
        checkAndShow();
      }
    }

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [user, authLoading, mounted, isAuthPage, shouldShowNotification, getLastDismissalTime]);

  // Reset dismissal count when user logs in
  useEffect(() => {
    if (user) {
      setIsVisible(false);
      // Reset dismissal count when user logs in
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY_DISMISSAL_COUNT);
        localStorage.removeItem(STORAGE_KEY_LAST_DISMISSAL_TIME);
      }
    }
  }, [user]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    
    // Get current count before incrementing
    const currentCount = getDismissalCount();
    
    // Increment the dismissal count
    incrementDismissalCount();
    
    // Schedule to show again after 1.5 minutes if count < 3
    if (currentCount + 1 < MAX_DISMISSALS) {
      setTimeout(() => {
        if (!user && shouldShowNotification()) {
          setIsVisible(true);
        }
      }, CHECK_INTERVAL);
    }
  }, [incrementDismissalCount, getDismissalCount, user, shouldShowNotification]);

  // Don't render until mounted and auth is loaded, or on auth pages
  // Also check if notification should be shown based on dismissal count
  if (!mounted || authLoading || user || isAuthPage || !shouldShowNotification()) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
          className="fixed bottom-4 left-4 right-4 z-[9999] md:left-auto md:right-6 md:bottom-6 md:max-w-md"
        >
          <div className="relative">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-75 animate-pulse" />
            
            {/* Main card */}
            <motion.div
              className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-primary/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 rounded-2xl"
                animate={{
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 md:top-3 md:right-3 z-20 w-9 h-9 md:w-8 md:h-8 rounded-full bg-gray-900/95 md:bg-gray-800/80 hover:bg-gray-800/95 md:hover:bg-gray-700/80 border-2 md:border border-white/30 md:border-gray-700/50 flex items-center justify-center transition-all duration-200 group shadow-lg md:shadow-none backdrop-blur-sm"
                aria-label="Close notification"
              >
                <X className="w-5 h-5 md:w-4 md:h-4 text-white md:text-gray-400 group-hover:text-white transition-colors font-bold" strokeWidth={2.5} />
              </button>

              {/* Content */}
              <div className="p-4 md:p-6">
                {/* Header with icon */}
                <div className="flex items-start gap-3 mb-4">
                  <motion.div
                    className="relative"
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                    }}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </motion.div>
                  
                  <div className="flex-1 pt-1 pr-10 md:pr-0">
                    <h3 className="text-sm md:text-xl font-bold text-white mb-1 leading-tight">
                      Unlock Your Full Potential
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400">
                      Join our community and unlock exclusive features
                    </p>
                  </div>
                </div>

                {/* Benefits list */}
                <div className="space-y-2.5 mb-5">
                  <motion.div
                    className="flex items-center gap-3 text-sm text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-blue-400" />
                    </div>
                    <span>
                      Chat with <span className="font-semibold text-blue-400">Cyra</span>, your AI assistant
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 text-sm text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-purple-400" />
                    </div>
                    <span>
                      <span className="font-semibold text-purple-400">Contribute</span> and collaborate with our team
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 text-sm text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-4 h-4 text-green-400" />
                    </div>
                    <span>
                      Access all <span className="font-semibold text-green-400">services</span> and consultations
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 text-sm text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-yellow-400" />
                    </div>
                    <span>
                      Get <span className="font-semibold text-yellow-400">exclusive</span> features and updates
                    </span>
                  </motion.div>
                </div>

                {/* Call to action text */}
                <motion.div
                  className="mt-5 pt-4 border-t border-gray-700/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm md:text-base text-center text-gray-300 leading-relaxed">
                    <span className="text-gray-400">You can have all this only if you </span>
                    <span className="font-semibold text-primary">create an account</span>
                    <span className="text-gray-400"> or </span>
                    <span className="font-semibold text-primary">login</span>
                    <span className="text-gray-400"> if the account is already created.</span>
                  </p>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

