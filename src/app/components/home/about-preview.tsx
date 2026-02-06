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
                    style={{ objectPosition: 'center 30%' }}
              />
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
                    Sapna Navghane
                  </div>
                  <div className="text-sm text-muted-foreground">Real Estate Agent</div>
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