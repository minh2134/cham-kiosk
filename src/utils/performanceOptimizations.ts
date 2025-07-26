// Simple performance optimization utilities for the kiosk application
import React from 'react';

// Lazy loading utility for components
export const lazyLoadComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) => {
  return React.lazy(importFunc);
};

// Image preloading utility
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // Don't reject, just resolve
    img.src = src;
  });
};

// Batch image preloading
export const preloadImages = async (imageSrcs: string[]): Promise<void> => {
  const promises = imageSrcs.map(src => preloadImage(src));
  await Promise.allSettled(promises);
};

// Debounce utility for search operations
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => func(...args), delay);
  };
};

// Critical resource hints for better loading
export const addResourceHints = () => {
  const head = document.head;
  
  // Preload critical images
  const criticalImages = [
    '/images/my-son-1.png',
    '/images/my-son-map.jpg'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    head.appendChild(link);
  });
};

// Service worker registration for caching
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js');
    } catch (error) {
      // Silently fail - not critical for functionality
    }
  }
};