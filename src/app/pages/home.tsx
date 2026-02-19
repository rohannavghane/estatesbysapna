import { Toaster } from '@/app/components/ui/sonner';
import { HeroSection } from '@/app/components/home/hero-section';
import { PropertySearch } from '@/app/components/home/property-search';
import { FeaturedProperties } from '@/app/components/home/featured-properties';
import { NewlyLaunchedSection } from '@/app/components/home/newly-launched-section';
import { OffPlanSection } from '@/app/components/home/off-plan-section';
import { TrustSection } from '@/app/components/home/trust-section';
import { NeighborhoodsSection } from '@/app/components/home/neighborhoods-section';
import { AboutPreview } from '@/app/components/home/about-preview';
import { TestimonialsSection } from '@/app/components/home/testimonials-section';
import { ContactCTA } from '@/app/components/home/contact-cta';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <PropertySearch />
      <TrustSection />
      <FeaturedProperties />
      <NewlyLaunchedSection />
      <OffPlanSection />
      <NeighborhoodsSection />
      <AboutPreview />
      <TestimonialsSection />
      <ContactCTA />
      <Toaster />
    </>
  );
}
