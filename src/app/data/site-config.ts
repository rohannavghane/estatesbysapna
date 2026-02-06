import config from './site-config.json';

export interface SiteConfig {
  site: {
    name: string;
    tagline: string;
    description: string;
    pageTitle: string;
    copyright: string;
  };
  contact: {
    phone: string;
    phoneRaw: string;
    email: string;
    secondaryEmail?: string;
    whatsapp: string;
    address: {
      line1: string;
      line2?: string;
    };
    mapEmbedUrl?: string;
    mapUrl?: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
  };
  workingHours: {
    weekdays: { days: string; hours: string };
    saturday: { days: string; hours: string };
    sunday: { days: string; hours: string };
  };
  hero: {
    title: string;
    titleHighlight: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    backgroundImage: string;
  };
  trustIndicators: Array<{
    icon: string;
    title: string;
    subtitle: string;
  }>;
  about: {
    agent: {
      name: string;
      fullName: string;
      title: string;
      image: string;
      bio: string[];
      commitment: string[];
    };
    credentials: Array<{ text: string }>;
    trustIndicators: Array<{ title: string; subtitle: string }>;
    whyChooseMe: Array<{ title: string; description: string }>;
    propertyTypes: string[];
    keyLocations: string[];
    certifications: Array<{
      title: string;
      organization: string;
      date: string;
    }>;
    earlyClientBenefits: Array<{ title: string; description: string }>;
  };
  contactPage: {
    title: string;
    subtitle: string;
    formTitle: string;
    instantContactTitle: string;
    instantContactSubtitle: string;
    officeTitle: string;
  };
  googleForm?: {
    enabled: boolean;
    formActionUrl: string;
    entryIds: {
      name: string;
      email: string;
      phone: string;
      propertyInterest: string;
      message: string;
    };
  };
  cta: {
    title: string;
    subtitle: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
  footer: {
    quickLinks: Array<{ name: string; path: string }>;
    popularAreas: string[];
  };
}

export const siteConfig: SiteConfig = config as SiteConfig;
