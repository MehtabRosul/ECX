'use client'

import { Tabs } from '@/components/ui/tabs';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { AnimatedTabs } from '../ui/animated-tabs';
import { EffectCard } from '../ui/effect-card';
import FadeContent from '../ui/fade-content';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const whatWeDoTabs = [
  {
    id: 'services',
    title: 'Our Services',
    description:
      "A complete suite of security and privacy services—from cryptography engineering and enclave deployments to security audits and architecture reviews. We help teams design, build, and operate trustworthy systems with hands‑on expertise and battle‑tested practices.",
    href: '/services',
  },
  {
    id: 'products',
    title: 'Our Products',
    description:
      'Explore ECX products born from our research: high‑assurance building blocks for encryption, confidential computing, key management, and analytics on private data. Designed for developers, ready for production.',
    href: '/products',
  },
  {
    id: 'consult',
    title: 'Consult with us',
    description:
      'Work directly with our researchers and engineers. We co‑design protocols, review implementations, and guide your roadmap to achieve measurable security outcomes—from threat modeling to production hardening.',
    href: '/contact',
  },
];

const CardContent = ({ tab }: { tab: (typeof whatWeDoTabs)[0] }) => {
  return (
    <EffectCard>
      <div className="relative w-full h-72 rounded-lg flex items-center justify-center p-6 overflow-hidden">
         {tab.id === 'services' ? (
           <video
             src="/Videos/2340-157269921.mp4"
             autoPlay
             loop
             muted
             playsInline
             className="w-full h-full object-cover"
           />
         ) : tab.id === 'products' ? (
           <video
             src="/Videos/299527_medium.mp4"
             autoPlay
             loop
             muted
             playsInline
             className="w-full h-full object-cover"
           />
         ) : tab.id === 'consult' ? (
          <video
            src="/Videos/198890-909564521_medium.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
         ) : (
          <div className="w-full h-full" />
        )}
      </div>
    </EffectCard>
  )
}

export function WhatWeDo() {
  const [activeTab, setActiveTab] = useState(whatWeDoTabs[0].id);
  const [direction, setDirection] = useState(0);
  const prefersReduced = useReducedMotion();

  const handleTabChange = (newTabId: string) => {
    const currentIndex = whatWeDoTabs.findIndex(t => t.id === activeTab);
    const newIndex = whatWeDoTabs.findIndex(t => t.id === newTabId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(newTabId);
  }

  return (
    <section className="py-12 sm:py-24 bg-surface-2">
      <FadeContent>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl">What We Do</h2>
            <p className="mt-4 text-muted max-w-2xl mx-auto">
              EncryptArx provides a comprehensive suite of security services and infrastructure.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="flex justify-center mb-8">
              <AnimatedTabs tabs={whatWeDoTabs} activeTab={activeTab} onTabChange={handleTabChange} />
            </div>

            <div className="relative mt-12 overflow-hidden h-[340px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {whatWeDoTabs.map(tab => (
                  activeTab === tab.id && (
                    <motion.div
                      key={tab.id}
                      custom={direction}
                      variants={{
                        enter: (dir: number) => ({
                          opacity: 0,
                          y: prefersReduced ? 0 : 24,
                        }),
                        center: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.32,
                            ease: [0.22, 1, 0.36, 1],
                          }
                        },
                        exit: (dir: number) => ({
                          opacity: 0,
                          y: prefersReduced ? 0 : -24,
                          transition: {
                            duration: 0.22,
                            ease: [0.4, 0, 0.2, 1],
                          }
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute w-full"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                          className='lg:order-2'
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <CardContent tab={tab} />
                        </motion.div>
                        <motion.div
                          className='lg:order-1'
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="border-0 bg-transparent shadow-none p-0">
                            <motion.p
                              className="text-muted mb-6"
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            >
                              {tab.description}
                            </motion.p>
                            <motion.div
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <Link href={tab.href} className="group relative inline-flex items-center justify-center px-6 py-2 text-xs font-medium text-white transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50">
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-900 to-blue-600 rounded-md opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-900 to-blue-600 rounded-md blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                <span className="relative flex items-center gap-1.5">Learn More</span>
                              </Link>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </FadeContent>
    </section>
  );
}
