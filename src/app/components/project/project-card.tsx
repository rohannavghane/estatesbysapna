import { Link } from 'react-router';
import { MapPin, Building2, Calendar, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useSiteConfig } from '@/app/hooks/useSiteConfig';
import type { Project } from '@/app/hooks/useProjects';

const statusConfig: Record<string, { label: string; className: string }> = {
  'newly-launched': { label: 'New Launch', className: 'bg-[var(--navy)] text-white' },
  'under-construction': { label: 'Under Construction', className: 'bg-amber-500 text-white' },
  'coming-soon': { label: 'Coming Soon', className: 'bg-purple-600 text-white' },
  'completed': { label: 'Completed', className: 'bg-green-600 text-white' },
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { siteConfig } = useSiteConfig();

  const formatPrice = (price: number) => {
    if (price >= 1_000_000) {
      return `AED ${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)}M`;
    }
    return `AED ${price.toLocaleString()}`;
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!siteConfig) return;
    const message = `Hi, I'm interested in ${project.title}${project.developer ? ` by ${project.developer}` : ''}`;
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const status = statusConfig[project.status] || statusConfig['newly-launched'];

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:border-2 hover:border-[var(--gold)]">
      <Link to={`/project/${project.slug}`}>
        {/* Image Container - FIXED HEIGHT 260px */}
        <div className="relative overflow-hidden h-[260px]">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {project.featured && (
              <Badge className="bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold)]/90 px-4 py-2 rounded-full font-semibold text-[13px]">
                Featured
              </Badge>
            )}
            <Badge className={`px-4 py-2 rounded-full font-semibold text-[13px] ${status.className}`}>
              {status.label}
            </Badge>
          </div>
        </div>
      </Link>

      {/* Content */}
      <CardContent className="p-6 flex flex-col gap-3">
        <Link to={`/project/${project.slug}`} className="flex flex-col gap-3">
          {/* Location */}
          {project.location && (
            <div className="flex items-center gap-2 h-5">
              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-400">{project.location}</span>
            </div>
          )}

          {/* Title */}
          <h3
            className="text-xl font-semibold leading-7 overflow-hidden"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--navy)',
              height: '56px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {project.title}
          </h3>

          {/* Developer */}
          {project.developer && (
            <div className="flex items-center gap-2 h-5">
              <Building2 className="h-4 w-4 text-[var(--gold)] flex-shrink-0" />
              <span className="text-sm font-medium text-[var(--gold)]">{project.developer}</span>
            </div>
          )}

          {/* Starting Price */}
          {project.startingPrice ? (
            <p className="text-sm text-gray-600 h-5">
              Starting from{' '}
              <span className="font-semibold text-[var(--navy)]">
                {formatPrice(project.startingPrice)}
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-400 h-5">Price on request</p>
          )}

          {/* Completion Date */}
          {project.completionDate && (
            <div className="flex items-center gap-2 h-5">
              <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-500">Ready {project.completionDate}</span>
            </div>
          )}
        </Link>

        {/* WhatsApp Button */}
        <Button
          onClick={handleWhatsApp}
          className="w-full h-12 bg-[#25D366] hover:bg-[#22BF5B] text-white hover:shadow-[0_2px_8px_rgba(37,211,102,0.3)] transition-all mt-1"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          <span className="text-[15px] font-medium">Enquire Now</span>
        </Button>
      </CardContent>
    </Card>
  );
}
