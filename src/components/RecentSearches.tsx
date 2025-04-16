"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock, X } from "lucide-react";

type RecentSearch = {
  query: string;
  timestamp: number;
};

export default function RecentSearches() {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Load recent searches from localStorage
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      try {
        const parsedSearches = JSON.parse(storedSearches);
        setRecentSearches(parsedSearches);
      } catch (error) {
        console.error("Failed to parse recent searches:", error);
      }
    }
  }, []);

  const handleSearchClick = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const removeSearch = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedSearches = [...recentSearches];
    updatedSearches.splice(index, 1);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const clearAllSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700 flex items-center">
          <Clock size={14} className="mr-1" />
          Recent Searches
        </h3>
        <button
          onClick={clearAllSearches}
          className="text-xs text-blue-500 hover:underline"
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((search, index) => (
          <div
            key={index}
            onClick={() => handleSearchClick(search.query)}
            className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-sm cursor-pointer"
          >
            <span>{search.query}</span>
            <button
              onClick={(e) => removeSearch(index, e)}
              className="ml-2 text-gray-500 hover:text-gray-700"
              aria-label="Remove"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to add a search to recent searches
export function addRecentSearch(query: string) {
  if (!query || query.trim().length < 2) return;
  
  // Get existing searches
  const storedSearches = localStorage.getItem("recentSearches");
  let searches: RecentSearch[] = [];
  
  if (storedSearches) {
    try {
      searches = JSON.parse(storedSearches);
    } catch (error) {
      console.error("Failed to parse recent searches:", error);
    }
  }
  
  // Check if this search already exists
  const existingIndex = searches.findIndex(s => s.query.toLowerCase() === query.toLowerCase());
  if (existingIndex !== -1) {
    // Remove the existing one to add it to the front
    searches.splice(existingIndex, 1);
  }
  
  // Add new search to the beginning
  searches.unshift({
    query,
    timestamp: Date.now()
  });
  
  // Keep only the 5 most recent searches
  searches = searches.slice(0, 5);
  
  // Save to localStorage
  localStorage.setItem("recentSearches", JSON.stringify(searches));
}