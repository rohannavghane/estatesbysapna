import { useState, useRef } from 'react';
import { Mail, Phone, MessageCircle, Send, Loader2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent } from '@/app/components/ui/card';
import { toast } from 'sonner';
import { useSiteConfig } from '@/app/hooks/useSiteConfig';
import { siteConfig as staticConfig } from '@/app/data/site-config';

export function ContactCTA() {
  const { siteConfig } = useSiteConfig();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!siteConfig) return null;

  const { googleForm } = staticConfig;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // If Google Form is enabled, submit to Google Forms
    if (googleForm?.enabled && googleForm.formActionUrl) {
      try {
        const iframe = iframeRef.current;
        if (iframe) {
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = googleForm.formActionUrl;
          form.target = 'google-form-iframe-cta';

          Object.entries({
            [googleForm.entryIds.name]: formData.name,
            [googleForm.entryIds.email]: formData.email,
            [googleForm.entryIds.phone]: formData.phone,
            [googleForm.entryIds.message]: formData.message,
          }).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
          });

          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success('Thank you! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } catch (error) {
        toast.error('Something went wrong. Please try again or contact us via WhatsApp.');
      }
    } else {
      toast.success('Thank you! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }

    setIsSubmitting(false);
  };

  return (
    <section className="py-20 bg-[var(--navy)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="text-white">
            <h2
              className="text-3xl md:text-4xl mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {siteConfig.ctaTitle.split('?')[0]}
              <br />
              <span className="text-[var(--gold)]">{siteConfig.ctaTitle.includes('?') ? '?' : ''}</span>
            </h2>
            <p className="text-gray-300 mb-8">
              {siteConfig.ctaSubtitle}
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[var(--gold)] rounded-full flex items-center justify-center mr-4">
                  <Phone className="h-5 w-5 text-[var(--navy)]" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Call or WhatsApp</div>
                  <a href={`tel:${siteConfig.contactPhoneRaw}`} className="text-lg hover:text-[var(--gold)] transition-colors">
                    {siteConfig.contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-[var(--gold)] rounded-full flex items-center justify-center mr-4">
                  <Mail className="h-5 w-5 text-[var(--navy)]" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <a href={`mailto:${siteConfig.contactEmail}`} className="text-lg hover:text-[var(--gold)] transition-colors">
                    {siteConfig.contactEmail}
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-white"
                  size="lg"
                  asChild
                >
                  <a href={`https://wa.me/${siteConfig.whatsappNumber}`}>
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3
                className="text-2xl mb-6"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
              >
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Tell me about your property requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[var(--navy)] hover:bg-[var(--navy)]/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hidden iframe for Google Forms submission */}
      <iframe
        ref={iframeRef}
        name="google-form-iframe-cta"
        style={{ display: 'none' }}
        title="Google Form Submission"
      />
    </section>
  );
}
