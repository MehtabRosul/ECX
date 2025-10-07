const PartnerLogo = ({ children }: { children: React.ReactNode }) => (
    <div className="flex-shrink-0 w-40 flex items-center justify-center grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
        {children}
    </div>
)

const partners = [
    "SecureCo",
    "InnovateTech",
    "DataProtect",
    "QuantumLeap",
    "NexusGuard",
    "ApexCyber",
    "Vertex",
];

export function Partners() {
    return (
        <section className="py-12 sm:py-16">
            <div className="container">
                <h2 className="text-center text-lg font-semibold text-muted-foreground">
                    Powering the world's most innovative companies
                </h2>
                <div className="relative mt-10 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                    <div className="animate-marquee flex min-w-full flex-shrink-0 items-center justify-around gap-12">
                        {partners.map(name => <PartnerLogo key={name}><span className="text-2xl font-bold">{name}</span></PartnerLogo>)}
                    </div>
                     <div className="absolute top-0 animate-marquee2 flex min-w-full flex-shrink-0 items-center justify-around gap-12">
                        {partners.map(name => <PartnerLogo key={`${name}-2`}><span className="text-2xl font-bold">{name}</span></PartnerLogo>)}
                    </div>
                </div>
            </div>
        </section>
    )
}
