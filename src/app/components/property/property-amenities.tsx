import { Waves, Dumbbell, Car, Shield, Wifi, Wind, User, Sparkles } from 'lucide-react';

interface PropertyAmenitiesProps {
  amenities: string[];
}

const amenityIcons: { [key: string]: React.ElementType } = {
  'pool': Waves,
  'gym': Dumbbell,
  'parking': Car,
  'security': Shield,
  'wifi': Wifi,
  'spa': Sparkles,
  'concierge': User,
  'ac': Wind,
};

const getAmenityIcon = (amenity: string): React.ElementType => {
  const lowerAmenity = amenity.toLowerCase();
  
  if (lowerAmenity.includes('pool') || lowerAmenity.includes('beach')) return Waves;
  if (lowerAmenity.includes('gym') || lowerAmenity.includes('fitness')) return Dumbbell;
  if (lowerAmenity.includes('parking') || lowerAmenity.includes('garage')) return Car;
  if (lowerAmenity.includes('security') || lowerAmenity.includes('24/7')) return Shield;
  if (lowerAmenity.includes('smart')) return Wifi;
  if (lowerAmenity.includes('spa') || lowerAmenity.includes('sauna') || lowerAmenity.includes('jacuzzi')) return Sparkles;
  if (lowerAmenity.includes('concierge') || lowerAmenity.includes('maid')) return User;
  
  return Wind;
};

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  return (
    <div>
      <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}>
        Property Amenities
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity, index) => {
          const Icon = getAmenityIcon(amenity);
          return (
            <div key={index} className="flex items-center p-4 bg-secondary rounded-lg">
              <div className="w-10 h-10 bg-[var(--gold)]/10 rounded-full flex items-center justify-center mr-3">
                <Icon className="h-5 w-5 text-[var(--gold)]" />
              </div>
              <span className="text-sm font-medium">{amenity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
