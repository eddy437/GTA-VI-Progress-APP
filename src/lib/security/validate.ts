import { ZodSchema } from 'zod';

export function validateInput<T>(
  schema: ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Validation failed',
    };
  }
}

export function validateFile(
  file: File,
  options: {
    maxSize?: number;
    allowedTypes?: string[];
    maxDimension?: number;
  }
): { valid: boolean; error?: string } {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    maxDimension = 512,
  } = options;

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`,
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }

  // Check image dimensions
  if (file.type.startsWith('image/')) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width > maxDimension || img.height > maxDimension) {
          resolve({
            valid: false,
            error: `Image dimensions exceed ${maxDimension}x${maxDimension}px limit`,
          });
        } else {
          resolve({ valid: true });
        }
      };
      img.onerror = () => {
        resolve({ valid: false, error: 'Invalid image file' });
      };
      img.src = URL.createObjectURL(file);
    }) as any;
  }

  return { valid: true };
}

export function validatePagination(
  page: number,
  limit: number
): { page: number; limit: number } {
  const validPage = Math.max(1, Math.floor(page));
  const validLimit = Math.min(100, Math.max(1, Math.floor(limit)));
  return { page: validPage, limit: validLimit };
}