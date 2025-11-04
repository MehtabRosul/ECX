"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Eye } from "lucide-react";

function Redacted({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block rounded px-2 py-0.5 bg-white/5 text-white/70 after:absolute after:inset-0 after:bg-gradient-to-r after:from-black/40 after:via-transparent after:to-black/40 after:[mask-image:repeating-linear-gradient(90deg,black_0_6px,transparent_6px_12px)]">
      <span className="opacity-80 mix-blend-luminosity">{children}</span>
    </span>
  );
}

export function TeaseCard({
  id,
  name,
  tagline,
}: {
  id: string;
  name: string;
  tagline: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-background/50 backdrop-blur-sm"
    >
      {/* ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* glow blob */}
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/20 blur-3xl group-hover:scale-125 transition-transform duration-500" />
      {/* scanlines overlay */}
      <div className="ecx-scanlines absolute inset-0 pointer-events-none" />
      {/* radar sweep disk */}
      <div className="ecx-radar absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* corner brackets */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-2 top-2 h-5 w-5 border-l-2 border-t-2 border-primary/40" />
        <div className="absolute right-2 top-2 h-5 w-5 border-r-2 border-t-2 border-primary/40" />
        <div className="absolute left-2 bottom-2 h-5 w-5 border-l-2 border-b-2 border-primary/40" />
        <div className="absolute right-2 bottom-2 h-5 w-5 border-r-2 border-b-2 border-primary/40" />
      </div>

      <div className="relative p-6">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
          <Shield className="h-3.5 w-3.5 text-primary" />
          ECX Lab Artifact
        </div>

        <h3 className="text-xl font-bold tracking-tight text-high">
          <span className="mr-2 opacity-80">Code‑Name:</span>
          <Redacted>{name}</Redacted>
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">
          {tagline}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Link
            href={`/products/${id}`}
            className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            Declassify <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/5 transition-colors"
          >
            Request Access <Eye className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 space-y-1 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="h-2 w-2/3 rounded bg-white/10" />
        <div className="h-2 w-1/2 rounded bg-white/10" />
        <div className="h-2 w-5/6 rounded bg-white/10" />
      </div>
    </motion.article>
  );
}

export function RevealPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className={className}>
      {children}
    </motion.div>
  );
}


