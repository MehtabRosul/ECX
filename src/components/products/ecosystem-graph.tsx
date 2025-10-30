'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { productsData, type Product } from '@/data/products-data';
import { Shield, Brain, Database, Terminal, Network, FileCheck2, Key, Activity, Lock } from 'lucide-react';

type Vec2 = { x: number; y: number };

function useSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const cr = e.contentRect;
        setSize({ width: cr.width, height: cr.height });
      }
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return { ref, size } as const;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function drift(base: Vec2, t: number, idx: number): Vec2 {
  const s1 = Math.sin(t * (0.5 + (idx % 3) * 0.07) + idx);
  const s2 = Math.cos(t * (0.3 + (idx % 5) * 0.05) + idx * 1.7);
  const amp = 0.012 + (idx % 4) * 0.003; // 1.2% to ~2.1% of canvas
  return { x: base.x + s1 * amp, y: base.y + s2 * amp };
}

const curatedOrder = [
  'quantum-encrypt',
  'neural-shield',
  'data-vault',
  'crypto-sandbox',
  'secure-api-gateway',
  'compliance-assistant',
  'identity-hub',
  'telemetry-mesh',
  'key-management',
] as const;

function makeFallback(id: string, name: string, tagline: string, category: string): Product {
  return {
    id,
    name,
    tagline,
    description: tagline,
    category,
    status: 'coming-soon',
    releaseDate: '',
    version: 'vNext',
    features: [],
    integrations: [],
    useCases: [],
    highlights: ['Ecosystem Ready', 'Secure by Design'],
  } as Product;
}

const fallbacks: Record<string, Product> = {
  'identity-hub': makeFallback('identity-hub', 'Identity Hub', 'Unified identity, SSO and policy engine', 'Security'),
  'telemetry-mesh': makeFallback('telemetry-mesh', 'Telemetry Mesh', 'Realtime observability and secure event fabric', 'Infrastructure'),
  'key-management': makeFallback('key-management', 'Key Management Service', 'Lifecycle management for cryptographic keys', 'Security'),
};

export function EcosystemGraph() {
  const products = useMemo(() => {
    const byId = (id: string) => productsData.find((p) => p.id === id) ?? fallbacks[id]!;
    return curatedOrder.map(byId);
  }, []);

  const { ref, size } = useSize<HTMLDivElement>();
  const [selected, setSelected] = useState<Product | null>(null);
  const [tick, setTick] = useState(0);
  const tRef = useRef(0);

  // Smooth animation at ~60fps with internal time
  useAnimationFrame((t) => {
    // t is in ms
    tRef.current = t / 1000;
    setTick((v) => v + 1);
  });

  // Normalized base positions (0..1) in a diamond-like network (matching your sketch)
  // Tighter formation near center (closer nodes)
  const base: Vec2[] = useMemo(() => {
    const radius = 0.28; // tighter ring
    const center = { x: 0.5, y: 0.5 };
    const ring: Vec2[] = Array.from({ length: 8 }).map((_, i) => {
      const a = (Math.PI * 2 * i) / 8 - Math.PI / 2; // start at top
      return { x: center.x + Math.cos(a) * radius, y: center.y + Math.sin(a) * radius };
    });
    return [...ring, center];
  }, []);

  // Connections between node indices
  const edges: [number, number][] = useMemo(
    () => [
      // ring
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 0],
      // spokes to center
      [0, 8],
      [1, 8],
      [2, 8],
      [3, 8],
      [4, 8],
      [5, 8],
      [6, 8],
      [7, 8],
      // cross lines
      [7, 3],
      [1, 5],
      [6, 2],
    ],
    []
  );

  const positions: Vec2[] = useMemo(() => {
    const t = tRef.current;
    return base.map((b, i) => drift(b, t, i));
  }, [tick, base]);

  const px = (v: number, axis: 'w' | 'h') => {
    return axis === 'w' ? v * size.width : v * size.height;
  };

  const nodeSize = 34;

  const iconFor = (id: string) => {
    switch (id) {
      case 'quantum-encrypt':
        return Lock;
      case 'neural-shield':
        return Brain;
      case 'data-vault':
        return Database;
      case 'crypto-sandbox':
        return Terminal;
      case 'secure-api-gateway':
        return Network;
      case 'compliance-assistant':
        return FileCheck2;
      case 'key-management':
        return Key;
      case 'telemetry-mesh':
        return Activity;
      case 'identity-hub':
        return Shield;
      default:
        return Shield;
    }
  };

  return (
    <div className="relative">
      <div ref={ref} className="relative h-[460px] w-full rounded-3xl border border-white/10 bg-gradient-to-b from-surface-2/40 to-surface-1/20 p-2 [perspective:1000px]">
        <svg className="absolute inset-0 h-full w-full" style={{ transform: 'rotateX(10deg) translateZ(0)' }}>
          <defs>
            <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(43,141,190,0.15)" />
              <stop offset="50%" stopColor="rgba(43,141,190,0.45)" />
              <stop offset="100%" stopColor="rgba(43,141,190,0.15)" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {edges.map(([a, b], i) => {
            const A = positions[a];
            const B = positions[b];
            const x1 = px(A.x, 'w');
            const y1 = px(A.y, 'h');
            const x2 = px(B.x, 'w');
            const y2 = px(B.y, 'h');
            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2;
            const d = `M ${x1},${y1} Q ${mx},${my} ${x2},${y2}`;
            return <path key={i} d={d} stroke="url(#edgeGrad)" strokeWidth={2} filter="url(#glow)" fill="none" />;
          })}
        </svg>

        {positions.map((p, i) => {
          const left = px(p.x, 'w') - nodeSize / 2;
          const top = px(p.y, 'h') - nodeSize / 2;
          const product = products[i];
          const Icon = iconFor(product.id);
          return (
            <motion.button
              key={i}
              onClick={() => setSelected(product)}
              className="absolute grid place-items-center rounded-full text-primary shadow-[0_12px_30px_rgba(43,141,190,0.35)] ring-1 ring-primary/40"
              style={{ left, top, width: nodeSize, height: nodeSize }}
              whileHover={{ scale: 1.09, translateZ: 8 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15 }}
              title={product.name}
            >
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(60%_60%_at_30%_30%,rgba(255,255,255,0.25),rgba(43,141,190,0.15)_40%,transparent_70%)]" />
              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20" />
              <Icon className="relative z-10 h-[16px] w-[16px]" />
            </motion.button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-6 rounded-2xl border border-primary/30 bg-background/70 p-6 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-muted-foreground">{selected.category}</div>
              <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground">{selected.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{selected.description || selected.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(selected.highlights || []).slice(0, 4).map((h, i) => (
                  <span key={i} className="rounded bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary/90">
                    {h}
                  </span>
                ))}
              </div>
            </div>
            <button onClick={() => setSelected(null)} className="rounded-md px-2 py-1 text-sm text-muted-foreground hover:text-foreground">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EcosystemGraph;


