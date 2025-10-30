"use client";

import React, { useState, useEffect, useMemo, useRef, memo } from "react";
import Link from "next/link";
import { Product, productsData, productCategories, productStatuses } from "@/data/products-data";
import { Search, Filter, Grid, List, Star, Zap, Shield, Eye, Download, ArrowRight, ChevronDown, X } from "lucide-react";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { EffectCard } from "@/components/ui/effect-card";
import { FloatingParticlesBackground } from "@/components/floating-particles-background";
import { GradientButton } from "@/components/ui/gradient-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

import { ProductsNav } from "@/components/products/products-nav";
import { ProductEcosystemMinimal } from "@/components/products/product-ecosystem-minimal";
import { ProductLifecycleTimeline } from "@/components/products/product-lifecycle-timeline";
import { ProductFeedback } from "@/components/products/product-feedback";

// 3D Product Visualization Component
function ProductVisualization() {
  const ref = useRef<any>();
  const [sphere] = useState(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const i3 = i * 3;
      const radius = 1.2 * Math.cbrt(Math.random());
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
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#2B8DBE"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// Interactive Product Card Component
function ProductCard({ product, viewMode }: { product: Product; viewMode: "grid" | "list" }) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      layout={false}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-surface-2/50 to-surface-1/50 backdrop-blur-sm transform-gpu",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-primary/5 before:to-accent/5 before:opacity-0 before:transition-opacity before:duration-300",
        "hover:before:opacity-100 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/15 hover:ring-1 hover:ring-primary/40",
        "transition-all duration-300",
        viewMode === "grid" ? "h-full" : "flex"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Single-color glow overlay (primary) */}
      <div className={cn(
        "pointer-events-none absolute -inset-10 z-0 opacity-0 blur-2xl transition-opacity duration-300",
        "group-hover:opacity-100",
        "bg-radial from-20% to-100% bg-gradient-to-br from-primary/20 via-primary/10 to-transparent"
      )} />
      <div className="relative z-10 h-full p-6">
        <div className={cn("flex", viewMode === "list" ? "flex-row gap-6" : "flex-col")}>
          <div className={cn(
            "relative overflow-hidden rounded-xl",
            viewMode === "list" ? "h-32 w-48 flex-shrink-0" : "h-48 w-full"
          )}>
            <img
              src={product.imageUrl || "https://picsum.photos/seed/ecx/800/600"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/20" />
            <div className="absolute bottom-2 right-2 rounded-full bg-background/80 px-2 py-1 text-xs font-medium backdrop-blur-sm">
              {product.version}
            </div>
          </div>
          
          <div className={cn("flex-1", viewMode === "list" ? "py-2" : "")}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "inline-flex items-center self-start mt-1.5 rounded-full px-2 py-1 text-xs font-medium",
                  product.status === "active" && "bg-green-500/20 text-green-300",
                  product.status === "beta" && "bg-yellow-500/20 text-yellow-300",
                  product.status === "coming-soon" && "bg-blue-500/20 text-blue-300",
                  product.status === "deprecated" && "bg-red-500/20 text-red-300"
                )}>
                  {product.status.replace("-", " ")}
                </span>
              </div>
            </div>
            
            <p className="mt-3 text-sm text-muted-foreground">{product.description}</p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {product.highlights.slice(0, 3).map((highlight, index) => (
                <span key={index} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                  {highlight}
                </span>
              ))}
            </div>
            
            <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
              <div className="mr-auto flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>{product.performance?.latency || "N/A"}</span>
                </div>
                <Button variant="outline" size="sm" className="gap-2 rounded-xl ml-2">
                  <Eye className="h-4 w-4" />
                  Demo
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <GradientButton size="sm" className="gap-2 rounded-2xl px-4">
                  Visit
                  <ArrowRight className="h-4 w-4" />
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const MemoProductCard = memo(ProductCard);

