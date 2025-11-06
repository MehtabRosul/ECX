"use client";

import { useRef, useCallback, memo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Shield, Cpu, Share2 } from "lucide-react";

type Card = {
  title: string;
  subtitle: string;
  icon: any;
  accent: string; // tailwind color class suffixes
};

const CARDS: Card[] = [
  {
    title: "Applied Defense",
    subtitle: "Cryptography, enclaves, verification — production first.",
    icon: Shield,
    accent: "from-sky-500/30 to-cyan-400/20",
  },
  {
    title: "Systems over Slides",
    subtitle: "We ship artifacts; papers follow.",
    icon: Cpu,
    accent: "from-violet-500/30 to-fuchsia-400/20",
  },
  {
    title: "Controlled Collaboration",
    subtitle: "Briefings, redacted repos, reproducible demos.",
    icon: Share2,
    accent: "from-emerald-500/30 to-teal-400/20",
  },
];

const InteractiveCard = memo(({ card, index }: { card: Card; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [50, -50], [6, -6]);
  const rotateY = useTransform(x, [-50, 50], [-6, 6]);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(Math.max(-50, Math.min(50, relX / 4)));
    y.set(Math.max(-50, Math.min(50, relY / 4)));
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const Icon = card.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-background/60 p-5 will-change-transform transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.01]"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      {/* animated border ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
        mask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
        WebkitMask:
          "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
        maskComposite: "exclude",
        WebkitMaskComposite: "xor",
        padding: 1,
        background:
          "conic-gradient(from 0deg at 50% 50%, rgba(59,130,246,0.35), rgba(16,185,129,0.25), rgba(6,182,212,0.3), rgba(59,130,246,0.35))",
        animation: "spin 8s linear infinite"
      }} />

      {/* gradient glow */}
      <div className={`pointer-events-none absolute -z-10 inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300`} />

      {/* grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] group-hover:opacity-15 transition-opacity duration-300" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)", backgroundSize: "20px 20px" }} />

      <div className="relative" style={{ transform: "translateZ(20px)" }}>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
          <Icon className="h-3.5 w-3.5 text-primary" />
          ECX Principle
        </div>
        <h3 className="text-lg font-semibold text-high">{card.title}</h3>
        <p className="mt-2 text-sm text-white/75 leading-relaxed">{card.subtitle}</p>
      </div>
    </motion.div>
  );
});

export function SignalCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {CARDS.map((c, i) => (
        <InteractiveCard key={c.title} card={c} index={i} />)
      )}
    </div>
  );
}


