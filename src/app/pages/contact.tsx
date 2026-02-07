import { useState, useRef } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { toast } from 'sonner';
import { Toaster } from '@/app/components/ui/sonner';
import { useSiteConfig } from '@/app/hooks/useSiteConfig';
import { siteConfig as staticConfig } from '@/app/data/site-config';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyInterest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { siteConfig } = useSiteConfig();

  if (!siteConfig) return null;

  const { googleForm } = staticConfig;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // If Google Form is enabled, submit to Google Forms
    if (googleForm?.enabled && googleForm.formActionUrl) {
      try {
        const formBody = new URLSearchParams();
        formBody.append(googleForm.entryIds.name, formData.name);
        formBody.append(googleForm.entryIds.email, formData.email);
        formBody.append(googleForm.entryIds.phone, formData.phone);
        formBody.append(googleForm.entryIds.propertyInterest, formData.propertyInterest);
        formBody.append(googleForm.entryIds.message, formData.message);

        // Submit via hidden iframe to bypass CORS
        const iframe = iframeRef.current;
        if (iframe) {
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = googleForm.formActionUrl;
          form.target = 'google-form-iframe';

          Object.entries({
            [googleForm.entryIds.name]: formData.name,
            [googleForm.entryIds.email]: formData.email,
            [googleForm.entryIds.phone]: formData.phone,
            [googleForm.entryIds.propertyInterest]: formData.propertyInterest,
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

        // Wait a moment for submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success('Thank you for your message! We will get back to you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          propertyInterest: '',
          message: '',
        });
      } catch (error) {
        toast.error('Something went wrong. Please try again or contact us via WhatsApp.');
      }
    } else {
      // Fallback: just show success message (demo mode)
      toast.success('Thank you for your message! We will get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyInterest: '',
        message: '',
      });
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: [siteConfig.contactPhone],
      action: `tel:${siteConfig.contactPhoneRaw}`,
      actionLabel: 'Call Now',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: [siteConfig.contactPhone],
      action: `https://wa.me/${siteConfig.whatsappNumber}`,
      actionLabel: 'Chat Now',
    },
    {
      icon: Mail,
      title: 'Email',
      details: [siteConfig.contactEmail, siteConfig.contactSecondaryEmail].filter(Boolean),
      action: `mailto:${siteConfig.contactEmail}`,
      actionLabel: 'Send Email',
    },
    {
      icon: MapPin,
      title: 'Office Location',
      details: [siteConfig.officeAddress.line1, siteConfig.officeAddress.line2],
      action: null,
      actionLabel: null,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[var(--navy)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {siteConfig.contactPageTitle}
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            {siteConfig.contactPageSubtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2
                className="text-2xl mb-6"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
              >
                Contact Information
              </h2>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-[var(--gold)]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <info.icon className="h-5 w-5 text-[var(--gold)]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-sm text-muted-foreground">
                              {detail}
                            </p>
                          ))}
                          {info.action && (
                            <a
                              href={info.action}
                              className="text-sm text-[var(--gold)] hover:underline mt-1 inline-block"
                              target={info.action.startsWith('http') ? '_blank' : undefined}
                              rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                              {info.actionLabel}
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Working Hours */}
            <Card className="bg-[var(--light-gray)]">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-[var(--gold)] mr-2" />
                  <h3 className="font-semibold">Working Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{siteConfig.workingHours.weekdays.days}</span>
                    <span className="font-medium">{siteConfig.workingHours.weekdays.hours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{siteConfig.workingHours.saturday.days}</span>
                    <span className="font-medium">{siteConfig.workingHours.saturday.hours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{siteConfig.workingHours.sunday.days}</span>
                    <span className="font-medium">{siteConfig.workingHours.sunday.hours}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold mb-4">Follow Me</h3>
              <div className="flex gap-3">
                {siteConfig.socialMedia.facebook && (
                  <a
                    href={siteConfig.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[var(--navy)] text-white rounded-full flex items-center justify-center hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-colors"
                  >
                    F
                  </a>
                )}
                {siteConfig.socialMedia.instagram && (
                  <a
                    href={siteConfig.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[var(--navy)] text-white rounded-full flex items-center justify-center hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-colors"
                  >
                    I
                  </a>
                )}
                {siteConfig.socialMedia.linkedin && (
                  <a
                    href={siteConfig.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[var(--navy)] text-white rounded-full flex items-center justify-center hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-colors"
                  >
                    L
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h2
                  className="text-2xl mb-6"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
                >
                  {siteConfig.contactPageFormTitle}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="property">Property Interest</Label>
                      <Select
                        value={formData.propertyInterest}
                        onValueChange={(value) => setFormData({ ...formData, propertyInterest: value })}
                      >
                        <SelectTrigger id="property">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buying">Buying a Property</SelectItem>
                          <SelectItem value="selling">Selling a Property</SelectItem>
                          <SelectItem value="investing">Investment Opportunity</SelectItem>
                          <SelectItem value="renting">Renting</SelectItem>
                          <SelectItem value="consultation">General Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your property requirements or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      className="bg-[var(--navy)] hover:bg-[var(--navy)]/90 flex-1"
                      size="lg"
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
                    <Button
                      type="button"
                      variant="outline"
                      className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white flex-1"
                      size="lg"
                      asChild
                    >
                      <a href={`https://wa.me/${siteConfig.whatsappNumber}`}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp Instead
                      </a>
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    By submitting this form, you agree to our privacy policy. We'll never share your information.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Map */}
            <div className="mt-8">
              <Card>
                <CardContent className="p-0 overflow-hidden rounded-lg">
                  <a
                    href={siteConfig.contactMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative w-full h-96 group cursor-pointer"
                  >
                    {siteConfig.contactMapEmbedUrl ? (
                      <>
                        <iframe
                          src={siteConfig.contactMapEmbedUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Office Location"
                          className="pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-[var(--gold)]" />
                            <span className="font-medium text-[var(--navy)]">Open in Google Maps</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="h-12 w-12 text-[var(--gold)] mx-auto mb-3" />
                          <h3 className="text-xl mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}>
                            {siteConfig.contactPageOfficeTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {siteConfig.officeAddress.line1}{siteConfig.officeAddress.line2 ? `, ${siteConfig.officeAddress.line2}` : ''}
                          </p>
                        </div>
                      </div>
                    )}
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Quick Contact Options */}
        <div className="mt-16 bg-[var(--light-gray)] rounded-lg p-8">
          <div className="text-center mb-8">
            <h2
              className="text-2xl md:text-3xl mb-3"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              {siteConfig.contactPageInstantContactTitle}
            </h2>
            <p className="text-muted-foreground">
              {siteConfig.contactPageInstantContactSubtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Button
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white flex-1"
              size="lg"
              asChild
            >
              <a href={`https://wa.me/${siteConfig.whatsappNumber}`}>
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white flex-1"
              size="lg"
              asChild
            >
              <a href={`tel:${siteConfig.contactPhoneRaw}`}>
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Hidden iframe for Google Forms submission */}
      <iframe
        ref={iframeRef}
        name="google-form-iframe"
        style={{ display: 'none' }}
        title="Google Form Submission"
      />

      <Toaster />
    </div>
  );
}
