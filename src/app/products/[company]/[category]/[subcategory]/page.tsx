import { notFound } from "next/navigation";
import Link from "next/link";
import { productCategories as productData } from "@/lib/products";
import { use } from 'react';
// import { CldImage } from "next-cloudinary";
import CloudinaryImage from "@/components/CloudinaryImage";

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
      <div className="mb-6 text-sm">
        <Link href="/" className="text-gray-500 hover:underline">Home</Link>
        {" > "}
        <Link href="/products" className="text-gray-500 hover:underline">Products</Link>
        {" > "}
        <Link href={company.href} className="text-gray-500 hover:underline">
          {company.name}
        </Link>
        {" > "}
        <Link href={category.href} className="text-gray-500 hover:underline">
          {category.name}
        </Link>
        {" > "}
        <span className="text-gray-900 font-medium">{subcategory.name}</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">{company.name} {subcategory.name}</h1>
      
      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <p className="text-gray-700">
          Browse our selection of {company.name} {subcategory.name}. 
          We offer quality products with excellent service and support.
        </p>
      </div>
      
      {/* Items grid */}
      {subcategory.items && subcategory.items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategory.items.map((item) => (
            <Link 
              href={item.href} 
              key={item.name}
              className="block p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="aspect-square bg-gray-100 mb-4 flex items-center justify-center">
                {/* <span className="text-gray-400">Product Image</span> */}
                <CloudinaryImage src={item.image?.trim() || ""} width={800} height={800} alt="Product Image" />
              </div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <div className="mt-4 text-blue-500">View details →</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}