"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { productCategories as productData } from "@/lib/products";

// This structure should be populated with data from your Excel file
// Each sheet would be a main category, and the contents would be subcategories

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-l from-[#1783C8] to-[#76D6FA] shadow-md w-full">
      <div className="container mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex w-full justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                <Image src="/logo.png" width={200} height={80} alt="Logo" />
              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold"
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold"
                >
                  About
                </Link>

                {/* Products Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold focus:outline-none">
                    Products{" "}
                    <ChevronDown className="inline-block ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {productData.map((company) =>
                      company.categories && company.categories.length > 0 ? (
                        <DropdownMenuSub key={company.name}>
                          <DropdownMenuSubTrigger className="w-full">
                            {company.name}
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent className="w-56">
                            {company.categories.map((category) =>
                              category.subcategories &&
                              category.subcategories.length > 0 ? (
                                <DropdownMenuSub key={category.name}>
                                  <DropdownMenuSubTrigger className="w-full">
                                    {category.name}
                                  </DropdownMenuSubTrigger>
                                  <DropdownMenuSubContent className="w-56">
                                    {category.subcategories.map((subcategory) =>
                                      subcategory.items &&
                                      subcategory.items.length > 0 ? (
                                        <DropdownMenuSub key={subcategory.name}>
                                          <DropdownMenuSubTrigger className="w-full">
                                            {subcategory.name}
                                          </DropdownMenuSubTrigger>
                                          <DropdownMenuSubContent className="w-56">
                                            {subcategory.items.map((item) => (
                                              <DropdownMenuItem key={item.name}>
                                                <Link
                                                  href={item.href}
                                                  className="w-full"
                                                >
                                                  {item.name}
                                                </Link>
                                              </DropdownMenuItem>
                                            ))}
                                          </DropdownMenuSubContent>
                                        </DropdownMenuSub>
                                      ) : (
                                        <DropdownMenuItem
                                          key={subcategory.name}
                                        >
                                          <Link
                                            href={subcategory.href}
                                            className="w-full"
                                          >
                                            {subcategory.name}
                                          </Link>
                                        </DropdownMenuItem>
                                      )
                                    )}
                                  </DropdownMenuSubContent>
                                </DropdownMenuSub>
                              ) : (
                                <DropdownMenuItem key={category.name}>
                                  <Link href={category.href} className="w-full">
                                    {category.name}
                                  </Link>
                                </DropdownMenuItem>
                              )
                            )}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      ) : (
                        <DropdownMenuItem key={company.name}>
                          <Link href={company.href} className="w-full">
                            {company.name}
                          </Link>
                        </DropdownMenuItem>
                      )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link
                  href="/services"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold"
                >
                  Services
                </Link>

                <Link
                  href="/gallery"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold"
                >
                  Gallery
                </Link>
                
                <Link
                  href="/ContactUs"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center bg-[#f8f5e1] rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none focus:outline-none text-sm w-48 lg:w-64"
              />
              <button className="ml-2 text-gray-700">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            {/* Mobile Products Dropdown */}
            <div className="space-y-1">
              <div className="text-gray-600 px-3 py-2 rounded-md text-base font-medium">
                Products
              </div>

              {productData.map((company) => (
                <div key={company.name} className="pl-6 space-y-1">
                  <Link
                    href={company.href}
                    className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {company.name}
                  </Link>

                  {company.categories &&
                    company.categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-xs font-medium pl-6"
                        onClick={() => setIsOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                </div>
              ))}
            </div>

            <Link
              href="/services"
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>

            <Link
              href="/gallery"
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>

            {/* Mobile search */}
            <div className="mt-4 px-3">
              <div className="flex items-center bg-[#f8f5e1] rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent border-none focus:outline-none text-sm w-full"
                />
                <button className="ml-2 text-gray-700">
                  <Search size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
