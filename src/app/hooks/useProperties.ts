import { useState, useEffect } from 'react';
import { client, getImageUrl } from '@/app/lib/sanity';
import type { Property } from '@/app/data/properties';

/**
 * Fetch all properties from Sanity CMS
 * @returns Object with properties array, loading state, and error
 */
export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        // GROQ query to fetch all properties with all fields
        const query = `*[_type == "property"] | order(_createdAt desc) {
          "id": _id,
          title,
          price,
          location,
          neighborhood,
          type,
          bedrooms,
          bathrooms,
          area,
          "image": mainImage.asset->url,
          "images": images[].asset->url,
          featured,
          new,
          offPlan,
          developer,
          completionDate,
          paymentPlan,
          launchDate,
          description,
          amenities,
          nearbyFacilities,
          coordinates,
          mapEmbedUrl,
          locationUrl
        }`;

        const data = await client.fetch(query);
        setProperties(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch properties'));
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error };
}

/**
 * Fetch a single property by ID from Sanity CMS
 * @param id - Property ID
 * @returns Object with property, loading state, and error
 */
export function useProperty(id: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);

        // GROQ query to fetch single property by ID
        const query = `*[_type == "property" && _id == $id][0] {
          "id": _id,
          title,
          price,
          location,
          neighborhood,
          type,
          bedrooms,
          bathrooms,
          area,
          "image": mainImage.asset->url,
          "images": images[].asset->url,
          featured,
          new,
          offPlan,
          developer,
          completionDate,
          paymentPlan,
          launchDate,
          description,
          amenities,
          nearbyFacilities,
          coordinates,
          mapEmbedUrl,
          locationUrl
        }`;

        const data = await client.fetch(query, { id });
        setProperty(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching property:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch property'));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  return { property, loading, error };
}

/**
 * Fetch featured properties from Sanity CMS
 * @param limit - Maximum number of properties to fetch (default: 6)
 * @returns Object with properties array, loading state, and error
 */
export function useFeaturedProperties(limit = 6) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);

        // GROQ query to fetch featured properties
        const query = `*[_type == "property" && featured == true] | order(_createdAt desc) [0...${limit}] {
          "id": _id,
          title,
          price,
          location,
          neighborhood,
          type,
          bedrooms,
          bathrooms,
          area,
          "image": mainImage.asset->url,
          "images": images[].asset->url,
          featured,
          new,
          offPlan,
          developer,
          completionDate,
          paymentPlan,
          launchDate,
          description,
          amenities,
          nearbyFacilities,
          coordinates,
          mapEmbedUrl,
          locationUrl
        }`;

        const data = await client.fetch(query);
        setProperties(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching featured properties:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch featured properties'));
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, [limit]);

  return { properties, loading, error };
}

/**
 * Fetch newly launched properties from Sanity CMS
 * @param limit - Maximum number of properties to fetch (default: 6)
 * @returns Object with properties array, loading state, and error
 */
export function useNewlyLaunchedProperties(limit = 6) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNewlyLaunched = async () => {
      try {
        setLoading(true);

        const query = `*[_type == "property" && new == true] | order(launchDate desc, _createdAt desc) [0...${limit}] {
          "id": _id,
          title,
          price,
          location,
          neighborhood,
          type,
          bedrooms,
          bathrooms,
          area,
          "image": mainImage.asset->url,
          "images": images[].asset->url,
          featured,
          new,
          offPlan,
          developer,
          completionDate,
          paymentPlan,
          launchDate,
          description,
          amenities,
          nearbyFacilities,
          coordinates,
          mapEmbedUrl,
          locationUrl
        }`;

        const data = await client.fetch(query);
        setProperties(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching newly launched properties:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch newly launched properties'));
      } finally {
        setLoading(false);
      }
    };

    fetchNewlyLaunched();
  }, [limit]);

  return { properties, loading, error };
}

/**
 * Fetch off-plan properties from Sanity CMS
 * @param limit - Maximum number of properties to fetch (default: 6)
 * @returns Object with properties array, loading state, and error
 */
export function useOffPlanProperties(limit = 6) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchOffPlan = async () => {
      try {
        setLoading(true);

        const query = `*[_type == "property" && offPlan == true] | order(_createdAt desc) [0...${limit}] {
          "id": _id,
          title,
          price,
          location,
          neighborhood,
          type,
          bedrooms,
          bathrooms,
          area,
          "image": mainImage.asset->url,
          "images": images[].asset->url,
          featured,
          new,
          offPlan,
          developer,
          completionDate,
          paymentPlan,
          launchDate,
          description,
          amenities,
          nearbyFacilities,
          coordinates,
          mapEmbedUrl,
          locationUrl
        }`;

        const data = await client.fetch(query);
        setProperties(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching off-plan properties:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch off-plan properties'));
      } finally {
        setLoading(false);
      }
    };

    fetchOffPlan();
  }, [limit]);

  return { properties, loading, error };
}
