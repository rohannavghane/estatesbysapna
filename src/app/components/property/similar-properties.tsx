import { PropertyCard } from './property-card';
import { useProperties } from '@/app/hooks/useProperties';

interface SimilarPropertiesProps {
  currentPropertyId: string;
  propertyType: string;
}

export function SimilarProperties({ currentPropertyId, propertyType }: SimilarPropertiesProps) {
  const { properties, loading } = useProperties();

  const similarProperties = properties
    .filter(p => p.id !== currentPropertyId && p.type === propertyType)
    .slice(0, 3);

  if (loading || similarProperties.length === 0) return null;

  return (
    <div className="mt-20">
      <h2
        className="text-3xl mb-8"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
      >
        Similar Properties
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
