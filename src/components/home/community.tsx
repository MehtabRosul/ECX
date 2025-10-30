
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Github, Star } from "lucide-react"

// Full repository catalog. We will rotate a subset weekly on the homepage.
const repos = [
    { name: "pq-tls", stars: 1200, description: "Post-quantum TLS 1.3 implementation.", release: "v1.2.0", url: "https://github.com/example/pq-tls" },
    { name: "sentinel-core", stars: 874, description: "AI-powered threat detection engine.", release: "v0.9.1", url: "https://github.com/example/sentinel-core" },
    { name: "d-ledger", stars: 2100, description: "High-throughput distributed ledger.", release: "v2.0.0-beta", url: "https://github.com/example/d-ledger" },
    { name: "zk-vault", stars: 640, description: "Zero-knowledge proof primitives and circuits.", release: "v0.6.4", url: "https://github.com/example/zk-vault" },
    { name: "enclave-kit", stars: 312, description: "Trusted execution environment helpers and SDK.", release: "v0.3.1", url: "https://github.com/example/enclave-kit" },
    { name: "quark-hsm", stars: 451, description: "Hardware Security Module interface in Rust.", release: "v0.8.2", url: "https://github.com/example/quark-hsm" },
    { name: "storm-trace", stars: 528, description: "Distributed tracing for security pipelines.", release: "v1.1.0", url: "https://github.com/example/storm-trace" },
    { name: "cipher-labs", stars: 289, description: "Educational cryptography lab exercises.", release: "v0.4.0", url: "https://github.com/example/cipher-labs" },
]

// Deterministic weekly rotation: pick `count` items starting at an index derived
// from the current UTC week number since a fixed epoch. This avoids client/server
// mismatch and changes only every 7 days.
function pickWeekly<T>(items: T[], count: number): T[] {
    if (items.length <= count) return items;
    const weekMs = 7 * 24 * 60 * 60 * 1000
    const epoch = Date.UTC(2025, 0, 1) // 2025-01-01 UTC as stable epoch
    const now = Date.now()
    const weekIndex = Math.floor((now - epoch) / weekMs)
    const start = ((weekIndex % items.length) + items.length) % items.length
    const result: T[] = []
    for (let i = 0; i < count; i++) {
        result.push(items[(start + i) % items.length])
    }
    return result
}

import FadeContent from "../ui/fade-content"

export function Community() {
    // Show only 3 repositories on the homepage, rotated weekly.
    const visible = pickWeekly(repos, 3)
    return (
        <section className="relative py-12 sm:py-24 bg-surface-2 overflow-hidden">
            {/* subtle animated gradient background */}
            <div aria-hidden className="animated-gradient-bg" />
            <FadeContent><div className="container relative z-[1]">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl">Community & Open Source</h2>
                    <p className="mt-4 text-muted max-w-2xl mx-auto">
                        We open-source core research artifacts and tools. Contribute to code, experiments, and reproducible research.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {visible.map(repo => (
                        <Card key={repo.name} className="group relative bg-surface-1 shadow-soft flex flex-col transition-transform duration-200 hover:-translate-y-1">
                            <CardContent className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-high flex items-center gap-2">
                                        <div className="relative">
                                            {/* GitHub icon with optimized glow */}
                                            <div className="absolute inset-0 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm" />
                                            <Github className="relative w-5 h-5 text-muted group-hover:text-blue-400 transition-colors duration-200" />
                                        </div>
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
                                    <Button
                                        variant="outline"
                                        className="w-full group/btn border-emerald-500/30 text-emerald-200/90 bg-emerald-500/5 hover:bg-emerald-400/90 hover:text-emerald-950 transition-colors duration-200"
                                        asChild
                                    >
                                        <a href={repo.url} target="_blank" rel="noreferrer">
                                            <span>View on GitHub</span>
                                            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button
                        size="lg"
                        asChild
                        className="group relative overflow-hidden rounded-xl border-0 bg-gradient-to-r from-primary to-indigo-500 text-white transition-all duration-200 px-7 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105"
                    >
                        <a href="#" className="flex items-center gap-2">
                            <span className="relative z-10 font-medium">Explore All Repositories</span>
                            <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                            {/* Enhanced glow effect */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/30 to-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-md" />
                            {/* Outer glow ring */}
                            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/40 to-indigo-500/40 opacity-0 group-hover:opacity-60 transition-opacity duration-200 blur-lg" />
                        </a>
                    </Button>
                </div>
            </div></FadeContent>
        </section>
    )
}
