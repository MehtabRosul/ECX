
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

const integrations = [
    { name: "Slack", imageId: "integration-slack" },
    { name: "Splunk", imageId: "integration-splunk" },
    { name: "AWS KMS", imageId: "integration-aws" },
    { name: "Okta", imageId: "integration-okta" },
    { name: "Datadog", imageId: "integration-datadog" },
    { name: "Google Cloud", imageId: "integration-gcp" },
];

function getIntegrationImage(id: string) {
    return PlaceHolderImages.find(p => p.id === id);
}

export function FeaturedIntegrations() {
    return (
        <section className="py-12 sm:py-24 bg-surface-2">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl">Featured Integrations</h2>
                    <p className="mt-4 text-muted max-w-2xl mx-auto">
                        EncryptArx works seamlessly with the tools you already use.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {integrations.map(item => {
                        const image = getIntegrationImage(item.imageId);
                        return (
                            <div key={item.name} className="flex flex-col items-center justify-center p-6 bg-surface-1 rounded-lg shadow-soft grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                {image && (
                                     <div className="relative h-12 w-12">
                                        <Image
                                            src={image.imageUrl}
                                            alt={`${item.name} Logo`}
                                            fill
                                            className="object-contain"
                                            data-ai-hint={image.imageHint}
                                        />
                                    </div>
                                )}
                                <p className="text-sm font-semibold text-high mt-4">{item.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
