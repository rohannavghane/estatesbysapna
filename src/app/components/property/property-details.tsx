import { Bed, Bath, Maximize, Home } from 'lucide-react';
import type { Property } from '@/app/data/properties';

interface PropertyDetailsProps {
  property: Property;
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const specs = [
    { icon: Bed, label: 'Bedrooms', value: property.bedrooms },
    { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
    { icon: Maximize, label: 'Area', value: `${property.area.toLocaleString()} sqft` },
    { icon: Home, label: 'Type', value: property.type },
  ];

  return (
    <div className="space-y-6">
      {/* Key Specs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {specs.map((spec, index) => (
          <div key={index} className="p-4 bg-secondary rounded-lg">
            <div className="flex items-center mb-2">
              <spec.icon className="h-5 w-5 text-[var(--gold)] mr-2" />
              <span className="text-sm text-muted-foreground">{spec.label}</span>
            </div>
            <div className="text-xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}>
              {spec.value}
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div>
        <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}>
          Description
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {property.description}
        </p>
      </div>

      {/* Property Features */}
      <div>
        <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}>
          Property Features
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-[var(--gold)] rounded-full mr-3" />
            <span className="text-sm">High Floor</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-[var(--gold)] rounded-full mr-3" />
            <span className="text-sm">City Views</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-[var(--gold)] rounded-full mr-3" />
            <span className="text-sm">Luxury Finishes</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-[var(--gold)] rounded-full mr-3" />
            <span className="text-sm">Modern Kitchen</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-[var(--gold)] rounded-full mr-3" />
            <span className="text-sm">Walk-in Closet</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-[var(--gold)] rounded-full mr-3" />
            <span className="text-sm">Floor Heating</span>
          </div>
        </div>
      </div>
    </div>
  );
}
