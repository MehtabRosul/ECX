'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LightRays from '@/components/ui/light-rays';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedTabs } from '@/components/ui/animated-tabs';
import { Sparkles, Brain, Shield, Cloud, Code, BookOpen, Users, Zap, Globe, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { EnhancedButton } from '@/components/enhanced-button';
import { AboutShootingStars } from '@/components/about-shooting-stars';
import { AboutParticlesBackground } from '@/components/about-particles-background';
import { useBackgroundImageWithFallback } from '@/hooks/useBackgroundImage';
import { useIsMobile } from '@/hooks/use-mobile';

//

// Value Pillar Component
function ValuePillar({ title, description, icon: Icon, index }: { title: string; description: string; icon: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <Card className="h-full border border-primary/10 bg-background/30 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-primary/10 hover:bg-background/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10 ring-1 ring-primary/20 group-hover:ring-primary/40 transition-colors">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl text-foreground">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-px w-12 bg-primary/10 group-hover:bg-primary/20 transition-colors mb-3"></div>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Approach Step Component
function ApproachStep({ title, description, deliverables, index }: { title: string; description: string; deliverables: string[]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative pl-8 pb-8 last:pb-0"
    >
      {/* Numbered marker */}
      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary/90 to-primary/60 text-primary-foreground shadow-lg shadow-primary/20 ring-1 ring-primary/40 flex items-center justify-center"> 
        <span className="text-xs font-bold">{index + 1}</span>
      </div>
      {/* Vertical connector with blue gradient (draws top → down on reveal) */}
      <motion.div
        className="absolute left-3 top-6 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent origin-top"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
      />

      {/* Content card */}
      <div className="rounded-xl border border-primary/10 bg-background/30 backdrop-blur-sm p-4 transition-all duration-300 shadow-sm group-hover:shadow-primary/10 group-hover:border-primary/30 group-hover:bg-background/50">
        <h3 className="text-lg font-semibold mb-2 text-foreground transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-[0_0_10px_rgba(43,141,190,0.65)] will-change-[filter,color]">{title}</h3>
        <p className="text-muted-foreground mb-3">{description}</p>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Deliverables:</h4>
          <ul className="space-y-1">
            {deliverables.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Pulse indicator removed per request */}
    </motion.div>
  );
}

// Product Card Component
function ProductCard({ title, description, cta, imageUrl }: { title: string; description: string; cta: string; imageUrl?: string }) {
  const resolvedUrl = useBackgroundImageWithFallback(imageUrl);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="h-full flex flex-col border border-primary/10 bg-background/30 backdrop-blur-sm transition-all duration-300 overflow-hidden group-hover:-translate-y-1 hover:border-primary/40 hover:bg-background/60 shadow-sm hover:shadow-xl hover:shadow-primary/20 hover:ring-1 hover:ring-primary/40 min-h-[360px] sm:min-h-[380px] md:min-h-[420px]">
        <div className="relative h-40 md:h-48 overflow-hidden">
          <div
            className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
            style={resolvedUrl ? { backgroundImage: `url(${resolvedUrl})` } : undefined}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-background/10"></div>
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary/20 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></div>
        </div>
        <CardContent className="p-6 flex flex-col flex-1">
          <CardTitle className="mb-2 text-foreground transition-colors duration-300 group-hover:text-primary line-clamp-2">{title}</CardTitle>
          <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
          <EnhancedButton variant="outline" className="mt-auto w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors" animated>
            {cta}
          </EnhancedButton>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Capability Item Component
function CapabilityItem({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="flex items-start"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></span>
            <span className="text-muted-foreground">{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// Metrics removed

// Interactive Innovation Matrix (SVG network with spotlight and hover)
function InnovationMatrix({ externalHover, onSelect }: { externalHover?: string | null; onSelect?: (id: string) => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const nodes = [
    { id: 'cryptography', x: 16, y: 20 },
    { id: 'ml', x: 70, y: 20 },
    { id: 'systems', x: 36, y: 52 },
    { id: 'cloud', x: 82, y: 62 },
    { id: 'product', x: 54, y: 80 },
    { id: 'security', x: 14, y: 74 },
    { id: 'data', x: 58, y: 33 },
    { id: 'governance', x: 10, y: 46 },
    { id: 'devops', x: 44, y: 68 },
    { id: 'inference', x: 63, y: 48 },
    { id: 'zerotrust', x: 26, y: 82 },
    { id: 'privacy', x: 26, y: 34 },
    { id: 'research', x: 46, y: 22 },
    { id: 'ux', x: 40, y: 86 },
    { id: 'redteam', x: 8, y: 86 },
    { id: 'blueteam', x: 6, y: 62 },
    { id: 'platform', x: 72, y: 78 },
    { id: 'api', x: 90, y: 44 },
    { id: 'edge', x: 86, y: 28 },
    { id: 'mobile', x: 74, y: 40 },
    { id: 'compliance', x: 20, y: 58 },
    { id: 'audit', x: 30, y: 66 },
    { id: 'ops', x: 50, y: 60 },
  ];
  // Build links by proximity so the graph feels organic
  const links = [] as Array<[string,string, number]>;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i]; const b = nodes[j];
      const dx = a.x - b.x; const dy = a.y - b.y; const d = Math.hypot(dx, dy);
      if (d < 26) links.push([a.id, b.id, d]);
    }
  }

  // derive active id (cursor or external hover)
  const activeId = externalHover ?? hoverId;

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left; const y = e.clientY - r.top;
        el.style.setProperty('--mx', `${x}px`);
        el.style.setProperty('--my', `${y}px`);
        const px = (x / r.width) * 100; const py = (y / r.height) * 100;
        // Snap-hover: highlight nearest node within threshold
        const nearest = nodes
          .map(n => ({ n, d: Math.hypot(n.x - px, n.y - py) }))
          .sort((a,b) => a.d - b.d)[0];
        setHoverId(nearest && nearest.d < 10 ? nearest.n.id : null);
      }}
      className="relative aspect-square rounded-2xl bg-surface-2/60 backdrop-blur-md border border-white/10 overflow-hidden shadow-2xl"
    >
      <span className="pointer-events-none absolute -inset-px opacity-80 rounded-2xl" style={{ background: 'radial-gradient(520px 180px at var(--mx) var(--my), rgba(59,130,246,0.16), transparent 70%)' }} />
      {/* Cursor tracker ring */}
      <span className="pointer-events-none absolute z-20 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/2 blur-[0.5px]" style={{ left: 'var(--mx)', top: 'var(--my)' }} />
      <svg viewBox="0 0 100 100" className="relative z-10 w-full h-full">
        {links.map(([a, b, d], i) => {
          const na = nodes.find(n => n.id === a)!; const nb = nodes.find(n => n.id === b)!;
          const active = activeId === a || activeId === b;
          return (
            <motion.line
              key={i}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={active ? 'rgba(59,130,246,0.75)' : 'rgba(255,255,255,0.12)'}
              strokeWidth={active ? 1 : Math.max(0.4, 1.2 - d / 28)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            />
          );
        })}
        {nodes.map((n, i) => (
          <g key={n.id} onMouseEnter={() => setHoverId(n.id)} onMouseLeave={() => setHoverId(null)} onClick={() => onSelect && onSelect(n.id)}>
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={activeId === n.id ? 3.6 : 2.6}
              fill={activeId === n.id ? 'rgba(59,130,246,0.95)' : 'rgba(59,130,246,0.65)'}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={0.2}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.06 * i }}
            />
            {activeId === n.id && (
              <circle cx={n.x} cy={n.y} r={5.5} fill="none" stroke="rgba(59,130,246,0.35)" strokeWidth={0.25} />
            )}
            <motion.text
              x={n.x}
              y={n.y + 6.5}
              textAnchor="middle"
              className="fill-white/70 text-[3px]"
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: activeId === n.id ? 1 : 0.65, y: 0 }}
            >{n.id}</motion.text>
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/70 to-transparent" />
      </div>
      <div className="absolute z-30 inset-x-0 top-0 p-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Users className="w-5 h-5" />
          <span className="text-sm font-medium">Innovation Matrix</span>
        </div>
        <span className="text-xs text-muted-foreground">hover to discover clusters</span>
      </div>
    </div>
  );
}

// Team & Culture composed section
function TeamAndCulture() {
  const principles = [
    { title: 'Craft over cargo‑cult', copy: 'We build with intent, favoring clarity and durability over trend‑driven stacks.', icon: Sparkles },
    { title: 'Accountable ownership', copy: 'One team, clear stewards. Advice backed by artifacts and measurable outcomes.', icon: Shield },
    { title: 'Security by default', copy: 'Threat modeling, privacy and provenance are designed in, not added later.', icon: Lock },
    { title: 'Reproducible results', copy: 'Every claim traceable to code, data and tests that anyone can re‑run.', icon: BookOpen },
  ];
  const cohorts = ['cryptography','ml','systems','cloud','product','security','data','governance','devops','inference','zerotrust','privacy','research','ux','redteam','blueteam','platform','api','edge','mobile','compliance','audit','ops'];
  const [hoverCohort, setHoverCohort] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const isMobile = useIsMobile();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">The collective behind EncryptArx</h2>
        <p className="text-muted-foreground mb-6">
        Not a list of faces, but a dynamic network. Our clusters work across AI,
        Cybersecurity, Cloud, Systems, and Product. Teams form fluidly across these
        domains to drive outcomes end to end, supported by clear documentation and
        traceable decision artifacts.</p>

        {/* Cohorts marquee: continuously loops left → right */}
        <div className="mb-4 relative overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)' as any }}>
          <motion.div
            className="flex gap-2 min-w-max pr-2"
            initial={{ x: '-0%' }}
            animate={{ x: ['-0%', '-50%'] }}
            transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
          >
            {[...cohorts, ...cohorts].map((c, idx) => (
              <button
                key={`${c}-${idx}`}
                onMouseEnter={(e) => {
                  setHoverCohort(c);
                  const r = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                  (e.currentTarget as HTMLButtonElement).style.setProperty('--rx', `${r.width/2}px`);
                }}
                onMouseLeave={() => setHoverCohort(null)}
                onClick={() => setSelected(c)}
                className={`relative rounded-full border px-3 py-1.5 text-xs transition-all backdrop-blur-sm ${selected===c? 'border-primary/60 text-primary bg-primary/10' : 'border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20'} overflow-hidden`}
              >
                <span className="absolute -inset-px rounded-full opacity-0 transition-opacity duration-300" style={{ background: 'radial-gradient(40px 12px at var(--mx,50%) 50%, rgba(59,130,246,0.20), transparent 70%)' }} />
                <span className="relative z-10">{c}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Live metrics ribbon removed per request */}

        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="group relative rounded-2xl bg-background/40 border border-white/10 overflow-hidden"
            >
              {/* animated gradient border */}
              <span className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.25), transparent 25%, rgba(59,130,246,0.25) 50%, transparent 75%, rgba(59,130,246,0.25))' }} />
              <div className="relative z-10 p-4 flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 ring-1 ring-primary/30 flex items-center justify-center transition-transform duration-300 group-hover:rotate-6">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h4 className="text-sm font-semibold text-foreground">{p.title}</h4>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{p.copy}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="inline-block"
          initial={false}
          whileHover={{ scale: 1.015 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16 }}
        >
          <Link href="/team">
            <EnhancedButton
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/70 to-blue-600/70 p-[2px] shadow-[0_10px_32px_-16px_rgba(59,130,246,0.65)] transition-all hover:shadow-[0_18px_46px_-18px_rgba(59,130,246,0.75)]"
            >
              <span className="rounded-full px-6 py-3 bg-background/80 text-white backdrop-blur-sm flex items-center gap-2">
                <span className="relative z-10">Meet the Team</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </EnhancedButton>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div className="relative">
          <InnovationMatrix externalHover={hoverCohort ?? selected} onSelect={(id) => setSelected(id)} />
          {selected && (
            isMobile ? (
              <div className="mt-3 rounded-xl border border-white/10 bg-background/80 backdrop-blur-md p-4 shadow-lg">
                <div className="text-xs uppercase tracking-wide text-primary mb-1">Cohort</div>
                <div className="text-sm font-semibold mb-2">{selected}</div>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                  <li>Cross-cluster workstreams with measurable artifacts</li>
                  <li>Security and reproducibility checkpoints embedded</li>
                  <li>Reusable playbooks and runbooks maintained</li>
                </ul>
              </div>
            ) : (
              <div className="absolute right-3 bottom-3 z-40 max-w-[280px] rounded-xl border border-white/10 bg-background/70 backdrop-blur-md p-4 shadow-lg">
                <div className="text-xs uppercase tracking-wide text-primary mb-1">Cohort</div>
                <div className="text-sm font-semibold mb-2">{selected}</div>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                  <li>Cross-cluster workstreams with measurable artifacts</li>
                  <li>Security and reproducibility checkpoints embedded</li>
                  <li>Reusable playbooks and runbooks maintained</li>
                </ul>
              </div>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('featured');

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Particle Background Animation */}
        <AboutParticlesBackground />
        {/* Shooting Stars */}
        <div className="absolute inset-0 z-[5]">
          <AboutShootingStars />
        </div>

        {/* Light Rays Effect */}
        <div className="absolute inset-0 z-10">
          <LightRays 
            raysOrigin="top-center"
            raysColor="#2B8DBE"
            raysSpeed={0.5}
            lightSpread={0.8}
            rayLength={1.5}
            pulsating={true}
            fadeDistance={0.7}
            saturation={1.2}
            noiseAmount={0.1}
            distortion={0.2}
          />
        </div>
        
        {/* Hero Content */}
        <div className="container relative z-20 mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-headline leading-tight">
              <span className="block text-white">
                EncryptArx
              </span>
              <AnimatedGradientText className="block mt-2 bg-[length:200%_100%] animate-gradient from-emerald-300 via-cyan-300 to-blue-400">
                Securing the Future, One Breakthrough at a Time
              </AnimatedGradientText>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              We are a deep-tech company focused on cybersecurity and product development. We help businesses protect their digital systems through services like penetration testing, infrastructure hardening, and custom software development. Our goal is to make digital spaces safer and more reliable for everyone we work with.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <EnhancedButton size="lg" className="px-10 py-6 text-lg rounded-full text-white gradient-button gradient-button-variant shadow-xl" animated>
                Book a Technical Discovery
              </EnhancedButton>
              <EnhancedButton size="lg" variant="outline" className="px-8 py-6 text-lg rounded-full border-primary text-primary hover:bg-primary/10 transition-colors" animated>
                Explore our Research Library
              </EnhancedButton>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-8 h-12 rounded-full border-2 border-primary flex justify-center"
          >
            <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative overflow-hidden">
        <AboutParticlesBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background/0 z-[1]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">Our Values, In Practice</h2>
            <div className="mx-auto h-0.5 w-24 rounded-full bg-primary/40 mb-4"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We live by these principles in everything we build and every partnership we forge.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValuePillar
              title="Security-First"
              description="Protection is the foundation of everything we design, develop, and deliver."
              icon={Lock}
              index={0}
            />
            <ValuePillar
              title="Innovation with Purpose"
              description="We turn research and emerging technologies into real, scalable solutions that create lasting impact."
              icon={Sparkles}
              index={1}
            />
            <ValuePillar
              title="Engineering with Integrity"
              description="We build reliable, maintainable systems and share our knowledge to strengthen every team we work with."
              icon={Code}
              index={2}
            />
            <ValuePillar
              title="Collaboration that Scales"
              description="We work alongside clients and partners to co-create secure, future-ready ecosystems."
              icon={Users}
              index={3}
            />
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-background/50 relative overflow-hidden">
        <AboutParticlesBackground />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">What we do?</h2>
            <div className="mx-auto h-0.5 w-28 rounded-full bg-primary/40 mb-6"></div>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-10">
              EncryptArx combines four integrated competencies like Cybersecurity, AI & Machine Learning, Product & Platform Engineering, and Cloud Architecture — complemented by a dedicated consultancy arm and studio-grade product teams. We research, prototype, and deliver solutions that are auditable, resilient and designed for enterprise readiness.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="relative h-full border border-primary/10 bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-all duration-300 shadow-sm hover:shadow-primary/10 hover:border-primary/30">
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-0 left-0 h-0.5 w-0 bg-primary/40 group-hover:w-full transition-all duration-500"></div>
                </div>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 ring-1 ring-primary/10 group-hover:ring-primary/40 group-hover:bg-primary/20 group-hover:scale-110">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">AI & ML</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Bespoke models, MLOps & explainable AI.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="relative h-full border border-primary/10 bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-all duration-300 shadow-sm hover:shadow-primary/10 hover:border-primary/30">
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-0 left-0 h-0.5 w-0 bg-primary/40 group-hover:w-full transition-all duration-500"></div>
                </div>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 ring-1 ring-primary/10 group-hover:ring-primary/40 group-hover:bg-primary/20 group-hover:scale-110">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Cybersecurity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Assessments, red-team, SOC integration, and secure engineering.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="relative h-full border border-primary/10 bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-all duration-300 shadow-sm hover:shadow-primary/10 hover:border-primary/30">
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-0 left-0 h-0.5 w-0 bg-primary/40 group-hover:w-full transition-all duration-500"></div>
                </div>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 ring-1 ring-primary/10 group-hover:ring-primary/40 group-hover:bg-primary/20 group-hover:scale-110">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Tech Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Full-stack product engineering & embedded systems.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="relative h-full border border-primary/10 bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-all duration-300 shadow-sm hover:shadow-primary/10 hover:border-primary/30">
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-0 left-0 h-0.5 w-0 bg-primary/40 group-hover:w-full transition-all duration-500"></div>
                </div>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 ring-1 ring-primary/10 group-hover:ring-primary/40 group-hover:bg-primary/20 group-hover:scale-110">
                    <Cloud className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Cloud</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Secure, resilient cloud architecture & migration.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="relative h-full border border-primary/10 bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-all duration-300 shadow-sm hover:shadow-primary/10 hover:border-primary/30">
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-0 left-0 h-0.5 w-0 bg-primary/40 group-hover:w-full transition-all duration-500"></div>
                </div>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 ring-1 ring-primary/10 group-hover:ring-primary/40 group-hover:bg-primary/20 group-hover:scale-110">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Consultancy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Strategic advisory, compliance mapping and technical due diligence.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="relative h-full border border-primary/10 bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-all duration-300 shadow-sm hover:shadow-primary/10 hover:border-primary/30">
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-0 left-0 h-0.5 w-0 bg-primary/40 group-hover:w-full transition-all duration-500"></div>
                </div>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 ring-1 ring-primary/10 group-hover:ring-primary/40 group-hover:bg-primary/20 group-hover:scale-110">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    In-house solutions derived from R&D (e.g., Defenza, Deepfake Detection).
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/services">
              <EnhancedButton variant="outline" className="px-6 py-3 rounded-full border-primary text-primary hover:bg-primary/10 transition-colors" animated>
                View all services
              </EnhancedButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 relative overflow-hidden">
        <AboutParticlesBackground />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">How we partner?</h2>
            <div className="mx-auto h-0.5 w-28 rounded-full bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 mb-6"></div>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              We work in measurable, repeatable phases: discovery, prototype, validation, delivery and operation. Each engagement produces artifacts and acceptance criteria, and is designed to ensure your team can maintain and evolve the solution.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <ApproachStep
              title="Discovery & Risk Mapping"
              description="We align on business objectives, capture constraints, inventory assets, and quantify risk."
              deliverables={[
                "Scoping brief & prioritized risk register",
                "Technical architecture assessment",
                "Compliance mapping document"
              ]}
              index={0}
            />
            
            <ApproachStep
              title="Hypothesis & Prototype"
              description="Rapidly validate core assumptions with reproducible prototypes and benchmarks."
              deliverables={[
                "Prototype demo + evaluation metrics",
                "Proof-of-concept implementation",
                "Performance benchmark reports"
              ]}
              index={1}
            />
            
            <ApproachStep
              title="Engineering & Integration"
              description="Harden the solution for production with CI/CD, tests and secure deployment."
              deliverables={[
                "Code, infra-as-code, and runbooks",
                "Security audit reports",
                "Deployment automation scripts"
              ]}
              index={2}
            />
            
            <ApproachStep
              title="Handover & Enablement"
              description="Transfer knowledge with training, documentation and operational runbooks."
              deliverables={[
                "Runbooks, training recordings, acceptance reports",
                "Knowledge transfer workshops",
                "Documentation package"
              ]}
              index={3}
            />
            
            <ApproachStep
              title="Operate & Evolve"
              description="Continuous monitoring, model maintenance and periodic reassessments."
              deliverables={[
                "Health dashboards and scheduled review board",
                "Performance optimization reports",
                "Security update procedures"
              ]}
              index={4}
            />
          </div>
        </div>
      </section>

      

      {/* Signature Products Section */}
      <section className="py-20 relative overflow-hidden">
        <AboutParticlesBackground />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">From lab to product, signature solutions</h2>
            <div className="mx-auto h-0.5 w-28 rounded-full bg-primary/40 mb-6"></div>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-10">
              Solutions that matured from experiments into supported offerings, each backed by research artifacts and a rigorous security posture.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCard
              title="Defenza: Digital Threat Companion"
              description="Integrated threat‑detection assistant for cross‑platform deployment. Produces incident reports, recommended remediations, and optional automated containment."
              cta="Let's explore"
              imageUrl="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop"
            />
            
            <ProductCard
              title="Deepfake Detection (ECX Detector)"
              description="API and SDK for media integrity verification with explainable confidence scores and provenance signals. Built for moderation and enterprise verification."
              cta="Let's explore"
              imageUrl="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1200&auto=format&fit=crop"
            />
            
            <ProductCard
              title="ThreatSense Engine"
              description="Configurable analytics and detection core for enterprise SOCs, powered by research‑derived detection rules and RAG‑enabled intelligence summaries."
              cta="Let's explore"
              imageUrl="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop"
            />
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <EnhancedButton
                className="px-10 py-6 text-lg rounded-full border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                variant="outline"
                animated
              >
                View products
              </EnhancedButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities Matrix Section */}
      <section className="py-20 bg-background/50 relative overflow-hidden">
        <AboutParticlesBackground />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Capabilities & proof points</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-10">
              A compact, scannable list of our capabilities mapped to outcomes clients care about.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CapabilityItem
              title="Security & Compliance"
              items={[
                "Penetration testing",
                "Vulnerability management",
                "SOC integration",
                "Compliance mapping (NIST/ISO/SOC2)",
                "Vulnerability disclosure program"
              ]}
            />
            
            <CapabilityItem
              title="AI & Data"
              items={[
                "Supervised learning",
                "Unsupervised anomaly detection",
                "Embeddings & search",
                "LLM integrations",
                "MLOps pipelines",
                "Model explainability"
              ]}
            />
            
            <CapabilityItem
              title="Systems & Dev"
              items={[
                "Microservices",
                "Event-driven systems",
                "Real-time streaming",
                "Low-latency inference",
                "High-availability design"
              ]}
            />
            
            <CapabilityItem
              title="Blockchain & Web3"
              items={[
                "Smart-contract audits",
                "Tokenomics advisory",
                "Off-chain privacy",
                "Decentralized identity"
              ]}
            />
            
            <CapabilityItem
              title="Cloud & Infra"
              items={[
                "Multi-cloud architecture",
                "IaC",
                "Cost & reliability optimizations",
                "Secure CI/CD"
              ]}
            />
            <CapabilityItem
              title="Consultancy"
              items={[
                "Technical due diligence",
                "Compliance readiness",
                "Security strategy & roadmaps",
                "Board-level briefings",
                "Vendor & architecture reviews"
              ]}
            />
          </div>

          {/* Proof points moved below and redesigned */}
          <div className="mt-12">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold">Proof points</h3>
              <div className="mx-auto h-0.5 w-24 rounded-full bg-primary/40 mt-3"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
              >
                <Card className="h-full border border-primary/10 bg-background/40 backdrop-blur-sm">
                  <CardContent className="p-5 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">40+ research artifacts published</span> with reproducible experiments & open datasets</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.05 }}
              >
                <Card className="h-full border border-primary/10 bg-background/40 backdrop-blur-sm">
                  <CardContent className="p-5 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Multiple enterprise integrations</span> — SIEM, KMS, SSO providers</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <Card className="h-full border border-primary/10 bg-background/40 backdrop-blur-sm">
                  <CardContent className="p-5 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">R&D-to-product pipeline</span> with reproducible artifacts and open-source contributions</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultancy Section */}
      <section className="py-20 relative overflow-hidden">
        <AboutParticlesBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Consultancy & strategic advisory</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto mb-10">
                "Our consultancy service helps leaders make technically sound, secure decisions. We provide technical due diligence, compliance readiness, enterprise roadmaps, and board-level briefings — all underpinned by engineering-level artifacts."
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 bg-background/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">What clients get</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></span>
                        <span className="text-muted-foreground">
                          Actionable technical roadmaps and a prioritized SoW
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></span>
                        <span className="text-muted-foreground">
                          Audit-ready evidence packages and compliance mapping
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></span>
                        <span className="text-muted-foreground">
                          Executive briefings with technical annexes for the board and regulators
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 bg-background/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Our approach</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></span>
                        <span className="text-muted-foreground">
                          Evidence-based recommendations with reproducible methodologies
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></span>
                        <span className="text-muted-foreground">
                          Hands-on workshops with your engineering teams
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></span>
                        <span className="text-muted-foreground">
                          Continuous support during implementation phases
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <div className="text-center mt-12">
              <EnhancedButton className="group relative inline-flex items-center justify-center rounded-full px-10 py-4 text-lg font-semibold text-primary border border-primary/40 bg-transparent transition-all duration-300 hover:scale-[1.02] hover:text-white hover:shadow-[0_18px_40px_-14px_rgba(59,130,246,0.6)] before:absolute before:inset-0 before:rounded-full before:bg-transparent before:transition-all before:duration-300 group-hover:before:bg-gradient-to-r group-hover:before:from-cyan-500 group-hover:before:to-blue-600 overflow-hidden" animated>
                <span className="relative z-10">Request a Consultancy Brief</span>
              </EnhancedButton>
            </div>
          </div>
        </div>
      </section>

      {/* Research Library Section */}
      <section className="py-20 bg-background/50 relative overflow-hidden">
        <AboutParticlesBackground />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Research Library</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-10">
              Browse our curated archive of whitepapers, reproducible notebooks and experiment artifacts. Each item includes the methodology, artifacts necessary to reproduce the results, and references to projects or products that use the research.
            </p>
          </motion.div>
          {/** Animated tabs (Featured, Latest, Popular) with smooth spring transitions */}
          <div className="max-w-4xl mx-auto">
            <AnimatedTabs
              className="mb-6 gap-2 rounded-xl bg-white/5 p-1 backdrop-blur-sm border border-white/10"
              tabs={[
                { id: 'featured', title: 'Featured' },
                { id: 'latest', title: 'Latest' },
                { id: 'popular', title: 'Popular' },
              ]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <div className="min-h-[320px]">
              <AnimatePresence mode="wait">
                {activeTab === 'featured' && (
                  <motion.div
                    key="tab-featured"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="group relative h-full border border-white/10 bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-transform duration-300 rounded-xl overflow-hidden hover:shadow-[0_24px_44px_-22px_rgba(59,130,246,0.35)]">
                    <span className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(700px_180px_at_50%_120%,rgba(59,130,246,0.18),transparent_70%)]" />
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">Hardening Enclaves for Multi-tenant Cloud</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Experimental results and a reference implementation for secure enclave architectures in multi-tenant environments.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">Research Paper</Badge>
                        <EnhancedButton variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary transition-colors" animated>
                          Explore
                        </EnhancedButton>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="group relative h-full border border-white/10 bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-transform duration-300 rounded-xl overflow-hidden hover:shadow-[0_24px_44px_-22px_rgba(59,130,246,0.35)]">
                    <span className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(700px_180px_at_50%_120%,rgba(59,130,246,0.18),transparent_70%)]" />
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Code className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">Adversarial Robustness for Threat Detection</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Datasets and notebooks for evaluating adversarial robustness in ML-based threat detection systems.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">Notebook</Badge>
                        <EnhancedButton variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary transition-colors" animated>
                          Explore
                        </EnhancedButton>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="group relative h-full border border-white/10 bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-transform duration-300 rounded-xl overflow-hidden hover:shadow-[0_24px_44px_-22px_rgba(59,130,246,0.35)]">
                    <span className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(700px_180px_at_50%_120%,rgba(59,130,246,0.18),transparent_70%)]" />
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">Practical Deepfake Detection Benchmarks</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Evaluation suite and model baselines for detecting deepfakes in real-world scenarios.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">Dataset</Badge>
                        <EnhancedButton variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary transition-colors" animated>
                          Explore
                        </EnhancedButton>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
                  </motion.div>
                )}
                {activeTab === 'latest' && (
                  <motion.div
                    key="tab-latest"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Latest research publications will appear here.</p>
                    </div>
                  </motion.div>
                )}
                {activeTab === 'popular' && (
                  <motion.div
                    key="tab-popular"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Most popular research items will appear here.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/library">
              <EnhancedButton variant="outline" className="px-6 py-3 rounded-full border-primary text-primary hover:bg-primary/15 hover:shadow-[0_16px_40px_-18px_rgba(59,130,246,0.45)] transition-all" animated>
                Open Library
              </EnhancedButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Team & Culture Section */}
      <section className="py-24 bg-background/50 relative overflow-hidden">
        <AboutParticlesBackground />
        <div className="pointer-events-none absolute inset-0 z-0 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]">
          <div className="absolute -top-32 right-10 size-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-20 size-80 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <TeamAndCulture />
        </div>
      </section>

      {/* Security & Governance Section */}
      <section className="py-20 bg-background/50 relative overflow-hidden">
        <AboutParticlesBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Security & governance</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
              Security is at our core. We protect data in transit and at rest, maintain detailed
              activity trails for sensitive operations, and follow a responsible vulnerability
              disclosure process. On request, we align projects with relevant compliance
              frameworks and provide clear documentation that supports verification and
              transparency.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 bg-background/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Our Security Practices</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Lock className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          End-to-end encryption for all data in transit and at rest
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Shield className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Regular penetration testing and security audits
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Users className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Vulnerability disclosure program with responsible reporting
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 bg-background/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Governance Commitments</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <BookOpen className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Compliance mapping to NIST, ISO, SOC2 on request
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Code className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Audit-friendly artifacts for all deliverables
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Zap className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Evidence-based decision making with reproducible methodologies
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 p-6 rounded-2xl bg-white/20 text-white border border-white/30 shadow-[0_10px_30px_-12px_rgba(2,6,23,0.6)] backdrop-blur-sm"
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1 text-primary">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Important Notice</h3>
                  <p className="text-white/85">
                    All penetration testing is done by mutual agreement and within a signed scope. We recommend anonymized data for prototype phases and strict data governance for production.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background/50 relative overflow-hidden">
        <AboutParticlesBackground />
        <div className="absolute inset-0 z-0 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]">
          <div className="absolute left-1/2 top-8 -translate-x-1/2 h-44 w-[70%] rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to secure your digital future?</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">Discuss your use case with our experts. We'll respond within one business day.</p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* Neon-outline primary */}
              <EnhancedButton className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl text-white font-semibold transition-all">
                <span className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />
                <span className="absolute inset-[2px] rounded-[14px] bg-black/70 backdrop-blur-sm ring-1 ring-white/10" />
                <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(160px 60px at 20% 50%, rgba(59,130,246,0.25), transparent 70%)' }} />
                <span className="relative z-10">Book a Technical Discovery</span>
              </EnhancedButton>

              {/* Aurora-glow secondary */}
              <EnhancedButton className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl text-white font-semibold overflow-hidden transition-transform hover:-translate-y-0.5">
                <span className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(120deg, #0b1222 0%, #0d1b2d 35%, #123e63 60%, #0b1222 100%)' }} />
                <span className="absolute inset-0 rounded-2xl mix-blend-screen opacity-80 transition-transform duration-700 group-hover:translate-x-6" style={{ background: 'radial-gradient(120px 60px at 88% 10%, rgba(255,248,196,0.95), rgba(112,212,255,0.35) 40%, transparent 70%)' }} />
                <span className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                <span className="relative z-10">Request Research Brief</span>
              </EnhancedButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}