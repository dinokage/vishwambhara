// src/utils/productUtils.ts
import { productCategories } from "@/lib/products";



export function getProductData(params: ProductParams) {
  const { company, category, subcategory, item } = params;
  
  // Find company
  const companyData = productCategories.find(c => c.slug === company);
  if (!companyData) return null;
  
  // If only company is provided, return company data
  if (!category) return { type: 'company', data: companyData };
  
  // Find category
  const categoryData = companyData.subcategories.find(c => c.slug === category);
  if (!categoryData) return null;
  
  // If only category is provided, return category data
  if (!subcategory) return { type: 'category', data: categoryData, parent: companyData };
  
  // Find subcategory
  const subcategoryData = categoryData.items?.find(s => s.slug === subcategory);
  if (!subcategoryData) return null;
  
  // If only subcategory is provided, return subcategory data
  if (!item) return { 
    type: 'subcategory', 
    data: subcategoryData, 
    parent: categoryData,
    grandparent: companyData 
  };
  
  // Find item
  const itemData = subcategoryData.items?.find(i => i.slug === item);
  if (!itemData) return null;
  
  // Return the complete data hierarchy
  return { 
    type: 'item',
    data: itemData,
    parent: subcategoryData,
    grandparent: categoryData,
    greatgrandparent: companyData
  };
}

// Generate metadata for products
export function generateProductMetadata(data: any) {
  if (!data) return { title: 'Product Not Found' };
  
  switch (data.type) {
    case 'company':
      return {
        title: `${data.data.name} Products | Classique`,
        description: `Browse ${data.data.name} products available at Classique Engineering Enterprises.`
      };
    case 'category':
      return {
        title: `${data.data.name} | ${data.parent.name} | Classique`,
        description: `Explore ${data.data.name} from ${data.parent.name} at Classique Engineering Enterprises.`
      };
    case 'subcategory':
      return {
        title: `${data.data.name} | ${data.parent.name} | Classique`,
        description: `Discover ${data.data.name} from ${data.grandparent.name} at Classique Engineering Enterprises.`
      };
    case 'item':
      return {
        title: `${data.data.name} | ${data.parent.name} | Classique`,
        description: `Learn about ${data.data.name} from ${data.greatgrandparent.name} at Classique Engineering Enterprises.`
      };
    default:
      return {
        title: 'Products | Classique',
        description: 'Browse products available at Classique Engineering Enterprises.'
      };
  }
}