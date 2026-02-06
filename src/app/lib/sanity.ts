import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity client configuration
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Enable CDN for faster response times
  apiVersion: '2024-01-01', // Use current date for latest features
});

// Image URL builder for optimizing and transforming images
const builder = imageUrlBuilder(client);

/**
 * Generate optimized image URL from Sanity image reference
 * @param source - Sanity image source
 * @returns Image URL builder
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Helper to get optimized image URL with default settings
 * @param source - Sanity image source
 * @param width - Desired width (default: 800)
 * @param height - Desired height (optional)
 * @returns Optimized image URL
 */
export function getImageUrl(
  source: SanityImageSource,
  width = 800,
  height?: number
): string {
  let url = urlFor(source).width(width).auto('format').quality(85);

  if (height) {
    url = url.height(height);
  }

  return url.url();
}
