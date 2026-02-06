import { Link } from 'react-router';
import { ChevronRight, Award, Clock } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { siteConfig } from '@/app/data/site-config';

export function AboutPreview() {
  const { about } = siteConfig;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={about.agent.image}
                alt={about.agent.fullName}
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* RERA Badge - Overlapping bottom-right */}
            <div 
              className="absolute -bottom-6 -right-6 bg-[var(--gold)] rounded-2xl shadow-xl text-center"
              style={{ 
                width: '160px', 
                height: '110px',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <div 
                className="text-4xl md:text-5xl leading-none mb-1"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
              >
                RERA
              </div>
              <div 
                className="text-sm md:text-base font-medium"
                style={{ color: 'var(--navy)' }}
              >
                Certified
              </div>
            </div>
          </div>

          <div>
            <h2
              className="text-3xl md:text-4xl mb-6"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              {about.agent.title}
            </h2>
            <div className="space-y-4 text-muted-foreground mb-8">
              {about.agent.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[var(--gold)]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <div>
                  <div
                    className="text-lg mb-1 font-semibold"
                    style={{ color: 'var(--navy)' }}
                  >
                    RERA Certified
                  </div>
                  <div className="text-sm text-muted-foreground">Official Licensed Agent</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[var(--gold)]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <div>
                  <div
                    className="text-lg mb-1 font-semibold"
                    style={{ color: 'var(--navy)' }}
                  >
                    24/7 Available
                  </div>
                  <div className="text-sm text-muted-foreground">Quick Response Time</div>
                </div>
              </div>
            </div>

            <Button
              className="bg-[var(--navy)] hover:bg-[var(--navy)]/90"
              asChild
            >
              <Link to="/about">
                Learn More About Me
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}