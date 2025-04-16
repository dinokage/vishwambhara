"use client";

import { productCategories } from "@/lib/products";
import Link from "next/link";
import { BarChart3, TrendingUp } from "lucide-react";

export default function SearchInsights() {
  // Calculate popular categories based on number of items
  const popularCategories = () => {
    const categories = [];

    for (const company of productCategories) {
      if (company.categories) {
        for (const category of company.categories) {
          let itemCount = 0;
          
          if (category.subcategories) {
            for (const subcategory of category.subcategories) {
              if (subcategory.items) {
                itemCount += subcategory.items.length;
              }
            }
          }
          
          categories.push({
            name: category.name,
            company: company.name,
            href: category.href,
            itemCount
          });
        }
      }
    }
    
    // Sort by item count and return top 5
    return categories
      .sort((a, b) => b.itemCount - a.itemCount)
      .slice(0, 5);
  };

  const topCategories = popularCategories();

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="text-blue-500" size={20} />
        <h3 className="text-lg font-semibold">Search Insights</h3>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <TrendingUp size={16} className="mr-2 text-green-500" />
          Popular Categories
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topCategories.map((category, index) => (
            <Link 
              key={index}
              href={category.href}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div>
                <span className="font-medium">{category.name}</span>
                <p className="text-xs text-gray-500">{category.company}</p>
              </div>
              <span className="text-sm text-blue-500">{category.itemCount} items</span>
            </Link>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Suggested Searches</h4>
        <div className="flex flex-wrap gap-2">
          {['compressors', 'motors', 'pumps', 'valves', 'tools', 'gearbox'].map((term) => (
            <Link 
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition-colors"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}