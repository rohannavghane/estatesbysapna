import { useRef } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { neighborhoods } from '@/app/data/properties';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Button } from '@/app/components/ui/button';

export function NeighborhoodsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2
              className="text-3xl md:text-4xl mb-3"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              Explore Dubai's Premium Neighborhoods
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover the most sought-after locations in Dubai
            </p>
          </div>
          <div className="hidden sm:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {neighborhoods.map((neighborhood, index) => (
            <Link
              key={index}
              to={`/area/${neighborhood.slug}`}
              className="group relative overflow-hidden rounded-lg h-80 cursor-pointer flex-shrink-0 w-72 snap-start block"
            >
              <ImageWithFallback
                src={neighborhood.image}
                alt={neighborhood.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3
                  className="text-2xl mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {neighborhood.name}
                </h3>
                <p className="text-sm text-gray-200">{neighborhood.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
