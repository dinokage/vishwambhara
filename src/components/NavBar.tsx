'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from "next/image"
import { Menu, ChevronDown,  Search } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"

// This structure should be populated with data from your Excel file
// Each sheet would be a main category, and the contents would be subcategories
const productCategories = [
  {
    "name": "Atlas Copco",
    "href": "/products/atlas-copco",
    "subcategories": [
      {
        "name": "Air Compressors",
        "href": "/products/atlas-copco/air-compressors",
        "items": [
          {
            "name": "Oil-free Air Compressors",
            "href": "/products/atlas-copco/air-compressors/oil-free",
          },
          {
            "name": "Piston Compressors",
            "href": "/products/atlas-copco/air-compressors/piston",
            "items": [
              { "name": "Industrial Piston Compressor - Low Pressure <15 bar", "href": "/products/atlas-copco/air-compressors/piston/low-pressure" },
              { "name": "Industrial Piston Compressor - High Pressure ≥15 bar", "href": "/products/atlas-copco/air-compressors/piston/high-pressure" }
            ]
          }
        ]
      },
      {
        "name": "Air Dryers",
        "href": "/products/atlas-copco/air-treatment",
        "items": [
          {
            "name": "Desiccant air dryers",
            "href": "/products/atlas-copco/air-treatment/dryers",
          },
          {
            "name": "Refrigerated air dryers",
            "href": "/products/atlas-copco/air-treatment/dryers",
          },
        ]
      },
      {
        "name": "Energy Conversion",
        "href": "/products/atlas-copco/air-treatment",
        "items": [
          {
            "name": "Industrial heat pumps",
            "href": "/products/atlas-copco/air-treatment/dryers",
          },
          {
            "name": "AIRNet",
            "href": "/products/atlas-copco/air-treatment/dryers",
          }
        ]
      },
    ]
  },
  {
    "name": "SEW",
    "href": "/products/sew",
    "subcategories": [
      {
        "name": "Gear Motors",
        "href": "/products/sew/gear-motors",
        "items": [
          { "name": "R Series", "href": "/products/sew/gear-motors/r-series" },
          { "name": "F Series", "href": "/products/sew/gear-motors/f-series" },
          { "name": "K Series ", "href": "/products/sew/gear-motors/k-series" },
          { "name": "S Series ", "href": "/products/sew/gear-motors/k-series" },
          { "name": "W Series ", "href": "/products/sew/gear-motors/k-series" },
          { "name": "MOVIGEAR ", "href": "/products/sew/gear-motors/k-series" },
          { "name": "MOVITMOT Gear Motor ", "href": "/products/sew/gear-motors/k-series" },
          { "name": "MOVIFIT Gear Motor", "href": "/products/sew/gear-motors/k-series" },
          { "name": "Industrial Gear units ", "href": "/products/sew/gear-motors/k-series" },
          { "name": "P & XP Series ", "href": "/products/sew/gear-motors/k-series" },
          { "name": "MOVITRAC Inverter MCO7B", "href": "/products/sew/gear-motors/k-series" },
          { "name": "MoviDrive Inverter MDX61B   ", "href": "/products/sew/gear-motors/k-series" },
        ]
      }
    ]
  },
  {
    "name": "WEG",
    "href": "/products/weg",
    "subcategories": [
      {
        "name": "AC Motors",
        "href": "/products/weg/ac-motors",
        "items": [
          {
            "name": "General Purpose",
            "href": "/products/weg/ac-motors/general-purpose",
            "items": [
              { "name": "ODP Rolled Steel", "href": "/products/weg/ac-motors/general-purpose/odp-rolled" },
              { "name": "TEFC Cast Iron", "href": "/products/weg/ac-motors/general-purpose/tefc-cast" }
            ]
          },
          {
            "name": "Severe Duty",
            "href": "/products/weg/ac-motors/severe-duty",
            "items": [
              { "name": "W22", "href": "/products/weg/ac-motors/severe-duty/w22" }
            ]
          },
          {
            "name": "Explosion Proof/DIP",
            "href": "/products/weg/ac-motors/severe-duty",
            "items": [
              { "name": "W22", "href": "/products/weg/ac-motors/severe-duty/w22" }
            ]
          },
          {
            "name": "Brake Motor",
            "href": "/products/weg/ac-motors/severe-duty",
            "items": [
              { "name": "W22", "href": "/products/weg/ac-motors/severe-duty/w22" }
            ]
          },
          {
            "name": "WIN - Cast Iron TEFC",
            "href": "/products/weg/ac-motors/severe-duty",
            "items": [
              { "name": "W22", "href": "/products/weg/ac-motors/severe-duty/w22" }
            ]
          },
        ]
      }
    ]
  },
  {
    "name": "Marathon",
    "href": "/products/marathon",
    "subcategories": [
      {
        "name": "Low Voltage Motors",
        "href": "/products/marathon/low-voltage",
        "items": [
          { "name": "Terramax SCA", "href": "/products/marathon/low-voltage/terramax-sca" },
          { "name": "Terramax TCA", "href": "/products/marathon/low-voltage/terramax-tca" }
        ]
      },
      {
        "name": "Medium Voltage Motors",
        "href": "/products/marathon/medium-voltage",
        "items": [
          { "name": "FLOWPAK Motors", "href": "/products/marathon/medium-voltage/flowpak" },
          { "name": "UNIPAK Motors", "href": "/products/marathon/medium-voltage/flowpak" },
          { "name": "TEEPAK Motors", "href": "/products/marathon/medium-voltage/flowpak" },
        ]
      }
    ]
  },
  {
    "name": "Index Pumps",
    "href": "/products/index-pumps",
    "subcategories": [
      {
        "name": "Air Operated",
        "href": "/products/index-pumps/air-operated",
        "items": [
          { "name": "Standard Duty Metallic Pump", "href": "/products/index-pumps/air-operated/standard-metallic" },
          { "name": "Standard Duty Non Metallic Pump", "href": "/products/index-pumps/air-operated/standard-non-metallic" }
        ]
      },
      {
        "name": "EODD Pumps",
        "href": "/products/index-pumps/eodd",
        "items": [
          { "name": "2″ EODD PUMP", "href": "/products/index-pumps/eodd/2-inch" },
          { "name": "3″ EODD PUMP", "href": "/products/index-pumps/eodd/3-inch" }
        ]
      }
    ]
  },
  {
    "name": "IPC Tenant",
    "href": "/products/ipc-tenant",
    "subcategories": [
      {
        "name": "Scrubbers",
        "href": "/products/ipc-tenant/scrubbers",
        "items": [
          {
            "name": "Walk-Behind",
            "href": "/products/ipc-tenant/scrubbers/walk-behind",
            "items": [
              { "name": "CT 15", "href": "/products/ipc-tenant/scrubbers/walk-behind/ct15" },
              { "name": "CT 30", "href": "/products/ipc-tenant/scrubbers/walk-behind/ct30" }
            ]
          },
          {
            "name": "Ride On",
            "href": "/products/ipc-tenant/scrubbers/ride-on",
            "items": [
              { "name": "CT 80", "href": "/products/ipc-tenant/scrubbers/ride-on/ct80" },
              { "name": "512 Rider", "href": "/products/ipc-tenant/scrubbers/ride-on/512" }
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Nalco",
    "href": "/products/nalco",
    "subcategories": [
      {
        "name": "Water Treatment",
        "href": "/products/nalco/water-treatment",
        "items": [
          { "name": "Cooling Water Treatment", "href": "/products/nalco/water-treatment/cooling" },
          { "name": "Boiler Water Treatment", "href": "/products/nalco/water-treatment/boiler" }
        ]
      },
      {
        "name": "Monitoring Systems",
        "href": "/products/nalco/monitoring",
        "items": [
          { "name": "3D TRASAR Technology", "href": "/products/nalco/monitoring/3d-trasar" }
        ]
      }
    ]
  }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full">
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
                <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                
                <Link href="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  About
                </Link>
                
                {/* Products Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium focus:outline-none">
                    Products <ChevronDown className="inline-block ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {productCategories.map((category) => (
                      category.subcategories && category.subcategories.length > 0 ? (
                        <DropdownMenuSub key={category.name}>
                          <DropdownMenuSubTrigger className="w-full">
                            {category.name}
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent className="w-56">
                            
                            {category.subcategories.map((subcategory) => (
                              subcategory.items && subcategory.items.length > 0 ? (
                                <DropdownMenuSub key={subcategory.name}>
                                  <DropdownMenuSubTrigger className="w-full">
                                    {subcategory.name}
                                  </DropdownMenuSubTrigger>
                                  <DropdownMenuSubContent className="w-56">
                                    
                                    {subcategory.items.map((item) => (
                                      <DropdownMenuItem key={item.name}>
                                        <Link href={item.href} className="w-full">
                                          {item.name}
                                        </Link>
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuSubContent>
                                </DropdownMenuSub>
                              ) : (
                                <DropdownMenuItem key={subcategory.name}>
                                  <Link href={subcategory.href} className="w-full">
                                    {subcategory.name}
                                  </Link>
                                </DropdownMenuItem>
                              )
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      ) : (
                        <DropdownMenuItem key={category.name}>
                          <Link href={category.href} className="w-full">
                            {category.name}
                          </Link>
                        </DropdownMenuItem>
                      )
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Link href="/services" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Services
                </Link>
                
                <Link href="/gallery" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Gallery
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
              
              {productCategories.map((category) => (
                <div key={category.name} className="pl-6 space-y-1">
                  <Link
                    href={category.href}
                    className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {category.name}
                  </Link>
                  
                  {category.subcategories && category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.name}
                      href={subcategory.href}
                      className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-xs font-medium pl-6"
                      onClick={() => setIsOpen(false)}
                    >
                      {subcategory.name}
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
  )
}

export default Navbar