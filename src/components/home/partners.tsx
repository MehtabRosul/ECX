
'use client';
import { ShineBorder } from "@/components/ui/shine-border";
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
                    <div className="relative mt-10 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                        <div className="flex w-max animate-marquee [--gap:3rem]">
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
