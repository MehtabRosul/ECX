
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FileText, FlaskConical, Github, MessageSquare } from "lucide-react"

const highlights = [
    {
        icon: FlaskConical,
        title: "Active Projects",
        description: "Explore our ongoing research in post-quantum cryptography, AI-driven threat detection, and more.",
        cta: "Explore R&D Projects"
    },
    {
        icon: FileText,
        title: "Publications & Datasets",
        description: "Access our peer-reviewed papers and open-source datasets to fuel your own innovations.",
        cta: "View Publications"
    },
    {
        icon: MessageSquare,
        title: "Collaborate & Contribute",
        description: "Join our community of researchers and developers to help build the future of digital security.",
        cta: "Join as a Contributor"
    }
]

export function ResearchLab() {
    return (
        <section className="py-12 sm:py-24 bg-surface-1">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="pr-0 lg:pr-12">
                         <h2 className="font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl mb-4">R&D Lab — Where Ideas Become Products</h2>
                         <p className="text-lg text-muted mb-8">
                            EncryptArx Research (ECX Lab) pioneers novel defenses and deep-tech systems — from cryptographic primitives and secure enclaves to ML-based threat detection and novel Web3 frameworks.
                         </p>
                         <div className="space-y-6">
                            {highlights.map(item => (
                                <Card key={item.title} className="bg-surface-2 shadow-soft hover:-translate-y-1 transition-transform">
                                    <CardContent className="p-6 flex items-start gap-6">
                                        <div className="bg-glass-01 p-3 rounded-lg">
                                            <item.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-high mb-1">{item.title}</h3>
                                            <p className="text-muted text-sm mb-3">{item.description}</p>
                                            <Button variant="link" className="p-0 h-auto text-sm">{item.cta} <ArrowRight className="w-4 h-4 ml-1" /></Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                         </div>
                    </div>
                    <div className="relative h-[500px] rounded-lg bg-surface-2 shadow-soft overflow-hidden">
                        <div className="absolute inset-0 bg-dot-pattern bg-repeat [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center p-8">
                                <FlaskConical className="w-16 h-16 text-primary mx-auto mb-4 opacity-30" />
                                <h3 className="font-headline text-2xl font-bold text-high/80">Interactive R&D Console</h3>
                                <p className="text-muted/60 mt-2">Coming soon: Explore our project graph.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
