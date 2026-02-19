import { Link } from 'react-router';
import { Bed, Bath, Maximize, MapPin, Heart, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useSiteConfig } from '@/app/hooks/useSiteConfig';
import type { Property } from '@/app/data/properties';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { siteConfig } = useSiteConfig();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!siteConfig) return;
    const message = `Hi, I'm interested in ${property.title} (${property.location})`;
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:border-2 hover:border-[var(--gold)]">
      <Link to={`/property/${property.id}`}>
        {/* Image Container - FIXED HEIGHT 280px */}
        <div className="relative overflow-hidden h-[280px]">
          <ImageWithFallback
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Badges - Absolute positioned top-left */}
          <div className="absolute top-4 left-4 flex gap-2">
            {property.featured && (
              <Badge className="bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold)]/90 px-4 py-2 rounded-full font-semibold text-[13px]">
                Featured
              </Badge>
            )}
            {property.new && (
              <Badge className="bg-[var(--navy)] text-white px-4 py-2 rounded-full font-semibold text-[13px]">
                New Launch
              </Badge>
            )}
            {property.offPlan && (
              <Badge className="bg-amber-500 text-white px-4 py-2 rounded-full font-semibold text-[13px]">
                Off Plan
              </Badge>
            )}
          </div>
          {/* Heart Icon - Absolute positioned top-right */}
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full hover:bg-white transition-colors flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              // Handle favorite toggle
            }}
          >
            <Heart className="h-5 w-5 text-[var(--navy)]" />
          </button>
        </div>
      </Link>

      {/* Content Container - FIXED SPACING AND HEIGHTS */}
      <CardContent className="p-6 flex flex-col gap-4">
        <Link to={`/property/${property.id}`} className="flex flex-col gap-4">
          {/* Location - FIXED HEIGHT 20px */}
          <div className="flex items-center gap-2 h-5">
            <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-400">{property.location}</span>
          </div>

          {/* Title - CRITICAL: FIXED HEIGHT 64px with 2-line clamp */}
          <h3 
            className="text-2xl font-semibold leading-8 overflow-hidden"
            style={{ 
              fontFamily: 'var(--font-heading)', 
              color: 'var(--navy)',
              height: '64px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {property.title}
          </h3>

          {/* Price - FIXED HEIGHT 40px */}
          <p 
            className="text-[28px] font-bold leading-10"
            style={{ 
              fontFamily: 'var(--font-heading)', 
              color: 'var(--navy)',
              height: '40px'
            }}
          >
            {formatPrice(property.price)}
          </p>

          {/* Specifications Row - FIXED HEIGHT 24px */}
          <div className="flex items-center gap-4 text-sm text-gray-600 h-6">
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 flex-shrink-0" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 flex-shrink-0" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4 flex-shrink-0" />
              <span>{property.area.toLocaleString()} sqft</span>
            </div>
          </div>

          {/* Off Plan Info Row - only shown for off-plan properties */}
          {property.offPlan && property.completionDate && (
            <div className="flex items-center gap-1.5 text-sm text-amber-600 h-5">
              <span className="font-medium">Ready:</span>
              <span>{property.completionDate}</span>
            </div>
          )}
        </Link>

        {/* WhatsApp Button - FIXED HEIGHT 48px */}
        <Button
          onClick={handleWhatsApp}
          className="w-full h-12 bg-[#25D366] hover:bg-[#22BF5B] text-white hover:shadow-[0_2px_8px_rgba(37,211,102,0.3)] transition-all"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          <span className="text-[15px] font-medium">WhatsApp Inquiry</span>
        </Button>
      </CardContent>
    </Card>
  );
}