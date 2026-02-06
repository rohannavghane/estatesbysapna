import { MapPin, School, ShoppingBag, Train, Building2 } from 'lucide-react';

interface PropertyLocationProps {
  location: string;
  coordinates: { lat: number; lng: number };
  nearbyFacilities: {
    name: string;
    distance: string;
    type: string;
  }[];
}

const getFacilityIcon = (type: string) => {
  switch (type) {
    case 'school':
      return School;
    case 'mall':
      return ShoppingBag;
    case 'metro':
    case 'tram':
      return Train;
    case 'hotel':
    case 'landmark':
    case 'entertainment':
      return Building2;
    default:
      return MapPin;
  }
};

export function PropertyLocation({ location, coordinates, nearbyFacilities }: PropertyLocationProps) {
  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <div className="w-full h-80 bg-secondary rounded-lg flex items-center justify-center relative overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${coordinates.lat},${coordinates.lng}&zoom=14`}
          title="Property Location"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-secondary">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-[var(--gold)] mx-auto mb-3" />
            <h3 className="text-xl mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}>
              {location}
            </h3>
            <p className="text-sm text-muted-foreground">
              {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
            </p>
          </div>
        </div>
      </div>

      {/* Nearby Facilities */}
      <div>
        <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}>
          Nearby Facilities
        </h3>
        <div className="space-y-3">
          {nearbyFacilities.map((facility, index) => {
            const Icon = getFacilityIcon(facility.type);
            return (
              <div key={index} className="flex items-center p-4 bg-secondary rounded-lg">
                <div className="w-10 h-10 bg-[var(--gold)]/10 rounded-full flex items-center justify-center mr-4">
                  <Icon className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{facility.name}</div>
                  <div className="text-sm text-muted-foreground capitalize">{facility.type}</div>
                </div>
                <div className="text-sm text-[var(--navy)] font-medium">
                  {facility.distance}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Neighborhood Highlights */}
      <div>
        <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}>
          Neighborhood Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-[var(--gold)] rounded-full mr-3 mt-2" />
            <div>
              <div className="font-medium">Prime Location</div>
              <div className="text-sm text-muted-foreground">
                One of Dubai's most sought-after neighborhoods
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-[var(--gold)] rounded-full mr-3 mt-2" />
            <div>
              <div className="font-medium">Easy Access</div>
              <div className="text-sm text-muted-foreground">
                Connected to major highways and public transport
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-[var(--gold)] rounded-full mr-3 mt-2" />
            <div>
              <div className="font-medium">Lifestyle</div>
              <div className="text-sm text-muted-foreground">
                Surrounded by dining, shopping, and entertainment
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-[var(--gold)] rounded-full mr-3 mt-2" />
            <div>
              <div className="font-medium">Community</div>
              <div className="text-sm text-muted-foreground">
                Safe, family-friendly environment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
