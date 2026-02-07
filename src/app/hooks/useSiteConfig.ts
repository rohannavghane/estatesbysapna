import { useState, useEffect } from 'react';
import { client } from '@/app/lib/sanity';

export interface SiteConfig {
  siteName: string;
  siteTagline: string;
  siteDescription: string;
  contactPhone: string;
  contactPhoneRaw: string;
  contactEmail: string;
  contactSecondaryEmail?: string;
  whatsappNumber: string;
  officeAddress: {
    line1: string;
    line2: string;
  };
  contactMapUrl?: string;
  contactMapEmbedUrl?: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  workingHours: {
    weekdays: { days: string; hours: string };
    saturday: { days: string; hours: string };
    sunday: { days: string; hours: string };
  };
  agentName: string;
  agentFullName: string;
  agentTitle: string;
  agentImage: string;
  agentBio: string[];
  agentCommitment: string[];
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroBackgroundImage: string;
  heroPrimaryButtonText: string;
  heroSecondaryButtonText: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimaryButtonText: string;
  ctaSecondaryButtonText: string;
  contactPageTitle: string;
  contactPageSubtitle: string;
  contactPageFormTitle: string;
  contactPageInstantContactTitle: string;
  contactPageInstantContactSubtitle: string;
  contactPageOfficeTitle: string;
  trustIndicators: Array<{
    icon: string;
    title: string;
    subtitle: string;
  }>;
  aboutCredentials: Array<{ text: string }>;
  aboutTrustIndicators: Array<{ title: string; subtitle: string }>;
  aboutWhyChooseMe: Array<{ title: string; description: string }>;
  aboutPropertyTypes: string[];
  aboutKeyLocations: string[];
  aboutCertifications: Array<{
    title: string;
    organization: string;
    date: string;
  }>;
  aboutEarlyClientBenefits: Array<{ title: string; description: string }>;
}

/**
 * Fetch site configuration from Sanity CMS
 * @returns Object with site config, loading state, and error
 */
export function useSiteConfig() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSiteConfig = async () => {
      try {
        setLoading(true);

        // GROQ query to fetch site configuration
        const query = `*[_type == "siteConfig"][0] {
          siteName,
          siteTagline,
          siteDescription,
          contactPhone,
          contactPhoneRaw,
          contactEmail,
          contactSecondaryEmail,
          whatsappNumber,
          officeAddress,
          contactMapUrl,
          contactMapEmbedUrl,
          socialMedia,
          workingHours,
          agentName,
          agentFullName,
          agentTitle,
          "agentImage": agentImage.asset->url,
          agentBio,
          agentCommitment,
          heroTitle,
          heroTitleHighlight,
          heroDescription,
          heroBackgroundImage,
          heroPrimaryButtonText,
          heroSecondaryButtonText,
          ctaTitle,
          ctaSubtitle,
          ctaPrimaryButtonText,
          ctaSecondaryButtonText,
          contactPageTitle,
          contactPageSubtitle,
          contactPageFormTitle,
          contactPageInstantContactTitle,
          contactPageInstantContactSubtitle,
          contactPageOfficeTitle,
          trustIndicators,
          aboutCredentials,
          aboutTrustIndicators,
          aboutWhyChooseMe,
          aboutPropertyTypes,
          aboutKeyLocations,
          aboutCertifications,
          aboutEarlyClientBenefits
        }`;

        const data = await client.fetch(query);
        setSiteConfig(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching site config:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch site config'));
      } finally {
        setLoading(false);
      }
    };

    fetchSiteConfig();
  }, []);

  return { siteConfig, loading, error };
}
