// Optimized image component with lazy loading for My Son Sanctuary Kiosk
import React, { useState, useRef, useEffect } from 'react';
import { generateResponsiveImages, generateSrcSet, getAspectRatioClasses } from '../utils/imageOptimization';

interface OptimizedImageProps {
  category: 'hero' | 'gallery' | 'map' | 'sites' | 'events';
  imageName: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  category,
  imageName,
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const imgRef = useRef<HTMLDivElement>(null);

  const sources = generateResponsiveImages(category, imageName);
  const srcSet = generateSrcSet(sources);
  const primarySource = sources[0];
  const aspectRatio = primarySource.width / primarySource.height;
  const aspectRatioClass = getAspectRatioClasses(aspectRatio);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200 ${aspectRatioClass} ${className}`}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-8 h-8 bg-amber-400 rounded-full opacity-60"></div>
          </div>
        </div>
      )}

      {/* Main image - only load when in view */}
      {isInView && (
        <img
          src={primarySource.src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={loading}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          width={primarySource.width}
          height={primarySource.height}
        />
      )}
    </div>
  );
};

// Specialized components for different image types
export const HeroImage: React.FC<Omit<OptimizedImageProps, 'category'>> = (props) => (
  <OptimizedImage
    {...props}
    category="hero"
    loading="eager"
    sizes="100vw"
    className={`rounded-lg shadow-lg ${props.className || ''}`}
  />
);

export const GalleryImage: React.FC<Omit<OptimizedImageProps, 'category'>> = (props) => (
  <OptimizedImage
    {...props}
    category="gallery"
    className={`rounded-md shadow-md ${props.className || ''}`}
  />
);

export const MapImage: React.FC<Omit<OptimizedImageProps, 'category'>> = (props) => (
  <OptimizedImage
    {...props}
    category="map"
    loading="eager"
    sizes="100vw"
    className={`w-full h-full ${props.className || ''}`}
  />
);

export const SiteImage: React.FC<Omit<OptimizedImageProps, 'category'>> = (props) => (
  <OptimizedImage
    {...props}
    category="sites"
    sizes="(max-width: 768px) 90vw, 400px"
    className={`rounded-lg shadow-md ${props.className || ''}`}
  />
);

export const EventImage: React.FC<Omit<OptimizedImageProps, 'category'>> = (props) => (
  <OptimizedImage
    {...props}
    category="events"
    className={`rounded-lg shadow-md ${props.className || ''}`}
  />
);

export default OptimizedImage;