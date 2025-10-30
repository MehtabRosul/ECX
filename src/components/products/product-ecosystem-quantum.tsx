'use client';

import { useState, useRef, useEffect } from "react";
import "./product-ecosystem-quantum.css";
import { nodeVariants, panelVariants, connectionVariants, pulseAnimation, floatAnimation, rotateAnimation } from "@/lib/animations";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { productsData } from "@/data/products-data";
import { 
  Zap, Lock, Shield, Cpu, Database, Globe,
  ArrowRight, X, Activity, Cloud, Code, Cog
} from "lucide-react";
import { EffectCard } from "@/components/ui/effect-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 3D Particle Field Component
function ParticleField() {
  const ref: any = useRef();
  const [sphere] = useState(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3;
      const radius = 2.5 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 30;
      ref.current.rotation.y -= delta / 40;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#2B8DBE"
          size={0.008}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.7}
        />
      </Points>
    </group>
  );
}

// Quantum Connection Visualization
function QuantumConnections({ connections, nodes, selectedNode }: any) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: "drop-shadow(0 0 8px rgba(43, 141, 190, 0.7))" }}>
      {connections.map((conn: any, i: number) => {
        const fromNode = nodes.find((n: any) => n.id === conn.from);
        const toNode = nodes.find((n: any) => n.id === conn.to);
        
        if (!fromNode || !toNode) return null;
        
        const isSelected = selectedNode && (conn.from === selectedNode || conn.to === selectedNode);
        
        return (
          <motion.line
            key={i}
            x1={`${fromNode.x}%`}
            y1={`${fromNode.y}%`}
            x2={`${toNode.x}%`}
            y2={`${toNode.y}%`}
            stroke="url(#quantumGradient)"
            strokeWidth={isSelected ? 3 : 1.5}
            strokeDasharray={isSelected ? "0" : "4 6"}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
          />
        );
      })}
      <defs>
        <linearGradient id="quantumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2B8DBE" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Holographic Node Component
function HolographicNode({ 
  node, 
  isSelected, 
  isHovered, 
  onClick, 
  onMouseEnter, 
  onMouseLeave 
}: any) {
  const nodeData = productsData.find(p => p.id === node.id);
  const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    "quantum-encrypt": Lock,
    "neural-shield": Shield,
    "data-vault": Database,
    "crypto-sandbox": Cpu,
    "secure-api-gateway": Globe,
    "compliance-assistant": Zap
  };
  
  const Icon = iconMap[node.id] || Shield;

  return (
    <motion.div
      className="absolute flex flex-col items-center justify-center cursor-pointer group"
      style={{ 
        left: `${node.x}%`, 
        top: `${node.y}%`,
        transform: "translate(-50%, -50%)"
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isSelected ? 1.3 : isHovered ? 1.2 : 1,
        opacity: 1,
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        duration: 0.5,
        rotate: { 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      {/* Holographic Ring */}
      <div className={cn(
        "absolute inset-0 rounded-full transition-all duration-500",
        isSelected 
          ? "animate-ping opacity-70" 
          : isHovered 
            ? "opacity-50" 
            : "opacity-30"
      )}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-md" />
      </div>
      
      {/* Main Node */}
      <div className="relative z-10">
        <EffectCard>
        <div className={cn(
          "relative flex items-center justify-center rounded-full border-2 transition-all duration-300",
          "bg-gradient-to-br from-surface-2/90 to-surface-1/90 backdrop-blur-lg",
          isSelected 
            ? "h-24 w-24 border-cyan-400 shadow-[0_0_30px_rgba(43,141,190,0.7)]" 
            : isHovered
              ? "h-20 w-20 border-purple-400 shadow-[0_0_20px_rgba(124,58,237,0.5)]"
              : "h-16 w-16 border-white/20"
        )}>
          <div className={cn(
            "flex items-center justify-center rounded-full transition-all duration-300",
            isSelected 
              ? "h-16 w-16 bg-gradient-to-br from-cyan-500 to-blue-600" 
              : isHovered
                ? "h-14 w-14 bg-gradient-to-br from-purple-500 to-pink-500"
                : "h-10 w-10 bg-gradient-to-br from-surface-2 to-surface-1"
          )}>
            <Icon className={cn(
              "transition-all duration-300",
              isSelected 
                ? "h-8 w-8 text-white" 
                : isHovered
                  ? "h-7 w-7 text-white"
                  : "h-5 w-5 text-primary"
            )} />
          </div>
          
          {/* Floating Particles */}
          {isSelected && (
            <>
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />
              <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-purple-400 animate-pulse delay-100" />
              <div className="absolute -top-1 -left-1 h-1.5 w-1.5 rounded-full bg-pink-400 animate-pulse delay-200" />
            </>
          )}
        </div>
      </EffectCard>
      </div>
      
      {/* Product Name */}
      <motion.div 
        className={cn(
          "mt-3 text-center font-semibold transition-all duration-300",
          isSelected 
            ? "text-lg text-foreground" 
            : isHovered
              ? "text-base text-primary"
              : "text-sm text-muted-foreground"
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {nodeData?.name || node.id.replace("-", " ")}
      </motion.div>
      
      {/* Tagline on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="mt-1 text-xs text-center text-muted-foreground max-w-[120px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {nodeData?.tagline}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Enhanced Product Details Panel
function EnhancedProductPanel({ productId, onClose }: { productId: string; onClose: () => void }) {
  const product = productsData.find(p => p.id === productId);
  
  if (!product) return null;

  const Icon = {
    "quantum-encrypt": Lock,
    "neural-shield": Shield,
    "data-vault": Database,
    "crypto-sandbox": Cpu,
    "secure-api-gateway": Globe,
    "compliance-assistant": Zap
  }[productId] || Shield;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="absolute right-0 top-0 h-full w-full max-w-md z-30"
    >
      <div className="h-full overflow-y-auto rounded-l-2xl border-l border-white/10 bg-gradient-to-b from-surface-2/95 to-black/90 backdrop-blur-xl shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.tagline}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Status Badge */}
          <div className="mt-4">
            <span className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
              product.status === "active" && "bg-green-500/20 text-green-300",
              product.status === "beta" && "bg-yellow-500/20 text-yellow-300",
              product.status === "coming-soon" && "bg-blue-500/20 text-blue-300",
              product.status === "deprecated" && "bg-red-500/20 text-red-300"
            )}>
              {product.status.replace("-", " ")}
            </span>
          </div>
          
          {/* Description */}
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          
          {/* Key Metrics */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-surface-2/50 p-3 text-center">
              <div className="text-xl font-bold text-primary">{product.performance?.latency || "N/A"}</div>
              <div className="text-xs text-muted-foreground">Latency</div>
            </div>
            <div className="rounded-lg bg-surface-2/50 p-3 text-center">
              <div className="text-xl font-bold text-primary">{product.performance?.throughput || "N/A"}</div>
              <div className="text-xs text-muted-foreground">Throughput</div>
            </div>
            <div className="rounded-lg bg-surface-2/50 p-3 text-center">
              <div className="text-xl font-bold text-primary">{product.performance?.availability || "N/A"}</div>
              <div className="text-xs text-muted-foreground">Availability</div>
            </div>
          </div>
          
          {/* Highlights */}
          <div className="mt-6">
            <h4 className="font-semibold">Key Highlights</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.highlights.map((highlight, i) => (
                <span 
                  key={i} 
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
          
          {/* Integrations */}
          <div className="mt-6">
            <h4 className="font-semibold">Key Integrations</h4>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {product.integrations.slice(0, 4).map((integration, i) => (
                <div key={i} className="flex items-center gap-2 rounded bg-white/5 p-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm">{integration}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Features */}
          <div className="mt-6">
            <h4 className="font-semibold">Core Features</h4>
            <div className="mt-2 space-y-3">
              {product.features.slice(0, 3).map((feature, i) => (
                <div key={i} className="rounded-lg bg-surface-2/30 p-3">
                  <h5 className="font-medium">{feature.title}</h5>
                  <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <Button variant="outline" className="flex-1">
              <Code className="mr-2 h-4 w-4" />
              Documentation
            </Button>
            <GradientButton className="flex-1">
              <ArrowRight className="mr-2 h-4 w-4" />
              Get Started
            </GradientButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Quantum Ecosystem Visualization
export function ProductEcosystemQuantum() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  
  const ecosystemNodes = [
    { id: "quantum-encrypt", x: 50, y: 15 },
    { id: "neural-shield", x: 20, y: 40 },
    { id: "data-vault", x: 80, y: 40 },
    { id: "crypto-sandbox", x: 30, y: 75 },
    { id: "secure-api-gateway", x: 70, y: 75 },
    { id: "compliance-assistant", x: 50, y: 55 }
  ];
  
  const connections = [
    { from: "quantum-encrypt", to: "neural-shield" },
    { from: "quantum-encrypt", to: "data-vault" },
    { from: "neural-shield", to: "crypto-sandbox" },
    { from: "data-vault", to: "secure-api-gateway" },
    { from: "crypto-sandbox", to: "compliance-assistant" },
    { from: "secure-api-gateway", to: "compliance-assistant" },
    { from: "neural-shield", to: "data-vault" },
    { from: "quantum-encrypt", to: "compliance-assistant" }
  ];

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-surface-2/20 to-surface-1/20 backdrop-blur-lg">
      {/* 3D Background Visualization */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 2] }}>
          <ParticleField />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      
      {/* Controls */}
      <div className="absolute right-4 top-4 z-20 flex gap-2">
        <Button 
          variant={viewMode === "2d" ? "default" : "outline"} 
          size="sm"
          onClick={() => setViewMode("2d")}
          className="bg-background/50 backdrop-blur-sm"
        >
          2D View
        </Button>
        <Button 
          variant={viewMode === "3d" ? "default" : "outline"} 
          size="sm"
          onClick={() => setViewMode("3d")}
          className="bg-background/50 backdrop-blur-sm"
        >
          3D View
        </Button>
      </div>
      
      {/* 2D Visualization Layer */}
      <div className="relative z-10 h-full w-full">
        {/* Connection Lines */}
        <QuantumConnections 
          connections={connections} 
          nodes={ecosystemNodes} 
          selectedNode={selectedNode} 
        />
        
        {/* Product Nodes */}
        {ecosystemNodes.map((node) => (
          <HolographicNode
            key={node.id}
            node={node}
            isSelected={selectedNode === node.id}
            isHovered={hoveredNode === node.id}
            onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          />
        ))}
        
        {/* Enhanced Product Panel */}
        <AnimatePresence>
          {selectedNode && (
            <EnhancedProductPanel 
              productId={selectedNode} 
              onClose={() => setSelectedNode(null)} 
            />
          )}
        </AnimatePresence>
        
        {/* Info Tooltip */}
        <motion.div 
          className="absolute bottom-4 left-4 rounded-lg bg-background/50 p-3 text-sm backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Click on any product to explore details</span>
          </div>
        </motion.div>
      </div>
      
      {/* 3D Visualization Toggle */}
      {viewMode === "3d" && (
        <motion.div 
          className="absolute inset-0 z-20 rounded-3xl bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold">3D Ecosystem Visualization</h3>
              <p className="mt-2 text-muted-foreground">Explore our product ecosystem in immersive 3D</p>
              <Button 
                className="mt-6" 
                onClick={() => setViewMode("2d")}
              >
                Return to 2D View
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}