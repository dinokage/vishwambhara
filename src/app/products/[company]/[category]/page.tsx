import { notFound } from "next/navigation";
import Link from "next/link";
import { productCategories as productData } from "@/lib/products";
import { use } from 'react';
import CloudinaryImage from "@/components/CloudinaryImage";

export default function CategoryPage({ 
  params 
}: { 
  params: Promise<{ company: string; category: string }> 
}) {

  const paramss = use(params);
  // Find the company
  const company = productData.find(c => c.href.split('/').pop() === paramss.company);
  if (!company) {
    notFound();
  }

  // Find the category
  const category = company.categories?.find(cat => cat.href.split('/').pop() === paramss.category);
  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb navigation */}
      <div className="mb-6 text-sm">
        <Link href="/" className="text-gray-500 hover:underline">Home</Link>
        {" > "}
        <Link href="/products" className="text-gray-500 hover:underline">Products</Link>
        {" > "}
        <Link href={company.href} className="text-gray-500 hover:underline">
          {company.name}
        </Link>
        {" > "}
        <span className="text-gray-900 font-medium">{category.name}</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">{company.name} {category.name}</h1>
      
      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <p className="text-gray-700">
          Explore our selection of {company.name} {category.name}. 
          Choose from various types to meet your specific requirements.
        </p>
      </div>
      
      {/* Subcategories grid */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.subcategories.map((subcategory) => (
            <Link 
              href={subcategory.href} 
              key={subcategory.name}
              className="block p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="aspect-square bg-gray-100 mb-4 flex items-center justify-center">
                {subcategory.image ? <CloudinaryImage src={subcategory.image} alt={subcategory.name} /> : <span className="text-gray-400">Subcategory Image</span>}
              </div>
              <h2 className="text-lg font-semibold">{subcategory.name}</h2>
              <p className="text-gray-600 mt-2">
                {subcategory.items?.length || 0} products available
              </p>
              <div className="mt-4 text-blue-500">Browse products →</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}