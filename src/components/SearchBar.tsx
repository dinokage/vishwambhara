"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

type SearchBarProps = {
  className?: string;
  advanced?: boolean;
  company?: string;
  type?: string;
};

export default function SearchBar({ 
  className = "", 
  advanced = false,
  company = "",
  type = ""
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      // Determine where to route based on whether we have filters
      if (advanced || company || type) {
        let queryParams = `q=${encodeURIComponent(query)}`;
        if (company) queryParams += `&company=${encodeURIComponent(company)}`;
        if (type) queryParams += `&type=${encodeURIComponent(type)}`;
        router.push(`/advanced-search?${queryParams}`);
      } else {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`flex items-center bg-[#29567A] rounded-full px-4 py-2 ${className}`}
    >
      <input
        type="text"
        placeholder="Search products..."
        className="bg-transparent text-white border-none focus:outline-none text-sm w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button 
        type="submit" 
        className="ml-2 text-gray-700 focus:outline-none"
        aria-label="Search"
      >
        <Search size={18} className="text-white" />
      </button>
    </form>
  );
}