// Product Ecosystem Visualization
function ProductEcosystemVisualization() {
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-surface-2/30 to-surface-1/30 backdrop-blur-sm">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-64 w-64">
          {/* Central Product */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-lg">
              <Shield className="h-10 w-10 text-white" />
            </div>
          </div>
          
          {/* Connected Products */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${50 + 40 * Math.sin((i * Math.PI) / 3)}%`,
                left: `${50 + 40 * Math.cos((i * Math.PI) / 3)}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 shadow-md">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
              </div>
            </motion.div>
          ))}
          
          {/* Connection Lines */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="absolute h-0.5 bg-gradient-to-r from-primary/30 to-accent/30"
              style={{
                top: "50%",
                left: "50%",
                width: "40%",
                transformOrigin: "0 0",
                transform: `rotate(${i * 60}deg)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// AI Recommendations Component
function AIRecommendations({ products }: { products: Product[] }) {
  // PATCHED: deterministic, no random
  const recommendedProducts = useMemo(() => {
    // Sort by name for determinism
    return [...products]
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 3);
  }, [products]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">AI Recommended For You</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {recommendedProducts.map((product) => (
          <NeonGradientCard key={product.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
              </div>
            </div>
          </NeonGradientCard>
        ))}
      </div>
    </div>
  );
}

export default function ProductsHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category.toLowerCase());
      
      const matchesStatus = selectedStatuses.length === 0 || 
        selectedStatuses.includes(product.status);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategories, selectedStatuses]);
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status]
    );
  };
  
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setSearchQuery("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Particles */}
      <FloatingParticlesBackground className="opacity-30" />
      
      {/* 3D Visualization Background */}
      <div className="absolute right-0 top-0 h-96 w-96 opacity-20 will-change-transform">
        <Canvas dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }} camera={{ position: [0, 0, 1] }}>
          <ProductVisualization />
        </Canvas>
      </div>
      
      <div className="container relative z-10 mx-auto max-w-7xl px-4 py-12">
        {/* Breadcrumbs and Navigation */}
        <nav className="mb-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Products</span>
        </nav>
        
        <div className="sm:mx-0 -mx-2">
          <ProductsNav />
        </div>
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Our <span className="text-primary">Product</span> Universe
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            Explore our cutting-edge suite of security and privacy solutions, designed to protect your digital assets in an ever-evolving threat landscape.
          </p>
        </motion.div>
        
        {/* Search and Filters */}
        <div className="mb-10 sm:mb-12">
          <div className="relative mb-4 sm:mb-6">
            <Search className="magnifiant pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white z-10" />
            <input
              type="text"
              placeholder="Search products, features, or use cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-background/50 py-3 sm:py-4 pl-12 pr-4 text-base sm:text-lg backdrop-blur-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="gap-2 px-3 py-2 text-sm sm:px-4 sm:py-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown className={cn("h-4 w-4 transition-transform", isFilterOpen && "rotate-180")} />
              </Button>
              
              <div className="flex items-center gap-1">
                <Grid 
                  className={cn(
                    "h-5 w-5 cursor-pointer",
                    viewMode === "grid" ? "text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setViewMode("grid")}
                />
                <List 
                  className={cn(
                    "h-5 w-5 cursor-pointer",
                    viewMode === "list" ? "text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setViewMode("list")}
                />
              </div>
              
              {(selectedCategories.length > 0 || selectedStatuses.length > 0 || searchQuery) && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="gap-2 text-sm px-2">
                  <X className="h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>
            
            <div className="text-xs sm:text-sm text-muted-foreground sm:ml-auto">
              Showing {filteredProducts.length} of {productsData.length} products
            </div>
          </div>
          
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-background/30 p-6 backdrop-blur-sm"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 font-medium">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {productCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => toggleCategory(category.id)}
                          className={cn(
                            "rounded-full px-3 py-1.5 text-sm transition-all",
                            selectedCategories.includes(category.id)
                              ? "bg-primary text-primary-foreground"
                              : "bg-surface-2 hover:bg-surface-1"
                          )}
                        >
                          {category.name} ({category.count})
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3 font-medium">Status</h3>
                    <div className="flex flex-wrap gap-2">
                      {productStatuses.map((status) => (
                        <button
                          key={status.id}
                          onClick={() => toggleStatus(status.id)}
                          className={cn(
                            "rounded-full px-3 py-1.5 text-sm transition-all",
                            selectedStatuses.includes(status.id)
                              ? "bg-primary text-primary-foreground"
                              : "bg-surface-2 hover:bg-surface-1"
                          )}
                        >
                          {status.name} ({status.count})
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Product Showcase */}
        <div className="mb-14 sm:mb-16">
          <div className="mb-6 sm:mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl sm:text-2xl font-bold">Featured Products</h2>
            <GradientButton variant="variant" size="sm" className="w-full sm:w-auto">
              View All Products
            </GradientButton>
          </div>
          
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout="position"
              className={cn(
                "grid gap-6 transform-gpu",
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              )}
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <MemoProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
              <Search className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-medium">No products found</h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={clearAllFilters} className="mt-4">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
        
        {/* Product Ecosystem */}
        <motion.div 
          className="mb-16 transform-gpu"
          initial={useReducedMotion() ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="mb-8">
            <div>
              <h2 className="text-2xl font-bold">Product Ecosystem</h2>
              <p className="mt-2 text-muted-foreground">
                See how our products work together to create a comprehensive security solution
              </p>
            </div>
          </div>
          <ProductEcosystemMinimal />
        </motion.div>
        
        {/* Product Lifecycle */}
        <motion.div 
          className="mb-16 transform-gpu"
          initial={useReducedMotion() ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Product Lifecycle</h2>
            <p className="mt-2 text-muted-foreground">
              Track the development and evolution of our products
            </p>
          </div>
          <ProductLifecycleTimeline />
        </motion.div>
        
        {/* Product Feedback */}
        <motion.div 
          className="mb-16 transform-gpu"
          initial={useReducedMotion() ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Customer Feedback</h2>
            <p className="mt-2 text-muted-foreground">
              See what our customers are saying about our products
            </p>
          </div>
          <ProductFeedback />
        </motion.div>
        
        {/* AI Recommendations */}
        <motion.div 
          className="mb-16 transform-gpu"
          initial={useReducedMotion() ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <AIRecommendations products={productsData} />
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-surface-2/30 to-surface-1/30 p-8 backdrop-blur-sm transform-gpu"
          initial={useReducedMotion() ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="text-2xl font-bold">Ready to get started?</h3>
              <p className="mt-2 text-muted-foreground">
                Contact our team for a personalized product demonstration
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Download Brochure</Button>
              <GradientButton>Contact Sales</GradientButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StarAuroraBackground() {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* GPU-animated orbits/dots with CSS */}
      <div className="absolute left-1/6 top-[12%] w-20 h-20 rounded-full bg-cyan-400/25 blur-xl will-change-transform animate-orbit-1" />
      <div className="absolute right-[18%] top-[32%] w-28 h-28 rounded-full bg-sky-300/20 blur-2xl will-change-transform animate-orbit-2" />
      <div className="absolute left-[10%] bottom-[18%] w-36 h-20 rounded-full bg-cyan-600/10 blur-3xl will-change-transform animate-orbit-3" />
      <div className="absolute right-[9%] bottom-[24%] w-28 h-28 rounded-full bg-fuchsia-400/10 blur-3xl will-change-transform animate-orbit-4" />
      {/* Aurora haze at top and bottom */}
      <div className="absolute left-1/2 top-12 -translate-x-1/2 w-3/5 h-28 bg-gradient-to-r from-cyan-300/25 via-blue-400/30 to-fuchsia-300/10 blur-3xl opacity-65 will-change-transform animate-float-aurora" />
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[78vw] h-32 bg-gradient-to-br from-cyan-200/20 via-blue-200/20 to-violet-400/20 blur-2xl opacity-50 will-change-transform animate-float-aurora-fast" />
    </div>
  );
}

// /* Add these to your global CSS for GPU keyframes: */
// @layer utilities {
//   .animate-orbit-1 { animation: orbit1 14s ease-in-out infinite alternate; }
//   .animate-orbit-2 { animation: orbit2 21s ease-in-out infinite alternate; }
//   .animate-orbit-3 { animation: orbit3 17s ease-in-out infinite alternate; }
//   .animate-orbit-4 { animation: orbit4 24s linear infinite alternate; }
//   .animate-float-aurora { animation: floatAurora 15s ease-in-out infinite alternate; }
//   .animate-float-aurora-fast { animation: floatAurora 8s linear infinite alternate; }
//   @keyframes orbit1 { from { transform: translateY(0) scale(1); } to { transform: translateY(-22px) scale(1.03); } }
//   @keyframes orbit2 { from { transform: translate(0,0) scale(1.02); } to { transform: translate(-38px,22px) scale(.96); } }
//   @keyframes orbit3 { from { transform: translate(-12px,0) scale(.98); } to { transform: translate(14px,-24px) scale(1.04); } }
//   @keyframes orbit4 { from { transform: translateY(0) scale(1.03); } to { transform: translateY(-16px) scale(.976); } }
//   @keyframes floatAurora { 0%,100% { transform: translateY(0); opacity:.71; } 46% { transform: translateY(-30px); opacity:.55; } }
//   @keyframes floatAurora { from { opacity:.58; } 50% { opacity:.73; } to { opacity:.46; } }
// }