'use client';

import { Product } from "@/data/products-data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Star, Zap, Eye, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="relative p-0">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl">{product.icon || "🔒"}</div>
          </div>
          <Badge 
            variant={product.status === "active" ? "default" : product.status === "beta" ? "secondary" : "outline"}
            className={cn(
              "absolute right-4 top-4",
              product.status === "active" && "bg-green-500/20 text-green-300 hover:bg-green-500/30",
              product.status === "beta" && "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30",
              product.status === "coming-soon" && "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30",
              product.status === "deprecated" && "bg-red-500/20 text-red-300 hover:bg-red-500/30"
            )}
          >
            {product.status.replace("-", " ")}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <span className="text-sm text-muted-foreground">v{product.version}</span>
        </div>
        
        <p className="mb-4 text-muted-foreground">{product.tagline}</p>
        
        <p className="mb-4 text-sm">{product.description}</p>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {product.highlights.slice(0, 3).map((highlight, index) => (
            <span key={index} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
              {highlight}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.8</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Zap className="h-4 w-4 text-primary" />
              <span>{product.performance?.latency || "N/A"}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between border-t border-white/10 bg-surface-2/30 p-6">
        <Button variant="outline" size="sm" className="gap-2">
          <Eye className="h-4 w-4" />
          Demo
        </Button>
        <GradientButton size="sm" asChild>
          <a href={`/products/${product.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </GradientButton>
      </CardFooter>
    </Card>
  );
}