"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isRouterReady, setIsRouterReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router) {
      setIsRouterReady(true);
    }
  }, [router]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim().toLowerCase();

    if (isRouterReady) {
      switch (query) {
        case "home":
          router.push("/");
          break;
        case "about us":
          router.push("/about");
          break;
        case "products":
          router.push("/products");
          break;
        case "services":
          router.push("/services");
          break;
          case "contact us":
          router.push("/ContactUs");
          break;
        case "gallery":
          router.push("/gallery");
          break;
        default:
          // Handle any other cases if needed
          break;
      }
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-gradient-to-l from-[#1783C8] to-[#76D6FA] text-black shadow-lg  sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
          </Link>
        </div>

        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-[#00aeef] font-bold">
            HOME
          </Link>
          <Link href="/about" className="hover:text-[#00aeef] font-bold">
            ABOUT US
          </Link>
          <Link href="/products" className="hover:text-[#00aeef] font-bold">
            PRODUCTS
          </Link>
          <Link href="/services" className="hover:text-[#00aeef] font-bold">
            SERVICES
          </Link>
          <Link href="/gallery" className="hover:text-[#00aeef] font-bold">
            GALLERY
        </Link> 

           <Link href="/contact" className="hover:text-[#00aeef] font-bold">
            CONTACT US
          </Link>
          
        </nav>

        <div className="relative mt-4 md:mt-0 w-full md:w-auto">
          <form onSubmit={handleSearch} className="w-full">
            <input
              type="text"
              placeholder="Search here"
              className="w-full md:w-64 px-4 py-2 rounded-full border text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="h-5 w-5 text-white" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}