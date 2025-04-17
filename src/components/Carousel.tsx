'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Slide data with more information for each slide
const slides = [
  {
    id: 1,
    image: '/carousel/carousel.png',
    title: 'Lab-tested. Industry-approved.',
    subtitle: 'Results that speak precision',
    cta: 'Explore Our Testing',
    link: '/about-us'
  },
  {
    id: 2,
    image: '/carousel/carousel2.png',
    title: 'Premium Quality Products',
    subtitle: 'Trusted by industry leaders',
    cta: 'View Products',
    link: '/products'
  },
  {
    id: 3,
    image: '/carousel/carousel3.png',
    title: 'Expert Technical Support',
    subtitle: 'Always at your service',
    cta: 'Contact Us',
    link: '/ContactUs'
  },
  {
    id: 4,
    image: '/carousel/carousel4.png',
    title: 'Global Partnerships',
    subtitle: 'International quality standards',
    cta: 'Our Partners',
    link: '/about-us'
  },
  {
    id: 5,
    image: '/carousel/carousel5.png',
    title: 'Innovative Solutions',
    subtitle: 'Driving your business forward',
    cta: 'Learn More',
    link: '/products'
  }
]

const Carousel = () => {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  
  // Function to go to next slide
  const nextSlide = useCallback(() => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1)
  }, [current])

  // Function to go to previous slide
  const prevSlide = useCallback(() => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1)
  }, [current])
  
  // Go to a specific slide
  const goToSlide = (index: number) => {
    setCurrent(index)
    // Pause autoplay temporarily when user interacts
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide()
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide()
    }
  }
  
  // Auto advance slides
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const timer = setTimeout(nextSlide, 5000)
    return () => clearTimeout(timer)
  }, [current, isAutoPlaying, nextSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  return (
    <div 
      className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          aria-hidden={index !== current}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          {/* Slide content - positioned slightly differently for each slide for visual interest */}
          <div 
            className={`absolute transform ${
              index % 2 === 0 ? 'left-1/2 -translate-x-1/2' : 'left-16 md:left-24'
            } ${
              index % 3 === 0 ? 'top-1/3' : 'top-1/2 -translate-y-1/2'
            } text-white text-center ${index % 2 === 1 ? 'text-left' : ''}`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white shadow-text">
              {slide.title}
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white shadow-text">
              {slide.subtitle}
            </p>
            <Link 
              href={slide.link}
              className="px-6 py-3 bg-[#29567A] hover:bg-[#00aeef] text-white font-medium rounded-md transition-colors duration-300 inline-block"
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}
      
      {/* Controls */}
      <button
        className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={current === index ? 'true' : 'false'}
          />
        ))}
      </div>
      
      {/* Play/Pause button */}
      <button
        className="absolute bottom-8 right-8 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isAutoPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </button>
      
      {/* Text shadow styles */}
      <style jsx global>{`
        .shadow-text {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  )
}

export default Carousel