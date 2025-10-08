'use client';

import { Input } from '@/components/ui/input';
import { Search, Loader, Filter, CheckCircle, PlusCircle } from 'lucide-react';
import { useState, FormEvent, useCallback, useEffect } from 'react';
import { semanticSearch } from '@/ai/flows/semantic-search-across-website';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import FadeContent from '../ui/fade-content';

const initialFilters = [
  { name: 'Status: Active', selected: false },
  { name: 'Platform: API', selected: false },
  { name: 'Tags: PQC', selected: false },
  { name: 'Type: SDK', selected: false },
  { name: 'Compliance: FIPS-140', selected: false },
];

export function ProductQuickExplorer() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      const activeFilters = filters.filter(f => f.selected).map(f => f.name);
      const fullQuery = `${query} ${activeFilters.join(' ')}`.trim();
      const result = await semanticSearch({ query: fullQuery });
      setSearchResults(result.searchResults);
    } catch (error) {
      console.error('Semantic search failed:', error);
      setSearchResults(['An error occurred during the search.']);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFilter = (index: number) => {
    setFilters(prevFilters =>
      prevFilters.map((filter, i) =>
        i === index ? { ...filter, selected: !filter.selected } : filter
      )
    );
  };
  
  useEffect(() => {
    if(hasSearched && query.trim()) {
        const debounce = setTimeout(() => {
            handleSearch(new Event('submit') as any);
        }, 500);
        return () => clearTimeout(debounce);
    }
  }, [filters, hasSearched, query]);

  return (
    <section className="py-12 sm:py-24 bg-surface-2">
      <FadeContent>
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl">Product & SDK Explorer</h2>
            <p className="mt-4 text-muted max-w-2xl mx-auto">
                Use our AI-powered semantic search to find the perfect product or tool.
            </p>
          </div>
          <form onSubmit={handleSearch}>
            <div className="group relative">
                <div className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,hsl(var(--primary)/0.2),transparent_50%,hsl(var(--primary)/0.2))] bg-[length:300%_100%] animate-shine opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute inset-0.5 rounded-full bg-surface-2" />

                <div className="relative flex items-center">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
                    <Input
                        type="search"
                        placeholder='Search products, e.g., "threat detection API", "crypto SDK"'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-14 pr-6 py-3 h-16 text-lg bg-transparent rounded-full border-2 border-border focus:border-primary"
                    />
                </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted mr-2 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters:
              </span>
              {filters.map((filter, index) => (
                <Button
                  key={filter.name}
                  variant="outline"
                  size="sm"
                  onClick={() => toggleFilter(index)}
                  className={cn(
                    "rounded-full transition-all duration-200",
                    filter.selected ? 'bg-primary/10 border-primary text-primary' : 'bg-glass-01 border-white/10 hover:bg-white/5'
                  )}
                >
                  {filter.selected ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <PlusCircle className="w-4 h-4 mr-2" />
                  )}
                  {filter.name}
                </Button>
              ))}
            </div>
          </div>
          
          <AnimatePresence>
          {hasSearched && (
            <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-3 text-muted">
                    <Loader className="animate-spin" />
                    <span>Searching...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {searchResults.length > 0 ? (
                      searchResults.map((result, index) => (
                        <motion.div
                          key={`${result}-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg bg-surface-1 border border-border"
                        >
                          <p className="text-high">{result}</p>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-muted"
                      >
                        No results found for your query.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </FadeContent>
    </section>
  );
}