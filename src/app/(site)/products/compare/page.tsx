"use client";

import { useState } from "react";
import { productsData } from "@/data/products-data";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  X, 
  ArrowRight, 
  Shield, 
  Zap, 
  Database, 
  Globe, 
  Lock, 
  Cpu,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FloatingParticlesBackgroundClient as FloatingParticlesBackground } from "@/components/floating-particles-background.client";
import { ProductsNav } from "@/components/products/products-nav";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";

export default function ProductComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  const toggleProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
  
  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(id => id !== productId));
  };
  
  const selectedProductObjects = productsData.filter(p => selectedProducts.includes(p.id));
  
  // Features for comparison
  const comparisonFeatures = [
    { id: "encryption", name: "Post-Quantum Encryption", icon: Lock },
    { id: "latency", name: "Latency < 1ms", icon: Zap },
    { id: "compliance", name: "Compliance Certifications", icon: Shield },
    { id: "scalability", name: "Horizontal Scaling", icon: Cpu },
    { id: "availability", name: "99.99% Availability", icon: Database },
    { id: "api", name: "RESTful API", icon: Globe },
    { id: "sdk", name: "Multi-Language SDKs", icon: Cpu },
    { id: "support", name: "24/7 Support", icon: Shield },
  ];
  
  // Mock feature data for each product
  const productFeatures: Record<string, Record<string, boolean>> = {
    "quantum-encrypt": {
      encryption: true,
      latency: true,
      compliance: true,
      scalability: true,
      availability: true,
      api: true,
      sdk: true,
      support: true,
    },
    "neural-shield": {
      encryption: true,
      latency: true,
      compliance: true,
      scalability: true,
      availability: true,
      api: true,
      sdk: true,
      support: true,
    },
    "data-vault": {
      encryption: true,
      latency: false,
      compliance: true,
      scalability: true,
      availability: false,
      api: true,
      sdk: true,
      support: false,
    },
    "crypto-sandbox": {
      encryption: true,
      latency: true,
      compliance: true,
      scalability: false,
      availability: true,
      api: true,
      sdk: true,
      support: true,
    },
    "secure-api-gateway": {
      encryption: true,
      latency: true,
      compliance: true,
      scalability: true,
      availability: true,
      api: true,
      sdk: false,
      support: true,
    },
    "compliance-assistant": {
      encryption: false,
      latency: true,
      compliance: true,
      scalability: true,
      availability: true,
      api: true,
      sdk: true,
      support: true,
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Particles */}
      <FloatingParticlesBackground className="opacity-20" />
      
      <div className="container relative z-10 mx-auto max-w-7xl px-4 py-12">
        {/* Nav */}
        <div className="sm:mx-0 -mx-2">
          <ProductsNav />
        </div>
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Compare <span className="text-primary">Products</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Select up to three products to compare their features, capabilities, and performance metrics side-by-side
          </p>
        </div>
        
        {/* Product Selection */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Select Products to Compare</h2>
          
          {selectedProducts.length > 0 && (
            <div className="mb-8 flex flex-wrap items-center gap-4">
              {selectedProductObjects.map((product) => (
                <NeonGradientCard key={product.id} className="relative p-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-2 top-2 h-6 w-6 p-0"
                    onClick={() => removeProduct(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.tagline}</p>
                    </div>
                  </div>
                </NeonGradientCard>
              ))}
              
              {selectedProducts.length < 3 && (
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-white/20">
                  <span className="text-2xl">+</span>
                </div>
              )}
            </div>
          )}
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productsData.map((product) => {
              const isSelected = selectedProducts.includes(product.id);
              const isDisabled = selectedProducts.length >= 3 && !isSelected;
              
              return (
                <Card 
                  key={product.id} 
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isSelected && "border-primary ring-2 ring-primary/20",
                    isDisabled && "opacity-50"
                  )}
                >
                  <CardHeader className="bg-surface-2/50">
                    <div className="flex items-start justify-between">
                      <CardTitle className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-bold">{product.name}</div>
                          <div className="text-sm font-normal text-muted-foreground">{product.tagline}</div>
                        </div>
                      </CardTitle>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleProduct(product.id)}
                        disabled={isDisabled}
                        className="h-5 w-5"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="mb-4 text-sm text-muted-foreground">{product.description}</p>
                    
                    <div className="mb-4 flex flex-wrap gap-2">
                      {product.highlights.slice(0, 3).map((highlight, index) => (
                        <span key={index} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Zap className="h-4 w-4 text-primary" />
                        <span>{product.performance?.latency || "N/A"}</span>
                      </div>
                      <Button 
                        variant={isSelected ? "outline" : "default"} 
                        size="sm"
                        onClick={() => toggleProduct(product.id)}
                        disabled={isDisabled}
                      >
                        {isSelected ? "Selected" : "Select"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Comparison Table */}
        {selectedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-bold">Feature Comparison</h2>
            
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-surface-2/50">
                    <th className="p-4 text-left">Feature</th>
                    {selectedProductObjects.map((product) => (
                      <th key={product.id} className="p-4 text-center">
                        <div className="flex flex-col items-center">
                          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <Shield className="h-6 w-6 text-primary" />
                          </div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.version}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <tr key={feature.id} className="border-b border-white/5 last:border-0">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-primary" />
                            <span className="font-medium">{feature.name}</span>
                          </div>
                        </td>
                        {selectedProductObjects.map((product) => {
                          const hasFeature = productFeatures[product.id]?.[feature.id] ?? false;
                          return (
                            <td key={`${product.id}-${feature.id}`} className="p-4 text-center">
                              {hasFeature ? (
                                <CheckCircle className="mx-auto h-6 w-6 text-green-400" />
                              ) : (
                                <AlertCircle className="mx-auto h-6 w-6 text-red-400" />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Performance Metrics */}
        {selectedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-bold">Performance Metrics</h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Latency Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedProductObjects.map((product) => (
                      <div key={`latency-${product.id}`} className="flex items-center justify-between">
                        <span>{product.name}</span>
                        <span className="font-mono">{product.performance?.latency || "N/A"}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Throughput Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedProductObjects.map((product) => (
                      <div key={`throughput-${product.id}`} className="flex items-center justify-between">
                        <span>{product.name}</span>
                        <span className="font-mono">{product.performance?.throughput || "N/A"}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Availability Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedProductObjects.map((product) => (
                      <div key={`availability-${product.id}`} className="flex items-center justify-between">
                        <span>{product.name}</span>
                        <span className="font-mono">{product.performance?.availability || "N/A"}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {/* CTA Section */}
        {selectedProducts.length > 0 && (
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-surface-2/30 to-surface-1/30 p-8 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h3 className="text-2xl font-bold">Ready to make a decision?</h3>
                <p className="mt-2 text-muted-foreground">
                  Contact our team for a personalized recommendation based on your requirements
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">Download Comparison</Button>
                <GradientButton>
                  Contact Sales
                  <ArrowRight className="ml-2 h-5 w-5" />
                </GradientButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}