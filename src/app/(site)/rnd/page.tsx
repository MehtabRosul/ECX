import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { productsData } from "@/data/products-data";
import { RevealPanel } from "@/components/rnd/tease-card";
import { RndCursorParticlesBackground } from "@/components/rnd/cursor-particles-background";
import { SignalCards } from "@/components/rnd/signal-cards";
import { RndProductCardsGrid } from "@/components/rnd/rnd-product-cards";
import { CollaborationCTA } from "@/components/rnd/collaboration-cta";

export const metadata = {
  title: "Research & Development",
  description: "Deep-tech research, prototypes, and lab initiatives.",
};

// Lightweight random noise with CSS only (no canvas/three)
function BackgroundNoise() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.08),transparent_45%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.08),transparent_40%)]" />
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.8\\' numOctaves=\\'4\\' stitchTiles=\\'stitch\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.5\\'/></svg>')" }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.2))]" />
    </div>
  );
}

export default function RndPage() {
  const launched = productsData.filter(p => p.status === "active").slice(0, 4);

  return (
    <main className="relative w-full overflow-hidden min-h-screen">
      <RndCursorParticlesBackground />
      <BackgroundNoise />

      {/* Hero */}
      <section className="container mx-auto max-w-6xl px-4 pt-16 pb-10">
        <RevealPanel>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <Lock className="h-3.5 w-3.5" /> Top Secret — Limited Disclosure
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            ECX Lab
            <span className="ml-3 bg-gradient-to-r from-primary via-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-ecx-gradient">
              Research & Development
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            We publicly reveal as little as necessary. What follows are controlled glimpses
            into artifacts that have matured into product-grade systems.
          </p>
        </RevealPanel>
      </section>

      {/* Signal cards */}
      <section className="container mx-auto max-w-6xl px-4">
        <SignalCards />
      </section>

      {/* R&D Principles Text Section */}
      <section className="container mx-auto max-w-4xl px-4 pt-16 pb-12">
        <RevealPanel>
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-high">
              About ECX R&D
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-base">
                EncryptArx's Research & Development division operates under a strict mandate: 
                build production-grade systems that advance the state of cryptographic security 
                and trusted computing. We do not publish research for its own sake.
              </p>
              <p className="text-base">
                Our principles are straightforward. We focus on applied cryptography, secure 
                enclaves, and AI security—areas where theoretical breakthroughs must translate 
                into deployable solutions. Every artifact we develop is designed for real-world 
                implementation, not academic exercise.
              </p>
              <p className="text-base">
                We maintain controlled disclosure protocols. What we share publicly represents 
                only a fraction of our ongoing work. The majority of our research remains 
                classified until it reaches sufficient maturity or is declassified through 
                appropriate channels.
              </p>
            </div>
          </div>
        </RevealPanel>
      </section>

      {/* Product Cards Grid */}
      <section className="container mx-auto max-w-6xl px-4 pt-12 pb-20">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Declassified Artifacts</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Products developed from our R&D lab that have reached production readiness.
          </p>
        </div>
        <RndProductCardsGrid
          products={launched.map((p) => ({
            id: p.id,
            name: p.name,
            tagline: p.tagline,
            imageUrl: p.imageUrl || `https://picsum.photos/seed/${encodeURIComponent(p.id)}-rnd/1200/800`,
          }))}
        />
      </section>

      {/* Collaboration CTA */}
      <CollaborationCTA />
    </main>
  );
}

