'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState } from 'react';
import Link from 'next/link';
import { ShineBorder } from '../ui/shine-border';
import { Code, Lock, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

function getWhatWeDoImage(id: string) {
  return PlaceHolderImages.find((p) => p.id === id);
}

const GlowCard = ({ tab }: { tab: (typeof whatWeDoTabs)[0] }) => {
    const image = getWhatWeDoImage(tab.imageId);

    return (
        <ShineBorder
            className="w-full h-80 group"
            color={['#2B8DBE', '#4896BD', '#F4A460']}
        >
            <div className="relative w-full h-full rounded-lg bg-surface-2 shadow-soft flex items-center justify-center p-6 overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2">
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(43,141,190,0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                 {image && (
                    <Image
                        src={image.imageUrl}
                        alt={tab.title}
                        fill
                        className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={image.imageHint}
                    />
                )}
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative text-center">
                    <tab.Icon className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-high">{tab.title}</h3>
                </div>
            </div>
        </ShineBorder>
    );
};


export function WhatWeDo() {
  const [activeTab, setActiveTab] = useState(whatWeDoTabs[0].id);

  return (
    <section className="py-12 sm:py-24 bg-surface-2">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl">What We Do</h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            EncryptArx provides a comprehensive suite of security services and infrastructure.
          </p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-lg grid-cols-3 bg-glass-01 border border-white/10">
              {whatWeDoTabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <div className="relative">
            <AnimatePresence mode="wait">
              {whatWeDoTabs.map((tab) => (
                activeTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value={tab.id} forceMount>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className='lg:order-2'>
                               <GlowCard tab={tab} />
                            </div>
                            <div className='lg:order-1'>
                                <Card className="border-0 bg-transparent shadow-none">
                                    <CardContent className="p-0">
                                    <p className="text-muted mb-6">{tab.description}</p>
                                    <Button asChild>
                                        <Link href={tab.href}>Learn More &rarr;</Link>
                                    </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
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
