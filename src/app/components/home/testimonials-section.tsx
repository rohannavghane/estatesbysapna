import { User, Award, Network } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';

export function TestimonialsSection() {
  const whyChooseMe = [
    {
      icon: User,
      title: 'Personalized Attention',
      description: 'With dedicated focus on your unique needs, you\'ll receive the time and attention your property search deserves—not just another number in a large portfolio.',
    },
    {
      icon: Award,
      title: 'Trusted Professional',
      description: 'Verified professional with comprehensive market training, equipped with the latest knowledge on Dubai\'s property regulations and market trends.',
    },
    {
      icon: Network,
      title: 'Strong Industry Network',
      description: 'Connected with top developers, property owners, and industry professionals to bring you exclusive opportunities and the best deals.',
    },
  ];

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