'use client';

import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, FileText, Package, Trophy, Medal, Car, Building2, CornerDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

interface SearchResult {
  id: string;
  title: string;
  type: 'mission' | 'collectible' | 'challenge' | 'achievement' | 'vehicle' | 'business';
  description?: string;
  href: string;
}

interface SearchCommandProps {
  open: boolean;
  onClose: () => void;
  onSearch?: (query: string) => Promise<SearchResult[]>;
  recentSearches?: string[];
}

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  mission: FileText,
  collectible: Package,
  challenge: Trophy,
  achievement: Medal,
  vehicle: Car,
  business: Building2,
};

const typeColors: Record<string, string> = {
  mission: 'text-vice-violet',
  collectible: 'text-vice-pink',
  challenge: 'text-vice-orange',
  achievement: 'text-vice-coral',
  vehicle: 'text-vice-magenta',
  business: 'text-vice-success',
};

export function SearchCommand({
  open,
  onClose,
  onSearch,
  recentSearches = [],
}: SearchCommandProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const search = async () => {
      if (!debouncedQuery.trim() || !onSearch) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const searchResults = await onSearch(debouncedQuery);
        setResults(searchResults);
        setSelectedIndex(0);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [debouncedQuery, onSearch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!open) return;

      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === 'Enter' && results[selectedIndex]) {
        event.preventDefault();
        window.location.href = results[selectedIndex].href;
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, results, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-20 z-50 w-full max-w-2xl -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-lg border border-white/10 bg-vice-purple/95 backdrop-blur-xl">
              <div className="flex items-center border-b border-white/10 px-4">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search missions, collectibles, vehicles..."
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <kbd className="hidden rounded bg-white/10 px-2 py-1 text-xs text-muted-foreground sm:block">
                  ESC
                </kbd>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {loading && (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-6 w-6 animate-spin text-vice-pink" />
                  </div>
                )}

                {!loading && query && results.length > 0 && (
                  <div className="p-2">
                    {results.map((result, index) => {
                      const Icon = typeIcons[result.type] || FileText;
                      const iconColor = typeColors[result.type] || 'text-muted-foreground';
                      const isSelected = index === selectedIndex;
                      
                      return (
                        <a
                          key={result.id}
                          href={result.href}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
                            isSelected ? 'bg-white/10' : 'hover:bg-white/5'
                          )}
                          onMouseEnter={() => setSelectedIndex(index)}
                          onClick={onClose}
                        >
                          <Icon className={`h-5 w-5 ${iconColor}`} />
                          <div>
                            <p className="font-medium">{result.title}</p>
                            {result.description && (
                              <p className="text-sm text-muted-foreground">
                                {result.description}
                              </p>
                            )}
                          </div>
                          <span className="ml-auto text-xs text-muted-foreground capitalize">
                            {result.type}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                )}

                {!loading && query && results.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">
                      No results found for "{query}"
                    </p>
                  </div>
                )}

                {!loading && !query && recentSearches.length > 0 && (
                  <div className="p-2">
                    <p className="px-3 py-2 text-sm text-muted-foreground">
                      Recent Searches
                    </p>
                    {recentSearches.map((search) => (
                      <button
                        key={search}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-white/5"
                        onClick={() => setQuery(search)}
                      >
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <span>{search}</span>
                      </button>
                    ))}
                  </div>
                )}

                {!loading && !query && recentSearches.length === 0 && (
                  <div className="p-8 text-center">
                    <Search className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Type to search across all game content
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 border-t border-white/10 px-4 py-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="h-3 w-3" />
                  Enter to select
                </span>
                <span className="flex items-center gap-1">
                  ↑↓ Navigate
                </span>
                <span className="flex items-center gap-1">
                  ESC Close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}