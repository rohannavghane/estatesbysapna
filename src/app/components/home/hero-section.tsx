import { Button } from '@/app/components/ui/button';
import { useSiteConfig } from '@/app/hooks/useSiteConfig';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Search } from 'lucide-react';

export function HeroSection() {
  const { siteConfig } = useSiteConfig();

  if (!siteConfig) return null;
  return (
    <div className="relative h-[600px] md:h-[700px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={siteConfig.heroBackgroundImage}
          alt="Dubai Skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1
          className="text-4xl md:text-6xl lg:text-7xl mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {siteConfig.heroTitle}
          <br />
          <span className="text-[var(--gold)]">{siteConfig.heroTitleHighlight}</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
          {siteConfig.heroDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--navy)] h-12 px-8"
          >
            <Search className="h-5 w-5 mr-2" />
            {siteConfig.heroPrimaryButtonText}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white !bg-transparent !text-white hover:!bg-white hover:!text-[var(--navy)] h-12 px-8"
            asChild
          >
            <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer">{siteConfig.heroSecondaryButtonText}</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
