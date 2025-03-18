'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from "next/image"
import { Menu, ChevronDown, Search } from 'lucide-react'
// import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { RainbowButton } from '@/components/ui/rainbow-button'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Products',
    href: '/products',
    dropdown: [
      { name: 'IT Services', href: '/it-services' },
      { name: 'Engineering services', href: '/engg-services' },
    ],
  },
  { name: 'Services', href: '/projects' },
  { name: 'Gallery', href: '/gallery' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md w-screen">
      <div className="container mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex w-full justify-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-gray-800"><Image src="/logo.png" width={200} height={80} alt="HexaSphere"  /></Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  item.dropdown ? (
                    <DropdownMenu key={item.name}>
                      <DropdownMenuTrigger className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium focus:outline-none">
                        {item.name} <ChevronDown className="inline-block ml-1 h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {item.dropdown.map((subItem) => (
                          <DropdownMenuItem key={subItem.name}>
                            <Link href={subItem.href} className="w-full">
                              {subItem.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  )
                ))}
            <div className="flex items-center float-right bg-[#f8f5e1] rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Search here"
                className="bg-transparent border-none focus:outline-none text-sm w-32 md:w-48 lg:w-64"
              />
              <button className="ml-2 text-gray-700">
                <Search size={18} />
              </button>
            </div>
          </div>
              </div>
              <div className="relative">
            </div>
          </div>
          <div className="hidden md:block">
          {/* <Button>Contact</Button> */}
          </div>
          <div className="md:hidden">
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
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              item.dropdown ? (
                <div key={item.name} className="space-y-1">
                  <div className="text-gray-600 px-3 py-2 rounded-md text-base font-medium">
                    {item.name}
                  </div>
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-sm font-medium pl-6"
                      onClick={() => setIsOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            {/* <Button className="w-full mt-4">Contact</Button> */}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar