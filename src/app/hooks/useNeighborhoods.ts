import { useState, useEffect } from 'react';
import { client } from '@/app/lib/sanity';
import type { Neighborhood } from '@/app/data/properties';

/**
 * Fetch all neighborhoods from Sanity CMS
 * @returns Object with neighborhoods array, loading state, and error
 */
export function useNeighborhoods() {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        setLoading(true);

        // GROQ query to fetch all neighborhoods
        const query = `*[_type == "neighborhood"] | order(name asc) {
          "slug": slug.current,
          name,
          "image": mainImage.asset->url,
          description,
          fullDescription,
          "images": images[].asset->url,
          facilities,
          highlights
        }`;

        const data = await client.fetch(query);
        setNeighborhoods(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching neighborhoods:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch neighborhoods'));
      } finally {
        setLoading(false);
      }
    };

    fetchNeighborhoods();
  }, []);

  return { neighborhoods, loading, error };
}

/**
 * Fetch a single neighborhood by slug from Sanity CMS
 * @param slug - Neighborhood slug
 * @returns Object with neighborhood, loading state, and error
 */
export function useNeighborhood(slug: string) {
  const [neighborhood, setNeighborhood] = useState<Neighborhood | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNeighborhood = async () => {
      try {
        setLoading(true);

        // GROQ query to fetch single neighborhood by slug
        const query = `*[_type == "neighborhood" && slug.current == $slug][0] {
          "slug": slug.current,
          name,
          "image": mainImage.asset->url,
          description,
          fullDescription,
          "images": images[].asset->url,
          facilities,
          highlights
        }`;

        const data = await client.fetch(query, { slug });
        setNeighborhood(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching neighborhood:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch neighborhood'));
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchNeighborhood();
    }
  }, [slug]);

  return { neighborhood, loading, error };
}
