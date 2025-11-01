'use client';

import { lazy, Suspense, memo } from 'react';
import { ContactHero } from '@/components/contact/contact-hero';
import { ContactParticlesBackground } from '@/components/contact/contact-particles-background';

// Lazy load below-the-fold components for better initial load performance
const ContactFormsSection = lazy(() => import('@/components/contact/contact-forms-section').then(module => ({ default: module.ContactFormsSection })));
const DirectContacts = lazy(() => import('@/components/contact/direct-contacts').then(module => ({ default: module.DirectContacts })));
const CreativeMap = lazy(() => import('@/components/contact/creative-map').then(module => ({ default: module.CreativeMap })));

// Memoized background overlay to prevent unnecessary re-renders
const BackgroundOverlay = memo(() => (
  <>
    {/* Animated gradient background overlay */}
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
    </div>

    {/* Grid pattern overlay */}
    <div className="fixed inset-0 -z-10 bg-background bg-dot-pattern bg-repeat opacity-30 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]" />
  </>
));
BackgroundOverlay.displayName = 'BackgroundOverlay';

// Loading fallback component
const SectionLoader = memo(() => (
  <div className="w-full py-20 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
));
SectionLoader.displayName = 'SectionLoader';

function ContactPageClientComponent() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated background particles */}
      <ContactParticlesBackground className="opacity-30" />

      <BackgroundOverlay />

      {/* Content sections */}
      <div className="relative z-10">
        <ContactHero />
        <Suspense fallback={<SectionLoader />}>
          <ContactFormsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <DirectContacts />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <CreativeMap />
        </Suspense>
      </div>
    </main>
  );
}

export const ContactPageClient = memo(ContactPageClientComponent);

