import { Link } from 'react-router';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { useSiteConfig } from '@/app/hooks/useSiteConfig';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Properties', path: '/properties' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const popularAreas = [
  'Dubai Marina',
  'Downtown Dubai',
  'Palm Jumeirah',
  'Business Bay',
  'Jumeirah Beach Residence',
];

export function Footer() {
  const { siteConfig } = useSiteConfig();

  if (!siteConfig) return null;

  return (
    <footer className="bg-[var(--navy)] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-2xl" style={{ fontFamily: 'var(--font-heading)' }}>
                <span className="text-white">{siteConfig.siteName.split(' ').slice(0, -1).join(' ')}</span>
                <span className="text-[var(--gold)]"> {siteConfig.siteName.split(' ').slice(-1)}</span>
              </span>
              <span className="text-xs text-gray-400 tracking-wider">{siteConfig.siteTagline}</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {siteConfig.siteDescription}
            </p>
            <div className="flex space-x-4">
              {siteConfig.socialMedia.facebook && (
                <a href={siteConfig.socialMedia.facebook} className="text-gray-400 hover:text-[var(--gold)] transition-colors" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {siteConfig.socialMedia.instagram && (
                <a href={siteConfig.socialMedia.instagram} className="text-gray-400 hover:text-[var(--gold)] transition-colors" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {siteConfig.socialMedia.linkedin && (
                <a href={siteConfig.socialMedia.linkedin} className="text-gray-400 hover:text-[var(--gold)] transition-colors" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              <a href={`https://wa.me/${siteConfig.whatsappNumber}`} className="text-gray-400 hover:text-[var(--gold)] transition-colors" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-[var(--gold)] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Areas */}
          <div>
            <h3 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Popular Areas</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {popularAreas.map((area) => (
                <li key={area} className="hover:text-[var(--gold)] transition-colors cursor-pointer">{area}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="h-4 w-4 mt-1 text-[var(--gold)] flex-shrink-0" />
                <a href={`tel:${siteConfig.contactPhoneRaw}`} className="text-gray-400 hover:text-[var(--gold)] transition-colors text-sm">
                  {siteConfig.contactPhone}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-4 w-4 mt-1 text-[var(--gold)] flex-shrink-0" />
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-gray-400 hover:text-[var(--gold)] transition-colors text-sm">
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-1 text-[var(--gold)] flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  {siteConfig.officeAddress.line1}, {siteConfig.officeAddress.line2}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} {siteConfig.siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
