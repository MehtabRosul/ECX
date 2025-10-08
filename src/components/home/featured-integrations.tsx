'use client';

import LogoLoop from "@/components/ui/logo-loop";
import { techLogos } from "@/components/icons/tech-logos";

export function FeaturedIntegrations() {
    
    const logos = Object.values(techLogos).map(logo => ({
        node: logo.node,
        title: logo.title,
    }));

    return (
        <section className="py-12 sm:py-24 bg-surface-2">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl">Featured Integrations</h2>
                    <p className="mt-4 text-muted max-w-2xl mx-auto">
                        EncryptArx works seamlessly with the tools you already use.
                    </p>
                </div>
                <div className="relative w-full">
                     <LogoLoop
                        logos={logos}
                        speed={80}
                        direction="left"
                        logoHeight={48}
                        gap={80}
                        pauseOnHover
                        scaleOnHover
                        fadeOut
                        fadeOutColor="hsl(var(--surface-2))"
                        ariaLabel="Featured Integrations"
                    />
                </div>
            </div>
        </section>
    );
}
