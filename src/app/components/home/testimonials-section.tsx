import { User, Award, Network, TrendingUp, Laptop, Clock, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { useSiteConfig } from '@/app/hooks/useSiteConfig';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  User,
  Award,
  Network,
  TrendingUp,
  Laptop,
  Clock,
  MessageSquare,
};

export function TestimonialsSection() {
  const { siteConfig } = useSiteConfig();

  if (!siteConfig?.aboutWhyChooseMe) return null;

  const whyChooseMe = siteConfig.aboutWhyChooseMe.map((item, index) => ({
    icon: iconMap[Object.keys(iconMap)[index % Object.keys(iconMap).length]],
    title: item.title,
    description: item.description,
  }));

  return (
    <section className="py-20 bg-[var(--light-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
          >
            Why Choose Me?
          </h2>
          <p className="text-muted-foreground">
            Personalized attention backed by professional expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyChooseMe.map((item, index) => (
            <Card 
              key={index} 
              className="border border-gray-200 hover:shadow-lg transition-shadow"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <CardContent className="p-10">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6" 
                  style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}
                >
                  <item.icon className="h-8 w-8 text-[var(--gold)]" />
                </div>
                <h3
                  className="text-xl mb-4"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--navy)' }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600" style={{ lineHeight: 1.7 }}>
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}