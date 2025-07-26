// Simple image optimization utilities for My Son Sanctuary Kiosk

export interface ImageSource {
  src: string;
  width: number;
  height: number;
}

// Get the correct file extension for each image
function getImageExtension(imageName: string): string {
  // Map specific images to their extensions
  const imageExtensions: { [key: string]: string } = {
    'my-son-1': 'png',
    'my-son-2': 'jpg', 
    'my-son-3': 'png',
    'my-son-4': 'jpg',
    'my-son-map': 'jpg',
    'thap-a': 'jpg',
    'thap-h': 'jpg',
    'thap-k': 'png',
    'cham-festival': 'jpg'
  };
  
  return imageExtensions[imageName] || 'jpg';
}

// Generate responsive image sources for different screen sizes
export function generateResponsiveImages(category: string, imageName: string): ImageSource[] {
  const extension = getImageExtension(imageName);
  
  // For actual images, we'll use the direct path without category subfolder
  // since the real images are in the root images folder
  const basePath = `/images/${imageName}`;
  
  const breakpoints = {
    hero: [
      { suffix: '', width: 1200, height: 600 },
      { suffix: '-md', width: 800, height: 400 },
      { suffix: '-sm', width: 600, height: 300 }
    ],
    gallery: [
      { suffix: '', width: 800, height: 600 },
      { suffix: '-md', width: 600, height: 450 },
      { suffix: '-sm', width: 400, height: 300 }
    ],
    map: [
      { suffix: '', width: 1200, height: 800 },
      { suffix: '-md', width: 900, height: 600 },
      { suffix: '-sm', width: 600, height: 400 }
    ],
    sites: [
      { suffix: '', width: 600, height: 400 },
      { suffix: '-md', width: 400, height: 267 },
      { suffix: '-sm', width: 300, height: 200 }
    ],
    events: [
      { suffix: '', width: 600, height: 400 },
      { suffix: '-md', width: 400, height: 267 },
      { suffix: '-sm', width: 300, height: 200 }
    ]
  };

  const categoryBreakpoints = breakpoints[category as keyof typeof breakpoints] || breakpoints.gallery;
  
  // For now, return just the main image since we don't have responsive variants
  // In a real implementation, you would generate multiple sizes
  return [{
    src: `${basePath}.${extension}`,
    width: categoryBreakpoints[0].width,
    height: categoryBreakpoints[0].height
  }];
}

// Generate srcSet string for responsive images
export function generateSrcSet(sources: ImageSource[]): string {
  return sources.map(source => `${source.src} ${source.width}w`).join(', ');
}

// Get aspect ratio classes for Tailwind
export function getAspectRatioClasses(aspectRatio: number): string {
  if (Math.abs(aspectRatio - 16/9) < 0.1) return 'aspect-video';
  if (Math.abs(aspectRatio - 4/3) < 0.1) return 'aspect-4/3';
  if (Math.abs(aspectRatio - 3/2) < 0.1) return 'aspect-3/2';
  if (Math.abs(aspectRatio - 1) < 0.1) return 'aspect-square';
  return 'aspect-[3/2]';
}