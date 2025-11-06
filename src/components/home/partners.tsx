'use client';
import React, { memo, useMemo } from 'react';
import { ShineBorder } from "@/components/ui/shine-border";
import FadeContent from "@/components/ui/fade-content";
import { Marquee } from "../ui/marquee";

const PartnerLogo = memo(({ children }: { children: React.ReactNode }) => (
    <div className="flex-shrink-0 w-48 flex items-center justify-center grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300 will-change-[opacity,filter] transform-gpu">
        {children}
    </div>
));
PartnerLogo.displayName = 'PartnerLogo';

const partners = [
    "Global Innovators",
    "Quantum Corp",
    "Secure Nest",
    "Apex",
    "Vertex",
    "NexusGuard",
] as const;

export const Partners = memo(function Partners() {
    const partnerItems = useMemo(() => 
        partners.map((name, i) => (
            <PartnerLogo key={`${name}-${i}`}>
                <span className="text-2xl font-bold text-center">{name}</span>
            </PartnerLogo>
        )),
        []
    );

    return (
        <section className="py-12 sm:py-16 transform-gpu">
            <FadeContent>
                <div className="container">
                    <div className="flex justify-center">
                        <ShineBorder
                            className="text-center text-md font-medium capitalize py-3 px-6"
                            color={['#2B8DBE', '#4896BD', '#2B8DBE']}
                        >
                            Trusted by the world&apos;s most innovative companies
                        </ShineBorder>
                    </div>
                    <div className="relative mt-10 w-full overflow-hidden will-change-transform transform-gpu">
                        <Marquee pauseOnHover>
                            {partnerItems}
                        </Marquee>
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-surface-1 to-transparent z-10"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-surface-1 to-transparent z-10"></div>
                    </div>
                </div>
            </FadeContent>
        </section>
    );
});
