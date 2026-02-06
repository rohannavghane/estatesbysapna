import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { siteConfig } from '@/app/data/site-config';
import { getPublicAssetPath } from '@/app/lib/utils';
import {
  Award,
  Bell,
  Check,
  Clock,
  FileText,
  GraduationCap, Handshake,
  Home,
  Laptop,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare, Network,
  Phone,
  Star,
  Target, Timer,
  TrendingUp,
  User,
  // Users
} from 'lucide-react';
import { Link } from 'react-router';

// const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
//   Award, Users, Home, Star, Check, MapPin, User, TrendingUp,
//   Laptop, Clock, MessageSquare, Network, Target, Timer, FileText, Bell,
//   GraduationCap, Handshake, Phone, Mail, MessageCircle
// };

export function AboutPage() {
  const { about, contact, cta } = siteConfig;
  const agentImageSrc = about.agent.image.startsWith('http')
    ? about.agent.image
    : getPublicAssetPath(about.agent.image);

  const credentialIcons = [Check, GraduationCap, Home, Star];
  const trustIcons = [Award, Clock, Handshake, TrendingUp];
  const whyChooseMeIcons = [User, TrendingUp, Laptop, Clock, MessageSquare, Network];
  const certIcons = [Award, GraduationCap, Star, TrendingUp];
  const benefitIcons = [Target, Timer, FileText, Bell];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left Side - Image (40%) */}
            <div className="lg:col-span-2 flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-[3px] border-[var(--gold)] shadow-lg">
                  <ImageWithFallback
                    src={agentImageSrc}
                    alt={about.agent.fullName}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 30%' }}
                  />
                </div>

              </div>
            </div>

            {/* Right Side - Content (60%) */}
            <div className="lg:col-span-3">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
              >
                {about.agent.fullName}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-6">
                {about.agent.title}
              </p>
              <div className="text-sm md:text-base text-gray-600 leading-relaxed mb-8 max-w-2xl space-y-4">
                {about.agent.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[var(--navy)] hover:bg-[var(--navy)]/90 text-white h-12 px-8"
                  asChild
                >
                  <Link to="/contact">Schedule Free Consultation</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white h-12 px-8"
                  asChild
                >
                  <a href={`https://wa.me/${contact.whatsapp}`}>
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Message on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Badge Section */}
      <section className="py-12 bg-[var(--light-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {about.credentials.map((badge, index) => {
              const IconComponent = credentialIcons[index % credentialIcons.length];
              return (
                <div
                  key={index}
                  className="bg-white border-2 border-[var(--navy)] rounded-full px-6 md:px-8 py-4 flex items-center justify-center gap-3 hover:border-[var(--gold)] transition-colors"
                >
                  <IconComponent className="h-5 w-5 text-[var(--navy)] flex-shrink-0" />
                  <span className="font-medium text-[var(--navy)] text-sm md:text-base text-center">
                    {badge.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.trustIndicators.map((indicator, index) => {
              const IconComponent = trustIcons[index % trustIcons.length];
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 border-2 border-[var(--gold)]">
                    <IconComponent className="h-8 w-8 text-[var(--gold)]" />
                  </div>
                  <div
                    className="text-3xl md:text-4xl mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
                  >
                    {indicator.title}
                  </div>
                  <div className="text-base text-gray-600">{indicator.subtitle}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl mb-3"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              Why Choose Me?
            </h2>
            <p className="text-lg text-gray-600">
              Personalized service backed by market expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {about.whyChooseMe.map((item, index) => {
              const IconComponent = whyChooseMeIcons[index % whyChooseMeIcons.length];
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl p-10 hover:shadow-lg transition-shadow"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}>
                    <IconComponent className="h-8 w-8 text-[var(--gold)]" />
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Areas of Expertise Section */}
      <section className="py-20 bg-[var(--light-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              Areas of Expertise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Property Types */}
            <div>
              <h3
                className="text-xl mb-6"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--navy)' }}
              >
                Property Types I Specialize In
              </h3>
              <div className="space-y-4">
                {about.propertyTypes.map((type, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[var(--gold)] flex-shrink-0" />
                    <span className="text-base text-gray-700">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Locations */}
            <div>
              <h3
                className="text-xl mb-6"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--navy)' }}
              >
                Key Dubai Locations
              </h3>
              <div className="space-y-4">
                {about.keyLocations.map((location, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[var(--gold)] flex-shrink-0" />
                    <span className="text-base text-gray-700">{location}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl mb-12 text-center"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
          >
            My Commitment to You
          </h2>

          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            {about.agent.commitment.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "relative pl-8" : ""}>
                {index === 0 && (
                  <span className="absolute left-0 top-0 text-5xl text-[var(--gold)] leading-none" style={{ fontFamily: 'var(--font-heading)' }}>"</span>
                )}
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Training & Certifications Section */}
      <section className="py-20 bg-[var(--light-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              Professional Qualifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.certifications.map((cert, index) => {
              const IconComponent = certIcons[index % certIcons.length];
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-[var(--gold)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-[var(--gold)]" />
                    </div>
                    <h3
                      className="text-lg mb-2"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--navy)' }}
                    >
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{cert.organization}</p>
                    <p className="text-sm text-gray-500">{cert.date}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Early Client Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-l-8 border-[var(--gold)] pl-8 md:pl-16">
            <div className="mb-12">
              <h2
                className="text-3xl md:text-4xl mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
              >
                Early Client Advantages
              </h2>
              <p className="text-lg text-gray-600">
                Be among my early clients and receive VIP treatment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {about.earlyClientBenefits.map((benefit, index) => {
                const IconComponent = benefitIcons[index % benefitIcons.length];
                return (
                  <div key={index}>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[var(--gold)] rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3
                          className="text-xl mb-2"
                          style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--navy)' }}
                        >
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="bg-[var(--navy)] hover:bg-[var(--navy)]/90 text-white h-12 px-8"
                asChild
              >
                <Link to="/contact">Claim Your VIP Experience</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--navy)] to-[#0f1419] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {cta.title}
          </h2>
          <p className="text-xl text-white/80 mb-10">
            {cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--navy)] h-12 px-8"
              asChild
            >
              <Link to="/contact">{cta.primaryButtonText}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white border-white text-[#25D366] hover:bg-white/90 h-12 px-8"
              asChild
            >
              <a href={`https://wa.me/${contact.whatsapp}`}>
                <MessageCircle className="h-5 w-5 mr-2" />
                {cta.secondaryButtonText}
              </a>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center text-sm text-white/70">
            <a href={`tel:${contact.phoneRaw}`} className="flex items-center justify-center gap-2 hover:text-white transition-colors">
              <Phone className="h-4 w-4" />
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center justify-center gap-2 hover:text-white transition-colors">
              <Mail className="h-4 w-4" />
              {contact.email}
            </a>
            <a href={`https://wa.me/${contact.whatsapp}`} className="flex items-center justify-center gap-2 hover:text-white transition-colors">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}