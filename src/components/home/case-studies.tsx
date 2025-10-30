'use client'

import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Image from "next/image"
import { Button } from "../ui/button";

const caseStudies = [
  {
    logoId: "case-study-1",
    industry: "Finance",
    challenge: "Quantum‑safe payments at scale",
    impact: "99.99% TLS handshake success across PQ roll‑out",
    href: "#",
    highlights: ["post‑quantum", "payments", "compliance"]
  },
  {
    logoId: "case-study-2",
    industry: "Healthcare",
    challenge: "Private ML on sensitive records",
    impact: "40% faster enclave inference with zero data exposure",
    href: "#",
    highlights: ["enclaves", "private‑ML", "HIPAA"]
  },
  {
    logoId: "case-study-3",
    industry: "Supply Chain",
    challenge: "Tamper‑proof audit trails",
    impact: "60% fraud reduction in 3 months",
    href: "#",
    highlights: ["ledger", "traceability", "audit"]
  },
  {
    logoId: "case-study-2",
    industry: "Public Sector",
    challenge: "Sovereign key management modernization",
    impact: "Zero‑downtime rotation across 200+ services",
    href: "#",
    highlights: ["HSM", "rotation", "policy"]
  },
]

function getLogo(id: string) {
    return PlaceHolderImages.find(p => p.id === id);
}

import FadeContent from "../ui/fade-content";

export function CaseStudies() {
  return (
    <section className="bg-surface-1 py-12 sm:py-24">
      <FadeContent><div className="container">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Selected Case Studies</h2>
            <p className="mt-3 text-muted max-w-3xl mx-auto">
              Brief snapshots of real deployments across finance, healthcare, supply chains, and the public sector highlighting the challenge, our approach, and measurable impact.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {caseStudies.map((study, index) => {
              const logo = getLogo(study.logoId);
              return (
                <div
                  key={index}
                  className="group relative [perspective:1200px]"
                  onMouseMove={(e) => {
                    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                    const x = e.clientX - r.left; const y = e.clientY - r.top;
                    (e.currentTarget as HTMLDivElement).style.setProperty('--mx', `${x}px`);
                    (e.currentTarget as HTMLDivElement).style.setProperty('--my', `${y}px`);
                  }}
                >
                <Card className="relative h-full flex bg-surface-2/90 shadow-soft border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-24px_rgba(59,130,246,0.45)] [transform-style:preserve-3d]">
                    {/* spotlight following cursor */}
                    <span className="pointer-events-none absolute w-40 h-40 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100" style={{ left: 'var(--mx)', top: 'var(--my)', transform: 'translate(-50%, -50%)' }} />
                    {/* gradient border glow */}
                    <span className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(900px_200px_at_50%_120%,rgba(59,130,246,0.20),transparent_70%)]" />
                    <CardContent className="relative p-6 flex flex-col h-full min-h-[260px]">
                        <div className="flex-grow">
                            <div className="space-y-2">
                                <h3 className="text-high font-semibold text-lg transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400">{study.industry}</h3>
                                <p className="text-muted">Challenge: <span className="text-high">{study.challenge}</span></p>
                                <p className="text-muted">Impact: <span className="text-primary">{study.impact}</span></p>
                            </div>
                            {/* animated chips */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {study.highlights?.map(h => (
                                    <span key={h} className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-md bg-white/5 text-muted border border-white/10 transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                                        {h}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <Button
                            asChild
                            variant="ghost"
                            className="mt-5 self-start px-3 py-1.5 text-xs font-semibold text-primary/90 hover:text-primary hover:bg-transparent border border-transparent hover:border-primary/30 rounded-md transition-all duration-300"
                        >
                            <a href={study.href}>Read case study →</a>
                        </Button>
                    </CardContent>
                </Card>
                </div>
              )
            })}
        </div>
      </div></FadeContent>
    </section>
  )
}
