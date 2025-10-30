'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { productsData } from '@/data/products-data';
import { Shield } from 'lucide-react';

type EcosystemProduct = (typeof productsData)[number];

function PremiumCard({ product, isActive, onClick }: { product: EcosystemProduct; isActive: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className={`group relative h-full rounded-2xl border bg-gradient-to-b from-surface-2/50 to-surface-1/40 p-5 text-left backdrop-blur-md transition-colors ${
        isActive ? 'border-primary/40 shadow-[0_20px_60px_-30px_rgba(43,141,190,0.55)]' : 'border-white/10 hover:border-primary/30'
      }`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <span className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(380px 120px at 40% -10%, rgba(43,141,190,0.20), transparent 70%)' }} />
      <div className="relative z-10 flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/25">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">{product.name}</h3>
            <span className="rounded-full bg-background/70 px-2 py-0.5 text-xs text-muted-foreground ring-1 ring-white/10">v{product.version}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.highlights.slice(0, 2).map((h, i) => (
              <span key={i} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function PremiumDetails({ product, onClose }: { product: EcosystemProduct; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="relative mt-6 rounded-2xl border border-primary/30 bg-background/70 p-6 backdrop-blur-xl"
    >
      <button onClick={onClose} className="absolute right-4 top-3 text-xl text-muted-foreground hover:text-foreground">×</button>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="text-xl font-bold tracking-tight text-foreground">{product.name}</h4>
          <p className="mt-2 text-muted-foreground">{product.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.highlights.map((h, i) => (
              <span key={i} className="rounded bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary/90">
                {h}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Integrations</div>
          <div className="mt-2 flex flex-wrap gap-1">
            {product.integrations.map((ig, i) => (
              <span key={i} className="rounded bg-white/5 px-2 py-0.5 text-xs text-muted-foreground ring-1 ring-white/10">
                {ig}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span>Status: {product.status}</span>
            <span>Version: v{product.version}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductEcosystemPremium() {
  const [active, setActive] = useState<EcosystemProduct | null>(null);

  const ecosystemIds = useMemo(() => [
    'quantum-encrypt',
    'neural-shield',
    'data-vault',
    'crypto-sandbox',
    'secure-api-gateway',
    'compliance-assistant',
  ], []);

  const products = useMemo(() => productsData.filter(p => ecosystemIds.includes(p.id)), [ecosystemIds]);

  return (
    <div className="w-full rounded-3xl border border-white/15 bg-gradient-to-br from-surface-2/30 to-surface-1/20 p-6 md:p-8 backdrop-blur-md">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <PremiumCard key={p.id} product={p} isActive={active?.id === p.id} onClick={() => setActive(active?.id === p.id ? null : p)} />
        ))}
      </div>

      <AnimatePresence>{active && <PremiumDetails product={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </div>
  );
}

export default ProductEcosystemPremium;



