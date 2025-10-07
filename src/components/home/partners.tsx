'use client';
import FadeContent from "@/components/ui/fade-content";

const PartnerLogo = ({ children }: { children: React.ReactNode }) => (
    <div className="flex-shrink-0 w-48 flex items-center justify-center grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
        {children}
    </div>
)

const partners = [
    "Global Innovators",
    "Quantum Corp",
    "Secure Nest",
    "Apex",
    "Vertex",
    "NexusGuard",
];

export function Partners() {
    return (
        <section className="py-12 sm:py-16">
            <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                <div className="container">
                    <h2 className="text-center text-lg font-semibold text-muted-foreground">
                        Trusted by the world's most innovative companies
                    </h2>
                    <div className="relative mt-10 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                        <div className="flex w-max animate-marquee">
                            {[...partners, ...partners].map((name, i) => (
                                <PartnerLogo key={`${name}-${i}`}>
                                    <span className="text-2xl font-bold text-center">{name}</span>
                                </PartnerLogo>
                            ))}
                        </div>
                    </div>
                </div>
            </FadeContent>
        </section>
    )
}
