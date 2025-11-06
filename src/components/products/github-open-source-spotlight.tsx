"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Star, ExternalLink, Github, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from "@/lib/utils";

type Repo = {
  id: string;
  name: string;
  description: string;
  stars: number;
  latestRelease: string;
  href: string;
};

// Lightweight, static showcase. In a future iteration this can fetch GitHub API.
const repos: Repo[] = [
  {
    id: "enclave-kit",
    name: "enclave-kit",
    description: "Trusted execution environment helpers and SDK.",
    stars: 312,
    latestRelease: "v0.3.1",
    href: "https://github.com/", // replace with real repo when available
  },
  {
    id: "quark-hsm",
    name: "quark-hsm",
    description: "Hardware Security Module interface in Rust.",
    stars: 451,
    latestRelease: "v0.8.2",
    href: "https://github.com/",
  },
  {
    id: "storm-trace",
    name: "storm-trace",
    description: "Distributed tracing for security pipelines.",
    stars: 528,
    latestRelease: "v1.1.0",
    href: "https://github.com/",
  },
  {
    id: "vault-bridge",
    name: "vault-bridge",
    description: "Secrets management adapters for cloud-native stacks.",
    stars: 289,
    latestRelease: "v0.9.0",
    href: "https://github.com/",
  },
  {
    id: "cipher-labs",
    name: "cipher-labs",
    description: "Experimental crypto primitives and tooling.",
    stars: 174,
    latestRelease: "v0.4.3",
    href: "https://github.com/",
  },
  {
    id: "sentinel-ci",
    name: "sentinel-ci",
    description: "Security checks for CI/CD pipelines.",
    stars: 337,
    latestRelease: "v2.0.1",
    href: "https://github.com/",
  },
];

type SpotlightProps = {
  full?: boolean; // when true: show 6 cards and hide bottom CTA
};

export function GithubOpenSourceSpotlight({ full = false }: SpotlightProps) {
  const prefersReducedMotion = useReducedMotion();
  const itemsToShow = full ? 6 : 3;

  return (
    <section className="mb-16 transform-gpu">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Open Source Spotlight</h2>
        <p className="mt-2 text-muted-foreground">
          Explore community-driven tools and research. Built in the open. Linked to GitHub.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {repos.slice(0, itemsToShow).map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={full || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            animate={full ? { opacity: 1, y: 0 } : undefined}
            whileInView={full ? undefined : { opacity: 1, y: 0 }}
            viewport={full ? undefined : { once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-surface-2/40 to-surface-1/30 backdrop-blur-sm",
              "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/15 transition-all duration-300 group"
            )}
          >
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{repo.name}</h3>
                <div className="flex items-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2 py-1 text-yellow-300">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {repo.stars}
                  </span>
                  <Link
                    href={repo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-background/60 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 group-hover:border-primary/50 group-hover:bg-primary/15 group-hover:shadow-primary/30 group-hover:shadow"
                    aria-label="Open on GitHub"
                  >
                    <span className="pointer-events-none absolute -inset-2 rounded-full bg-primary/0 blur transition-all duration-300 group-hover:bg-primary/20" />
                    <Github className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
                  </Link>
                </div>
              </div>

              <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{repo.description}</p>

              <div className="mb-6 flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-background/60 px-2 py-1">
                  <Tag className="h-3.5 w-3.5" />
                  Latest release: {repo.latestRelease}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <Link href={repo.href} target="_blank" rel="noreferrer">
                  <Button variant="outline" className="gap-2 rounded-xl border-primary/30 bg-background/70 transition-transform duration-300 hover:scale-[1.02] hover:bg-primary/10 hover:border-primary/50">
                    View on GitHub
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={repo.href} target="_blank" rel="noreferrer" className="hidden sm:block">
                  <GradientButton size="sm" className="gap-2 px-5 py-2 text-sm">Let’s contribute</GradientButton>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {!full && (
        <div className="mt-8 flex justify-center">
          <Link href="/products/reviews">
            <GradientButton variant="variant" size="sm" className="px-6">
              Explore more
            </GradientButton>
          </Link>
        </div>
      )}
    </section>
  );
}

export default GithubOpenSourceSpotlight;


