
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
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
import { ActivityFeed } from '@/components/home/activity-feed';
import { FeaturedIntegrations } from '@/components/home/featured-integrations';
import { SecuritySnapshot } from '@/components/home/security-snapshot';
import { UpcomingEvents } from '@/components/home/upcoming-events';
import { NewsletterCta } from '@/components/home/newsletter-cta';
import { Faq } from '@/components/home/faq';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-1">
      <Header />
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
        <ActivityFeed />
        <FeaturedIntegrations />
        <SecuritySnapshot />
        <UpcomingEvents />
        <NewsletterCta />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
