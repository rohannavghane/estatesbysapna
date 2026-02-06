import { Link } from 'react-router';
import { ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { PropertyCard } from '@/app/components/property/property-card';
import { useFeaturedProperties } from '@/app/hooks/useProperties';

export function FeaturedProperties() {
  const { properties: featuredProperties, loading, error } = useFeaturedProperties(3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2
              className="text-3xl md:text-4xl mb-3"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              Featured Properties
            </h2>
            <p className="text-muted-foreground">
              Handpicked exclusive properties in Dubai's prime locations
            </p>
          </div>
          <Button
            variant="outline"
            className="border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white hidden md:flex"
            asChild
          >
            <Link to="/properties">
              View All Properties
              <ChevronRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--navy)]" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">Failed to load properties. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Button
            variant="outline"
            className="border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white"
            asChild
          >
            <Link to="/properties">
              View All Properties
              <ChevronRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
