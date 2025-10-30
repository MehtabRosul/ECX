import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashCursor from "@/components/ui/splash-cursor";
import GradientBlinds from "@/components/GradientBlinds";
import { EffectCard } from "@/components/ui/effect-card";
import { productsData } from "@/data/products-data";
import { Zap, Lock, Shield, Cpu, Database, Globe } from "lucide-react";

const nodeIcons: Record<string, any> = {
  "quantum-encrypt": Lock,
  "neural-shield": Shield,
  "data-vault": Database,
  "crypto-sandbox": Cpu,
  "secure-api-gateway": Globe,
  "compliance-assistant": Zap,
};

const ecosystemNodes = [
  {
    id: "quantum-encrypt",
    x: 50,
    y: 12,
  },
  {
    id: "neural-shield",
    x: 17,
    y: 36,
  },
  {
    id: "data-vault",
    x: 83,
    y: 36,
  },
  {
    id: "crypto-sandbox",
    x: 27,
    y: 78,
  },
  {
    id: "secure-api-gateway",
    x: 73,
    y: 78,
  },
  {
    id: "compliance-assistant",
    x: 50,
    y: 58,
  },
];

const connections = [
  { from: "quantum-encrypt", to: "neural-shield" },
  { from: "quantum-encrypt", to: "data-vault" },
  { from: "neural-shield", to: "crypto-sandbox" },
  { from: "data-vault", to: "secure-api-gateway" },
  { from: "crypto-sandbox", to: "compliance-assistant" },
  { from: "secure-api-gateway", to: "compliance-assistant" },
];

function getNodeCoords(id: string) {
  const n = ecosystemNodes.find((n) => n.id === id);
  if (!n) return { x: 0, y: 0 };
  return { x: n.x, y: n.y };
}

export function ProductEcosystemNeoV1() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative min-h-[36rem] md:min-h-[38rem] w-full flex items-center justify-center overflow-visible">
      {/* Immersive animated backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen">
        <GradientBlinds gradientColors={["#2B8DBE", "#241865", "#1c2c37", "#2B8DBE"]} noise={0.26} blindCount={19} blindMinWidth={38} spotlightRadius={0.56} distortAmount={1.2} shineDirection="right"/>
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SplashCursor BACK_COLOR={{ r: 0.14, g: 0.17, b: 0.24 }} COLOR_UPDATE_SPEED={28} DENSITY_DISSIPATION={3.6} SPLAT_FORCE={4200}/>
      </div>

      {/* The Ecosystem Orb Web Scene */}
      <div className="relative z-10 w-full max-w-5xl min-h-[30rem] aspect-[2/1] mx-auto flex items-center justify-center ">
        {/* Animated Connection Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ filter: "drop-shadow(0 2px 22px #2B8DBE66)" }}>
          {connections.map((conn, i) => {
            const from = getNodeCoords(conn.from);
            const to = getNodeCoords(conn.to);
            const highlighted = selected && (conn.from === selected || conn.to === selected);
            const isHovered = hovered && (conn.from === hovered || conn.to === hovered);
            return (
              <motion.line
                key={i}
                x1={`${from.x}%`} y1={`${from.y}%`}
                x2={`${to.x}%`} y2={`${to.y}%`}
                stroke="#2B8DBE"
                strokeWidth={highlighted || isHovered ? 3.8 : 2.2}
                strokeDasharray="5 13"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: highlighted || isHovered ? 0.94 : 0.4, filter: highlighted || isHovered ? "drop-shadow(0 0 18px #2B8DBE)" : undefined }}
                style={{ transition: "all 0.32s cubic-bezier(.72,0,.22,1)" }}
              />
            );
          })}
        </svg>
        {/* Product Nodes as floating kinetic Orbs */}
        {ecosystemNodes.map((node, idx) => {
          const ProductData = productsData.find((pd) => pd.id === node.id);
          const Icon = nodeIcons[node.id] || Shield;
          const isSelected = selected === node.id;
          const isHovered = hovered === node.id;
          return (
            <motion.div
              key={node.id}
              className="absolute flex flex-col items-center justify-center group"
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(isSelected ? null : node.id)}
              initial={{ y: 0, scale: 1 }}
              animate={{
                y: isHovered ? -14 : isSelected ? -11 : [0,4,-3,6,-2,0],
                scale: isSelected ? 1.21 : isHovered ? 1.1 : 1,
                boxShadow: isSelected ? "0 0 40px #2B8DBE99" : isHovered ? "0 0 18px #2B8DBE77" : "0 1.5px 10px #0002"
              }}
              transition={{ type: "spring", stiffness: 310, damping: 24 }}
            >
              <EffectCard>
                <div className={`transition-all duration-300 flex items-center justify-center bg-gradient-to-br ${isSelected ? "from-primary to-accent" : isHovered ? "from-[#241865] to-primary/80" : "from-surface-2 to-surface-1"} rounded-full border-2 border-white/10 shadow-xl h-[81px] w-[81px]`}
                  style={{boxShadow: isSelected ? "0 0 0 9px #2B8DBE44" : undefined}}>
                  <Icon className={`h-11 w-11 ${isSelected ? "text-white" : "text-primary"} drop-shadow-[0_4px_24px_rgba(43,141,190,0.89)] transition-all`} />
                </div>
                <div className={"text-center font-semibold mt-3 text-base" + (isSelected ? " text-foreground" : isHovered ? " text-primary" : " text-muted-foreground")}>{ProductData?.name ?? node.id.replace("-", " ")}</div>
                {isHovered && (<motion.div className="text-xs mt-1 text-muted-foreground max-w-[9rem] mx-auto" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }} transition={{ duration: 0.3 }}>{ProductData?.tagline}</motion.div>)}
              </EffectCard>
            </motion.div>
          );
        })}

        {/* Popout Panel */}
        <AnimatePresence>
        {selected && (() => {
          const pd = productsData.find((pd) => pd.id === selected);
          if (!pd) return null;
          return (
            <motion.div initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 200 }} className="absolute right-0 md:right-10 top-10 md:top-16 w-[375px] max-w-[92vw] bg-gradient-to-br from-surface-2/95 to-black/95 backdrop-blur-xl shadow-2xl border border-primary/30 rounded-2xl overflow-hidden z-30">
              <div className="p-7 pt-6 pb-1">
                <div className="flex items-center gap-2 mb-1">
                  {nodeIcons[selected] && <span className="inline-block bg-primary/20 rounded-full p-2"><span className="sr-only">icon</span>{nodeIcons[selected]({ className: "h-6 w-6 text-primary" })}</span>}
                  <h4 className="text-xl font-bold tracking-tight text-foreground">{pd.name}</h4>
                </div>
                <div className="text-muted-foreground text-base mb-2 font-medium">{pd.tagline}</div>
                <div className="text-sm mb-2">{pd.description}</div>
                <div className="flex flex-wrap gap-2 mt-3 mb-1">
                  {pd.highlights.map((h, i) => (<span key={i} className="bg-primary/10 px-3 py-1 rounded-full text-xs font-bold text-primary/90 shadow">{h}</span>))}
                </div>
                <div className="flex flex-col gap-1 py-2">
                  <span className="font-semibold text-[13px] text-accent">Integrations: </span>
                  <div className="flex flex-wrap gap-1 text-[13px]">{pd.integrations.map((ig, idx) => <span className="rounded bg-white/5 px-2 py-0.5 text-muted-foreground" key={idx}>{ig}</span>)}</div>
                </div>
                <div className="flex justify-between text-xs pt-3 pb-2 mt-2 border-t border-white/5">
                  <div>v{pd.version}</div>
                  <div className="text-right">{pd.status === 'active' ? <span className="text-green-400">Active</span> : pd.status}</div>
                </div>
                <button onClick={() => setSelected(null)} className="absolute z-10 right-4 top-4 text-2xl text-muted-foreground hover:text-accent-foreground">×</button>
              </div>
            </motion.div>
          );
        })()}
        </AnimatePresence>

      </div>

      {/* Decorative foreground light overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute left-[45vw] top-[10vh] w-[4vw] h-[14vh] rounded-full blur-[36px] bg-gradient-to-b from-primary/50 to-accent/0 scale-[1.05] rotate-80 opacity-50"/>
        <div className="absolute right-[17vw] bottom-[7vh] w-[5vw] h-[14vh] rounded-full blur-[44px] bg-gradient-to-b from-accent/80 to-primary/0 scale-110 opacity-40"/>
      </div>
    </div>
  );
}

export default ProductEcosystemNeoV1;



