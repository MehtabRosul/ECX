"use client";

import React, { useState, useEffect, useMemo, useRef, memo } from "react";
import Link from "next/link";
import { Product, productsData, productCategories, productStatuses } from "@/data/products-data";
import { Search, Filter, Grid, List, Star, Zap, Shield, Eye, Download, ArrowRight, ChevronDown, X } from "lucide-react";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { EffectCard } from "@/components/ui/effect-card";

import { GradientButton } from "@/components/ui/gradient-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";

import { ProductsNav } from "@/components/products/products-nav";
import { ProductEcosystemMinimal } from "@/components/products/product-ecosystem-minimal";
import { ProductLifecycleTimeline } from "@/components/products/product-lifecycle-timeline";
import { ProductFeedback } from "@/components/products/product-feedback";

import { ProductsBackgroundVisualization } from '@/components/products-background-visualization';

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
          <motion.div 
            className={cn(
              "relative overflow-hidden rounded-xl group/image",
              viewMode === "list" ? "h-32 w-48 flex-shrink-0" : "h-48 w-full"
            )}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={product.imageUrl || "https://picsum.photos/seed/ecx/800/600"}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/image:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/20 group-hover/image:from-primary/10 group-hover/image:via-primary/5 group-hover/image:to-black/20 transition-all duration-500" />
            <motion.div 
              className="absolute bottom-2 right-2 rounded-full bg-background/90 px-2 py-1 text-xs font-medium backdrop-blur-sm border border-primary/20"
              whileHover={{ scale: 1.1 }}
            >
              {product.version}
            </motion.div>
          </motion.div>
          
          <div className={cn("flex-1", viewMode === "list" ? "py-2" : "")}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <motion.h3 
                  className="text-xl font-bold group-hover:text-primary transition-colors duration-300"
                  layout
                >
                  {product.name}
                </motion.h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{product.tagline}</p>
              </div>
              <motion.div 
                className="flex items-center gap-2 flex-shrink-0"
                whileHover={{ scale: 1.05 }}
              >
                <span className={cn(
                  "inline-flex items-center self-start mt-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 border",
                  product.status === "active" && "bg-green-500/20 text-green-300 border-green-500/30 group-hover:bg-green-500/30",
                  product.status === "beta" && "bg-yellow-500/20 text-yellow-300 border-yellow-500/30 group-hover:bg-yellow-500/30",
                  product.status === "coming-soon" && "bg-blue-500/20 text-blue-300 border-blue-500/30 group-hover:bg-blue-500/30",
                  product.status === "deprecated" && "bg-red-500/20 text-red-300 border-red-500/30 group-hover:bg-red-500/30"
                )}>
                  {product.status.replace("-", " ")}
                </span>
              </motion.div>
            </div>
            
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-2">{product.description}</p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {product.highlights.slice(0, 3).map((highlight, index) => (
                <motion.span 
                  key={index} 
                  className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {highlight}
                </motion.span>
              ))}
            </div>
            
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="flex items-center gap-1.5 text-sm"
                  whileHover={{ scale: 1.1 }}
                >
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.8</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-1.5 text-sm text-primary"
                  whileHover={{ scale: 1.1 }}
                >
                  <Zap className="h-4 w-4" />
                  <span className="font-medium">{product.performance?.latency || "N/A"}</span>
                </motion.div>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className="gap-2 rounded-xl border-primary/30 hover:bg-primary/10 transition-all duration-300">
                    <Eye className="h-4 w-4" />
                    Demo
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <GradientButton size="sm" className="gap-2 rounded-2xl px-4 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                    Visit
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </GradientButton>
                </motion.div>
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
      {/* Unique Background Visualization */}
      <ProductsBackgroundVisualization />
      
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
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 animate-gradient-x">Product</span> Universe
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed"
            >
              Explore our cutting-edge suite of security and privacy solutions, designed to protect your digital assets in an ever-evolving threat landscape.
            </motion.p>
          </motion.div>
        </motion.div>
        
        {/* Search and Filters */}
        <motion.div 
          className="mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative mb-4 sm:mb-6 group">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
            <input
              type="text"
              placeholder="Search products, features, or use cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-background/60 py-3.5 sm:py-4 pl-12 pr-4 text-base sm:text-lg backdrop-blur-md placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-background/80 focus:scale-[1.01] transition-all duration-300 shadow-lg shadow-black/10"
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
        </motion.div>
        
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
          className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-surface-2/40 via-surface-1/30 to-surface-2/40 p-8 sm:p-10 backdrop-blur-md transform-gpu overflow-hidden group"
          initial={useReducedMotion() ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          
          <div className="relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">Ready to get started?</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Contact our team for a personalized product demonstration
              </p>
            </motion.div>
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="w-full sm:w-auto border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
                  Download Brochure
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <GradientButton className="w-full sm:w-auto shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300">
                  Contact Sales
                  <ArrowRight className="ml-2 h-4 w-4" />
                </GradientButton>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
