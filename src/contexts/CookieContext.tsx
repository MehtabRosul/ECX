'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { encryptCookieData, decryptCookieData } from '@/lib/cookie-encryption';

export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'functional';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface CookieContextType {
  preferences: CookiePreferences;
  consentGiven: boolean;
  showBanner: boolean;
  showPreferences: boolean;
  updatePreferences: (prefs: Partial<CookiePreferences>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  resetConsent: () => void;
}

export const CookieContext = createContext<CookieContextType | undefined>(undefined);

const COOKIE_CONSENT_KEY = 'ecx_cookie_consent';
const COOKIE_PREFERENCES_KEY = 'ecx_cookie_preferences';
const COOKIE_CONSENT_EXPIRY_DAYS = 365;

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true, cannot be disabled
  analytics: false,
  marketing: false,
  functional: false,
};

export function useCookieConsent() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
}

export function CookieProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [consentGiven, setConsentGiven] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    setMounted(true);
    
    const loadPreferences = async () => {
      const savedConsent = Cookies.get(COOKIE_CONSENT_KEY);
      const savedPreferences = Cookies.get(COOKIE_PREFERENCES_KEY);

      if (savedConsent === 'true') {
        setConsentGiven(true);
        setShowBanner(false);
        
        if (savedPreferences) {
          try {
            // Try to decrypt the preferences
            const decrypted = await decryptCookieData(savedPreferences);
            if (decrypted) {
              const parsed = JSON.parse(decrypted);
              setPreferences({ ...defaultPreferences, ...parsed });
            } else {
              // Fallback: try parsing as plain JSON (for backward compatibility)
              try {
                const parsed = JSON.parse(savedPreferences);
                setPreferences({ ...defaultPreferences, ...parsed });
                // Re-encrypt and save
                const encrypted = await encryptCookieData(savedPreferences);
                Cookies.set(COOKIE_PREFERENCES_KEY, encrypted, { expires: COOKIE_CONSENT_EXPIRY_DAYS });
              } catch (e) {
                console.error('Error parsing cookie preferences:', e);
              }
            }
          } catch (e) {
            console.error('Error decrypting cookie preferences:', e);
          }
        }
      } else {
        // Show banner after 10 seconds delay if consent hasn't been given
        const timer = setTimeout(() => {
          setShowBanner(true);
        }, 10000); // 10 seconds delay
        
        return () => clearTimeout(timer);
      }
    };

    loadPreferences();
  }, []);

  const updatePreferences = useCallback((newPrefs: Partial<CookiePreferences>) => {
    setPreferences((prev) => ({
      ...prev,
      ...newPrefs,
      necessary: true, // Always keep necessary enabled
    }));
  }, []);

  const savePreferences = useCallback(async () => {
    Cookies.set(COOKIE_CONSENT_KEY, 'true', { expires: COOKIE_CONSENT_EXPIRY_DAYS });
    
    // Encrypt preferences before storing
    const preferencesJson = JSON.stringify(preferences);
    const encrypted = await encryptCookieData(preferencesJson);
    Cookies.set(COOKIE_PREFERENCES_KEY, encrypted, { expires: COOKIE_CONSENT_EXPIRY_DAYS });
    
    setConsentGiven(true);
    setShowBanner(false);
    setShowPreferences(false);
    
    // Trigger custom event for other components to react to cookie changes
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookiePreferencesUpdated', { detail: preferences }));
    }
  }, [preferences]);

  const acceptAll = useCallback(async () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    Cookies.set(COOKIE_CONSENT_KEY, 'true', { expires: COOKIE_CONSENT_EXPIRY_DAYS });
    
    // Encrypt preferences before storing
    const preferencesJson = JSON.stringify(allAccepted);
    const encrypted = await encryptCookieData(preferencesJson);
    Cookies.set(COOKIE_PREFERENCES_KEY, encrypted, { expires: COOKIE_CONSENT_EXPIRY_DAYS });
    
    setConsentGiven(true);
    setShowBanner(false);
    setShowPreferences(false);
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookiePreferencesUpdated', { detail: allAccepted }));
    }
  }, []);

  const rejectAll = useCallback(async () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(onlyNecessary);
    Cookies.set(COOKIE_CONSENT_KEY, 'true', { expires: COOKIE_CONSENT_EXPIRY_DAYS });
    
    // Encrypt preferences before storing
    const preferencesJson = JSON.stringify(onlyNecessary);
    const encrypted = await encryptCookieData(preferencesJson);
    Cookies.set(COOKIE_PREFERENCES_KEY, encrypted, { expires: COOKIE_CONSENT_EXPIRY_DAYS });
    
    setConsentGiven(true);
    setShowBanner(false);
    setShowPreferences(false);
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookiePreferencesUpdated', { detail: onlyNecessary }));
    }
  }, []);

  const openPreferences = useCallback(() => {
    setShowPreferences(true);
    setShowBanner(false);
  }, []);

  const closePreferences = useCallback(() => {
    setShowPreferences(false);
    
    // If consent hasn't been given, show the banner again after a short delay
    // This ensures users can still manage their cookie preferences
    if (!consentGiven) {
      // Show banner again after 1 second delay to allow modal to close smoothly
      setTimeout(() => {
        setShowBanner(true);
      }, 1000);
    }
  }, [consentGiven]);

  const resetConsent = useCallback(() => {
    Cookies.remove(COOKIE_CONSENT_KEY);
    Cookies.remove(COOKIE_PREFERENCES_KEY);
    setConsentGiven(false);
    setPreferences(defaultPreferences);
    setShowBanner(true);
    setShowPreferences(false);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  const value: CookieContextType = {
    preferences,
    consentGiven,
    showBanner,
    showPreferences,
    updatePreferences,
    acceptAll,
    rejectAll,
    savePreferences,
    openPreferences,
    closePreferences,
    resetConsent,
  };

  return <CookieContext.Provider value={value}>{children}</CookieContext.Provider>;
}

