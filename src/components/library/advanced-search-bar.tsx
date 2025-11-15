'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Sparkles, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { LibraryItem } from './library-page-client';

interface AdvancedSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterToggle: () => void;
  showFilters: boolean;
  libraryItems: LibraryItem[];
  onKeywordClick?: (keyword: string) => void;
  onFocusChange?: (isFocused: boolean) => void;
}

export function AdvancedSearchBar({ 
  value, 
  onChange, 
  onFilterToggle, 
  showFilters, 
  libraryItems,
  onKeywordClick,
  onFocusChange
}: AdvancedSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
    onFocusChange?.(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onFocusChange?.(false);
  };

  // Extract unique keywords from library items (tags, categories, and title words)
  const availableKeywords = useMemo(() => {
    const keywordMap = new Map<string, number>();
    
    libraryItems.forEach(item => {
      // Add all tags with weight
      item.tags.forEach(tag => {
        keywordMap.set(tag, (keywordMap.get(tag) || 0) + 3); // Tags are most important
      });
      
      // Add category with weight
      keywordMap.set(item.category, (keywordMap.get(item.category) || 0) + 2);
      
      // Extract meaningful words from title (3+ characters, capitalized)
      const titleWords = item.title
        .split(/\s+/)
        .filter(word => word.length >= 3)
        .map(word => word.replace(/[^a-zA-Z0-9]/g, ''))
        .filter(word => word.length >= 3 && /^[A-Z]/.test(word));
      
      titleWords.forEach(word => {
        keywordMap.set(word, (keywordMap.get(word) || 0) + 1);
      });
    });
    
    // Convert to array, sort by frequency (weight) first, then length, then alphabetically
    return Array.from(keywordMap.entries())
      .sort((a, b) => {
        // Sort by frequency first (most common first)
        if (b[1] !== a[1]) return b[1] - a[1];
        // Then by length (longer first)
        if (b[0].length !== a[0].length) return b[0].length - a[0].length;
        // Finally alphabetically
        return a[0].localeCompare(b[0]);
      })
      .map(([keyword]) => keyword)
      .slice(0, 8); // Top 8 most relevant keywords
  }, [libraryItems]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full"
    >
      {/* Glow effect behind search bar */}
      <motion.div
        animate={{
          opacity: isFocused ? [0.3, 0.6, 0.3] : 0.2,
          scale: isFocused ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isFocused ? Infinity : 0,
          ease: 'easeInOut',
        }}
        className="absolute -inset-2 bg-gradient-to-r from-primary via-cyan-500 to-primary rounded-2xl blur-xl -z-10"
        style={{ willChange: 'opacity, transform' }}
      />

      <div className="relative">
        {/* Main Search Container */}
        <div
          className={`relative flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl border-2 transition-all duration-500 backdrop-blur-xl ${
            isFocused
              ? 'border-primary bg-card/90 shadow-2xl shadow-primary/20'
              : 'border-primary/20 bg-card/60 hover:border-primary/40 hover:bg-card/80'
          }`}
        >
          {/* Search Icon with Animation */}
          <motion.div
            animate={{
              rotate: isFocused ? [0, 10, -10, 0] : 0,
              scale: isFocused ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="relative flex-shrink-0"
          >
            <Search className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
            {/* Pulsing dot */}
            {isFocused && (
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
              />
            )}
          </motion.div>

          {/* Input Field */}
          <Input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search research papers, case studies, articles, books..."
            className="flex-1 min-w-0 border-0 bg-transparent text-base sm:text-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 placeholder:text-sm sm:placeholder:text-base"
            style={{ 
              fontSize: 'clamp(14px, 4vw, 18px)',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem'
            }}
          />

          {/* Clear Button */}
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onChange('')}
              className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </motion.button>
          )}

          {/* Filter Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onFilterToggle}
            className={`px-2 sm:px-4 py-2 rounded-xl border-2 transition-all duration-300 flex items-center gap-1 sm:gap-2 flex-shrink-0 ${
              showFilters
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-primary/20 hover:border-primary/40 bg-card/50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">Filters</span>
          </motion.button>
        </div>

        {/* Search Suggestions / Quick Actions - Auto-detected Keywords */}
        <AnimatePresence>
          {isFocused && !value && availableKeywords.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full left-0 right-0 mt-2 p-4 rounded-xl border-2 border-primary/20 bg-card/95 backdrop-blur-xl shadow-2xl z-50"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                  <span>Quick Search</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableKeywords.map((keyword, index) => (
                    <motion.button
                      key={keyword}
                      initial={{ opacity: 0, scale: 0.8, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        delay: index * 0.05,
                        type: 'spring',
                        stiffness: 200,
                        damping: 15
                      }}
                      whileHover={{ 
                        scale: 1.08, 
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        onChange(keyword);
                        if (onKeywordClick) {
                          onKeywordClick(keyword);
                        }
                        // Keep focus for smooth UX
                        setTimeout(() => {
                          inputRef.current?.blur();
                        }, 100);
                      }}
                      className="px-3 py-1.5 rounded-lg border border-primary/20 hover:border-primary/50 bg-gradient-to-br from-card/60 to-card/40 hover:from-primary/10 hover:to-primary/5 text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      {keyword}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Results Count */}
        {value && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 text-sm text-muted-foreground px-2"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Type to search across all content...</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

