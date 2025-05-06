'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Define carousel items
const carouselItems = [
  {
    id: 1,
    src: "/carousel/compressor.webp",
    alt: "Lab-tested. Industry-approved.",
    title: "Industrial Engineering Experts",
    subtitle: "",
    cta: "Explore Our Testing",
    link: "/about-us"
  },
  {
    id: 2,
    src: "/carousel/product-portfolio-1840x920.webp",
    alt: "Premium Quality Products",
    title: "Premium Quality Products",
    subtitle: "Trusted by industry leaders",
    cta: "View Products",
    link: "/products"
  },
  {
    id: 3,
    src: "/carousel/Slider.png",
    alt: "Expert Technical Support",
    title: "Expert Technical Support",
    subtitle: "Always at your service",
    cta: "Contact Us",
    link: "/contact"
  },
  {
    id: 4,
    src: "/carousel/IPC-TENANT.png",
    alt: "Global Partnerships",
    title: "Global Partnerships",
    subtitle: "International quality standards",
    cta: "Our Partners",
    link: "/about-us"
  },
  {
    id: 5,
    src: "/carousel/WEG.png",
    alt: "Innovative Solutions",
    title: "Innovative Solutions",
    subtitle: "Driving your business forward",
    cta: "Learn More",
    link: "/products"
  }
]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Basic auto-rotation with fixed interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // 5 seconds per slide
    
    return () => clearInterval(interval)
  }, [])
  
  // Simple click handlers for navigation
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    )
  }
  
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    )
  }
  
  // Current slide
  const currentSlide = carouselItems[currentIndex]
  
  return (
    <div className="relative h-[70vh] overflow-hidden bg-gray-100">
      {/* Image container */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={currentSlide.src}
          alt={currentSlide.alt}
          fill
          className="object-cover transition-opacity duration-500"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-3 max-w-3xl text-shadow">
          {currentSlide.title}
        </h2>
        {currentSlide.subtitle && (
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-shadow">
            {currentSlide.subtitle}
          </p>
        )}
        <Link 
          href={currentSlide.link}
          className="px-6 py-3 bg-[#29567A] hover:bg-[#00aeef] text-white font-medium rounded-md transition-colors"
        >
          {currentSlide.cta}
        </Link>
      </div>
      
      {/* Navigation arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      
      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-3 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Basic text shadow styling */}
      <style jsx global>{`
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </div>
  )
}