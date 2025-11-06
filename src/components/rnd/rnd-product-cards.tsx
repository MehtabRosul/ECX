"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Eye } from "lucide-react";
import { memo, useMemo } from "react";

type ProductCardProps = {
  id: string;
  name: string;
  tagline: string;
  index: number;
  imageUrl?: string;
};

const RndProductCardComponent = ({ id, name, tagline, index, imageUrl }: ProductCardProps) => {
  const bg = useMemo(() => imageUrl || `https://picsum.photos/seed/${encodeURIComponent(id)}-rnd/1200/800`, [imageUrl, id]);
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-background/60 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
        style={{ 
          backgroundImage: `url(${bg})`,
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      />
      {/* Darkening overlay for legibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated glow orb */}
      <div 
        className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" 
        style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
      />
      <div 
        className="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" 
        style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300">
          <Shield className="h-3.5 w-3.5 text-primary" />
          ECX Lab Artifact
        </div>

        <h3 className="text-xl font-bold tracking-tight text-high mb-2 group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-6 group-hover:text-white/90 transition-colors duration-300">
          {tagline}
        </p>

        <div className="flex items-center gap-3">
          <Link
            href={`/products/${id}`}
            className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/20 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/15"
          >
            Declassify <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/5 transition-all duration-300 group-hover:border-white/20"
          >
            Request Access <Eye className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export const RndProductCard = memo(RndProductCardComponent);

export function RndProductCardsGrid({ products }: { products: Array<{ id: string; name: string; tagline: string }> }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {products.map((product, index) => (
        <RndProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          tagline={product.tagline}
          index={index}
          imageUrl={(product as any).imageUrl}
        />
      ))}
    </div>
  );
}

