'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
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
import SearchBar from "@/components/SearchBar";
import { cn } from "@/lib/utils";

const MobileNavItem = ({ 
  href, 
  children, 
  className, 
  active = false,
  onClick 
}: { 
  href: string; 
  children: React.ReactNode; 
  className?: string; 
  active?: boolean;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    className={cn(
      "text-gray-600 hover:text-gray-900 py-2 px-4 block rounded-md transition-colors",
      active && "bg-blue-50 text-blue-600",
      className
    )}
    onClick={onClick}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState("");
  
  // Track scroll position and set scrolled state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Set active path based on current URL
  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  const closeMenu = () => setIsOpen(false);
  
  // Expanded mobile menu item that can have children
  const MobileMenuExpandable = ({ 
    title, 
    children 
  }: { 
    title: string; 
    children: React.ReactNode;
  }) => {
    const [expanded, setExpanded] = useState(false);
    
    return (
      <div className="mb-1">
        <button
          className="flex items-center justify-between w-full text-left text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="font-medium">{title}</span>
          <ChevronDown 
            className={`transition-transform ${expanded ? 'rotate-180' : ''}`} 
            size={18} 
          />
        </button>
        
        {expanded && (
          <div className="pl-4 ml-2 border-l border-gray-200 mt-1 space-y-1">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav 
      className={cn(
        "sticky top-0 z-20 w-full bg-white transition-shadow duration-200",
        scrolled && "shadow-md"
      )}
    >
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
                <MobileNavItem 
                  href="/" 
                  active={activePath === "/"} 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold"
                >
                  Home
                </MobileNavItem>

                <MobileNavItem 
                  href="/about" 
                  active={activePath.startsWith("/about")}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold"
                >
                  About
                </MobileNavItem>

                {/* Products Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className={cn(
                    "text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold focus:outline-none",
                    activePath.startsWith("/products") && "bg-blue-50 text-blue-600"
                  )}>
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
                                          <DropdownMenuSubContent className="max-h-56 w-56 overflow-y-auto">
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

                <MobileNavItem 
                  href="/gallery" 
                  active={activePath.startsWith("/gallery")}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold"
                >
                  Gallery
                </MobileNavItem>
                
                <MobileNavItem 
                  href="/contact" 
                  active={activePath.startsWith("/contact")}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold"
                >
                  Contact Us
                </MobileNavItem>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <SearchBar className="w-48 lg:w-64" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Improved with smooth transitions */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Link href="/" onClick={closeMenu}>
            <Image src="/logo.png" width={150} height={60} alt="Logo" />
          </Link>
          <button
            onClick={closeMenu}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 max-h-[calc(100vh-80px)] overflow-y-auto">
          <MobileNavItem href="/" onClick={closeMenu}>
            Home
          </MobileNavItem>

          <MobileNavItem href="/about" onClick={closeMenu}>
            About
          </MobileNavItem>

          {/* Mobile Products Dropdown - Improved hierarchy */}
          <MobileMenuExpandable title="Products">
            {productData.map((company) => (
              <div key={company.name} className="py-1">
                <MobileNavItem href={company.href} onClick={closeMenu}>
                  {company.name}
                </MobileNavItem>
              </div>
            ))}
          </MobileMenuExpandable>

          <MobileNavItem href="/gallery" onClick={closeMenu}>
            Gallery
          </MobileNavItem>
          
          <MobileNavItem href="/contact" onClick={closeMenu}>
            Contact Us
          </MobileNavItem>

          {/* Mobile search */}
          <div className="mt-4 px-3">
            <p className="text-sm text-gray-500 mb-2">Search Products:</p>
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;