'use client';

import { useState, useCallback } from 'react';
import { useDebounce } from './use-debounce';

interface SearchResult {
  id: string;
  title: string;
  type: string;
  description?: string;
  href: string;
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const debouncedQuery = useDebounce(query, 300);

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.data);
        setRecentSearches((prev) => {
          const updated = [searchQuery, ...prev.filter((s) => s !== searchQuery)];
          return updated.slice(0, 5);
        });
      } else {
        throw new Error(data.error?.message || 'Search failed');
      }
    } catch (err) {
      setError(err as Error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
  }, []);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    recentSearches,
    search,
    clearSearch,
  };
}