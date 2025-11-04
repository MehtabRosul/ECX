"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Lock } from "lucide-react";

type NodeInfo = {
  id: string;
  label: string;
  subtitle: string;
  x: number; // percentage
  y: number; // percentage
};

export function ClassifiedShowcase({ nodes }: { nodes: NodeInfo[] }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-background/50 p-6">
      {/* subtle background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.6) 1px, transparent 0)", backgroundSize: "26px 26px" }} />

      {/* SVG links between nodes */}
      <svg className="absolute inset-0" width="100%" height="100%" preserveAspectRatio="none">
        {nodes.map((a, i) => nodes.slice(i + 1).map((b) => (
          <line
            key={`${a.id}-${b.id}`}
            x1={`${a.x}%`} y1={`${a.y}%`} x2={`${b.x}%`} y2={`${b.y}%`}
            stroke="url(#grad)" strokeWidth="1" opacity="0.35"
          />
        )))}
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(59,130,246,0.5)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.5)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Nodes */}
      <div className="relative">
        {nodes.map((n, idx) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%, -50%)" }}
            className="absolute"
          >
            <div className="group relative">
              {/* node */}
              <div className="rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm text-white/90">{n.label}</span>
                </div>
              </div>

              {/* tooltip card (simple) */}
              <div className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] z-10 w-[240px] -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                <div className="rounded-lg border border-white/10 bg-background/80 p-3">
                  <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/70">
                    <Lock className="h-3 w-3 text-primary" /> ECX Lab
                  </div>
                  <div className="text-[13px] text-white/80">{n.subtitle}</div>
                  <div className="mt-2 flex gap-3">
                    <Link href={`/products/${n.id}`} className="pointer-events-auto text-xs text-primary hover:underline inline-flex items-center gap-1">
                      Declassify <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link href="/contact" className="pointer-events-auto text-xs text-white/80 hover:underline inline-flex items-center gap-1">
                      Request <Eye className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


