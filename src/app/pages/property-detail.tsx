import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Share2, Heart, MessageCircle, Phone, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { PropertyGallery } from '@/app/components/property/property-gallery';
import { PropertyDetails } from '@/app/components/property/property-details';
import { PropertyAmenities } from '@/app/components/property/property-amenities';
import { PropertyLocation } from '@/app/components/property/property-location';
import { MortgageCalculator } from '@/app/components/property/mortgage-calculator';
import { ContactForm } from '@/app/components/property/contact-form';
import { SimilarProperties } from '@/app/components/property/similar-properties';
import { useProperty } from '@/app/hooks/useProperties';
import { useSiteConfig } from '@/app/hooks/useSiteConfig';
import { toast } from 'sonner';
import { Toaster } from '@/app/components/ui/sonner';

export function PropertyDetailPage() {
  const { id } = useParams();
  const { property, loading, error } = useProperty(id || '');
  const { siteConfig, loading: configLoading } = useSiteConfig();
  const [isFavorite, setIsFavorite] = useState(false);

  if (loading || configLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--navy)]" />
      </div>
    );
  }

  if (error || !property || !siteConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Property not found</h1>
          <Button asChild>
            <Link to="/properties">Back to Properties</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${property.title} (${property.location})`;
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Button variant="ghost" asChild>
          <Link to="/properties">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Link>
        </Button>
      </div>

      {/* Gallery */}
      <PropertyGallery images={property.images} title={property.title} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex gap-2 mb-3">
                    {property.featured && (
                      <Badge className="bg-[var(--gold)] text-[var(--navy)]">Featured</Badge>
                    )}
                    {property.new && (
                      <Badge className="bg-[var(--navy)] text-white">New Launch</Badge>
                    )}
                    {property.offPlan && (
                      <Badge className="bg-amber-500 text-white">Off Plan</Badge>
                    )}
                    <Badge variant="outline">{property.type}</Badge>
                  </div>
                  <h1
                    className="text-3xl md:text-4xl mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
                  >
                    {property.title}
                  </h1>
                  <p className="text-muted-foreground">{property.location}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleFavorite}
                    className={isFavorite ? 'text-red-500' : ''}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500' : ''}`} />
                  </Button>
                </div>
              </div>
              <div
                className="text-4xl mb-6"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
              >
                {formatPrice(property.price)}
              </div>

              {/* Off Plan Info Strip */}
              {property.offPlan && (property.developer || property.completionDate || property.paymentPlan) && (
                <div className="flex flex-wrap gap-6 p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
                  {property.developer && (
                    <div>
                      <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide mb-1">Developer</p>
                      <p className="font-medium text-[var(--navy)]">{property.developer}</p>
                    </div>
                  )}
                  {property.completionDate && (
                    <div>
                      <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide mb-1">Expected Completion</p>
                      <p className="font-medium text-[var(--navy)]">{property.completionDate}</p>
                    </div>
                  )}
                  {property.paymentPlan && (
                    <div>
                      <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide mb-1">Payment Plan</p>
                      <p className="font-medium text-[var(--navy)]">{property.paymentPlan}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="calculator">Calculator</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-6">
                <PropertyDetails property={property} />
              </TabsContent>
              <TabsContent value="amenities" className="mt-6">
                <PropertyAmenities amenities={property.amenities} />
              </TabsContent>
              <TabsContent value="location" className="mt-6">
                <PropertyLocation
                  location={property.location}
                  nearbyFacilities={property.nearbyFacilities}
                  mapEmbedUrl={property.mapEmbedUrl}
                  locationUrl={property.locationUrl}
                />
              </TabsContent>
              <TabsContent value="calculator" className="mt-6">
                <MortgageCalculator propertyPrice={property.price} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact Card */}
              <ContactForm propertyTitle={property.title} />

              {/* Quick Actions */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white"
                  size="lg"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp Inquiry
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white"
                  size="lg"
                  asChild
                >
                  <a href={`tel:${siteConfig.contactPhoneRaw}`}>
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  asChild
                >
                  <a href={`mailto:${siteConfig.contactEmail}`}>
                    <Mail className="h-5 w-5 mr-2" />
                    Send Email
                  </a>
                </Button>
              </div>

              {/* Agent Info */}
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Your Agent</h3>
                <div className="flex items-center mb-4">
                  <img
                    src={siteConfig.agentImage}
                    alt={siteConfig.agentFullName}
                    className="w-16 h-16 rounded-full object-cover mr-3"
                    style={{ objectPosition: 'center 30%' }}
                  />
                  <div>
                    <div className="font-semibold">{siteConfig.agentFullName}</div>
                    <div className="text-sm text-muted-foreground">Real Estate Agent</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {siteConfig.agentBio[0]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <SimilarProperties currentPropertyId={property.id} propertyType={property.type} />
      </div>

      <Toaster />
    </div>
  );
}
