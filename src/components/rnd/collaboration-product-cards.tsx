"use client";

import { motion } from "framer-motion";
import { Cpu, Handshake, ArrowRight, Zap } from "lucide-react";
import { memo } from "react";
import Link from "next/link";

export interface CollaborationProduct {
  id: string;
  name: string;
  description: string;
  softwareStatus: string; // e.g., "Software Complete", "In Development"
  hardwareNeeds: string[]; // e.g., ["Custom Hardware", "Embedded Systems"]
  imageUrl?: string;
}

type CollaborationProductCardProps = {
  product: CollaborationProduct;
  index: number;
};

const CollaborationProductCardComponent = ({ product, index }: CollaborationProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl p-8 sm:p-10 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20 h-full"
    >
      {/* Base gradient background - always visible and more prominent */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/60" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/12 to-emerald-500/18" />
      <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/15 via-primary/10 to-primary/5" />
      <div className="absolute inset-0 bg-gradient-to-tl from-primary/15 via-transparent to-emerald-500/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-emerald-500/8" />
      
      {/* Animated gradient background on hover - enhanced */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-emerald-500/22 to-primary/18 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated glow orbs */}
      <div 
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" 
      />
      <div 
        className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" 
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          <Cpu className="h-4 w-4" />
          Hardware Collaboration Needed
        </div>

        {/* Product Name */}
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-base sm:text-lg text-white/70 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Software Status */}
        <div className="mb-5 flex items-center gap-2 text-sm text-white/60">
          <Zap className="h-4 w-4 text-emerald-400" />
          <span className="font-medium">Software:</span>
          <span>{product.softwareStatus}</span>
        </div>

        {/* Hardware Needs */}
        <div className="mb-8">
          <p className="text-sm font-medium text-white/60 mb-3">Hardware Needs:</p>
          <div className="flex flex-wrap gap-2.5">
            {product.hardwareNeeds.map((need, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300"
              >
                {need}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="group/btn inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-6 py-3 text-base font-medium text-primary hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
        >
          <Handshake className="h-5 w-5" />
          <span>Partner with us</span>
          <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Decorative grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
    </motion.div>
  );
};

export const CollaborationProductCard = memo(CollaborationProductCardComponent);

type CollaborationProductCardsProps = {
  products: CollaborationProduct[];
};

export function CollaborationProductCards({ products }: CollaborationProductCardsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-6"
      >
        <h3 className="text-xl font-semibold tracking-tight text-white mb-2">
          Products Seeking Hardware Partners
        </h3>
        <p className="text-sm text-white/60 max-w-2xl">
          These products have completed software development by ECX Lab and are seeking hardware partners, collaborators, or investors to bring them to market.
        </p>
      </motion.div>

      <div className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2">
        {products.map((product, index) => (
          <CollaborationProductCard
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

