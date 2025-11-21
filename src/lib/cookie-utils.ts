import Cookies from 'js-cookie';
import { CookiePreferences } from '@/contexts/CookieContext';
import { decryptCookieData } from './cookie-encryption';

/**
 * Check if a specific cookie category is enabled
 */
export async function isCookieCategoryEnabled(category: keyof CookiePreferences): Promise<boolean> {
  const preferences = Cookies.get('ecx_cookie_preferences');
  if (!preferences) return category === 'necessary'; // Only necessary cookies by default
  
  try {
    // Try to decrypt first
    const decrypted = await decryptCookieData(preferences);
    if (decrypted) {
      const parsed = JSON.parse(decrypted) as CookiePreferences;
      return parsed[category] ?? false;
    }
    
    // Fallback: try parsing as plain JSON (for backward compatibility)
    const parsed = JSON.parse(preferences) as CookiePreferences;
    return parsed[category] ?? false;
  } catch {
    return category === 'necessary';
  }
}

/**
 * Get all cookie preferences (synchronous version for backward compatibility)
 */
export function isCookieCategoryEnabledSync(category: keyof CookiePreferences): boolean {
  const preferences = Cookies.get('ecx_cookie_preferences');
  if (!preferences) return category === 'necessary';
  
  try {
    // Try parsing as plain JSON first (for immediate access)
    const parsed = JSON.parse(preferences) as CookiePreferences;
    return parsed[category] ?? false;
  } catch {
    return category === 'necessary';
  }
}

/**
 * Get all cookie preferences
 */
export async function getCookiePreferences(): Promise<CookiePreferences | null> {
  const preferences = Cookies.get('ecx_cookie_preferences');
  if (!preferences) return null;
  
  try {
    // Try to decrypt first
    const decrypted = await decryptCookieData(preferences);
    if (decrypted) {
      return JSON.parse(decrypted) as CookiePreferences;
    }
    
    // Fallback: try parsing as plain JSON (for backward compatibility)
    return JSON.parse(preferences) as CookiePreferences;
  } catch {
    return null;
  }
}

/**
 * Get all cookie preferences (synchronous version for backward compatibility)
 */
export function getCookiePreferencesSync(): CookiePreferences | null {
  const preferences = Cookies.get('ecx_cookie_preferences');
  if (!preferences) return null;
  
  try {
    return JSON.parse(preferences) as CookiePreferences;
  } catch {
    return null;
  }
}

/**
 * Check if user has given consent
 */
export function hasCookieConsent(): boolean {
  return Cookies.get('ecx_cookie_consent') === 'true';
}

/**
 * Set a cookie with category checking (async version)
 */
export async function setCategoryCookie(
  name: string,
  value: string,
  category: keyof CookiePreferences,
  options?: {
    expires?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  }
): Promise<void> {
  if (!(await isCookieCategoryEnabled(category))) {
    return; // Don't set cookie if category is disabled
  }
  
  Cookies.set(name, value, {
    expires: options?.expires ?? 365,
    path: options?.path ?? '/',
    domain: options?.domain,
    secure: options?.secure ?? true,
    sameSite: options?.sameSite ?? 'lax',
  });
}

/**
 * Set a cookie with category checking (synchronous version for backward compatibility)
 */
export function setCategoryCookieSync(
  name: string,
  value: string,
  category: keyof CookiePreferences,
  options?: {
    expires?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  }
): void {
  if (!isCookieCategoryEnabledSync(category)) {
    return; // Don't set cookie if category is disabled
  }
  
  Cookies.set(name, value, {
    expires: options?.expires ?? 365,
    path: options?.path ?? '/',
    domain: options?.domain,
    secure: options?.secure ?? true,
    sameSite: options?.sameSite ?? 'lax',
  });
}

/**
 * Remove a cookie
 */
export function removeCategoryCookie(name: string, path?: string): void {
  Cookies.remove(name, { path: path ?? '/' });
}

/**
 * Get cookie value
 */
export function getCategoryCookie(name: string): string | undefined {
  return Cookies.get(name);
}

