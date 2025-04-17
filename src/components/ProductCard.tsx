'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, X, ShoppingCart, ArrowRight } from 'lucide-react'
import CloudinaryImage from './CloudinaryImage'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type QuickViewProps = {
  name: string
  href: string
  image?: string
  companyName: string
  description?: string
}

const ProductCard = ({ 
  name, 
  href, 
  image, 
  companyName,
  description = "High-quality industrial product designed for optimal performance and reliability."
}: QuickViewProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white transition-shadow hover:shadow-md group">
        <div className="relative aspect-square bg-gray-100">
          {image ? (
            <CloudinaryImage 
              src={image} 
              alt={name} 
              width={400} 
              height={400}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          
          {/* Quick view button */}
          <button
            onClick={() => setIsOpen(true)}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Quick view"
          >
            <Eye className="h-5 w-5 text-gray-700" />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-sm text-blue-600 mb-1">{companyName}</p>
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{name}</h3>
          
          <Link
            href={href}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
          >
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
      
      {/* Quick view dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-3xl overflow-hidden">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-white/90 p-2 text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-md p-4 flex items-center justify-center">
              {image ? (
                <CloudinaryImage 
                  src={image} 
                  alt={name} 
                  width={400} 
                  height={400}
                />
              ) : (
                <div className="w-full h-[300px] flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-col">
              <DialogTitle className="text-xl font-semibold mb-2">
                {name}
              </DialogTitle>
              
              <p className="text-sm text-blue-600 mb-4">{companyName}</p>
              
              <DialogDescription className="text-gray-600 mb-6">
                {description}
              </DialogDescription>
              
              <div className="mt-auto space-y-4">
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm text-blue-800 mb-2">
                    Interested in this product? Contact us for pricing and availability.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Close
                  </Button>
                  
                  <Button
                    asChild
                    className="flex items-center justify-center gap-2 flex-1 bg-[#0275d8] hover:bg-[#0261b0]"
                  >
                    <Link href="/contact">
                      <ShoppingCart className="h-4 w-4" />
                      Inquire Now
                    </Link>
                  </Button>
                </div>
                
                <Link
                  href={href}
                  className="text-sm text-center text-blue-600 hover:underline block w-full mt-4"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProductCard