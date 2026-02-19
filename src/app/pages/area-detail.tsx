import { useParams, Link } from 'react-router';
import { MapPin, Building, TreePine, Waves, Train, ShoppingBag, GraduationCap, Dumbbell, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useProperties } from '@/app/hooks/useProperties';
import { useNeighborhood } from '@/app/hooks/useNeighborhoods';
import { useSiteConfig } from '@/app/hooks/useSiteConfig';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { PropertyCard } from '@/app/components/property/property-card';
import { Button } from '@/app/components/ui/button';
import { PageLoader } from '@/app/components/ui/page-loader';

const facilityIcons: Record<string, React.ReactNode> = {
  mall: <ShoppingBag className="h-5 w-5" />,
  metro: <Train className="h-5 w-5" />,
  beach: <Waves className="h-5 w-5" />,
  entertainment: <Building className="h-5 w-5" />,
  landmark: <MapPin className="h-5 w-5" />,
  hotel: <Building className="h-5 w-5" />,
  transport: <Train className="h-5 w-5" />,
  golf: <TreePine className="h-5 w-5" />,
  school: <GraduationCap className="h-5 w-5" />,
  leisure: <Dumbbell className="h-5 w-5" />,
  park: <TreePine className="h-5 w-5" />,
  hospital: <Building className="h-5 w-5" />,
  culture: <Building className="h-5 w-5" />,
};

export function AreaDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { properties, loading: propertiesLoading, error: propertiesError } = useProperties();
  const { neighborhood: area, loading: areaLoading, error: areaError } = useNeighborhood(slug || '');
  const { siteConfig } = useSiteConfig();

  const loading = propertiesLoading || areaLoading;
  const error = propertiesError || areaError;

  if (loading) {
    return <PageLoader />;
  }

  if (!area) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Area not found</h1>
          <Link to="/" className="text-[var(--gold)] hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const areaProperties = properties.filter(
    (p) => p.neighborhood === area.name || p.location === area.name
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <ImageWithFallback
          src={area.images?.[0] || area.image}
          alt={area.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {area.name}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">{area.description}</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl mb-6"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
          >
            About {area.name}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
            {area.fullDescription}
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      {area.images && area.images.length > 1 && (
        <section className="py-16 bg-[var(--light-gray)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl md:text-4xl mb-8"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {area.images.map((image, index) => (
                <div
                  key={index}
                  className="relative h-64 rounded-lg overflow-hidden"
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${area.name} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nearby Facilities Section */}
      {area.facilities && area.facilities.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl md:text-4xl mb-8"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              Nearby Facilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {area.facilities.map((facility, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-[var(--light-gray)] rounded-lg"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[var(--gold)]/10 rounded-full flex items-center justify-center text-[var(--gold)]">
                    {facilityIcons[facility.type] || <MapPin className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--navy)]">{facility.name}</h3>
                    <p className="text-sm text-muted-foreground">{facility.distance}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Neighbourhood Highlights Section */}
      {area.highlights && area.highlights.length > 0 && (
        <section className="py-16 bg-[var(--light-gray)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl md:text-4xl mb-8"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              Neighbourhood Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {area.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg"
                >
                  <CheckCircle className="h-5 w-5 text-[var(--gold)] flex-shrink-0" />
                  <span className="text-[var(--navy)]">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Properties in Area Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2
                className="text-3xl md:text-4xl mb-2"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
              >
                Properties in {area.name}
              </h2>
              <p className="text-muted-foreground">
                {areaProperties.length > 0
                  ? `Discover ${areaProperties.length} available ${areaProperties.length === 1 ? 'property' : 'properties'}`
                  : 'No properties currently available'}
              </p>
            </div>
            {areaProperties.length > 0 && (
              <Link to={`/properties?location=${encodeURIComponent(area.name)}`}>
                <Button variant="outline" className="hidden sm:flex">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[var(--navy)]" />
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 rounded-lg">
              <p className="text-red-600 mb-4">
                Failed to load properties. Please try again later.
              </p>
            </div>
          ) : areaProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {areaProperties.slice(0, 6).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[var(--light-gray)] rounded-lg">
              <p className="text-muted-foreground mb-4">
                No properties currently listed in {area.name}
              </p>
              <Link to="/properties">
                <Button>Browse All Properties</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--navy)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Interested in {area.name}?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us today for expert guidance on finding your perfect property in {area.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--navy)]"
              asChild
            >
              <a href={`https://wa.me/${siteConfig?.whatsappNumber || ''}`} target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="!border-white !text-white hover:!bg-white hover:!text-[var(--navy)] !bg-transparent"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
