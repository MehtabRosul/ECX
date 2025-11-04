"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Handshake, Sparkles } from "lucide-react";

export function CollaborationCTA() {
  return (
    <section className="container mx-auto max-w-6xl px-4 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-background/40 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl">
          {/* Animated gradient mesh background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.3),transparent_50%)]" />
          </div>

          {/* Animated rotating border ring */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "conic-gradient(from 0deg, transparent, rgba(59,130,246,0.4), rgba(16,185,129,0.3), transparent)",
              mask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
              WebkitMask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "2px",
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Floating particles/orbs */}
          <motion.div
            className="absolute top-10 right-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl opacity-0 group-hover:opacity-100"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -25, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Content container */}
          <div className="relative z-10">
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 flex items-center gap-2"
            >
              <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
              <span className="text-sm font-medium text-primary/90 tracking-wider uppercase">
                Collaboration
              </span>
              <Sparkles className="h-4 w-4 text-primary/70 animate-pulse" />
            </motion.div>

            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent"
            >
              Partner with ECX Lab
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base text-white/70 mb-8 max-w-2xl leading-relaxed"
            >
              Access controlled briefings, run joint experiments, and co‑develop secure systems. 
              We disclose details under appropriate agreements and maintain strict confidentiality protocols.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {/* Primary Button - Glassmorphism with sliding gradient */}
              <Link
                href="/contact"
                className="group/btn relative inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/5 to-white/10 backdrop-blur-xl px-8 py-4 text-sm font-semibold text-white overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/20"
              >
                {/* Animated gradient slide */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-emerald-500/30 to-primary/0 opacity-0 group-hover/btn:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                {/* Animated dots pattern */}
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
                      backgroundSize: "12px 12px",
                      animation: "move-dots 8s linear infinite"
                    }}
                  />
                </div>
                <span className="relative z-10 flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Handshake className="h-4 w-4" />
                  </motion.div>
                  <span className="relative">
                    Request a briefing
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover/btn:w-full transition-all duration-500" />
                  </span>
                  <motion.div
                    whileHover={{ x: [0, 4, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </span>
              </Link>

              {/* Secondary Button - Neon outline with fill effect */}
              <Link
                href="/library"
                className="group/btn relative inline-flex items-center gap-3 rounded-2xl border-2 border-primary/40 bg-transparent px-8 py-4 text-sm font-semibold text-white/90 overflow-hidden transition-all duration-500 hover:border-primary hover:text-white"
              >
                {/* Fill effect from left */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-emerald-500/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                {/* Neon glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl" />
                </div>
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl">
                  <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover/btn:border-primary/60 transition-all duration-500" />
                </div>
                <span className="relative z-10 flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.4 }}
                  >
                    <FileText className="h-4 w-4" />
                  </motion.div>
                  <span>Browse public notes</span>
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Decorative grid overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

