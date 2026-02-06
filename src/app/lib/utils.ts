/**
 * Get the correct public asset path accounting for base URL
 * @param path - Path to the asset (e.g., "images/sapna.jpg")
 * @returns Full path with base URL prepended
 */
export function getPublicAssetPath(path: string): string {
  const baseUrl = import.meta.env.BASE_URL || '/';
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`;
}
