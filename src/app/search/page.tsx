"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import RecentSearches from "@/components/RecentSearches";
import SearchInsights from "@/components/SearchInsights";
import useSearch from "@/hooks/useSearch";
import CloudinaryImage from "@/components/CloudinaryImage";

export default function SearchPage() {
  // Initialize search with URL parameters
  const initialQuery = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('q') || '' 
    : '';
  
  // Use the search hook with explicit destructuring
  const searchHook = useSearch(initialQuery);
  const { query, setQuery, results, isLoading } = searchHook;
  
  // Initialize from URL query parameters when the component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlQuery = urlParams.get('q');
    if (urlQuery) {
      setQuery(urlQuery);
    }
  }, [setQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      searchHook.performSearch(query);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Product Search</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            aria-label="Search"
          >
            <SearchIcon size={24} />
          </button>
        </div>
        {/* <div className="text-center mt-3">
          <Link href="/advanced-search" className="text-blue-500 hover:underline text-sm">
            Need more search options? Try our Advanced Search
          </Link>
        </div> */}
        
        <div className="max-w-xl mx-auto">
          <RecentSearches />
        </div>
      </form>
      
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-2">Searching...</p>
        </div>
      )}
      
      {!isLoading && results.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Search Results ({results.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <Link 
                href={result.href} 
                key={index}
                className="block bg-white p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-100 mb-4 flex items-center justify-center">
                  {result.image ? (
                    <CloudinaryImage 
                      src={result.image} 
                      alt={result.name}
                      width={200}
                      height={200}
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2">{result.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Type: <span className="capitalize">{result.type}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Path: {result.path.join(" > ")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {!isLoading && query.trim().length >= 2 && results.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">No products found</h2>
          <p className="text-gray-600">
            We couldn&apos;t find any products matching &quot;{query}&quot;.
          </p>
          <p className="text-gray-600 mt-2">
            Try using different keywords or browse our <Link href="/products" className="text-blue-500 hover:underline">product catalog</Link>.
          </p>
        </div>
      )}
      
      {query.trim().length < 2 && (
        <div>
          <div className="text-center py-8 bg-gray-50 rounded-lg mb-6">
            <h2 className="text-lg text-gray-600">
              Enter at least 2 characters to search for products
            </h2>
          </div>
          
          <SearchInsights />
        </div>
      )}
    </div>
  );
}