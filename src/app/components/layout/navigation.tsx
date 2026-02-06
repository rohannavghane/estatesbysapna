import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { siteConfig } from '@/app/data/site-config';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex flex-col">
              <span className="text-2xl" style={{ fontFamily: 'var(--font-heading)' }}>
                <span className="text-[var(--navy)]">{siteConfig.site.name.split(' ').slice(0, -1).join(' ')}</span>
                <span className="text-[var(--gold)]"> {siteConfig.site.name.split(' ').slice(-1)}</span>
              </span>
              <span className="text-xs text-muted-foreground tracking-wider">{siteConfig.site.tagline}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? 'text-[var(--navy)] font-medium'
                    : 'text-muted-foreground hover:text-[var(--navy)]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white"
              asChild
            >
              <a href={`tel:${siteConfig.contact.phoneRaw}`}>
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    isActive(link.path)
                      ? 'bg-secondary text-[var(--navy)] font-medium'
                      : 'text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button
                variant="outline"
                className="border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white"
                asChild
              >
                <a href={`tel:${siteConfig.contact.phoneRaw}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
