import { MessageCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useSiteConfig } from '@/app/hooks/useSiteConfig';

export function WhatsAppButton() {
  const { siteConfig } = useSiteConfig();

  if (!siteConfig) return null;

  const message = 'Hello, I am interested in your properties.';
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <Button
        size="lg"
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[var(--navy)] text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat on WhatsApp
      </span>
    </a>
  );
}
