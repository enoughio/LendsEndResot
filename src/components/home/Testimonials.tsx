'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    quote: "Flow transformed my energy use. Efficient, green tech, outstanding service!",
    name: "Jenny Wilson",
    service: "Solar energy service",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    quote: "Flow redefined my energy game – green, efficient, and top-notch service!",
    name: "Dianne Russell",
    service: "EV service",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    quote: "Thanks to Flow, my energy is now solar-powered – sustainable, efficient, and exceptional service.",
    name: "Cody Fisher",
    service: "Solar energy service",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  },
  {
    id: 4,
    quote: "Flow revolutionized my energy approach – clean tech, efficiency, and great service!",
    name: "Robert Fox",
    service: "Solar energy service",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  },
  {
    id: 5,
    quote: "Flow revolutionized my energy approach – clean tech, efficiency, and great service!",
    name: "Robert Fox",
    service: "Solar energy service",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  },
  {
    id: 6,
    quote: "Flow revolutionized my energy approach – clean tech, efficiency, and great service!",
    name: "Robert Fox",
    service: "Solar energy service",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  }
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalSlides = testimonials.length
  const autoScrollDuration = 5000 // 5 seconds per slide

  // Calculate how many cards to show based on screen size
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 4
    if (window.innerWidth < 768) return 2 // Show 2 cards on mobile
    if (window.innerWidth < 1024) return 2
    return 4
  }

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView())

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, totalSlides - cardsPerView)

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentIndex((prevIndex) => {
              const nextIndex = prevIndex + 1
              if (nextIndex > maxIndex) {
                return 0
              }
              return nextIndex
            })
            return 0
          }
          return prev + (100 / (autoScrollDuration / 100))
        })
      }, 100)
    }

    startAutoScroll()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [maxIndex])

  // Scroll to current index
  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.scrollWidth / totalSlides
      scrollRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      })
    }
  }, [currentIndex, totalSlides])

  // Handle mouse/touch drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0))
    setScrollLeft(scrollRef.current?.scrollLeft || 0)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0))
    setScrollLeft(scrollRef.current?.scrollLeft || 0)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    // Snap to nearest card
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.scrollWidth / totalSlides
      const newIndex = Math.round(scrollRef.current.scrollLeft / cardWidth)
      setCurrentIndex(Math.min(Math.max(0, newIndex), maxIndex))
      setProgress(0)
    }
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
    setProgress(0)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
    setProgress(0)
  }
  return (
    <section className="relative pt-5 pb-15 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
          alt="Tropical leaves background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading and Navigation */}
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white max-w-3xl">
            Our clients are <span className="text-green-400">always satisfied</span>
          </h2>

          {/* Navigation Buttons - Hidden on mobile */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              aria-label="Previous testimonials"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              aria-label="Next testimonials"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative mb-5 overflow-hidden -mx-4 md:mx-0">
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing px-4 md:px-0"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-green-500/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 flex flex-col justify-between min-h-[180px] md:min-h-[200px] hover:bg-green-500 transition-colors flex-shrink-0"
                style={{
                  width: `calc((100% - ${(cardsPerView - 1) * (typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 24)}px) / ${cardsPerView})`
                }}
              >
                <p className="text-gray-900 text-sm md:text-base leading-relaxed mb-6 md:mb-8 select-none">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      draggable={false}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</p>
                    <p className="text-xs md:text-sm text-gray-800">{testimonial.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-[2px] bg-white/20 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  )
}

export default Testimonials