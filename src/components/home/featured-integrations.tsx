
'use client';

import { PlaceHolderImages } from "@/lib/placeholder-images";
import LogoLoop from "@/components/ui/logo-loop";

const integrations = [
    { name: "Slack", imageId: "integration-slack" },
    { name: "Splunk", imageId: "integration-splunk" },
    { name: "AWS KMS", imageId: "integration-aws" },
    { name: "Okta", imageId: "integration-okta" },
    { name: "Datadog", imageId: "integration-datadog" },
    { name: "Google Cloud", imageId: "integration-gcp" },
    { name: "Kubernetes", imageId: "integration-kubernetes" },
    { name: "HashiCorp Vault", imageId: "integration-vault" },
    { name: "Jira", imageId: "integration-jira" },
    { name: "Azure", imageId: "integration-azure" },
];

function getIntegrationImage(id: string) {
    return PlaceHolderImages.find(p => p.id === id);
}

export function FeaturedIntegrations() {
    const imageLogos = integrations.map(item => {
        const image = getIntegrationImage(item.imageId);
        return {
            src: image?.imageUrl || '',
            alt: item.name,
        };
    }).filter(logo => logo.src);

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
                        logos={imageLogos}
                        speed={80}
                        direction="left"
                        logoHeight={48}
                        gap={60}
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
