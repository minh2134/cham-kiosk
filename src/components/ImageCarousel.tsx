import { useState, useRef, useEffect } from 'react'
import { HeroImage } from './OptimizedImage'

interface ImageCarouselProps {
  images: string[]
  className?: string
}

const ImageCarousel = ({
  images,
  className = ''
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef<number | null>(null)
  const endX = useRef<number | null>(null)

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }

  const handleNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  // Unified swipe/drag logic
  const handleSwipeEnd = () => {
    if (!startX.current || !endX.current) return

    const distance = startX.current - endX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && images.length > 1) {
      handleNext()
    }
    if (isRightSwipe && images.length > 1) {
      handlePrevious()
    }

    // Reset positions
    startX.current = null
    endX.current = null
  }

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    endX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    handleSwipeEnd()
  }

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    startX.current = e.clientX
    e.preventDefault() // Prevent text selection
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    endX.current = e.clientX
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      handleSwipeEnd()
    }
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      handleSwipeEnd()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === ' ') {
        e.preventDefault()
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, images.length])

  // Click to advance
  const handleImageClick = () => {
    handleNext()
  }

  if (images.length === 0) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500">No images available</span>
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden cursor-grab ${isDragging ? 'cursor-grabbing' : ''} ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Image */}
      <div 
        className="relative w-full h-full cursor-pointer"
        onClick={handleImageClick}
        title="Click to advance to next image"
      >
        <HeroImage
          imageName={images[currentIndex]}
          alt={`Sanctuary image ${currentIndex + 1} of ${images.length}`}
          className="w-full h-full transition-opacity duration-300"
          loading={currentIndex === 0 ? 'eager' : 'lazy'}
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        {/* Click indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/60 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <span>Click to advance</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrevious()
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 
                       bg-black/40 hover:bg-black/60 text-white
                       w-10 h-10 rounded-full flex items-center justify-center
                       transition-all duration-200 opacity-0 hover:opacity-100
                       focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 
                       bg-black/40 hover:bg-black/60 text-white
                       w-10 h-10 rounded-full flex items-center justify-center
                       transition-all duration-200 opacity-0 hover:opacity-100
                       focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                handleDotClick(index)
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${index === currentIndex
                ? 'bg-white'
                : 'bg-white/50 hover:bg-white/75'
                }`}
              aria-label={`Go to image ${index + 1} of ${images.length}`}
            />
          ))}
        </div>
      )}

      {/* Navigation instruction */}
      <div className="absolute top-4 right-4">
        <div className="bg-black/60 text-white px-3 py-1 rounded text-sm">
          Click, arrow keys, or drag to navigate
        </div>
      </div>
    </div>
  )
}

export default ImageCarousel