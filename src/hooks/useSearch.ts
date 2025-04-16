import { useState, useEffect } from 'react';
import { type SearchResult } from '@/lib/search-utils';
import { addRecentSearch } from '@/components/RecentSearches';

interface UseSearchOptions {
  saveToRecent?: boolean;
  autoSearch?: boolean;
  minChars?: number;
}

/**
 * Custom hook for product searching
 */
export default function useSearch(initialQuery = '', options?: UseSearchOptions) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    saveToRecent = true,
    autoSearch = true,
    minChars = 2,
  } = options || {};

  useEffect(() => {
    if (!autoSearch || query.trim().length < minChars) {
      setResults([]);
      return;
    }

    performSearch(query);
  }, [query, autoSearch, minChars]);

  const performSearch = async (searchQuery: string, companyFilter?: string, typeFilter?: string) => {
    if (searchQuery.trim().length < minChars) {
      return;
    }

    setIsLoading(true);
    
    try {
      let url = `/api/search?q=${encodeURIComponent(searchQuery)}`;
      if (companyFilter) {
        url += `&company=${encodeURIComponent(companyFilter)}`;
      }
      if (typeFilter) {
        url += `&type=${encodeURIComponent(typeFilter)}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      setResults(data.results);
      
      if (saveToRecent) {
        addRecentSearch(searchQuery);
      }
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    query,
    setQuery,
    results,
    isLoading,
    performSearch
  };
}