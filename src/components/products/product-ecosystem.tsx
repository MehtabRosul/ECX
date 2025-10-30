'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Lock, Cpu, Database, Globe } from "lucide-react";

const products = [
  { id: "quantum-encrypt", name: "Quantum Encrypt", icon: Lock, x: 50, y: 20 },
  { id: "neural-shield", name: "Neural Shield", icon: Shield, x: 20, y: 50 },
  { id: "data-vault", name: "Data Vault", icon: Database, x: 80, y: 50 },
  { id: "crypto-sandbox", name: "Crypto Sandbox", icon: Cpu, x: 35, y: 80 },
  { id: "secure-api-gateway", name: "Secure API Gateway", icon: Globe, x: 65, y: 80 },
  { id: "compliance-assistant", name: "Compliance Assistant", icon: Zap, x: 50, y: 50 },
];

const connections = [
  { from: "quantum-encrypt", to: "neural-shield" },
  { from: "quantum-encrypt", to: "data-vault" },
  { from: "neural-shield", to: "secure-api-gateway" },
  { from: "data-vault", to: "crypto-sandbox" },
  { from: "secure-api-gateway", to: "compliance-assistant" },
  { from: "crypto-sandbox", to: "compliance-assistant" },
];

export function ProductEcosystem() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  
  const getConnectionCoordinates = (fromId: string, toId: string) => {
    const fromProduct = products.find(p => p.id === fromId);
    const toProduct = products.find(p => p.id === toId);
    
    if (!fromProduct || !toProduct) return { x1: 0, y1: 0, x2: 0, y2: 0 };
    
    return {
      x1: fromProduct.x,
      y1: fromProduct.y,
      x2: toProduct.x,
      y2: toProduct.y,
    };
  };
  
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-surface-2/30 to-surface-1/30 backdrop-blur-sm">
      <div className="absolute inset-0">
        {/* Connections */}
        <svg className="absolute inset-0 h-full w-full">
          {connections.map((conn, index) => {
            const coords = getConnectionCoordinates(conn.from, conn.to);
            const isSelected = selectedProduct && (conn.from === selectedProduct || conn.to === selectedProduct);
            const isHovered = hoveredProduct && (conn.from === hoveredProduct || conn.to === hoveredProduct);
            
            return (
              <line
                key={index}
                x1={`${coords.x1}%`}
                y1={`${coords.y1}%`}
                x2={`${coords.x2}%`}
                y2={`${coords.y2}%`}
                stroke={isSelected || isHovered ? "rgba(43, 141, 190, 0.8)" : "rgba(255, 255, 255, 0.1)"}
                strokeWidth={isSelected || isHovered ? 2 : 1}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
        
        {/* Products */}
        {products.map((product) => {
          const Icon = product.icon;
          const isSelected = selectedProduct === product.id;
          const isHovered = hoveredProduct === product.id;
          
          return (
            <motion.div
              key={product.id}
              className="absolute flex cursor-pointer flex-col items-center"
              style={{
                left: `${product.x}%`,
                top: `${product.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => setSelectedProduct(isSelected ? null : product.id)}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              whileHover={{ scale: 1.1 }}
              animate={{
                scale: isSelected ? 1.2 : isHovered ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className={`
                flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-all duration-300
                ${isSelected 
                  ? "bg-gradient-to-br from-primary to-accent shadow-primary/30" 
                  : isHovered
                  ? "bg-gradient-to-br from-surface-2 to-surface-1 ring-2 ring-primary/30"
                  : "bg-surface-2"
                }
              `}>
                <Icon className={`
                  h-8 w-8 transition-colors duration-300
                  ${isSelected ? "text-white" : "text-primary"}
                `} />
              </div>
              <div className={`
                mt-2 max-w-[120px] text-center text-sm font-medium transition-all duration-300
                ${isSelected || isHovered ? "text-foreground" : "text-muted-foreground"}
              `}>
                {product.name}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Product Details Panel */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="absolute bottom-4 right-4 top-4 w-80 overflow-y-auto rounded-xl border border-white/10 bg-background/80 p-6 backdrop-blur-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">
              {products.find(p => p.id === selectedProduct)?.name}
            </h3>
            <button 
              onClick={() => setSelectedProduct(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
          <p className="mb-4 text-muted-foreground">
            Detailed information about this product and its integration capabilities with other products in the ecosystem.
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium">Key Integrations</h4>
              <ul className="mt-2 space-y-2">
                {connections
                  .filter(conn => conn.from === selectedProduct || conn.to === selectedProduct)
                  .map((conn, index) => {
                    const connectedProductId = conn.from === selectedProduct ? conn.to : conn.from;
                    const connectedProduct = products.find(p => p.id === connectedProductId);
                    return (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        {connectedProduct?.name}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}