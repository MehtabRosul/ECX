'use client';

import LogoLoop from "@/components/ui/logo-loop";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const integrations = [
    "integration-aws",
    "integration-gcp",
    "integration-azure",
    "integration-kubernetes",
    "integration-docker",
    "integration-terraform",
    "integration-splunk",
    "integration-datadog",
    "integration-okta",
    "integration-vault",
    "integration-slack",
    "integration-jira",
    "integration-figma",
    "integration-notion",
    "integration-stripe",
];

export function FeaturedIntegrations() {
    
    const logos = integrations.map(id => {
        const placeholder = PlaceHolderImages.find(p => p.id === id);
        return {
            src: placeholder?.imageUrl || '',
            alt: placeholder?.description || 'Integration logo'
        }
    });

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
