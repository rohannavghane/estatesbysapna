import { Award, Clock, Handshake, GraduationCap, Users } from 'lucide-react';
import { siteConfig } from '@/app/data/site-config';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Clock,
  Handshake,
  GraduationCap,
  Users,
};

export function TrustSection() {
  const stats = siteConfig.trustIndicators.map((indicator) => {
    const IconComponent = iconMap[indicator.icon] || Award;
    return {
      icon: IconComponent,
      value: indicator.title,
      label: indicator.subtitle,
    };
  });

  return (
    <section className="py-16 bg-[var(--light-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 border-2 border-[var(--gold)]">
                <stat.icon className="h-8 w-8 text-[var(--gold)]" />
              </div>
              <div
                className="text-2xl md:text-3xl mb-2"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
              >
                {stat.value}
              </div>
              <div className="text-base text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}