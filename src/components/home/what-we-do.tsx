'use client'

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShineBorder } from '../ui/shine-border';
import { Code, Lock, BrainCircuit } from 'lucide-react';
import { AnimatedTabs } from '../ui/animated-tabs';

const whatWeDoTabs = [
  {
    id: 'api',
    title: 'Cryptography API',
    description:
      "Access a comprehensive suite of cryptographic functionalities through a simple, yet powerful API. From hashing and encryption to digital signatures and key management, our API provides the building blocks for secure application development. It's designed for ease of use without compromising on security, enabling developers to integrate advanced cryptographic features with minimal overhead.",
    imageId: 'what-we-do-api',
    href: '/services/cryptography-api',
    Icon: Code
  },
  {
    id: 'enclave',
    title: 'Secure Enclave',
    description:
      'Leverage the power of hardware-based security with our Secure Enclave solution. This service provides an isolated, confidential computing environment to protect your most sensitive data and code, even on compromised systems. Ideal for applications requiring the highest level of assurance, such as digital asset custody, machine learning on private data, and secure multi-party computation.',
    imageId: 'what-we-do-enclave',
    href: '#',
    Icon: Lock
  },
  {
    id: 'consulting',
    title: 'Consulting',
    description:
      'Navigate the complex landscape of digital security with our expert consulting services. Our team of world-renowned cryptographers and security engineers can help you with protocol design, security audits, and implementation reviews. We partner with you to build a robust security posture, from threat modeling to developing custom cryptographic solutions tailored to your unique needs.',
    imageId: 'what-we-do-consulting',
    href: '#',
    Icon: BrainCircuit
  },
];

const GlowCard = ({ tab }: { tab: (typeof whatWeDoTabs)[0] }) => {
    return (
        <ShineBorder
            className="w-full h-full bg-surface-2 hover:-translate-y-2 transition-transform duration-300"
            color={['#2B8DBE', '#4896BD', '#2B8DBE']}
        >
            <div className="relative w-full h-80 rounded-lg flex items-center justify-center p-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,_hsl(var(--primary)/0.1)_0%,_transparent_100%)] group-hover:bg-[radial-gradient(40%_40%_at_50%_50%,_hsl(var(--primary)/0.2)_0%,_transparent_100%)] transition-all duration-300"></div>
                <div className="relative text-center z-10">
                    <tab.Icon className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-high">{tab.title}</h3>
                </div>
            </div>
        </ShineBorder>
    )
}

export function WhatWeDo() {
  const [activeTab, setActiveTab] = useState(whatWeDoTabs[0].id);
  const [direction, setDirection] = useState(0);

  const handleTabChange = (newTabId: string) => {
    const currentIndex = whatWeDoTabs.findIndex(t => t.id === activeTab);
    const newIndex = whatWeDoTabs.findIndex(t => t.id === newTabId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(newTabId);
  }

  return (
    <section className="py-12 sm:py-24 bg-surface-2">
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
          
          <div className="relative mt-12 overflow-hidden h-[360px]">
            <AnimatePresence initial={false} custom={direction}>
                {whatWeDoTabs.map(tab => (
                    activeTab === tab.id && (
                        <motion.div
                            key={tab.id}
                            custom={direction}
                            variants={{
                                enter: (direction: number) => ({
                                    x: direction > 0 ? '100%' : '-100%',
                                    opacity: 0,
                                }),
                                center: {
                                    x: 0,
                                    opacity: 1,
                                },
                                exit: (direction: number) => ({
                                    x: direction < 0 ? '100%' : '-100%',
                                    opacity: 0,
                                }),
                            }}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="absolute w-full"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div className='lg:order-2'>
                                    <GlowCard tab={tab} />
                                </div>
                                <div className='lg:order-1'>
                                    <div className="border-0 bg-transparent shadow-none p-0">
                                    <p className="text-muted mb-6">{tab.description}</p>
                                    <Button asChild>
                                        <Link href={tab.href}>Learn More &rarr;</Link>
                                    </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                ))}
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </section>
  );
}