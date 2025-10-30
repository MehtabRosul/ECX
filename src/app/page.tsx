
import { Hero } from '@/components/home/hero';
import { Metrics } from '@/components/home/metrics';
import { CaseStudies } from '@/components/home/case-studies';
import { Partners } from '@/components/home/partners';
import { Cta } from '@/components/home/cta';
import { WhatWeDo } from '@/components/home/what-we-do';
import { ProductQuickExplorer } from '@/components/home/product-quick-explorer';
import { SolutionsCarousel } from '@/components/home/solutions-carousel';
import { ResearchLab } from '@/components/home/research-lab';
import { Community } from '@/components/home/community';
import { FeaturedResearch } from '@/components/home/featured-research';
import { FeaturedIntegrations } from '@/components/home/featured-integrations';
import { InnovationMatrix } from '@/components/home/innovation-matrix';
import { UpcomingEvents } from '@/components/home/upcoming-events';
import { Faq } from '@/components/home/faq';
import { Testimonials } from '@/components/home/testimonials';
import { AdvertisementBanner } from '@/components/home/advertisement-banner';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-1">
      <main className="flex-1">
        <Hero />
        <Partners />
        <WhatWeDo />
        <ProductQuickExplorer />
        <Metrics />
        <SolutionsCarousel />
        <ResearchLab />
        <Community />
        <FeaturedResearch />
        <CaseStudies />
        <FeaturedIntegrations />
        <InnovationMatrix />
        <UpcomingEvents />
        <Testimonials />
        <AdvertisementBanner />
        <Faq />
        <Cta />
        {/* Extra spacing between CTA and Footer */}
        <div className="h-24" />
      </main>
    </div>
  );
}
