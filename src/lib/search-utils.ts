import { productCategories, type ProductCategory } from "@/lib/products";

export type SearchResult = {
  type: "category" | "subcategory" | "item";
  name: string;
  href: string;
  image?: string;
  path: string[];
  company: string;
};

/**
 * Search through the product data structure
 */
export function searchProducts(searchQuery: string): SearchResult[] {
  const results: SearchResult[] = [];
  const lowerQuery = searchQuery.toLowerCase();

  const processItem = (
    item: ProductCategory, 
    type: "category" | "subcategory" | "item",
    path: string[] = [],
    company: string
  ) => {
    if (item.name.toLowerCase().includes(lowerQuery)) {
      results.push({
        type,
        name: item.name,
        href: item.href,
        image: item.image,
        path,
        company
      });
    }
  };

  // Recursive function to search through all levels
  const searchLevel = (
    items: ProductCategory[], 
    type: "category" | "subcategory" | "item",
    currentPath: string[] = [],
    company: string
  ) => {
    items.forEach(item => {
      const newPath = [...currentPath, item.name];
      
      processItem(item, type, newPath, company);
      
      if (item.categories) {
        searchLevel(item.categories, "category", newPath, company);
      }
      
      if (item.subcategories) {
        searchLevel(item.subcategories, "subcategory", newPath, company);
      }
      
      if (item.items) {
        searchLevel(item.items, "item", newPath, company);
      }
    });
  };

  // Start search at the top level
  productCategories.forEach(company => {
    processItem(company, "category", [company.name], company.name);
    
    if (company.categories) {
      searchLevel(company.categories, "category", [company.name], company.name);
    }
  });

  return results;
}

/**
 * Get unique companies from the product data
 */
export function getUniqueCompanies(): string[] {
  return [...new Set(productCategories.map(company => company.name))];
}

/**
 * Apply filters to search results
 */
export function applyFilters(
  results: SearchResult[], 
  companyFilter?: string,
  typeFilter?: string
): SearchResult[] {
  let filtered = [...results];
  
  if (companyFilter) {
    filtered = filtered.filter(item => item.company === companyFilter);
  }
  
  if (typeFilter) {
    filtered = filtered.filter(item => item.type === typeFilter);
  }
  
  return filtered;
}