
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import FadeContent from "../ui/fade-content"

const researchItems = [
    {
        title: "Advanced Deepfake Detection Methods in 2024",
        authors: "Dr. Sarah Chen, Dr. Raj Patel",
        excerpt: "A novel pipeline for detecting synthetic media using temporal and spatial features combined with transformer-based analysis.",
        href: "#",
        date: "2024-06",
        tags: ["deepfake", "detection", "ML"],
        abstract: "Presents Temporal–Spatial Fusion Networks with cross‑modal attention; introduces a 120k‑sample benchmark and open tooling for evaluation.",
        stats: { citations: 38, pages: 18, dataset: true, code: true }
    },
    {
        title: "Zero-Trust Architecture Implementation Guide",
        authors: "Marcus Williams, Emily Rodriguez",
        excerpt: "Comprehensive guide to implementing zero‑trust security models in hybrid cloud environments with practical case studies.",
        href: "#",
        date: "2024-05",
        tags: ["zero-trust", "cloud", "architecture"],
        abstract: "Step‑by‑step blueprint for zero‑trust rollouts across hybrid clouds with policy engine patterns, mesh integration, and migration checklists.",
        stats: { citations: 22, pages: 26, dataset: false, code: true }
    },
    {
        title: "Smart Contract Vulnerability Patterns",
        authors: "Alex Kumar, Dr. Lisa Zhang",
        excerpt: "Analysis of common vulnerability patterns in Solidity contracts with automated detection techniques and remediation strategies.",
        href: "#",
        date: "2024-04",
        tags: ["smart-contracts", "security", "blockchain"],
        abstract: "Catalog of 12 recurring bug classes with heuristics for static analysis and a set of secure design patterns and lint rules.",
        stats: { citations: 44, pages: 21, dataset: false, code: true }
    }
]

export function FeaturedResearch() {
    return (
        <section className="py-12 sm:py-24 bg-surface-1">
            <FadeContent><div className="container">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl">Featured Research</h2>
                    <p className="mt-3 text-muted max-w-3xl mx-auto">Cutting‑edge insights from our research team</p>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    {researchItems.map((item, index) => (
                        <Card
                            key={index}
                            className="group relative bg-transparent border-0 shadow-none"
                        >
                            <div className="[perspective:1200px]">
                                <div className="relative h-72 rounded-xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-hover:shadow-[0_24px_44px_-22px_rgba(59,130,246,0.45)]">
                                    {/* glow layer on hover */}
                                    <span className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(600px_160px_at_50%_120%,rgba(59,130,246,0.25),transparent_70%)]" />
                                    {/* Front */}
                                    <div className="absolute inset-0 bg-surface-2/90 border border-white/10 shadow-soft rounded-xl p-6 [backface-visibility:hidden]">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-semibold text-primary/80 uppercase">Paper</span>
                                            <span className="text-xs text-muted">{item.date}</span>
                                        </div>
                                        <h3 className="text-high text-lg font-semibold leading-snug mb-2">{item.title}</h3>
                                        <p className="text-sm text-muted mb-3">{item.authors}</p>
                                        <p className="text-sm text-muted/90 line-clamp-3">{item.excerpt}</p>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {item.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="bg-white/5 text-muted border border-white/10">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Back */}
                                    <div className="absolute inset-0 bg-surface-2/95 border border-white/10 shadow-soft rounded-xl p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-semibold text-primary/80 uppercase">At a glance</span>
                                            <span className="text-xs text-muted">{item.date}</span>
                                        </div>
                                        <h4 className="text-high text-base font-semibold mb-2">Abstract</h4>
                                        <p className="text-sm text-muted mb-4 line-clamp-4">{item.abstract}</p>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="text-xs px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-400/20">⭐ {item.stats.citations} citations</span>
                                            <span className="text-xs px-2 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-400/20">📄 {item.stats.pages} pages</span>
                                            {item.stats.dataset && (
                                                <span className="text-xs px-2 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-400/20">🧪 dataset</span>
                                            )}
                                            {item.stats.code && (
                                                <span className="text-xs px-2 py-1 rounded-md bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-400/20">💻 code</span>
                                            )}
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                         </Card>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Button
                        size="lg"
                        asChild
                        className="group relative overflow-hidden rounded-xl border border-emerald-400/40 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white transition-all duration-300 px-8 shadow-[0_10px_30px_-12px_rgba(16,185,129,0.6)] hover:shadow-[0_20px_46px_-16px_rgba(6,182,212,0.65)] hover:saturate-150"
                    >
                        <Link href="#" className="flex items-center">
                            <span className="relative z-10 font-semibold tracking-wide">Explore Full Library</span>
                            <ArrowRight className="relative z-10 w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
                            {/* animated sheen */}
                            <span className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.45),transparent)] group-hover:translate-x-[120%] transition-transform duration-700" />
                            {/* glow ring */}
                            <span className="pointer-events-none absolute -inset-px rounded-xl ring-0 group-hover:ring-2 group-hover:ring-white/30 transition-all duration-300" />
                        </Link>
                    </Button>
                </div>
            </div></FadeContent>
        </section>
    )
}
