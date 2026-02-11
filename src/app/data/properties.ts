import propertiesData from './properties.json';

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  neighborhood: string;
  type: 'Villa' | 'Apartment' | 'Penthouse' | 'Townhouse';
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  images: string[];
  featured: boolean;
  new: boolean;
  description: string;
  amenities: string[];
  nearbyFacilities: {
    name: string;
    distance: string;
    type: string;
  }[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  mapEmbedUrl?: string;
  locationUrl?: string;
}

export interface Neighborhood {
  slug: string;
  name: string;
  image: string;
  description: string;
  fullDescription?: string;
  images?: string[];
  facilities?: {
    name: string;
    distance: string;
    type: string;
  }[];
  highlights?: string[];
}

export const properties: Property[] = propertiesData.properties as Property[];
export const neighborhoods: Neighborhood[] = propertiesData.neighborhoods;
