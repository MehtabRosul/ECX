'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCookieConsent, CookieCategory } from '@/contexts/CookieContext';
import { 
  Shield, 
  BarChart3, 
  Megaphone, 
  Settings2, 
  X, 
  Info,
  Check,
  Lock,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useContext } from 'react';
import { CookieContext } from '@/contexts/CookieContext';

interface CookieCategoryInfo {
  id: CookieCategory;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  required: boolean;
  examples: string[];
}

const cookieCategories: CookieCategoryInfo[] = [
  {
    id: 'necessary',
    name: 'Necessary Cookies',
    description: 'Essential cookies required for the website to function properly. These cannot be disabled.',
    icon: Lock,
    color: 'from-blue-500 to-cyan-500',
    required: true,
    examples: ['Authentication', 'Security', 'Session management', 'Load balancing']
  },
  {
    id: 'analytics',
    name: 'Analytics Cookies',
    description: 'Help us understand how visitors interact with our website by collecting anonymous information.',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-500',
    required: false,
    examples: ['Page views', 'User behavior', 'Performance metrics', 'Error tracking']
  },
  {
    id: 'marketing',
    name: 'Marketing Cookies',
    description: 'Used to deliver personalized advertisements and track campaign effectiveness.',
    icon: Megaphone,
    color: 'from-orange-500 to-red-500',
    required: false,
    examples: ['Ad targeting', 'Campaign tracking', 'Social media integration', 'Retargeting']
  },
  {
    id: 'functional',
    name: 'Functional Cookies',
    description: 'Enable enhanced functionality and personalization, such as remembering your preferences.',
    icon: Settings2,
    color: 'from-green-500 to-emerald-500',
    required: false,
    examples: ['Language preferences', 'Theme settings', 'User preferences', 'Chat functionality']
  },
];

export function CookiePreferencesModal() {
  const context = useContext(CookieContext);
  
  // Don't render if context is not available
  if (!context) return null;

  const { 
    showPreferences, 
    preferences, 
    updatePreferences, 
    savePreferences, 
    acceptAll, 
    rejectAll,
    closePreferences 
  } = context;

  return (
    <AnimatePresence>
      {showPreferences && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePreferences}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9998]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-2 sm:inset-4 md:inset-0 md:flex md:items-center md:justify-center z-[9999] pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full md:w-auto md:h-auto md:max-w-4xl lg:max-w-5xl md:max-h-[90vh] md:mx-4 pointer-events-auto overflow-hidden flex flex-col">
              <div className="relative h-full md:h-auto md:max-h-[90vh] w-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl sm:rounded-2xl border border-primary/20 shadow-2xl overflow-hidden">
              {/* Animated background effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-cyan-500/5 to-purple-500/5" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.1),transparent_50%)]" />

              {/* Header */}
              <div className="relative p-4 sm:p-6 md:p-8 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      className="flex-shrink-0"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/30 blur-xl rounded-lg sm:rounded-xl" />
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg">
                          <Settings2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                      </div>
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                        Cookie Preferences
                      </h2>
                      <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                        Customize which cookies you want to accept. You can change these settings at any time.
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={closePreferences}
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 hover:scrollbar-thumb-slate-500">
                <div className="space-y-3 sm:space-y-4 max-w-full">
                  {cookieCategories.map((category, index) => {
                    const Icon = category.icon;
                    const isEnabled = preferences[category.id];
                    const isRequired = category.required;

                    return (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-sm hover:bg-slate-800/50 transition-all">
                          <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                            <div className="flex items-start justify-between gap-3 sm:gap-4">
                              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                                <div className={`relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                  {isRequired && (
                                    <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-slate-800">
                                      <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 mb-1">
                                    <CardTitle className="text-base sm:text-lg text-white">
                                      {category.name}
                                    </CardTitle>
                                    {isRequired && (
                                      <span className="px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30 w-fit">
                                        Required
                                      </span>
                                    )}
                                  </div>
                                  <CardDescription className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                                    {category.description}
                                  </CardDescription>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                <Switch
                                  checked={isEnabled}
                                  onCheckedChange={(checked) => {
                                    if (!isRequired) {
                                      updatePreferences({ [category.id]: checked });
                                    }
                                  }}
                                  disabled={isRequired}
                                  className="data-[state=checked]:bg-primary"
                                />
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {category.examples.map((example, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-slate-700/50 text-slate-300 rounded-md sm:rounded-lg border border-slate-600/50"
                                >
                                  {example}
                                </span>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Info Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-2 sm:gap-3"
                >
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-blue-300 leading-relaxed">
                      <strong className="text-blue-200">Note:</strong> Necessary cookies are always enabled as they are 
                      essential for the website to function. You can manage your preferences at any time by clicking 
                      the cookie icon in the footer or visiting our{' '}
                      <a href="/legal#cookies" className="underline hover:text-blue-200 transition-colors">
                        Cookie Policy
                      </a>.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Footer Actions */}
              <div className="relative p-4 sm:p-6 md:p-8 border-t border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-900/50 flex-shrink-0">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 min-w-0 flex-shrink">
                    <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">Your preferences are saved locally and encrypted</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 flex-shrink-0">
                    <Button
                      onClick={rejectAll}
                      variant="outline"
                      size="sm"
                      className="h-9 sm:h-10 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white text-xs sm:text-sm"
                    >
                      Reject All
                    </Button>
                    <Button
                      onClick={acceptAll}
                      variant="outline"
                      size="sm"
                      className="h-9 sm:h-10 border-primary/50 text-primary hover:bg-primary/10 text-xs sm:text-sm"
                    >
                      Accept All
                    </Button>
                    <Button
                      onClick={savePreferences}
                      size="sm"
                      className="h-9 sm:h-10 bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white shadow-lg shadow-primary/30 text-xs sm:text-sm"
                    >
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      Save Preferences
                    </Button>
                  </div>
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

