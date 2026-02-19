import { useParams, Link } from 'react-router';
import { MapPin, Building2, Calendar, CreditCard, CheckCircle, MessageCircle, ArrowLeft, ExternalLink, FileText } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { PageLoader } from '@/app/components/ui/page-loader';
import { useProject } from '@/app/hooks/useProjects';
import { useSiteConfig } from '@/app/hooks/useSiteConfig';

const statusConfig: Record<string, { label: string; className: string }> = {
  'newly-launched': { label: 'New Launch', className: 'bg-[var(--navy)] text-white' },
  'under-construction': { label: 'Under Construction', className: 'bg-amber-500 text-white' },
  'coming-soon': { label: 'Coming Soon', className: 'bg-purple-600 text-white' },
  'completed': { label: 'Completed', className: 'bg-green-600 text-white' },
};

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { project, loading } = useProject(slug || '');
  const { siteConfig } = useSiteConfig();

  if (loading) return <PageLoader />;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link to="/newly-launched" className="text-[var(--gold)] hover:underline">
            View all projects
          </Link>
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

  const handleWhatsApp = () => {
    if (!siteConfig) return;
    const message = `Hi, I'm interested in ${project.title}${project.developer ? ` by ${project.developer}` : ''}`;
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const status = statusConfig[project.status] || statusConfig['newly-launched'];

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Button variant="ghost" asChild>
          <Link to="/newly-launched">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={`px-4 py-1.5 text-sm font-semibold ${status.className}`}>
                {status.label}
              </Badge>
              {project.featured && (
                <Badge className="bg-[var(--gold)] text-[var(--navy)] px-4 py-1.5 text-sm font-semibold">
                  Featured
                </Badge>
              )}
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {project.title}
            </h1>
            {project.developer && (
              <p className="text-xl text-[var(--gold)] font-medium">by {project.developer}</p>
            )}
          </div>
        </div>
      </div>

      {/* Overview Strip */}
      <section className="bg-[var(--navy)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.startingPrice && (
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Starting From</p>
                  <p className="font-semibold text-white">{formatPrice(project.startingPrice)}</p>
                </div>
              </div>
            )}
            {project.location && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Location</p>
                  <p className="font-semibold text-white">{project.location}</p>
                </div>
              </div>
            )}
            {project.completionDate && (
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Completion</p>
                  <p className="font-semibold text-white">{project.completionDate}</p>
                </div>
              </div>
            )}
            {project.paymentPlan && (
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Payment Plan</p>
                  <p className="font-semibold text-white">{project.paymentPlan}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Description */}
      {project.description && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl md:text-4xl mb-6"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              About {project.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
              {project.description}
            </p>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="py-16 bg-[var(--light-gray)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl md:text-4xl mb-8"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.images.map((image, index) => (
                <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={image}
                    alt={`${project.title} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl md:text-4xl mb-8"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              Project Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-[var(--light-gray)] rounded-lg">
                  <CheckCircle className="h-5 w-5 text-[var(--gold)] flex-shrink-0" />
                  <span className="text-[var(--navy)]">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Amenities */}
      {project.amenities && project.amenities.length > 0 && (
        <section className="py-16 bg-[var(--light-gray)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl md:text-4xl mb-8"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              Amenities
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.amenities.map((amenity, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-4 py-2 text-sm border-[var(--navy)] text-[var(--navy)]"
                >
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Unit Types */}
      {project.unitTypes && project.unitTypes.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl md:text-4xl mb-8"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              Available Unit Types
            </h2>
            <div className="flex flex-wrap gap-4">
              {project.unitTypes.map((unit, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-[var(--navy)] text-white rounded-lg font-medium"
                >
                  {unit}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-[var(--navy)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Interested in {project.title}?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get in touch today for pricing, floor plans, and investment details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#25D366] hover:bg-[#22BF5B] text-white"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp Enquiry
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="!border-white !text-white hover:!bg-white hover:!text-[var(--navy)] !bg-transparent"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
            {project.brochureUrl && (
              <Button
                size="lg"
                className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--navy)]"
                asChild
              >
                <a href={project.brochureUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-5 w-5 mr-2" />
                  Download Brochure
                </a>
              </Button>
            )}
            {project.websiteUrl && (
              <Button
                size="lg"
                variant="outline"
                className="!border-[var(--gold)] !text-[var(--gold)] hover:!bg-[var(--gold)] hover:!text-[var(--navy)] !bg-transparent"
                asChild
              >
                <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Official Website
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
