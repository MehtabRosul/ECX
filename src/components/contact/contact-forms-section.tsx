'use client';

import { motion } from 'framer-motion';
import { useMemo, memo } from 'react';
import { InteractiveFormCard } from './interactive-form-card';

const forms = [
  {
    title: 'Contact Us',
    description: 'General inquiries and support',
    href: '/contact?form=contact-us',
  },
  {
    title: 'RFP',
    description: 'Request for Proposal submissions',
    href: '/contact?form=rfp',
  },
  {
    title: 'Partner',
    description: 'Partnership and collaboration opportunities',
    href: '/contact?form=partner',
  },
  {
    title: 'Contributor',
    description: 'Join our open-source community',
    href: '/contact?form=contributor',
  },
  {
    title: 'Trial',
    description: 'Request a free trial of our services',
    href: '/contact?form=trial',
  },
  {
    title: 'Press',
    description: 'Media inquiries and press releases',
    href: '/contact?form=press',
  },
  {
    title: 'Event',
    description: 'Event registrations and inquiries',
    href: '/contact?form=event',
  },
  {
    title: 'Quote',
    description: 'Get a custom quote for your needs',
    href: '/contact?form=quote',
  },
];

function ContactFormsSectionComponent() {
  const memoizedForms = useMemo(() => forms, []);

  return (
    <section id="forms" className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-20 overflow-hidden">
      {/* Background Layers - Matching Hero Section */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-background bg-dot-pattern bg-repeat opacity-20 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)]" />
        
        {/* Transition Gradient - Top fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/50 to-transparent -z-10" />
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4"
          >
            Choose Your <span className="text-primary">Contact Form</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-lg text-muted-foreground"
          >
            Select the form that best matches your inquiry
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {memoizedForms.map((form, index) => (
            <InteractiveFormCard
              key={form.title}
              title={form.title}
              description={form.description}
              href={form.href}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export const ContactFormsSection = memo(ContactFormsSectionComponent);

