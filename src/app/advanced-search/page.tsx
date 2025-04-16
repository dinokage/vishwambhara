"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getUniqueCompanies } from "@/lib/search-utils";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import useSearch from "@/hooks/useSearch";
import CloudinaryImage from "@/components/CloudinaryImage";

type FilterOptions = {
  company: string;
  type: string;
};

export default function AdvancedSearchPage() {
  // Initial query from URL
  const initialQuery = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('q') || '' 
    : '';
  
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    company: "",
    type: "",
  });
  
  // Use our custom search hook with explicit destructuring
  const searchHook = useSearch(initialQuery, { 
    autoSearch: false // Don't auto-search on mount, we'll do it manually after setting filters
  });
  
  const { query, setQuery, results, isLoading } = searchHook;
  
  // Initialize from URL query parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlQuery = urlParams.get('q');
    const urlCompany = urlParams.get('company');
    const urlType = urlParams.get('type');
    
    // Set filters from URL
    if (urlCompany || urlType) {
      setShowFilters(true);
      setFilters({
        company: urlCompany || "",
        type: urlType || "",
      });
    }
    
    // If there's a query, perform search with filters
    if (urlQuery && urlQuery.trim().length >= 2) {
      setQuery(urlQuery);
      searchHook.performSearch(urlQuery, urlCompany || undefined, urlType || undefined);
    }
  }, [setQuery, searchHook]);

  // Get unique company names for filter dropdown
  const companies = getUniqueCompanies();
  
  // Handle filter changes
  useEffect(() => {
    if (query.trim().length >= 2) {
      searchHook.performSearch(query, filters.company || undefined, filters.type || undefined);
    }
  }, [filters, searchHook, query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      searchHook.performSearch(query, filters.company || undefined, filters.type || undefined);
    }
  };
  
  const resetFilters = () => {
    setFilters({
      company: "",
      type: "",
    });
    
    // Re-run search without filters
    if (query.trim().length >= 2) {
      searchHook.performSearch(query);
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Advanced Product Search</h1>
      
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchIcon className="absolute right-3 top-3 text-gray-400" size={24} />
          </div>
        </div>
        
        <div className="md:w-auto flex gap-2">
          <button 
            type="submit"
            className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
          
          <button 
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
          >
            <Filter size={20} />
            <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
          </button>
        </div>
      </form>
      
      {/* Filters section */}
      {showFilters && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filter Results</h2>
            <button 
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              <X size={16} />
              Reset Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Company filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.company}
                onChange={(e) => setFilters({...filters, company: e.target.value})}
              >
                <option value="">All Companies</option>
                {companies.map((company) => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
            
            {/* Type filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="">All Types</option>
                <option value="category">Category</option>
                <option value="subcategory">Subcategory</option>
                <option value="item">Item</option>
              </select>
            </div>
          </div>
        </div>
      )}
      
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-2">Searching...</p>
        </div>
      )}
      
      {!isLoading && results.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Search Results ({results.length})</h2>
          </div>
          
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
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {result.company}
                  </span>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full capitalize">
                    {result.type}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">
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
            We couldn&apos;t find any products matching &quot;{query}&quot;{filters.company && ` in ${filters.company}`}{filters.type && ` with type ${filters.type}`}.
          </p>
          <p className="text-gray-600 mt-2">
            Try using different keywords or <button onClick={resetFilters} className="text-blue-500 hover:underline">reset filters</button>.
          </p>
        </div>
      )}
      
      {query.trim().length < 2 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-lg text-gray-600">
            Enter at least 2 characters to search for products
          </h2>
        </div>
      )}
    </div>
  );
}