import { useState, useEffect } from 'react';
import { client } from '@/app/lib/sanity';

export interface Project {
  id: string;
  title: string;
  slug: string;
  developer?: string;
  location?: string;
  startingPrice?: number;
  completionDate?: string;
  paymentPlan?: string;
  image: string;
  images?: string[];
  description?: string;
  highlights?: string[];
  amenities?: string[];
  unitTypes?: string[];
  status: 'newly-launched' | 'under-construction' | 'coming-soon' | 'completed';
  featured: boolean;
  brochureUrl?: string;
  websiteUrl?: string;
}

const projectFields = `
  "id": _id,
  title,
  "slug": slug.current,
  developer,
  location,
  startingPrice,
  completionDate,
  paymentPlan,
  "image": mainImage.asset->url,
  "images": images[].asset->url,
  description,
  highlights,
  amenities,
  unitTypes,
  status,
  featured,
  brochureUrl,
  websiteUrl
`;

/**
 * Fetch projects from Sanity CMS
 * @param statusFilter - optional status to filter by (e.g., 'newly-launched')
 * @param limit - optional limit on number of results
 */
export function useProjects(statusFilter?: string, limit?: number) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const statusClause = statusFilter ? ` && status == "${statusFilter}"` : '';
        const limitClause = limit ? ` [0...${limit}]` : '';
        const query = `*[_type == "project"${statusClause}] | order(_createdAt desc)${limitClause} { ${projectFields} }`;

        const data = await client.fetch(query);
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [statusFilter, limit]);

  return { projects, loading, error };
}

/**
 * Fetch a single project by slug
 */
export function useProject(slug: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);

        const query = `*[_type == "project" && slug.current == $slug][0] { ${projectFields} }`;
        const data = await client.fetch(query, { slug });
        setProject(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch project'));
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProject();
  }, [slug]);

  return { project, loading, error };
}
