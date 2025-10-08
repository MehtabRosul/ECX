
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const whatWeDoTabs = [
  {
    id: 'api',
    title: 'Cryptography API',
    description:
      "Access a comprehensive suite of cryptographic functionalities through a simple, yet powerful API. From hashing and encryption to digital signatures and key management, our API provides the building blocks for secure application development. It's designed for ease of use without compromising on security, enabling developers to integrate advanced cryptographic features with minimal overhead.",
    imageId: 'what-we-do-api',
    href: '/services/cryptography-api'
  },
  {
    id: 'enclave',
    title: 'Secure Enclave',
    description:
      'Leverage the power of hardware-based security with our Secure Enclave solution. This service provides an isolated, confidential computing environment to protect your most sensitive data and code, even on compromised systems. Ideal for applications requiring the highest level of assurance, such as digital asset custody, machine learning on private data, and secure multi-party computation.',
    imageId: 'what-we-do-enclave',
    href: '#'
  },
  {
    id: 'consulting',
    title: 'Consulting',
    description:
      'Navigate the complex landscape of digital security with our expert consulting services. Our team of world-renowned cryptographers and security engineers can help you with protocol design, security audits, and implementation reviews. We partner with you to build a robust security posture, from threat modeling to developing custom cryptographic solutions tailored to your unique needs.',
    imageId: 'what-we-do-consulting',
    href: '#'
  },
];

function getWhatWeDoImage(id: string) {
  return PlaceHolderImages.find((p) => p.id === id);
}

export function WhatWeDo() {
  const [activeTab, setActiveTab] = useState(whatWeDoTabs[0].id);
  const [activeImage, setActiveImage] = useState(getWhatWeDoImage(whatWeDoTabs[0].imageId));

  useEffect(() => {
    const tabData = whatWeDoTabs.find(tab => tab.id === activeTab);
    if (tabData) {
      setActiveImage(getWhatWeDoImage(tabData.imageId));
    }
  }, [activeTab]);

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {whatWeDoTabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id}>
                  <Card className="border-0 bg-transparent shadow-none">
                    <CardContent className="p-0">
                      <p className="text-muted mb-6">{tab.description}</p>
                      <Button asChild>
                        <Link href={tab.href}>Learn More &rarr;</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
            <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-soft">
                {activeImage && (
                    <Image
                        src={activeImage.imageUrl}
                        alt={activeTab}
                        fill
                        className="object-cover"
                        data-ai-hint={activeImage.imageHint}
                    />
                )}
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
