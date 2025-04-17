import { notFound } from "next/navigation";
import Link from "next/link";
import { productCategories as productData } from "@/lib/products";
import { use } from 'react';
import ProductCard from "@/components/ProductCard";
import { ChevronRight } from "lucide-react";

export default function SubcategoryPage({ 
  params 
}: { 
  params: Promise<{ company: string; category: string; subcategory: string }> 
}) {
  // Find the company
  const paramss = use(params);
  const company = productData.find(c => c.href.split('/').pop() === paramss.company);
  if (!company) {
    notFound();
  }

  // Find the category
  const category = company.categories?.find(cat => cat.href.split('/').pop() === paramss.category);
  if (!category) {
    notFound();
  }

  // Find the subcategory
  const subcategory = category.subcategories?.find(sub => sub.href.split('/').pop() === paramss.subcategory);
  if (!subcategory) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb navigation */}
      <div className="flex items-center flex-wrap text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href={company.href} className="hover:text-blue-600 transition-colors">
          {company.name}
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href={category.href} className="hover:text-blue-600 transition-colors">
          {category.name}
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="text-gray-900 font-medium">{subcategory.name}</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">{company.name} {subcategory.name}</h1>
      
      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <p className="text-gray-700">
          Browse our selection of {company.name} {subcategory.name}. 
          We offer quality products with excellent service and support.
        </p>
      </div>
      
      {/* Items grid with new ProductCard component */}
      {subcategory.items && subcategory.items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategory.items.map((item) => (
            <ProductCard
              key={item.name}
              name={item.name}
              href={item.href}
              image={item.image?.trim() || ""}
              companyName={company.name}
              description={`${item.name} by ${company.name} - part of our ${subcategory.name} product line. Designed for optimal performance and reliability.`}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-500">No products found in this category.</p>
          <Link 
            href={category.href}
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Browse other products in {category.name}
          </Link>
        </div>
      )}
    </div>
  );
}