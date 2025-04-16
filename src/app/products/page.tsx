import Link from "next/link";
import { productCategories } from "@/lib/products";
import { Grid3X3, Search } from "lucide-react";
import CloudinaryImage from "@/components/CloudinaryImage";

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Our Products</h1>
        
        {/* Search link */}
        <Link 
          href="/search" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
        >
          <Search size={18} />
          <span>Search Products</span>
        </Link>
      </div>
      
      {/* Brief introduction */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <p className="text-gray-700">
          Browse our extensive catalog of industrial products from leading global manufacturers. 
          We offer a diverse range of air compressors, pumps, valves, geared motors, gear boxes, 
          hoists and more to meet your specific requirements.
        </p>
      </div>
      
      {/* Featured brands/companies section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-semibold">Featured Brands</h2>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {productCategories.length} Companies
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productCategories.map((company) => (
            <Link 
              key={company.name}
              href={company.href}
              className="flex flex-col items-center p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <div className="h-32 flex items-center justify-center mb-4">
                <CloudinaryImage
                  src={company.image || "cloudinary-icon"} 
                  alt={company.name}
                  width={160}
                  height={120}
                />
              </div>
              <h3 className="text-lg font-medium text-center">{company.name}</h3>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {company.categories?.length || 0} product categories
              </p>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Product categories overview */}
      <section>
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
          <Grid3X3 size={20} />
          <span>Product Categories</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productCategories.map((company) => (
            company.categories?.map((category) => (
              <div key={`${company.name}-${category.name}`} className="bg-white border rounded-lg p-5">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">{category.name}</h3>
                  <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-md">
                    {company.name}
                  </span>
                </div>
                
                <ul className="space-y-2 mb-4">
                  {category.subcategories?.slice(0, 5).map((subcategory) => (
                    <li key={subcategory.name} className="text-sm">
                      <Link 
                        href={subcategory.href}
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        {subcategory.name}
                        {subcategory.items && (
                          <span className="ml-2 text-xs text-gray-500">
                            ({subcategory.items.length} items)
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                  
                  {category.subcategories && category.subcategories.length > 5 && (
                    <li className="text-sm text-gray-500 italic">
                      + {category.subcategories.length - 5} more subcategories
                    </li>
                  )}
                </ul>
                
                <Link 
                  href={category.href}
                  className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                >
                  View all {category.name} 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))
          )).flat()}
        </div>
      </section>
      
      {/* Help section */}
      <section className="mt-12 bg-blue-50 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Need Help Finding a Product?</h2>
            <p className="text-gray-600 mb-4 md:mb-0">
              Our team of experts is ready to assist you in finding the right product for your needs.
            </p>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/search" 
              className="px-4 py-2 bg-white text-blue-600 border border-blue-300 rounded-md hover:bg-blue-100 transition-colors"
            >
              Search Products
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}