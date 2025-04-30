import { notFound } from "next/navigation";
import Link from "next/link";
// import Image from "next/image";
import { productCategories as productData } from "@/lib/products";
import {use} from 'react';
import CloudinaryImage from "@/components/CloudinaryImage";

export default function ProductItemPage({ 
  params 
}: { 
  params: Promise<{ company: string; category: string; subcategory: string; item: string }> 
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

  // Find the subcategory
  const subcategory = category.subcategories?.find(sub => sub.href.split('/').pop() === paramss.subcategory);
  if (!subcategory) {
    notFound();
  }

  // Find the item
  const item = subcategory.items?.find(i => i.href.split('/').pop() === paramss.item);
  if (!item) {
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
        <Link href={subcategory.href} className="text-gray-500 hover:underline">
          {subcategory.name}
        </Link>
        {" > "}
        <span className="text-gray-900 font-medium">{item.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
          {/* Placeholder for product image */}
          <div className="w-full aspect-square bg-white rounded flex items-center justify-center">
            {/* <span className="text-gray-500">Product Image</span> */}
            <CloudinaryImage src={item.image?.trim() || ""} width={800} height={800} alt="Product Image" />
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 mb-4">
              The {item.name} by {company.name} provides industry-leading performance and reliability. 
              Designed for professionals who demand the best.
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>High-quality construction</li>
              <li>Energy efficient design</li>
              <li>Easy maintenance</li>
              <li>Reliable performance</li>
            </ul>
          </div>
          
          {/* Contact section */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Interested in this product?</h3>
            <p className="mb-4">Contact us for more information, pricing, and availability.</p>
            <Link 
              href="/contact" 
              className="inline-block bg-[#0275d8] hover:bg-[#0261b0] text-white font-bold py-2 px-4 rounded"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}