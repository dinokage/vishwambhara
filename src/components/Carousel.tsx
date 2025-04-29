'use client'

import { useState, useEffect, useRef } from 'react'
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
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [isPaused, setIsPaused] = useState(false)
  const [contentVisible, setContentVisible] = useState(true)
  const touchStartX = useRef(0)
  
  // Auto-rotate slides
  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      changeSlide('right')
    }, 3000)
    
    return () => clearInterval(interval)
  }, [currentIndex, isPaused])
  
  // Handle slide change with animation
  const changeSlide = (dir: 'left' | 'right') => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setDirection(dir)
    setContentVisible(false) // Hide content during transition
    
    setTimeout(() => {
      if (dir === 'right') {
        setCurrentIndex((prevIndex) => 
          prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
        )
      } else {
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
        )
      }
      
      // Show content after slide change
      setTimeout(() => {
        setContentVisible(true)
        setIsAnimating(false)
      }, 100)
    }, 300) // Match this to your transition duration
  }
  
  // Handle next/prev actions
  const goToNextSlide = () => {
    changeSlide('right')
    // setIsPaused(true)
    // setTimeout(() => setIsPaused(false), 3000)
  }
  
  const goToPrevSlide = () => {
    changeSlide('left')
    // setIsPaused(true)
    // setTimeout(() => setIsPaused(false), 3000)
  }
  
  const goToSlide = (index: number) => {
    if (index === currentIndex) return
    
    setIsAnimating(true)
    setDirection(index > currentIndex ? 'right' : 'left')
    setContentVisible(false)
    
    setTimeout(() => {
      setCurrentIndex(index)
      
      setTimeout(() => {
        setContentVisible(true)
        setIsAnimating(false)
      }, 100)
    }, 300)
    
    // setIsPaused(true)
    // setTimeout(() => setIsPaused(false), 3000)
  }
  
  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX
    
    // Swipe detection with threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go to next slide
        goToNextSlide()
      } else {
        // Swipe right, go to previous slide
        goToPrevSlide()
      }
    }
  }
  
  // Current slide
  const currentSlide = carouselItems[currentIndex]
  
  // Calculate previous and next indices for preloading
  const prevIndex = currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1
  const nextIndex = currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1
  
  return (
    <div 
      className="relative h-[70vh] overflow-hidden bg-gray-100" 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Preload adjacent images */}
      <div className="hidden">
        <Image src={carouselItems[prevIndex].src} alt="Preload" width={1} height={1} />
        <Image src={carouselItems[nextIndex].src} alt="Preload" width={1} height={1} />
      </div>
      
      {/* Image container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Main slide with animation */}
        <div 
          className={`absolute inset-0 transition-transform duration-500 ease-in-out transform ${
            isAnimating && direction === 'right' ? '-translate-x-full' : 
            isAnimating && direction === 'left' ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
          <Image
            src={currentSlide.src}
            alt={currentSlide.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Next/Prev slide (for animation) */}
        {isAnimating && (
          <div 
            className={`absolute inset-0 transition-transform duration-500 ease-in-out transform ${
              direction === 'right' ? 'translate-x-full' : '-translate-x-full'
            } ${isAnimating ? 'translate-x-0' : ''}`}
          >
            <Image
              src={direction === 'right' ? carouselItems[nextIndex].src : carouselItems[prevIndex].src}
              alt="Next slide"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        )}
      </div>
      
      {/* Content overlay - with CSS transitions instead of Headless UI */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <div className={`transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className={`text-4xl md:text-5xl font-bold mb-3 max-w-3xl text-shadow ${contentVisible ? 'animate-fade-up' : ''}`}>
            {currentSlide.title}
          </h2>
          <p className={`text-xl md:text-2xl mb-8 max-w-2xl text-shadow ${contentVisible ? 'animate-fade-up animate-delay-100' : ''}`}>
            {currentSlide.subtitle}
          </p>
          <Link 
            href={currentSlide.link}
            className={`px-6 py-3 bg-[#29567A] hover:bg-[#00aeef] text-white font-medium rounded-md transition-colors ${contentVisible ? 'animate-fade-up animate-delay-200' : ''}`}
          >
            {currentSlide.cta}
          </Link>
        </div>
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
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-3 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Play/Pause button */}
      <button 
        className="absolute bottom-6 right-6 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
        onClick={() => setIsPaused(!isPaused)}
        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
      >
        {isPaused ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        )}
      </button>
      
      {/* CSS styles for animations */}
      <style jsx global>{`
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
        }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-up {
          animation: fadeUp 0.8s ease-out forwards;
        }
        
        .animate-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animate-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  )
}