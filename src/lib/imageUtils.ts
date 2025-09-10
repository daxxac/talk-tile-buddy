// Image compression and processing utilities for AAC tiles

export const MAX_IMAGE_SIZE = 800; // Max width/height in pixels
export const COMPRESSION_QUALITY = 0.8; // JPEG quality

/**
 * Compress and resize an image file
 */
export function compressImage(
  file: File,
  maxWidth: number = MAX_IMAGE_SIZE,
  maxHeight: number = MAX_IMAGE_SIZE,
  quality: number = COMPRESSION_QUALITY
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }
    
    img.onload = () => {
      // Calculate new dimensions maintaining aspect ratio
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      // Set canvas size and draw image
      canvas.width = width;
      canvas.height = height;
      
      // Fill with white background for consistency
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      
      // Draw the image
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(dataUrl);
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Create a thumbnail version of an image
 */
export function createThumbnail(
  dataUrl: string,
  size: number = 120
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }
    
    img.onload = () => {
      // Create square thumbnail
      const dimension = Math.min(img.width, img.height);
      const offsetX = (img.width - dimension) / 2;
      const offsetY = (img.height - dimension) / 2;
      
      canvas.width = size;
      canvas.height = size;
      
      // Fill with white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, size, size);
      
      // Draw cropped and resized image
      ctx.drawImage(
        img,
        offsetX, offsetY, dimension, dimension,
        0, 0, size, size
      );
      
      const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.9);
      resolve(thumbnailUrl);
    };
    
    img.onerror = () => reject(new Error('Failed to create thumbnail'));
    img.src = dataUrl;
  });
}

/**
 * Validate if file is a supported image type
 */
export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type) && file.size < 10 * 1024 * 1024; // 10MB max
}

/**
 * Get image dimensions from file
 */
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}