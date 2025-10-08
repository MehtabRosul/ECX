
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Book, Bug, Github, Star } from "lucide-react"

const repos = [
    { name: "pq-tls", stars: 1200, description: "Post-quantum TLS 1.3 implementation.", release: "v1.2.0" },
    { name: "sentinel-core", stars: 874, description: "AI-powered threat detection engine.", release: "v0.9.1" },
    { name: "d-ledger", stars: 2100, description: "High-throughput distributed ledger.", release: "v2.0.0-beta" },
]

export function Community() {
    return (
        <section className="py-12 sm:py-24 bg-surface-2">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl">Community & Open Source</h2>
                    <p className="mt-4 text-muted max-w-2xl mx-auto">
                        We open-source core research artifacts and tools. Contribute to code, experiments, and reproducible research.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {repos.map(repo => (
                        <Card key={repo.name} className="bg-surface-1 shadow-soft flex flex-col">
                            <CardContent className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-high flex items-center gap-2">
                                        <Github className="w-5 h-5 text-muted" />
                                        {repo.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-muted">
                                        <Star className="w-4 h-4" />
                                        {repo.stars}
                                    </div>
                                </div>
                                <p className="text-muted text-sm mb-4 flex-grow">{repo.description}</p>
                                <div>
                                    <p className="text-xs text-muted mb-4">Latest release: <span className="font-mono bg-glass-01 px-1.5 py-0.5 rounded">{repo.release}</span></p>
                                    <Button variant="outline" className="w-full">
                                        View on GitHub <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                     <Button size="lg" asChild>
                        <a href="#">Explore All Repositories</a>
                    </Button>
                </div>
            </div>
        </section>
    )
}
