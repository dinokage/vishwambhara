"use client"

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { productCategories as productData } from "@/lib/products";
import { use } from 'react';

export default function CompanyPage({ 
  params 
}: { 
  params: Promise<{ company: string }> 
}) {
  // Find the company data
  const { company } = use(params)
  const reqCompany = productData.find(c => c.href.split('/').pop() === company);

  if (!reqCompany) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{reqCompany.name}</h1>
      
      {/* Company logo */}
      <div className="mb-8 flex justify-center">
        <Image 
          src={`/logos/${reqCompany.href.split('/').pop()}.png`} 
          alt={`${reqCompany.name} logo`}
          width={300}
          height={200}
          className="object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg"; // Fallback image
          }}
        />
      </div>
      
      {/* Description section */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">About {reqCompany.name}</h2>
        <p className="text-gray-700">
          Explore our range of {reqCompany.name} products. We offer comprehensive solutions for all your needs.
        </p>
      </div>
      
      {/* Categories grid */}
      {reqCompany.categories && reqCompany.categories.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Product Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reqCompany.categories.map((category) => (
              <Link 
                href={category.href} 
                key={category.name}
                className="block p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600">
                  {category.subcategories?.length || 0} subcategories available
                </p>
                <div className="mt-4 text-blue-500">View products →</div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}